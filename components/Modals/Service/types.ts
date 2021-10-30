export type CategoryItem = {
    text: string
    disabled?: boolean
    value?: string
}

export enum ServiceType {
    APPOINTMENT = 'Appointment',
    GROUP_CLASS = 'Group Class',
    SERIES = 'Series',
}
