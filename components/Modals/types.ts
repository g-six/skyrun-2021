import { CognitoErrorTypes } from 'services/CognitoErrorTypes'

export interface ModalHook {
    is_open: boolean
    open(): void
    close(): void
}

export type SubmitError = {
    name: CognitoErrorTypes
    message: string
}