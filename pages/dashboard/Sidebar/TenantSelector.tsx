import React, { Fragment, MouseEventHandler, MouseEvent } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { classNames } from 'utils/dom-helpers'
import { TenantInfo } from 'context/types'
import { useAuth } from 'context/AuthContext'

interface TenantSelectorProps {
    tenant?: TenantInfo
    tenants?: TenantInfo[]
}

export function TenantSelector({ tenant, tenants }: TenantSelectorProps) {
    const { setTenant } = useAuth()

    function switchTenant(e: MouseEvent<HTMLButtonElement>) {
        if (tenants) {
            setTenant(tenants[e.currentTarget.value as unknown as number])
        }
    }

    return (
        <div className="flex gap-4">
            <div className="rounded-md bg-primary-light h-10 w-10 inline-block" />
            <Menu
                as="div"
                className="relative inline-block text-left w-32 z-20"
            >
                <div className="w-full">
                    <Menu.Button className="w-full inline-flex justify-between bg-white text-sm font-medium text-gray-700 hover:text-primary focus:outline-none focus:text-primary-dark">
                        {tenant?.business_name}
                        <ChevronDownIcon
                            className="-mr-1 ml-2 h-5 w-5"
                            aria-hidden="true"
                        />
                    </Menu.Button>
                    <span className="text-sm text-gray-300">
                        Business category
                    </span>
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
                    <Menu.Items className="origin-top-right absolute right-0 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            {tenants?.map((t: TenantInfo, idx: number) => {
                                return (
                                    <Menu.Item key={t.id}>
                                        {({ active }) => (
                                            <button
                                                onClick={switchTenant}
                                                value={idx}
                                                className={classNames(
                                                    active
                                                        ? 'bg-gray-100 text-gray-900'
                                                        : 'text-gray-700',
                                                    'block px-4 py-2 text-sm w-full text-left'
                                                )}
                                            >
                                                {t.business_name}
                                            </button>
                                        )}
                                    </Menu.Item>
                                )
                            })}

                            <form method="POST" action="#">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            type="submit"
                                            className={classNames(
                                                active
                                                    ? 'bg-gray-100 text-gray-900'
                                                    : 'text-gray-700',
                                                'block w-full text-left px-4 py-2 text-sm'
                                            )}
                                        >
                                            Sign out
                                        </button>
                                    )}
                                </Menu.Item>
                            </form>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}
export default TenantSelector
