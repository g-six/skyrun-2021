import { Context, createContext } from 'react'

export interface SkyContextProps {
    first_name: string
    last_name: string
    uuid: string
    email: string
    locale_id: string
    onlanguagechange: () => unknown
}

const ctx: SkyContextProps = {
    first_name: '',
    last_name: '',
    uuid: '',
    email: '',
    locale_id: '',
    onlanguagechange: () => {},
}

const SkyContext: Context<any> = createContext(ctx)

export default SkyContext
