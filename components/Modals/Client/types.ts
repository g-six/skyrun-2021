export type GeneralFormValues = {
    email: string
    notes: string
    phone: string
    first_name: string
    last_name: string
}
type UserRecord = {
    id?: string
    email: string
    first_name: string
    last_name: string
    phone?: string
    notes?: string
}

export type ClientItem = {
    id: string
    user: UserRecord
}
