import { Context, createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { FetchMethods, useFetch } from 'utils/fetch-helper'

export type Tier = {
    id: string
    name: string
}

export enum Language {
    EN = 'field_en_us',
    ZH = 'field_zh_cn',
}
export interface SkyContextProps {
    tiers: Tier[]
    lang: Language
    onLanguageChange(v: unknown): unknown
}

const ctx: SkyContextProps = {
    lang: Language.EN,
    tiers: [],
    onLanguageChange: (v: Language) => {
        ctx.lang = v
    },
}

const SkyContext: Context<any> = createContext(ctx)

type Props= {
    children: ReactNode
}

export function useAppContext() {
    return useContext(SkyContext)
}

export function SkyAppDataProvider({ children }: Props) {
    const [tiers, setTiers] = useState([] as Tier[])
    const [lang, setLanguage] = useState(Language.EN)

    const {
        is_loading,
        data,
     } = useFetch(
        '/v1/tiers',
        FetchMethods.GET,
        true,
        true,
    )

    function onLanguageChange(v: Language) {
        setLanguage(v)
    }

    useEffect(() => {
        if (data.length && tiers.length == 0) {
            setTiers(data)
        }
    }, [data, tiers, lang])

    return <SkyContext.Provider value={
        { ...ctx, tiers, lang, onLanguageChange }
    }>
        {children}
    </SkyContext.Provider>
}

export default SkyContext
