import { AuthenticationResultType, ConfirmForgotPasswordCommandOutput } from '@aws-sdk/client-cognito-identity-provider'
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
    city?: string
    country?: string
    date_of_birth?: string
    gender?: string
    phone?: string
    state?: string
    street_1?: string
    street_2?: string
    zip?: string
}

export type AuthContextType = {
    user?: SkyUser
    LoginModal: ModalHook
    SignupModal: ModalHook
    CreateClientModal: ModalHook
    confirmForgotPassword(email: string, new_password: string, code: string): Promise<ConfirmForgotPasswordCommandOutput>
    forgotPassword(email: string): Promise<void>
    login(email: string, password: string): Promise<AuthenticationResultType | boolean>
    signup(email: string, password: string, first_name: string, last_name: string): Promise<string | boolean>
    logout(): Promise<void>
    profile(): Promise<UserModel | boolean>
}

declare global {
    interface Window { Chargebee: any }
}

window.Chargebee = window.Chargebee || {}