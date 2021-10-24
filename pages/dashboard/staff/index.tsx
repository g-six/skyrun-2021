import StaffModal from 'components/Modals/Staff'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { classNames } from 'utils/dom-helpers'
import Dashboard from '..'
import Card from './card'
import {
    deleteApiRequest,
    FetchMethods,
    useFetch,
} from 'utils/fetch-helper'
import { useAuth } from 'context/AuthContext'
import { Staff } from 'types/staff'
import DataTable from 'components/DataTable'
import { ViewMode } from 'types'

function SearchInputGroup({ selected_idx = 0 }) {
    return (
        <div className="relative rounded-md shadow-sm mx-4 divide-x divide-gray-200">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <span className="feather feather-search text-gray-500 text-lg" />
            </div>
            <input
                type="text"
                name="keyword"
                id="keyword"
                className={classNames(
                    'focus:ring-primary-dark focus:border-primary-dark rounded-md',
                    'block w-full py-2 pl-12 pr-28',
                    'border-gray-300 text-gray-500 placeholder-gray-300'
                )}
                placeholder="Search..."
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
                <label htmlFor="Category" className="sr-only">
                    Category
                </label>
                <select
                    id="category"
                    name="category"
                    className={classNames(
                        'h-full py-0 pl-2 pr-8 bg-transparent',
                        'focus:ring-primary-dark focus:border-primary-dark ',
                        'border-transparent rounded-r-md',
                        selected_idx > 0 ? 'text-gray-500' : 'text-gray-300'
                    )}
                    defaultValue="Categpry"
                >
                    <option disabled>Category</option>
                    <option>Location</option>
                    <option>Package</option>
                </select>
            </div>
        </div>
    )
}

type HeaderProps = {
    onSearch: Dispatch<SetStateAction<string>>
}

type StaffResponseItem = {
    id: string
    hourlyWage: string
    monthlyWage: string
    overtimeRate: string
    user: Record<string, string>
}

function HeaderActions(props: HeaderProps) {
    return (
        <>
            <SearchInputGroup />
        </>
    )
}

