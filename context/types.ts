import { AuthenticationResultType } from '@aws-sdk/client-cognito-identity-provider'
import { ModalHook } from 'components/Modals/types'
import { UserModel } from 'services/profile'

export interface CognitoProps {
    region: string
    client_id: string
}

export interface SkyUser {
    first_name: string
    last_name: string
    uuid: string
    email?: string
}

export type AuthContextType = {
    user?: SkyUser
    LoginModal: ModalHook
    SignupModal: ModalHook
    login(email: string, password: string): Promise<AuthenticationResultType | boolean>
    logout(): Promise<void>
    profile(): Promise<UserModel | boolean>
}
