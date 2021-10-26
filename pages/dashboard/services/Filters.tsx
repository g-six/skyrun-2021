import { Fragment, ReactElement, ReactNode, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { classNames } from '@progress/kendo-react-common'
import { SelectorProps } from 'components/DropdownSelectors/common'
import SearchBox from 'components/SearchBox'

export function ServicesFilter(props: SelectorProps) {
    const [is_opened, openMenu] = useState(false)
    return (
        <Menu
            as="div"
            className={classNames(
                'relative inline-block text-left',
                props.className
            )}
        >
            <div>
                <Menu.Button
                    className={classNames(
                        'inline-flex justify-center items-center w-full',
                        'rounded-md border border-gray-150 shadow-sm px-4 py-2 bg-white',
                        'text-sm font-medium text-gray-700',
                        'hover:bg-gray-50 '
                    )}
                    onClickCapture={() => {
                        openMenu(!is_opened)
                    }}
                >
                    <i
                        className="feather-filter text-lg mr-2"
                        aria-hidden="true"
                    />
                    <span>Filter</span>
                    <i
                        className="feather-chevron-down -mr-1 ml-2 h-5 w-5 text-primary-light"
                        aria-hidden="true"
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
                show={is_opened}
            >
                <Menu.Items
                    static
                    className={classNames(
                        props.position,
                        'absolute mt-2 w-max px-3',
                        'rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5',
                        'focus:outline-none'
                    )}
                    style={{ minWidth: '588px' }}
                >
                    <div
                        className="py-4 px-2"
                        style={{ minHeight: '280px' }}
                    >
                        {props.is_search_enabled ? <Menu.Item>
                            <SearchBox />
                        </Menu.Item> : ''}
                        {
                            props.items.map(({ label, options, selection, is_expanded, onClick, updateGroupSelection }, cat_idx) => {
                                return <Menu.Item as="div" key={cat_idx}>
                                    <button
                                        type="button"
                                        onClick={onClick as () => void}
                                        className="rounded-md border-gray-200 border font-medium font-sans px-3 py-2 mb-3 mt-5"
                                    >
                                        <span className="mr-2">{label}</span>
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
                                        show={is_expanded as boolean}
                                    >
                                        <div className="flex">{
                                            options && (options as Record<string, string>[]).map(({ label, value }: Record<string, string>, idx) => {
                                                return <label
                                                    key={idx}
                                                    htmlFor={`filter-${cat_idx + 1}-${idx}`}
                                                    className="flex min-w-0 items-center text-gray-500 h-full px-3 py-2"
                                                >
                                                    <input
                                                        id={`filter-${cat_idx + 1}-${idx}`}
                                                        name={`filter_${cat_idx + 1}[]`}
                                                        type="checkbox"
                                                        value={value}
                                                        defaultChecked={
                                                            selection && (selection as number[]).indexOf(
                                                                idx
                                                            ) >= 0
                                                        }
                                                        onChange={(e) => {
                                                            if (selection && updateGroupSelection) {
                                                                const selection_idx = (selection as number[]).indexOf(idx)
                                                                const selections = selection as number[]
                                                                if (selection_idx >= 0) {
                                                                    selections.splice(selection_idx, 1)
                                                                } else {
                                                                    selections.push(idx)
                                                                }
                                                                updateGroupSelection(selections)
                                                            }
                                                        }}
                                                        className="h-4 w-4 mr-2 border-gray-300 rounded text-primary focus:ring-primary-light"
                                                    />
                                                    {label}
                                                </label>
                                            })
                                        }</div>
                                    </Transition>
                                </Menu.Item>
                            }
                            )
                        }
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

export default ServicesFilter