function DashboardStaff() {
    const { tenant, StaffModal: Modal } = useAuth()
    const [view_mode, setViewMode] = useState<ViewMode>(ViewMode.GRID)
    const [selected_search_category, setSearchCategory] = useState('')
    const [selected_items, selectItems] = useState<number[]>([])
    const [all_selected, selectAll] = useState<boolean>(false)
    const [staff, setStaff] = useState<Staff[]>([])

    const { data, doFetch } = useFetch(
        `/v1/staff/?tenantId=${tenant?.id}`,
        FetchMethods.GET,
        !!tenant?.id
    )

    useEffect(() => {
        const staff_list: Staff[] =
            data &&
            data.content &&
            data.content.map((s: StaffResponseItem) => {
                const {
                    id: user_id,
                    email,
                    firstName: first_name,
                    lastName: last_name,
                    phone,
                } = s.user
                return {
                    id: s.id,
                    hourly_rate: s.hourlyWage,
                    monthly_rate: s.monthlyWage,
                    overtime_rate: s.overtimeRate,
                    user: {
                        id: user_id,
                        email,
                        first_name,
                        last_name,
                        phone,
                    },
                }
            })
        setStaff(staff_list)

        const update_selection: number[] = []
        if (all_selected) {
            staff.forEach((x, idx) => {
                update_selection.push(idx)
            })
        }
        selectItems(update_selection)

        if (Modal.attributes?.has_updates) {
            Modal.setAttributes({
                has_updates: false,
            })
            doFetch()
        }
    }, [setStaff, data, doFetch, all_selected, Modal.is_open])

    function handleEdit(idx: number) {
        return () => {
            Modal.setAttributes({
                id: staff[idx].id,
                user_id: staff[idx].user.id || '',
                email: staff[idx].user.email,
                first_name: staff[idx].user.first_name,
                last_name: staff[idx].user.last_name,
                phone: staff[idx].user.phone || '',
                hourly_rate: staff[idx].hourly_rate,
                monthly_rate: staff[idx].monthly_rate,
                overtime_rate: staff[idx].overtime_rate,
                idx,
            })
            Modal.open()
        }
    }

    function toggleAll() {
        selectAll(!all_selected)
    }

    function TableView() {
        return (
            <div className="flex flex-col mt-4">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden mt-4">
                        <DataTable
                            all_selected={all_selected}
                            rows={rows}
                            columns={[
                                {
                                    checkAll: toggleAll,
                                    classNames:
                                        'pl-6 pr-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-4',
                                },
                                {
                                    label: 'Name',
                                    classNames:
                                        'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                                },
                                {
                                    label: 'Phone',
                                    classNames:
                                        'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                                },
                                {
                                    label: 'Email',
                                    classNames:
                                        'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                                },
                            ]}
                        />
                    </div>
                </div>
            </div>
        )
    }

    if (!tenant?.id) return <></>

    function CardView() {
        return (
            <div className="grid w-80 sm:w-auto lg:grid-cols-2 xl:grid-cols-3 xl:max-w-5xl md:max-w-sm lg:max-w-2xl mx-auto lg:mx-0 p-8 gap-6">
                {staff && staff.length > 0
                    ? ((staff as Staff[]) || []).map(
                          (record: Staff, idx) => (
                              <Card
                                  key={idx}
                                  list={staff as Staff[]}
                                  idx={idx}
                                  archiveItem={async (rec: Staff) => {
                                      await deleteApiRequest(
                                          `/v1/staff/${record.id}`
                                      )
                                      doFetch()
                                  }}
                              />
                          )
                      )
                    : ''}
                <div
                    onClick={() => {
                        Modal.open()
                    }}
                    className={classNames(
                        'p-8 rounded-xl text-center flex flex-col content-center justify-center',
                        'border-2 border-dashed border-gray-150 cursor-pointer'
                    )}
                >
                    <i className="block mx-auto mb-4 feather feather-plus font-back text-2xl block w-10 h-10 leading-relaxed px-2 rounded-xl bg-primary-lighter text-primary-light" />
                    <span className="text-xl mx-auto block w-36">
                        Click to add new staff
                    </span>
                </div>
            </div>
        )
    }

    const rows: HTMLTableRowElement[] = (staff || []).map(
        ({ id, user }: Staff, idx) =>
            (
                <tr
                    key={id}
                    className={classNames(
                        idx % 2 ? 'bg-primary-lighter bg-opacity-30' : '',
                        'hover:bg-secondary hover:bg-opacity-10'
                    )}
                >
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <input
                            type="checkbox"
                            name="selected_items[]"
                            className="h-4 w-4 mr-2 border-gray-300 rounded text-primary focus:ring-primary-light"
                            value={idx}
                            checked={selected_items.indexOf(idx) >= 0}
                            onChange={() => {
                                const updated_selection = [
                                    ...selected_items,
                                ]
                                if (updated_selection.indexOf(idx) >= 0) {
                                    updated_selection.splice(idx, 1)
                                    selectItems(updated_selection)
                                } else {
                                    updated_selection.push(idx)
                                    selectItems(updated_selection)
                                }
                            }}
                        />
                    </td>
                    <td
                        className="px-6 py-4 whitespace-nowrap"
                        onClick={handleEdit(idx)}
                    >
                        <div className="text-sm font-medium text-gray-900">
                            {[user.first_name, user.last_name].join(' ')}
                        </div>
                    </td>
                    <td
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                        onClick={handleEdit(idx)}
                    >
                        {user.phone || 'None Specified'}
                    </td>
                    <td
                        className="px-6 py-4 whitespace-nowrap"
                        onClick={handleEdit(idx)}
                    >
                        <div className="text-sm text-gray-900">
                            {user.email}
                        </div>
                    </td>
                </tr>
            ) as unknown as HTMLTableRowElement
    )

    return (
        <Dashboard actions={<HeaderActions onSearch={setSearchCategory} />}>
            <div className="flex justify-between center-items py-2 sm:px-6 lg:px-8 mt-4">
                <div className="gap-2 flex pb-3">
                    <button
                        onClick={() => {
                            setViewMode(ViewMode.GRID)
                        }}
                        className={classNames(
                            view_mode == ViewMode.GRID
                                ? 'text-primary'
                                : 'text-gray-300',
                            'flex items-center hover:text-primary-dark font-thin rounded-lg w-10'
                        )}
                    >
                        <i className="feather-grid text-3xl mx-auto" />
                    </button>
                    <button
                        onClick={() => {
                            setViewMode(ViewMode.LIST)
                        }}
                        className={classNames(
                            view_mode == ViewMode.LIST
                                ? 'text-primary'
                                : 'text-gray-300',
                            'flex items-center hover:text-primary-dark font-thin rounded-lg w-10'
                        )}
                    >
                        <i className="feather-list text-3xl mx-auto" />
                    </button>
                </div>
                <button
                    onClick={() => {
                        Modal.open()
                    }}
                    className="flex items-center bg-primary-lighter text-primary px-8 py-2 font-thin rounded-lg mb-3"
                >
                    <i className="feather-plus text-xl mr-2" />
                    Add New
                </button>
            </div>

            {view_mode == ViewMode.GRID ? <CardView /> : <TableView />}

            <StaffModal />
        </Dashboard>
    )
}

export default DashboardStaff
