import React, { Dispatch, Fragment, SetStateAction, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { classNames } from 'utils/dom-helpers'
import { withClass } from 'components/types'
import { sortBy } from 'utils/array-helper'

export interface SelectProps {
    id: string
    onChange: (t: Record<string, string>) => void
    data: Record<string, string>[]
    error?: string
}

function StaffSelector(props: SelectProps & withClass) {
    const [selected, setSelected] = useState<Record<string, string>>()
    function handleChange(value: Record<string, string>) {
        props.onChange(value)
        setSelected(value)
    }

    function renderSelectedText() {
        return selected
            ? [selected.first_name, selected.last_name].join(' ')
            : ''
    }

    return (
        <Listbox value={selected} onChange={handleChange}>
            <div className="mt-1 relative">
                <Listbox.Button
                    className={classNames(
                        props.error
                            ? 'bg-red-100 border-red-300'
                            : 'bg-white border-gray-300',
                        'relative w-full border rounded-md shadow-sm pl-3 pr-10 py-3 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-primary-light focus:border-primary-light sm:text-base'
                    )}
                    role="button"
                >
                    <span className="flex items-center">
                        <span className="ml-3 block truncate h-6">
                            {renderSelectedText()}
                        </span>
                    </span>
                    <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <SelectorIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                    </span>
                </Listbox.Button>

                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-2xl max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                        {props.data.sort(sortBy('name')).map((st) => (
                            <Listbox.Option
                                key={st.id}
                                className={({ active }) =>
                                    classNames(
                                        active
                                            ? 'text-white bg-primary'
                                            : 'text-gray-900',
                                        'cursor-default select-none relative py-2 pl-3 pr-9'
                                    )
                                }
                                value={st}
                            >
                                {({ selected, active }) => (
                                    <>
                                        <div className="flex items-center">
                                            <span
                                                className={classNames(
                                                    selected
                                                        ? 'font-semibold'
                                                        : 'font-normal',
                                                    'ml-3 block truncate'
                                                )}
                                            >
                                                {st.first_name}{' '}
                                                {st.last_name}
                                            </span>
                                        </div>

                                        {selected ? (
                                            <span
                                                className={classNames(
                                                    active
                                                        ? 'text-white'
                                                        : 'text-primary',
                                                    'absolute inset-y-0 right-0 flex items-center pr-4'
                                                )}
                                            >
                                                <CheckIcon
                                                    className="h-5 w-5"
                                                    aria-hidden="true"
                                                />
                                            </span>
                                        ) : null}
                                    </>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </div>
        </Listbox>
    )
}

export default StaffSelector
