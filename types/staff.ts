export type Staff = {
    id: string
    idx?: number
    hourly_rate: string
    monthly_rate: string
    overtime_rate: string
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
