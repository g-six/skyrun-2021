import { AuthenticationResultType, InitiateAuthCommandOutput } from '@aws-sdk/client-cognito-identity-provider'
import { createWrapper } from 'components/LogicalWrapperFactory'
import useModal from 'components/Modals/useModal'
import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import login from 'services/login'
import logout from 'services/logout'
import profile from 'services/profile'
import { AuthContextType, SkyUser } from './types'

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function useAuth() {
    return useContext(AuthContext)
}

type Props= {
    children: ReactNode
}

export const Authenticated = createWrapper(AuthContext, ctx => !!ctx.user?.uuid)
export const NotAuthenticated = createWrapper(AuthContext, ctx => !ctx.user?.uuid)

export function SkyAuthProvider({ children }: Props) {
    const [user, setUser] = useState<SkyUser>({} as unknown as SkyUser)
    const [is_fetching, setFetching] = useState(true)
    const LoginModal = useModal()
    const SignupModal = useModal()

    const value = {
        user,
        login: async (email: string, password: string): Promise<AuthenticationResultType | boolean> => {
            const {
                AuthenticationResult,                
            }: InitiateAuthCommandOutput = await login({ email, password })

            if (AuthenticationResult) {
                const { IdToken, AccessToken, ExpiresIn, RefreshToken } = AuthenticationResult
                document.cookie = `email=${email}; path=/; max-age=${Number(
                    ExpiresIn
                )}`
                document.cookie = `access_token=${AccessToken}; path=/; max-age=${Number(
                    ExpiresIn
                )}`
                document.cookie = `refresh_token=${RefreshToken}; path=/`
                document.cookie = `id_token=${IdToken}; path=/`
                setFetching(true)
            }
            return AuthenticationResult || false
        },
        logout: async () => {
            await logout()
            document.location.href = '/'
        },
        profile,
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

        
        if (is_fetching && !user?.uuid) {
            getProfile()
        }

        if (user?.uuid) {
            LoginModal.close()
            SignupModal.close()
        }

        setFetching(false)
    }, [LoginModal, SignupModal, user, is_fetching])
    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
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
