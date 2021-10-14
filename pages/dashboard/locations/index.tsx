import CreateLocationModal, {
    CreateLocationModalOpener,
} from 'components/Modals/Location'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { classNames } from 'utils/dom-helpers'
import Dashboard from '..'
import { FetchMethods, useFetch } from 'utils/fetch-helper'
import { useAuth } from 'context/AuthContext'
import { Language } from 'components/LanguageSelector'

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

type LocationItem = {
    id: string
    name: string
    city: string
    country: string
    phone: string
    street_1: string
    street_2: string
    language: Language
    timezone: string
    manager: Record<string, string>
}
type LocationListResponse = {
    [key: string]:
        | string
        | boolean
        | number
        | Record<string, string>
        | LocationItem[]
}

function HeaderActions(props: HeaderProps) {
    return (
        <>
            <SearchInputGroup />
            <CreateLocationModalOpener className="bg-primary text-white px-8 py-2 text-lg font-light rounded-lg" />
        </>
    )
}

function ListHeader() {
    return (
        <thead className="bg-gray-50">
            <tr>
                <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                    Name
                </th>
                <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                    Title
                </th>
                <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                    Status
                </th>
                <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                    Role
                </th>
                <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                </th>
            </tr>
        </thead>
    )
}

function DashboardLocations() {
    const ctx = useAuth()
    const [selected_search_category, setSearchCategory] = useState('')
    const [locations, setLocations] = useState<LocationItem[] | boolean>(
        false
    )
    const { is_loading, data, doFetch } = useFetch(
        `/v1/locations/tenant-id/?tenantId=${ctx.tenant?.id}`,
        FetchMethods.GET,
        false
    )

    useEffect(() => {
        async function fetchData() {
            if (!locations && !!ctx.tenant?.id) {
                await doFetch()
            }
        }

        if (!locations && !!ctx.tenant?.id) {
            setLocations([])
            fetchData()
        } else if (data.content) {
            setLocations(data.content)
        }
    }, [ctx.tenant, data, data.content, locations, doFetch])

    return (
        <Dashboard actions={<HeaderActions onSearch={setSearchCategory} />}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-8">
                {((locations as LocationItem[]) || []).map(
                    (record: LocationItem) => (
                        <div
                            key={record.id}
                            className="shadow-2xl p-8 rounded-xl border-t border-l border-gray-50 h-96 text-center"
                        >
                            <div className="text-sm font-medium text-gray-900">
                                {record.name}
                            </div>
                            <div className="text-sm text-gray-900">
                                {record.language}
                            </div>
                            {record.phone || 'None Specified'}
                            <div className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 uppercase">
                                Current member
                            </div>
                            <a
                                href="#"
                                className="text-indigo-600 hover:text-indigo-900"
                            >
                                Edit
                            </a>
                        </div>
                    )
                )}
            </div>

            <CreateLocationModal />
        </Dashboard>
    )
}

export default DashboardLocations
