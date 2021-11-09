import { Tier } from 'context/AppContext'
import { CognitoErrorTypes } from 'services/CognitoErrorTypes'

export interface ModalDataAttributes {
    [key: string]:
        | string
        | number
        | boolean
        | Date
        | File
        | Tier
        | ModalDataAttributes
        | ModalDataAttributes[]
}
export interface ModalHook {
    is_open: boolean
    open(): void
    close(): void
    attributes?: ModalDataAttributes
    setAttributes(attributes: ModalDataAttributes): void
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
