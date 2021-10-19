import { Tier } from 'context/AppContext'
import { CognitoErrorTypes } from 'services/CognitoErrorTypes'

export interface ModalHook {
    is_open: boolean
    open(): void
    close(): void
    attributes?: Record<
        string,
        number | string | Tier | Record<string, string | number>[]
    >
    setAttributes(
        attributes: Record<
            string,
            string | number | Tier | Record<string, string | number>[]
        >
    ): void
}

export type UserModel = {
    id?: string
    firstName: string
    lastName: string
    email: string
    phone?: string
}

export type SubmitError = {
    name: CognitoErrorTypes
    message: string
}
