import { Tier } from 'context/AppContext'
import { CognitoErrorTypes } from 'services/CognitoErrorTypes'

export interface ModalDataAttributes {
    [key: string]:
        | string
        | number
        | boolean
        | File
        | Tier
        | ModalDataAttributes
}
export interface ModalHook {
    is_open: boolean
    open(): void
    close(): void
    attributes?: ModalDataAttributes
    setAttributes(
        attributes: Record<
            string,
            | string
            | number
            | boolean
            | Tier
            | Record<string, string | Record<string, string | number>>[]
        >
    ): void
}

export type UserModel = {
    id?: string
    uuid?: string
    firstName: string
    lastName: string
    email: string
    phone?: string
}

export type SubmitError = {
    name: CognitoErrorTypes
    message: string
}
