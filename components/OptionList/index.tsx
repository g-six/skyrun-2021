import React, { Fragment, useState, useEffect, ReactNode } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { classNames } from 'utils/dom-helpers'
import { withClass } from 'components/types'
export enum ListFlyFrom {
    BOTTOM_RIGHT = 'origin-bottom-right bottom-14 right-0',
    TOP_LEFT = 'origin-top-left left-0',
    TOP_RIGHT = 'origin-top-right right-0',
}
export type OptionListItem = {
    text: string
    value?: string | number
}
export interface OptionListProps {
    id: string
    defaultValue?: string
    position?: ListFlyFrom
    onChange: (t: OptionListItem) => void
    options: OptionListItem[]
    error?: string
    children?: ReactNode
    static?: boolean
}

function OptionList(props: OptionListProps & withClass) {
    const [selected, setSelected] = useState<OptionListItem>()
    const { children } = props

    function handleChange(v: OptionListItem) {
        props.onChange(v)
        setSelected(v)
    }

    useEffect(() => {
        if (
            !selected?.value &&
            props.defaultValue &&
            selected?.value != props.defaultValue
        ) {
            const [selected_items] = props.options.filter(
                (c: OptionListItem) => {
                    return props.defaultValue == c.value
                }
            )
            setSelected(selected_items)
        }
    }, [props.defaultValue, selected])

    return (
        <div className="flex flex-col">
            <Listbox value={selected} onChange={handleChange}>
                {({ open }) => (
                    <div className="relative">
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
                                    {selected?.text}
                                </span>
                            </span>
                            <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <SelectorIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            </span>
                        </Listbox.Button>

                        {open && (
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options
                                    className={classNames(
                                        props.position ||
                                            ListFlyFrom.TOP_LEFT,
                                        props.className || '',
                                        'absolute z-10 mt-1 w-full bg-white shadow-2xl max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'
                                    )}
                                    static={props.static}
                                >
                                    {props.options.map((item) => (
                                        <Listbox.Option
                                            key={item.text}
                                            className={({ active }) =>
                                                classNames(
                                                    active
                                                        ? 'text-white bg-primary'
                                                        : 'text-gray-900',
                                                    'cursor-default select-none relative py-2 pl-3 pr-9'
                                                )
                                            }
                                            value={item}
                                        >
                                            {({ selected, active }) => (
                                                <>
                                                    <div className="flex items-center">
                                                        <span
                                                            className={classNames(
                                                                selected
                                                                    ? 'font-semibold'
                                                                    : 'font-normal',
                                                                'ml-3 block truncate text-base'
                                                            )}
                                                        >
                                                            {item.text}
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
                        )}
                    </div>
                )}
            </Listbox>
            <Transition
                as={Fragment}
                show={false}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="absolute">{children}</div>
            </Transition>
        </div>
    )
}

export default OptionList
