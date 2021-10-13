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
        <div className="flex leading-loose">
            <i className={value.icon} />
            <span className="inline-block ml-2">{value.text}</span>
        </div>
    )

    return cloneElement(element, element.props, children)
}

export function LanguageSelector(props: DropDownListProps) {
    const { className } = props
    return (
        <DropDownList
            defaultItem={languages[0]}
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
