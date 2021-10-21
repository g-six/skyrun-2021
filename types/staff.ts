export type Staff = {
    id: string
    idx?: number
    user: {
        id: string
        email: string
        first_name: string
        last_name: string
        phone?: string
    }
}

export type StaffModalProps = {
    idx: number
    list: Staff[]
}

export type StaffCardActions = {
    archiveItem: (s: Staff) => void
}
