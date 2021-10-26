import { Fragment, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import logout from 'services/logout'
import LoginButton from 'components/Buttons/LoginButton'
import SkyContext, {
    SkyContextProps,
    useAppContext,
} from 'context/AppContext'
import { useAuth } from 'context/AuthContext'
import SignupButton from 'components/Buttons/SignupButton'
import { DropDownListChangeEvent } from '@progress/kendo-react-dropdowns'
import LanguageSelector, { Language } from 'components/LanguageSelector'
import { betterPathname } from 'utils/string-helper'

const navigation = [
    {
        id: 'menu_1',
        href: '/#features',
        label: 'Features',
        current: false,
    },
    {
        id: 'menu_2',
        href: '/#pricing',
        label: 'Pricing',
        current: false,
    },
    {
        id: 'menu_3',
        href: '/about-us',
        label: 'About Us',
        current: false,
    },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
    const { user } = useAuth()
    const { lang, onLanguageChange } = useAppContext()
    const [mounted, setMounted] = useState(false)
    const [username, setUsername] = useState(Cookies.get('email'))

    async function killSession() {
        try {
            await logout()
            setUsername(Cookies.get('email'))
        } catch (e) {
            console.error(e)
        }
    }

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
                                                                    {
                                                                        item.label
                                                                    }
                                                                </a>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-4">
                                                {/* Profile dropdown */}
                                                {user?.first_name ? (
                                                    <Menu
                                                        as="div"
                                                        className="ml-3 relative"
                                                    >
                                                        <div>
                                                            <Menu.Button className="bg-gray-800 w-8 h-8 text-center justify-center p-1 flex v-center text-white text-md font-bold rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                                                <span className="sr-only">
                                                                    Open
                                                                    user
                                                                    menu
                                                                </span>
                                                                {
                                                                    user
                                                                        ?.first_name[0]
                                                                }
                                                            </Menu.Button>
                                                        </div>
                                                        <Transition
                                                            as={Fragment}
                                                            enter="transition ease-out duration-100"
                                                            enterFrom="transform opacity-0 scale-95"
                                                            enterTo="transform opacity-100 scale-100"
                                                            leave="transition ease-in duration-75"
                                                            leaveFrom="transform opacity-100 scale-100"
                                                            leaveTo="transform opacity-0 scale-95"
                                                        >
                                                            <Menu.Items className="z-50 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                                <Menu.Item>
                                                                    {({
                                                                        active,
                                                                    }) => (
                                                                        <a
                                                                            href={`${locale}/dashboard`}
                                                                            className={classNames(
                                                                                active
                                                                                    ? 'bg-gray-200'
                                                                                    : '',
                                                                                'block px-4 py-2 text-sm text-black'
                                                                            )}
                                                                        >
                                                                            Your
                                                                            Profile
                                                                        </a>
                                                                    )}
                                                                </Menu.Item>
                                                                <Menu.Item>
                                                                    {({
                                                                        active,
                                                                    }) => (
                                                                        <a
                                                                            href={`${locale}/dashboard/settings`}
                                                                            className={classNames(
                                                                                active
                                                                                    ? 'bg-gray-200'
                                                                                    : '',
                                                                                'block px-4 py-2 text-sm text-black'
                                                                            )}
                                                                        >
                                                                            Settings
                                                                        </a>
                                                                    )}
                                                                </Menu.Item>
                                                                <Menu.Item>
                                                                    {({
                                                                        active,
                                                                    }) => (
                                                                        <button
                                                                            onClick={
                                                                                killSession
                                                                            }
                                                                            className={classNames(
                                                                                active
                                                                                    ? 'bg-gray-200'
                                                                                    : '',
                                                                                'w-full text-left block px-4 py-2 text-sm text-black'
                                                                            )}
                                                                        >
                                                                            Sign
                                                                            out
                                                                        </button>
                                                                    )}
                                                                </Menu.Item>
                                                            </Menu.Items>
                                                        </Transition>
                                                    </Menu>
                                                ) : (
                                                    <>
                                                        <LoginButton />
                                                        <SignupButton className="button primary inline-block px-5 p-2" />
                                                    </>
                                                )}

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
                                                            ? 'bg-gray-900 text-black'
                                                            : 'text-gray-100 hover:bg-gray-200 hover:text-black',
                                                        'block px-3 py-2 rounded-md text-base'
                                                    )}
                                                    aria-current={
                                                        item.current
                                                            ? 'page'
                                                            : undefined
                                                    }
                                                >
                                                    {item.label}
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
