import {
    DropDownList,
    DropDownListProps,
    ListItemProps,
} from '@progress/kendo-react-dropdowns'
import {
    cloneElement,
    Dispatch,
    ReactElement,
    SetStateAction,
    useState,
} from 'react'
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
    setOpen: Dispatch<SetStateAction<boolean>>
) {
    return (li: ReactElement<HTMLLIElement>, item_props: ListItemProps) => {
        const index = item_props.index
        const [first_segment] = betterPathname(location.pathname)
        function onHover() {
            setOpen(true)
        }

        function onLeave() {
            setOpen(false)
        }

        const children = (
            <div
                className={classNames(
                    isValidLocale(first_segment) &&
                        languages[index].text.toLocaleLowerCase() ==
                            first_segment
                        ? 'is-selected'
                        : '',
                    'flex rounded-full leading-loose justify-center'
                )}
                onMouseEnter={onHover}
                onMouseLeave={onLeave}
            >
                <i
                    className={classNames(
                        isValidLocale(first_segment) &&
                            languages[index].text.toLocaleLowerCase() ==
                                first_segment
                            ? 'shadow-2xl opacity-90'
                            : 'opacity-40',
                        'rounded-full w-10 h-10 my-1 hover:opacity-100',
                        languages[index].icon
                    )}
                />
            </div>
        )

        return cloneElement(li, li.props, children)
    }
}

function renderSelectedLanguage(
    openMenu: () => void,
    closeMenu: () => void
) {
    return (
        element: ReactElement<HTMLSpanElement>,
        value: LanguageOption
    ) => {
        if (!value) return element

        const children = (
            <div
                className="flex leading-loose justify-center"
                onMouseEnter={openMenu}
                onMouseLeave={closeMenu}
            >
                <i className={value.icon} />
            </div>
        )

        return cloneElement(element, element.props, children)
    }
}

export function isValidLocale(locale: string = '') {
    return Object.keys(Language).includes(locale.toUpperCase())
}

export function LanguageSelector(props: DropDownListProps) {
    const { className } = props
    let default_locale = languages[0]
    const [locale] = betterPathname(location.pathname)
    const [opened, setOpen] = useState(false)
    const [child_hovered, setChildHovered] = useState(false)
    if (locale && isValidLocale(locale)) {
        default_locale = languages.filter((l: LanguageOption) => {
            return l.text.toLowerCase() == locale
        })[0]
    }

    function openMenu() {
        setOpen(true)
    }

    function closeMenu() {
        setOpen(false)
    }

    return (
        <DropDownList
            defaultItem={default_locale}
            itemRender={renderLanguageOptions(setChildHovered)}
            className={
                className || 'country-selector bg-transparent shadow-none'
            }
            popupSettings={{
                className:
                    'bg-transparent country-selector w-12 p-0 shadow-none',
            }}
            data={languages}
            textField="text"
            valueMap={(value) => value && value.code}
            valueRender={renderSelectedLanguage(openMenu, closeMenu)}
            {...props}
            opened={opened || child_hovered}
        />
    )
}

export default LanguageSelector
