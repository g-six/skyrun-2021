import React, { useState, useEffect, ReactNode } from 'react'
import { Listbox } from '@headlessui/react'
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
    button_classnames?: string
    defaultValue?: string
    position?: ListFlyFrom
    onChange: (t: OptionListItem) => void
    onActivate?: () => void
    options: OptionListItem[]
    error?: string
    children?: ReactNode
    static?: boolean
    listboxCss?: string
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
            props.defaultValue &&
            (selected?.value != props.defaultValue || !selected?.value)
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
        <div className="flex flex-col relative">
            <Listbox value={selected} onChange={handleChange}>
                {({ open }) => (
                    <div
                        className={classNames(
                            'absolute w-full',
                            props.listboxCss || 'h-72'
                        )}
                    >
                        <Listbox.Button
                            className={classNames(
                                props.error
                                    ? 'bg-red-100 border-red-300'
                                    : 'bg-white border-gray-300',
                                props.button_classnames || '',
                                'relative w-full border rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-primary-light focus:border-primary-light sm:text-base'
                            )}
                            role="button"
                            onClickCapture={props.onActivate}
                        >
                            <span className="flex items-center">
                                <span className="block truncate h-6">
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

                        {(props.static || open) && (
                            <div
                                className={classNames(
                                    'relative ring-1 bg-white shadow-2xl rounded-md ring-black ring-opacity-5 focus:outline-none overflow-hidden',
                                    props.listboxCss || 'h-56'
                                )}
                            >
                                <Listbox.Options
                                    className={classNames(
                                        props.position ||
                                            ListFlyFrom.TOP_LEFT,
                                        props.className || '',
                                        'mt-1 w-full py-1 sm:text-sm',
                                        props.listboxCss || 'h-40'
                                    )}
                                    static={props.static}
                                >
                                    {props.options.map((item) => (
                                        <Listbox.Option
                                            key={item.value}
                                            className={({ active }) =>
                                                classNames(
                                                    active
                                                        ? 'text-white bg-primary'
                                                        : 'text-gray-900',
                                                    'hover:bg-primary-lighter hover:text-primary cursor-default select-none relative py-2 pl-3 pr-9'
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
                                                                'block truncate'
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
                                <div className="absolute w-full z-10">
                                    {children}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </Listbox>
        </div>
    )
}

export default OptionList
