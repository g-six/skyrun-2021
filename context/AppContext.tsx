import { Context, createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { i18n_options, Language, LanguageI18n, LanguageOption } from 'components/LanguageSelector'
import { FetchMethods, useFetch } from 'utils/fetch-helper'

export type Tier = {
    id: string
    name: string
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
    const router = useRouter()
    const initial_locale = router.locale as LanguageI18n
    const [lang, setLanguage] = useState(i18n_options[initial_locale])

    const {
        data,
     } = useFetch(
        '/v1/tiers',
        FetchMethods.GET,
        true,
        true,
    )

    function onLanguageChange(v: LanguageOption) {
        setLanguage(v)
        router.push(router.pathname, router.pathname, { locale: v.i18n })
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
