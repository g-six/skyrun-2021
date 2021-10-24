import { Language } from 'components/LanguageSelector'

export type GeneralFormValues = {
    id?: string
    name: string
    street_1?: string
    street_2?: string
    zip?: string
    city?: string
    state?: string
    country: string
    phone: string
    language: Language
    timezone: string
    manager: string
    online: boolean
    notes?: string
}
