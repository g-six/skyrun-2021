import { isValidLocale, Language, LanguageOption, languages } from 'components/LanguageSelector'
import getConfig from 'next/config'
import { Context, createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { useFetch } from 'utils/fetch-helper'
import { betterPathname } from 'utils/string-helper'
import { FetchMethods } from "utils/types"

export type Tier = {
    id: string
    name: string
}

export interface SkyContextProps {
    tiers: Tier[]
    lang: Language
    GOOGLE_API_KEY?: string
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
    const [locale] = betterPathname(location.pathname)
    const { GOOGLE_API_KEY } = getConfig().publicRuntimeConfig

    let initial_locale = languages[0].code
    if (isValidLocale(locale)) {
        const [x] = languages.filter((language: LanguageOption) => {
            return locale.toUpperCase() == language.text
        })
        if (x) initial_locale = x.code
    }
    const [lang, setLanguage] = useState(initial_locale)

    const {
        data,
     } = useFetch(
        '/v1/tiers',
        FetchMethods.GET,
        true,
        true,
    )

    function onLanguageChange(v: LanguageOption) {
        if (lang != v.code) {
            const { pathname, href, origin } = location
            if (pathname.substr(0, 3).toUpperCase() != v.text) {
                const current_lang_uri = href.substr(origin.length + 1, 2)
                if (lang == languages[0].code) {
                    location.href = `/${v.text.toLowerCase()}${pathname}`
                } else if (v.text.toLowerCase()) {
                    location.href = pathname.substr(3)
                } else {
                    location.href = `/${v.text.toLowerCase()}${pathname.substr(3)}`
                }
                // location.href = location.href.split(`/${lang}/`, 1).join(`/${v.code}/`)
            }
        }
        // setLanguage(v.code)
        // router.push(router.pathname, router.pathname, { locale: lang })
    }

    useEffect(() => {
        if (data.length && tiers.length == 0) {
            setTiers(data)
        }
    }, [data, tiers, GOOGLE_API_KEY, lang])

    return <SkyContext.Provider value={
        { ...ctx, tiers, GOOGLE_API_KEY, lang, onLanguageChange }
    }>
        {children}
    </SkyContext.Provider>
}

export default SkyContext
