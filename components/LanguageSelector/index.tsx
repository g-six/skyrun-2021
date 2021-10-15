import { useRouter } from 'next/router'
import {
    DropDownList,
    DropDownListProps,
    ListItemProps,
} from '@progress/kendo-react-dropdowns'
import { cloneElement, ReactElement } from 'react'
import { betterPathname } from 'utils/string-helper'
import { classNames } from 'utils/dom-helpers'

export enum Language {
    EN = 'field_en_us',
    ZH = 'field_zh_cn',
}

export interface LanguageOption {
    text: string
    icon: string
    code: Language
}

export const languages: LanguageOption[] = [
    {
        text: 'EN',
        code: Language.EN,
        icon: 'flag-icon flag-icon-us flag-icon-squared',
    },
    {
        text: 'ZH',
        code: Language.ZH,
        icon: 'flag-icon flag-icon-cn flag-icon-squared',
    },
]

export function renderLanguageOptions(
    li: ReactElement<HTMLLIElement>,
    item_props: ListItemProps
) {
    const index = item_props.index
    const children = (
        <div className="flex leading-loose justify-center">
            <i
                className={classNames(
                    'rounded-full w-8 h-8',
                    languages[index].icon
                )}
            />
            <span className="self-center ml-2">
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

export function isValidLocale(locale: string = '') {
    return Object.keys(Language).includes(locale.toUpperCase())
}

export function LanguageSelector(props: DropDownListProps) {
    const { className } = props
    const { push } = useRouter()
    let default_locale = languages[0]
    const [locale] = betterPathname(location.pathname)
    if (locale && isValidLocale(locale)) {
        default_locale = languages.filter((l: LanguageOption) => {
            return l.text.toLowerCase() == locale
        })[0]
    }
    return (
        <DropDownList
            defaultItem={default_locale}
            itemRender={renderLanguageOptions}
            className={className || 'country-selector'}
            data={languages}
            textField="text"
            valueMap={(value) => value && value.code}
            valueRender={renderSelectedLanguage}
            {...props}
        />
    )
}

export default LanguageSelector
