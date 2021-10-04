import { Context, createContext } from 'react'

export type Tier = {
    id: string
    name: string
}

export interface SkyContextProps {
    tiers: Tier[]
    onlanguagechange: () => unknown
}

const ctx: SkyContextProps = {
    tiers: [],
    onlanguagechange: () => {},
}

const SkyContext: Context<any> = createContext(ctx)

export default SkyContext
