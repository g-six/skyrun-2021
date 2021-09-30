import { CognitoErrorTypes } from 'services/CognitoErrorTypes'

export interface ModalHook {
    is_open: boolean
    open(): void
    close(): void
    attributes?: Record<string, string>
    setAttributes(attributes: Record<string, string>): void
}

export type SubmitError = {
    name: CognitoErrorTypes
    message: string
}