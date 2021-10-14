import { Language } from 'components/LanguageSelector'

export type GeneralFormValues = {
    name: string
    street_1: string
    street_2?: string
    country: string
    phone: string
    language: Language
    timezone: string
    manager: string
    online: boolean
    notes?: string
}
