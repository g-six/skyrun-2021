import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import Cookies from 'js-cookie'
import { AuthenticationResultType, InitiateAuthCommandOutput, SignUpCommandOutput } from '@aws-sdk/client-cognito-identity-provider'
import { createWrapper } from 'components/LogicalWrapperFactory'
import useModal from 'components/Modals/useModal'
import forgotPassword, { confirmForgotPassword } from 'services/forgot-password'
import login from 'services/login'
import logout from 'services/logout'
import profile from 'services/profile'
import signUp from 'services/UserPool'
import { AuthContextType, SkyUser, TenantInfo } from './types'
import { getApiRequest } from 'utils/fetch-helper'
import { Tier } from './AppContext'
import { UserModel } from 'components/Modals/types'

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function useAuth() {
    return useContext(AuthContext)
}

type Props= {
    children: ReactNode
}

type UserProfileRecord = {
    user?: UserModel,
    roles?: string[],
    tenants?: TenantInfo[],
}

type ApiTenant = {
    id: string
    name: string
    tier: Tier
}

type ApiUser = {
    userInfo: UserModel,
    roles: string[],
    tenants: ApiTenant[],
}

export const Authenticated = createWrapper(AuthContext, ctx => !!ctx.user?.uuid)
export const Activated = createWrapper(AuthContext, ctx => !!ctx.user?.phone)
export const NotAuthenticated = createWrapper(AuthContext, ctx => !ctx.user?.uuid)

export function SkyAuthProvider({ children }: Props) {
    const [user, setUser] = useState<SkyUser>({} as unknown as SkyUser)
    const [tenant, setTenant] = useState<TenantInfo>({} as unknown as TenantInfo)
    const [tenants, setTenants] = useState<TenantInfo[]>([] as unknown as TenantInfo[])
    const [already_set, setRecordsRetrievalStatus] = useState<Record<string, boolean>>({})

    const [data, setData] = useState<UserProfileRecord>({})

    const LoginModal = useModal()
    const SignupModal = useModal()
    const TenantModal = useModal()
    const CreateClientModal = useModal()
    const CreateLocationModal = useModal()
    const StaffModal = useModal()

    const value = {
        user,
        login: async (email: string, password: string): Promise<AuthenticationResultType | boolean> => {
            const {
                AuthenticationResult,                
            }: InitiateAuthCommandOutput = await login({ email, password })

            if (AuthenticationResult) {
                const { IdToken, AccessToken, ExpiresIn, RefreshToken } = AuthenticationResult
                if (AccessToken) {
                    Cookies.set('email', email, {  path: '/', expires: Number(
                        ExpiresIn
                    )})
                    Cookies.set('access_token', AccessToken, { path: '/', expires: Number(
                        ExpiresIn
                    )})
                    if (IdToken) {
                        Cookies.set('id_token', IdToken, { path: '/', expires: Number(
                            ExpiresIn
                        )})
                    }
                    if (RefreshToken) {
                        Cookies.set('refresh_token', RefreshToken, { path: '/' })
                    }

                    const auth_data = await profile()
                    if (auth_data) {
                        setUser({
                            first_name: auth_data.given_name,
                            last_name: auth_data.family_name,
                            uuid: auth_data.uuid,
                        })
                        const res: ApiUser = await getApiRequest('/v1/users/current')
                        initUserProfile(res)
                    }
                }
            }
            return AuthenticationResult || false
        },
        confirmForgotPassword: async (email: string, new_password: string, code: string) => {
            const res = await confirmForgotPassword(email, new_password, code)
            return res
        },
        forgotPassword: async (email: string) => {
            const x = await forgotPassword({ email })
        },
        logout: async () => {
            await logout()
            document.location.href = '/'
        },
        profile,
        signup: async (email: string, password: string, given_name: string, family_name: string): Promise<SignUpCommandOutput | boolean> => {
            const output: SignUpCommandOutput = await signUp({ email, password, given_name, family_name })

            return output || false
        },
        tenant,
        tenants,
        setTenant,
        CreateClientModal,
        CreateLocationModal,
        LoginModal,
        StaffModal,
        SignupModal,
        TenantModal,
    }

    const { all_tenants, active_tenant } = already_set

    function initUserProfile(res: ApiUser) {
        const user_record: UserProfileRecord = {
            user: res.userInfo,
            roles: res.roles,
            tenants: [],
        }

        res.tenants.forEach((t: ApiTenant, idx) => {
            const clean_tenant = {
                id: t.id,
                business_name: t.name,
                tier: t.tier as unknown as Tier,
            }
            user_record.tenants?.push(clean_tenant)

            if (Cookies.get('tenant_id') && clean_tenant.id == Cookies.get('tenant_id')) {
                setTenant(clean_tenant)
            } else if (idx == 0) {
                setTenant(clean_tenant)
                Cookies.set('tenant_id', clean_tenant.id)
            }
        })

        setData(user_record)
    }

    useEffect(() => {
        const { user: api_user, roles: api_roles, tenants: api_tenants } = data

        async function getProfile() {
            const auth_data = await profile()
            if (auth_data && auth_data.uuid) {
                setUser({
                    first_name: auth_data.given_name,
                    last_name: auth_data.family_name,
                    uuid: auth_data.uuid,
                })

                
                const res: ApiUser = await getApiRequest('/v1/users/current')
                initUserProfile(res)
            }
        }

        if (LoginModal.is_open && user.uuid && Cookies.get('id_token')) {
            LoginModal.close()
        }

        if (data.user && !all_tenants && !active_tenant) {
            const records: TenantInfo[] = []
            api_tenants?.forEach((t: TenantInfo) => {
                records.push(t)
                if (!active_tenant) {
                    if (t.id == Cookies.get('tenant_id')) {
                        setTenant(t)
                        setRecordsRetrievalStatus({
                            ...already_set,
                            active_tenant: true,
                        })
                    }
                }

                if (api_tenants && records.length >= api_tenants.length && !all_tenants) {
                    setTenants(records)
                    setRecordsRetrievalStatus({
                        ...already_set,
                        all_tenants: true,
                    })
                    if (!active_tenant) {
                        setTenant(records[0])
                    }
                }
            })
            if (LoginModal.is_open) {
                LoginModal.close()
            }
        } else if (!user || !user?.uuid) {
            getProfile()
        }
    }, [user, all_tenants, active_tenant, already_set, data])


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export async function getStaticProps() {
    return {
        props: {
            region: process.env.COGNITO_REGION,
            client_id: process.env.COGNITO_CLIENT_ID,
        },
    }
}
