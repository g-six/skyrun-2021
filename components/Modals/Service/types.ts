export type CategoryItem = {
    text: string
    disabled?: boolean
    value?: string
}

export type FormErrors = {
    name?: string
    category?: string
    duration?: string
    max_participants?: string
    price?: string
    primary_color?: string
    service_type?: string
}
