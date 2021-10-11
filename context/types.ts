import { AuthenticationResultType, ConfirmForgotPasswordCommandOutput, SignUpCommandOutput } from '@aws-sdk/client-cognito-identity-provider'
import { ModalHook } from 'components/Modals/types'
import { UserModel } from 'services/profile'

type Tier = {
    id: string
    name: string
}

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

export interface TenantInfo {
    id: string
    business_name: string
    tier: Tier
}

export type AuthContextType = {
    user?: SkyUser
    tenant?: TenantInfo
    LoginModal: ModalHook
    SignupModal: ModalHook
    CreateClientModal: ModalHook
    CreateStaffModal: ModalHook
    confirmForgotPassword(email: string, new_password: string, code: string): Promise<ConfirmForgotPasswordCommandOutput>
    forgotPassword(email: string): Promise<void>
    login(email: string, password: string): Promise<AuthenticationResultType | boolean>
    signup(email: string, password: string, first_name: string, last_name: string): Promise<SignUpCommandOutput | boolean>
    logout(): Promise<void>
    profile(): Promise<UserModel | boolean>
}

export type AppContextType = {
    tiers: Tier[]
}

declare global {
    interface Window { Chargebee: any }
}

window.Chargebee = window.Chargebee || {}