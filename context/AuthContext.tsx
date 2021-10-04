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
import { AuthContextType, SkyUser } from './types'
import { FetchMethods, useFetch } from 'utils/fetch-helper'
import SkyContext, { Tier } from './AppContext'

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function useAuth() {
    return useContext(AuthContext)
}
export function useAppContext() {
    return useContext(SkyContext)
}

type Props= {
    children: ReactNode
}

export const Authenticated = createWrapper(AuthContext, ctx => !!ctx.user?.uuid)
export const Activated = createWrapper(AuthContext, ctx => !!ctx.user?.phone)
export const NotAuthenticated = createWrapper(AuthContext, ctx => !ctx.user?.uuid)

export function SkyAuthProvider({ children }: Props) {
    const [user, setUser] = useState<SkyUser>({} as unknown as SkyUser)
    const [is_initialized, setInit] = useState(true)
    const [tiers, setTiers] = useState([] as Tier[])

    const {
        is_loading,
        data,
     } = useFetch(
        '/v1/tiers',
        FetchMethods.GET,
        true,
        true,
    )

    const LoginModal = useModal()
    const SignupModal = useModal()
    const CreateClientModal = useModal()

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
                    document.cookie = `id_token=${IdToken}; path=/; max-age=${Number(
                        ExpiresIn
                    )}`
                    document.cookie = `refresh_token=${RefreshToken}; path=/`
                    setInit(true)
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

            if (output.UserSub) {
                setInit(true)
            }

            return output || false
        },
        CreateClientModal,
        LoginModal,
        SignupModal,
    }

    useEffect(() => {
        async function getProfile() {
            const auth_data = await profile()
            if (auth_data) {
                setUser({
                    first_name: auth_data.given_name,
                    last_name: auth_data.family_name,
                    uuid: auth_data.uuid,
                })
            }
        }

        
        if (is_initialized) {
            if (!user?.uuid) {
                getProfile()
            }
        }

        if (user?.uuid) {
            LoginModal.close()
            SignupModal.close()
        }

        if (data.length && tiers.length == 0) {
            setTiers(data)
        }

        setInit(false)
    }, [LoginModal, SignupModal, CreateClientModal, user, is_initialized, data, tiers])

    return (
        <SkyContext.Provider value={{ tiers }}>
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        </SkyContext.Provider>
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
