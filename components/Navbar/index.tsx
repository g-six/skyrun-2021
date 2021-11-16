import { Fragment, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import logout from 'services/logout'
import SkyContext, {
    SkyContextProps,
    useAppContext,
} from 'context/AppContext'
import { useAuth } from 'context/AuthContext'

import { DropDownListChangeEvent } from '@progress/kendo-react-dropdowns'
import LanguageSelector, { Language } from 'components/LanguageSelector'
import { betterPathname } from 'utils/string-helper'
import UserDropdown from './UserDropdown'
import Translation from 'components/Translation'

const navigation = [
    {
        id: 'menu_1',
        href: '/#features',
        label: 'features',
        current: false,
    },
    {
        id: 'menu_2',
        href: '/#pricing',
        label: 'pricing',
        current: false,
    },
    {
        id: 'menu_3',
        href: '/about-us',
        label: 'about_us',
        current: false,
    },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
    const { lang, onLanguageChange, translations } = useAppContext()
    const [mounted, setMounted] = useState(false)

    function handleLanguageChange(e: DropDownListChangeEvent) {
        onLanguageChange(e.value)
    }

    const [first_part] = betterPathname(location.pathname)
    let locale = '/en'

    if (
        first_part &&
        Object.keys(Language).indexOf(first_part.toUpperCase()) > 0
    ) {
        locale = `/${first_part.toLowerCase()}`
    }

    useEffect(() => {
        setMounted(true)
    }, [lang])
    // There is an existing bug with Disclosure that shows:
    // Warning: Expected server HTML to contain a matching <div> in <div>.
    // Try removing mounted checking below and see for yourself
    return (
        <SkyContext.Consumer>
            {(ctx: SkyContextProps) =>
                !mounted ? (
                    <></>
                ) : (
                    <>
                        <Disclosure
                            as="nav"
                            className="bg-white-800 circular"
                        >
                            {({ open }) => (
                                <>
                                    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                                        <div className="relative flex items-center justify-between h-16">
                                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                                {/* Mobile menu button*/}
                                                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                                    <span className="sr-only">
                                                        Open main menu
                                                    </span>
                                                    {open ? (
                                                        <XIcon
                                                            className="block h-6 w-6"
                                                            aria-hidden="true"
                                                        />
                                                    ) : (
                                                        <MenuIcon
                                                            className="block h-6 w-6"
                                                            aria-hidden="true"
                                                        />
                                                    )}
                                                </Disclosure.Button>
                                            </div>
                                            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                                                <div className="flex-shrink-0 flex items-center">
                                                    <div className="hidden lg:block h-12 w-auto">
                                                        <a
                                                            className="bg-contain app-logo-icon bg-left h-10 w-24 block cursor-pointer"
                                                            href={locale}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="hidden sm:block lg:flex items-center sm:ml-6">
                                                    <div className="space-x-4">
                                                        {navigation.map(
                                                            (item) => (
                                                                <a
                                                                    key={
                                                                        item.id
                                                                    }
                                                                    href={`${locale}${item.href}`}
                                                                    className={classNames(
                                                                        item.current
                                                                            ? 'bg-gray-900 text-white'
                                                                            : 'text-gray-800 hover:bg-gray-100 hover:text-black',
                                                                        'px-3 py-2 rounded-md text-sm'
                                                                    )}
                                                                    aria-current={
                                                                        item.current
                                                                            ? 'page'
                                                                            : undefined
                                                                    }
                                                                >
                                                                    <Translation
                                                                        content_key={
                                                                            item.label
                                                                        }
                                                                        translations={
                                                                            translations
                                                                        }
                                                                    />
                                                                </a>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-4">
                                                {/* Profile dropdown */}
                                                <UserDropdown
                                                    locale={locale}
                                                />

                                                <LanguageSelector
                                                    className="country-selector flex"
                                                    onChange={
                                                        handleLanguageChange
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <Disclosure.Panel className="sm:hidden">
                                        <div className="px-2 pt-2 pb-3 space-y-1">
                                            {navigation.map((item) => (
                                                <a
                                                    key={item.id}
                                                    href={item.href}
                                                    className={classNames(
                                                        item.current
                                                            ? 'bg-gray-900'
                                                            : 'hover:bg-gray-200 hover:text-black',
                                                        'block px-3 py-2 rounded-md text-base text-black'
                                                    )}
                                                    aria-current={
                                                        item.current
                                                            ? 'page'
                                                            : undefined
                                                    }
                                                >
                                                    <Translation
                                                        content_key={
                                                            item.label
                                                        }
                                                        translations={
                                                            translations
                                                        }
                                                    />
                                                </a>
                                            ))}
                                        </div>
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                    </>
                )
            }
        </SkyContext.Consumer>
    )
}
