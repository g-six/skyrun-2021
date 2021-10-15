import { useRouter } from 'next/router'
import {
    DropDownList,
    DropDownListProps,
    ListItemProps,
} from '@progress/kendo-react-dropdowns'
import { cloneElement, ReactElement } from 'react'

export enum Language {
    EN = 'field_en_us',
    ZH = 'field_zh_cn',
}

export enum LanguageI18n {
    'en-US' = 'en-US',
    'zh-CN' = 'zh-CN'
}

export const i18n_options: Record<LanguageI18n, LanguageOption> = {
    'en-US': {
        code: Language.EN,
        text: 'EN',
        i18n: LanguageI18n['en-US'],
        icon: 'flag-icon flag-icon-us flag-icon-squared',
    },
    'zh-CN': {
        code: Language.ZH,
        text: 'ZH',
        i18n: LanguageI18n['zh-CN'],
        icon: 'flag-icon flag-icon-cn flag-icon-squared',
    }
}

export interface LanguageOption {
    text: string
    icon: string
    code: Language
    i18n: LanguageI18n
}

export const languages: LanguageOption[] = [
    {
        text: 'EN',
        code: Language.EN,
        i18n: LanguageI18n['en-US'],
        icon: 'flag-icon flag-icon-us flag-icon-squared',
    },
    {
        text: 'ZH',
        code: Language.ZH,
        i18n: LanguageI18n['zh-CN'],
        icon: 'flag-icon flag-icon-cn flag-icon-squared',
    },
]

export function renderLanguageOptions(
    li: ReactElement<HTMLLIElement>,
    item_props: ListItemProps
) {
    const index = item_props.index
    const children = (
        <div className="country-selector-item flex">
            <i className={languages[index].icon} />
            <span className="inline-block ml-2 leading-loose">
                {languages[index].text}
            </span>
        </div>
    )

    return cloneElement(li, li.props, children)
}

function renderSelectedLanguage(
    element: ReactElement<HTMLSpanElement>,
    value: LanguageOption
) {
    if (!value) return element
    const children = (
        <div className="flex leading-loose justify-center">
            <i className={value.icon} />
            <span className="self-center ml-2">{value.text}</span>
        </div>
    )

    return cloneElement(element, element.props, children)
}

export function LanguageSelector(props: DropDownListProps) {
    const { className } = props
    const { locale, locales } = useRouter()
    let default_locale = languages[0]
    if (locale) {
        default_locale = i18n_options[locale as LanguageI18n]
    }
    return (
        <DropDownList
            defaultItem={default_locale}
            itemRender={renderLanguageOptions}
            className={className || 'country-selector'}
            data={languages}
            textField="text"
            valueMap={(value) => value && value.i18n}
            valueRender={renderSelectedLanguage}
            {...props}
        />
    )
}

export default LanguageSelector
