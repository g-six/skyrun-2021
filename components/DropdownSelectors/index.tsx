import { Fragment, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { DropPosition, SelectorProps } from './common'
import SearchBox from 'components/SearchBox'
import { classNames } from 'utils/dom-helpers'

export function DropdownComponent(props: SelectorProps) {
    const [is_opened, openMenu] = useState(props.is_opened)

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button
                    className={
                        props.className ||
                        classNames(
                            'inline-flex justify-center items-center w-full',
                            'rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white',
                            'text-sm font-medium text-gray-700',
                            'hover:bg-gray-50 '
                        )
                    }
                    onClickCapture={() => {
                        openMenu(!is_opened)
                    }}
                >
                    {props.label || (
                        <>
                            <i
                                className="feather-filter text-lg mr-2"
                                aria-hidden="true"
                            />
                            <span>Filter</span>
                            <i
                                className="feather-chevron-down -mr-1 ml-2 h-5 w-5 text-primary-light"
                                aria-hidden="true"
                            />
                        </>
                    )}
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
                show={is_opened}
            >
                <Menu.Items
                    static
                    className={classNames(
                        props.position || DropPosition.TOP_LEFT,
                        'absolute mt-2 w-max',
                        'rounded-md shadow-lg bg-white',
                        'focus:outline-none'
                    )}
                    style={
                        props.style ? props.style : { minWidth: '588px' }
                    }
                >
                    <div
                        className={props.dropboxClassname || 'py-4 px-2'}
                        style={props.style ? {} : { minHeight: '280px' }}
                    >
                        {props.is_search_enabled ? (
                            <Menu.Item>
                                <SearchBox />
                            </Menu.Item>
                        ) : (
                            ''
                        )}

                        {props.items.map(
                            (
                                {
                                    label,
                                    options,
                                    input_component,
                                    selection,
                                    is_expanded,
                                    onClick,
                                    updateGroupSelection,
                                },
                                cat_idx
                            ) => {
                                return (
                                    <Menu.Item
                                        as="div"
                                        key={cat_idx}
                                        onClickCapture={() => {
                                            if (
                                                !options ||
                                                options.length == 0
                                            ) {
                                                onClick &&
                                                    (onClick as () => void)
                                            }
                                        }}
                                    >
                                        {options?.length &&
                                        options.length > 0 ? (
                                            <>
                                                <button
                                                    type="button"
                                                    onClick={
                                                        onClick as () => void
                                                    }
                                                    className="rounded-md border-gray-200 border font-medium font-sans px-3 py-2 mb-3 mt-5"
                                                >
                                                    <span className="mr-2">
                                                        {label}
                                                    </span>
                                                    <i
                                                        className={
                                                            is_expanded
                                                                ? 'feather-chevron-down'
                                                                : 'feather-chevron-up'
                                                        }
                                                    />
                                                </button>

                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 -translate-y-4"
                                                    enterTo="transform opacity-100 translate-y-0"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 translate-y-0"
                                                    leaveTo="transform opacity-0 -translate-y-4"
                                                    show={
                                                        is_expanded as boolean
                                                    }
                                                >
                                                    <div className="flex">
                                                        {options &&
                                                            (
                                                                options as Record<
                                                                    string,
                                                                    string
                                                                >[]
                                                            ).map(
                                                                (
                                                                    {
                                                                        label,
                                                                        value,
                                                                    }: Record<
                                                                        string,
                                                                        string
                                                                    >,
                                                                    idx
                                                                ) => {
                                                                    return (
                                                                        <label
                                                                            key={
                                                                                idx
                                                                            }
                                                                            htmlFor={`filter-${
                                                                                cat_idx +
                                                                                1
                                                                            }-${idx}`}
                                                                            className="flex min-w-0 items-center text-gray-500 h-full px-3 py-2"
                                                                        >
                                                                            <input
                                                                                id={`filter-${
                                                                                    cat_idx +
                                                                                    1
                                                                                }-${idx}`}
                                                                                name={`filter_${
                                                                                    cat_idx +
                                                                                    1
                                                                                }[]`}
                                                                                type="checkbox"
                                                                                value={
                                                                                    value
                                                                                }
                                                                                defaultChecked={
                                                                                    selection &&
                                                                                    (
                                                                                        selection as number[]
                                                                                    ).indexOf(
                                                                                        idx
                                                                                    ) >=
                                                                                        0
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) => {
                                                                                    if (
                                                                                        selection &&
                                                                                        updateGroupSelection
                                                                                    ) {
                                                                                        const selection_idx =
                                                                                            (
                                                                                                selection as number[]
                                                                                            ).indexOf(
                                                                                                idx
                                                                                            )
                                                                                        const selections =
                                                                                            selection as number[]
                                                                                        if (
                                                                                            selection_idx >=
                                                                                            0
                                                                                        ) {
                                                                                            selections.splice(
                                                                                                selection_idx,
                                                                                                1
                                                                                            )
                                                                                        } else {
                                                                                            selections.push(
                                                                                                idx
                                                                                            )
                                                                                        }
                                                                                        updateGroupSelection(
                                                                                            selections
                                                                                        )
                                                                                    }
                                                                                }}
                                                                                className="h-4 w-4 mr-2 border-gray-300 rounded text-primary focus:ring-primary-light"
                                                                            />
                                                                            {
                                                                                label
                                                                            }
                                                                        </label>
                                                                    )
                                                                }
                                                            )}
                                                    </div>
                                                </Transition>
                                            </>
                                        ) : (
                                            input_component || label
                                        )}
                                    </Menu.Item>
                                )
                            }
                        )}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

export default DropdownComponent
