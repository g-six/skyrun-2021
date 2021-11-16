import { Menu, Transition } from '@headlessui/react'
import SignupButton from 'components/Buttons/SignupButton'
import Translation from 'components/Translation'
import { useAppContext } from 'context/AppContext'
import { useAuth } from 'context/AuthContext'
import Cookies from 'js-cookie'
import { Fragment, useState } from 'react'
import logout from 'services/logout'
import { classNames } from 'utils/dom-helpers'
import { isProdEnv } from 'utils/environment-helper'

interface Props {
    locale?: string
}
export function UserDropdown({ locale }: Props) {
    const { translations } = useAppContext()
    const { user, LoginModal } = useAuth()
    const [username, setUsername] = useState(Cookies.get('email'))

    async function killSession() {
        try {
            await logout()
            setUsername(Cookies.get('email'))
        } catch (e) {
            console.error(e)
        }
    }

    const handleLoginOnClick = () => {
        if (isProdEnv() === true) {
            window
                .open('https://aotplus.activehosted.com/f/5', '_blank')
                ?.focus()
        } else {
            LoginModal.open()
        }
    }

    return user?.first_name ? (
        <Menu as="div" className="ml-3 relative">
            <div>
                <Menu.Button className="bg-gray-800 items-center w-8 h-8 text-center justify-center p-1 flex v-center text-white text-md font-bold rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">Open user menu</span>
                    {user?.first_name[0]}
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
                <Menu.Items className="z-50 w-48 origin-top-right absolute right-0 mt-2 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                        {({ active }) => (
                            <a
                                href={`${locale}/dashboard`}
                                className={classNames(
                                    active ? 'bg-gray-200' : '',
                                    'block px-4 py-2 text-sm text-black'
                                )}
                            >
                                <Translation
                                    content_key="dashboard"
                                    translations={translations}
                                />
                            </a>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                            <a
                                href={`${locale}/dashboard/settings`}
                                className={classNames(
                                    active ? 'bg-gray-200' : '',
                                    'block px-4 py-2 text-sm text-black'
                                )}
                            >
                                <Translation
                                    content_key="settings"
                                    translations={translations}
                                />
                            </a>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                            <button
                                onClick={killSession}
                                className={classNames(
                                    active ? 'bg-gray-200' : '',
                                    'w-full text-left block px-4 py-2 text-sm text-black'
                                )}
                            >
                                <Translation
                                    content_key="sign_out"
                                    translations={translations}
                                />
                            </button>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
    ) : (
        <>
            <button
                type="button"
                className="font-display text-black"
                onClick={() => handleLoginOnClick()}
            >
                <Translation
                    content_key="login"
                    translations={translations}
                />
            </button>

            <SignupButton
                className="button primary inline-block px-5 p-2"
                translations={translations}
            />
        </>
    )
}

export default UserDropdown
