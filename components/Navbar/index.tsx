import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

const navigation = [
    {
        id: 'menu_1',
        href: '#',
        current: true,
    },
    {
        id: 'menu_2',
        href: '#',
        current: false,
    },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export enum NavigationItem {
    menu_1 = 'Industries',
    menu_2 = 'Features',
}
export interface Props {
    current?: NavigationItem
    nav_labels: Record<string, string>
}
export default function Navbar({ current, nav_labels }: Props) {
    return (
        <Disclosure as="nav" className="bg-white-800">
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
                                    <div className="hidden lg:block h-6 w-auto">
                                        <img
                                            src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                                            alt="Workflow"
                                            height="24"
                                            width="24"
                                        />
                                    </div>
                                    <div className="block lg:hidden h-8 w-auto">
                                        <img
                                            src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                                            alt="Workflow"
                                            layout="fill"
                                        />
                                    </div>
                                </div>
                                <div className="hidden sm:block sm:ml-6">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.id}
                                                href={item.href}
                                                className={classNames(
                                                    item.id == current
                                                        ? 'bg-gray-900 text-white'
                                                        : 'text-gray-800 hover:bg-gray-100 hover:text-black',
                                                    'px-3 py-2 rounded-md text-sm font-medium'
                                                )}
                                                aria-current={
                                                    item.id == current
                                                        ? 'page'
                                                        : undefined
                                                }
                                            >
                                                {nav_labels[item.id]}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <a
                                    href="/pricing"
                                    className={classNames(
                                        'text-gray-800 hover:bg-gray-100 hover:text-black',
                                        'px-3 py-2 rounded-md text-sm font-medium lg:mr-2'
                                    )}
                                >
                                    Pricing
                                </a>
                                <button className="button primary">
                                    <span>Start Free Trial</span>
                                </button>

                                {/* Profile dropdown */}
                                <Menu as="div" className="ml-3 relative">
                                    <div>
                                        <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                            <span className="sr-only">
                                                Open user menu
                                            </span>
                                            <img
                                                className="h-8 w-8 rounded-full"
                                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                alt=""
                                            />
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
                                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="#"
                                                        className={classNames(
                                                            active
                                                                ? 'bg-gray-700'
                                                                : '',
                                                            'block px-4 py-2 text-sm text-black'
                                                        )}
                                                    >
                                                        Your Profile
                                                    </a>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="#"
                                                        className={classNames(
                                                            active
                                                                ? 'bg-gray-700'
                                                                : '',
                                                            'block px-4 py-2 text-sm text-black'
                                                        )}
                                                    >
                                                        Settings
                                                    </a>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="#"
                                                        className={classNames(
                                                            active
                                                                ? 'bg-gray-700'
                                                                : '',
                                                            'block px-4 py-2 text-sm text-black'
                                                        )}
                                                    >
                                                        Sign out
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
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
                                        'block px-3 py-2 rounded-md text-base font-medium'
                                    )}
                                    aria-current={
                                        item.current ? 'page' : undefined
                                    }
                                >
                                    {nav_labels[item.id]}
                                </a>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}
