import ViewModeSelector from 'components/ViewModeSelector'
import { ClientItem } from 'components/Modals/Client/types'
import { ViewMode } from 'components/ViewModeSelector/types'
import { useAuth } from 'context/AuthContext'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { classNames } from 'utils/dom-helpers'
import { useFetch } from 'utils/fetch-helper'
import { FetchMethods } from 'utils/types'
import Dashboard from '..'
import ServicesFilter from './Filters'

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

type ApiResponse = {
    id: string
    user: Record<string, string>
}

function DashboardServices() {
    const { tenant, CreateClientModal: ModalContext } = useAuth()
    const [is_instructor_expanded, toggleInstructorFilter] = useState<boolean>(false)
    const [is_category_expanded, toggleCategoryFilter] = useState<boolean>(false)
    const [view_mode, setViewMode] = useState<ViewMode>(ViewMode.GRID)
    const [selected_instructors, selectInstructors] = useState<number[]>([])
    const [selected_categories, selectCategories] = useState<number[]>([])
    const [all_selected, selectAll] = useState<boolean>(false)
    const [clients, setClients] = useState<ClientItem[]>([])
    const { data, doFetch } = useFetch(
        `/v1/clients/tenant-id/${tenant?.id}`,
        FetchMethods.GET,
        !!tenant?.id
    )
    const instructor_filter = {
        label: 'Instructor',
        is_expanded: is_instructor_expanded,
        onClick: () => {
            toggleInstructorFilter(!is_instructor_expanded)
        },
        options: [{
            value: 'asdasd',
            label: 'Anastasha Zhang'
        }, {
            value: 'xxx',
            label: 'Carol Li'
        }],
        selection: selected_instructors,
        updateGroupSelection: (s: number[]) => {
            selectInstructors(s)
        }
    }
    const category_filter = {
        label: 'Category',
        is_expanded: is_category_expanded,
        onClick: () => {
            toggleCategoryFilter(!is_category_expanded)
        },
        options: [{
            value: 'asdasd',
            label: 'Aerial Yoga Stretch'
        }, {
            value: 'xxxxx',
            label: 'Ballet Body Sculpting'
        }],
        selection: selected_categories,
        updateGroupSelection: (s: number[]) => {
            selectCategories(s)
        }
    }

    useEffect(() => {
        const list: ClientItem[] =
            data &&
            data.content &&
            data.content.map((s: ApiResponse) => {
                const {
                    id: user_id,
                    email,
                    firstName: first_name,
                    lastName: last_name,
                    phone,
                } = s.user
                return {
                    id: s.id,
                    user: {
                        id: user_id,
                        email,
                        first_name,
                        last_name,
                        phone,
                    },
                }
            })
        setClients(list)

        const update_selection: number[] = []
        if (all_selected) {
            clients.forEach((x, idx) => {
                update_selection.push(idx)
            })
        }

        if (ModalContext.attributes?.has_updates) {
            ModalContext.setAttributes({
                has_updates: false,
            })
            doFetch()
        }
    }, [doFetch, data, setClients, all_selected, ModalContext.is_open])

    function handleEdit(idx: number) {
        return () => {
            ModalContext.setAttributes({
                id: clients[idx].id,
                user_id: clients[idx].user.id || '',
                email: clients[idx].user.email,
                first_name: clients[idx].user.first_name,
                last_name: clients[idx].user.last_name,
                phone: clients[idx].user.phone || '',
                idx,
            })

            ModalContext.open()
        }
    }

    function toggleAll() {
        selectAll(!all_selected)
    }
    

    return (
        <Dashboard>
            <div className="flex flex-col mt-4">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="flex justify-between">
                        <div className="flex gap-4 items-center">
                            <ViewModeSelector view_mode={view_mode} setViewMode={setViewMode} />
                            <ServicesFilter items={[instructor_filter, category_filter]} />
                        </div>

                        <div className="flex items-center">
                            <div>test</div>
                            <button
                                onClick={() => {
                                    ModalContext.open()
                                }}
                                className="flex items-center bg-primary-lighter text-primary px-8 py-2 font-thin rounded-lg mb-3"
                            >
                                <i className="feather-plus text-xl mr-2" />
                                Add New
                            </button>
                        </div>
                    </div>
                    <div className="overflow-hidden mt-4">

                    </div>
                </div>
            </div>
        </Dashboard>
    )
}

export default DashboardServices
