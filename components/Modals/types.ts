import { Tier } from 'context/AppContext'
import { CognitoErrorTypes } from 'services/CognitoErrorTypes'

export interface ModalHook {
    is_open: boolean
    open(): void
    close(): void
    attributes?: Record<
        string,
        number | boolean | string | Tier | Record<string, string | Record<string, string | number>>[]
    >
    setAttributes(
        attributes: Record<
            string,
            string | number | boolean | Tier | Record<string, string | Record<string, string | number>>[]
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
