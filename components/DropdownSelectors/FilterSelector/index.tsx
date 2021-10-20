import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { classNames } from '@progress/kendo-react-common'
import { DropPosition, SelectorProps } from '../common'
import SearchBox from 'components/SearchBox'

export function FilterSelector(props: SelectorProps) {
    const [is_opened, openMenu] = useState(false)
    const [is_membership_filter_opened, toggleMembershipFilter] =
        useState(true)
    const [is_availability_opened, toggleAvailabilityFilter] =
        useState(true)
    const [membership_status, setMembershipStatusFilter] = useState<
        number[]
    >([])
    const [availability, setAvailabilityFilter] = useState<number[]>([])

    function handleAvailabilityStatusFilter(
        idx: number,
        is_selected: boolean
    ) {
        const selection_idx = availability.indexOf(idx)
        const selections = availability
        if (selection_idx >= 0) {
            selections.splice(selection_idx, 1)
        } else {
            selections.push(idx)
        }
        setAvailabilityFilter(selections)
    }

    function handleMembershipStatusFilter(
        idx: number,
        is_selected: boolean
    ) {
        const selection_idx = membership_status.indexOf(idx)
        const selections = membership_status
        if (selection_idx >= 0) {
            selections.splice(selection_idx, 1)
        } else {
            selections.push(idx)
        }
        setMembershipStatusFilter(selections)
    }

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
                    <i className="feather-filter text-lg mr-2" />
                    <span>Filter</span>
                    <ChevronDownIcon
                        className="-mr-1 ml-2 h-5 w-5 text-primary-light"
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
                >
                    <div
                        className="py-4 px-2"
                        style={{ minHeight: '280px' }}
                    >
                        <Menu.Item>
                            <SearchBox />
                        </Menu.Item>
                        <Menu.Item as="div">
                            <button
                                type="button"
                                onClick={() => {
                                    toggleMembershipFilter(
                                        !is_membership_filter_opened
                                    )
                                }}
                                className="rounded-md border-gray-200 border font-medium font-sans px-3 py-2 mb-3 mt-5"
                            >
                                <span className="mr-2">Memberships</span>
                                <i
                                    className={
                                        is_membership_filter_opened
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
                                show={is_membership_filter_opened}
                            >
                                <div className="flex">
                                    <label
                                        htmlFor="filter-membership-current"
                                        className="flex min-w-0 items-center text-gray-500 h-full px-3 py-2"
                                    >
                                        <input
                                            id="filter-membership-current"
                                            name="filter_membership[]"
                                            type="checkbox"
                                            value="current"
                                            defaultChecked={
                                                membership_status.indexOf(
                                                    0
                                                ) >= 0
                                            }
                                            onChange={(e) => {
                                                handleMembershipStatusFilter(
                                                    0,
                                                    e.target.checked
                                                )
                                            }}
                                            className="h-4 w-4 mr-2 border-gray-300 rounded text-primary focus:ring-primary-light"
                                        />
                                        Current member
                                    </label>

                                    <label
                                        htmlFor="filter-membership-lapsed"
                                        className="flex min-w-0 items-center text-gray-500 h-full px-3 py-2"
                                    >
                                        <input
                                            id="filter-membership-lapsed"
                                            name="filter_membership[]"
                                            type="checkbox"
                                            value="lapsed"
                                            defaultChecked={
                                                membership_status.indexOf(
                                                    1
                                                ) >= 0
                                            }
                                            onChange={(e) => {
                                                handleMembershipStatusFilter(
                                                    1,
                                                    e.target.checked
                                                )
                                            }}
                                            className="h-4 w-4 mr-2 border-gray-300 rounded text-primary focus:ring-primary-light"
                                        />
                                        Lapsed member
                                    </label>

                                    <label
                                        htmlFor="filter-membership-non-member"
                                        className="flex min-w-0 items-center text-gray-500 h-full px-3 py-2"
                                    >
                                        <input
                                            id="filter-membership-non-member"
                                            name="filter_membership[]"
                                            type="checkbox"
                                            value="non-member"
                                            defaultChecked={
                                                membership_status.indexOf(
                                                    2
                                                ) >= 0
                                            }
                                            onChange={(e) => {
                                                handleMembershipStatusFilter(
                                                    2,
                                                    e.target.checked
                                                )
                                            }}
                                            className="h-4 w-4 mr-2 border-gray-300 rounded text-primary focus:ring-primary-light"
                                        />
                                        Non-member
                                    </label>
                                </div>
                            </Transition>
                        </Menu.Item>

                        <Menu.Item as="div">
                            <button
                                type="button"
                                onClick={() => {
                                    toggleAvailabilityFilter(
                                        !is_availability_opened
                                    )
                                }}
                                className="rounded-md border-gray-200 border font-medium font-sans px-3 py-2 mb-3 mt-5"
                            >
                                <span className="mr-2">
                                    Upcoming Appointments
                                </span>
                                <i
                                    className={
                                        is_availability_opened
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
                                show={is_availability_opened}
                            >
                                <div className="flex">
                                    <label
                                        htmlFor="filter-availability-today"
                                        className="flex min-w-0 items-center text-gray-500 h-full px-3 py-2"
                                    >
                                        <input
                                            id="filter-availability-today"
                                            name="filter_availability[]"
                                            type="checkbox"
                                            value="today"
                                            defaultChecked={
                                                availability.indexOf(0) >= 0
                                            }
                                            onChange={(e) => {
                                                handleAvailabilityStatusFilter(
                                                    0,
                                                    e.target.checked
                                                )
                                            }}
                                            className="h-4 w-4 mr-2 border-gray-300 rounded text-primary focus:ring-primary-light"
                                        />
                                        Today
                                    </label>

                                    <label
                                        htmlFor="filter-availability-dg"
                                        className="flex min-w-0 items-center text-gray-500 h-full px-3 py-2"
                                    >
                                        <input
                                            id="filter-availability-dg"
                                            name="filter_availability[]"
                                            type="checkbox"
                                            value="dg"
                                            defaultChecked={
                                                availability.indexOf(1) >= 0
                                            }
                                            onChange={(e) => {
                                                handleAvailabilityStatusFilter(
                                                    1,
                                                    e.target.checked
                                                )
                                            }}
                                            className="h-4 w-4 mr-2 border-gray-300 rounded text-primary focus:ring-primary-light"
                                        />
                                        Dhoby Ghaut
                                    </label>

                                    <label
                                        htmlFor="filter-availability-coming-week"
                                        className="flex min-w-0 items-center text-gray-500 h-full px-3 py-2"
                                    >
                                        <input
                                            id="filter-availability-coming-week"
                                            name="filter_availability[]"
                                            type="checkbox"
                                            value="Coming week"
                                            defaultChecked={
                                                availability.indexOf(2) >= 0
                                            }
                                            onChange={(e) => {
                                                handleAvailabilityStatusFilter(
                                                    2,
                                                    e.target.checked
                                                )
                                            }}
                                            className="h-4 w-4 mr-2 border-gray-300 rounded text-primary focus:ring-primary-light"
                                        />
                                        Coming Week
                                    </label>
                                </div>
                            </Transition>
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

export default FilterSelector
