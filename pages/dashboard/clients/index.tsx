import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { classNames } from 'utils/dom-helpers'
import Dashboard from '..'
import { FetchMethods, useFetch } from 'utils/fetch-helper'
import { useAuth } from 'context/AuthContext'
import CreateClientModal from 'components/Modals/Client'
import LocationSelector from 'components/DropdownSelectors/LocationSelector'
import FilterSelector from 'components/DropdownSelectors/FilterSelector'
import DataTable from 'components/DataTable'

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

type UserRecord = {
    email: string
    first_name: string
    last_name: string
    phone?: string
    notes?: string
}
type ClientItem = {
    id: string
    user: UserRecord
}

function HeaderActions(props: HeaderProps) {
    return (
        <>
            <SearchInputGroup />
        </>
    )
}

function DashboardClient() {
    const { tenant, CreateClientModal: ModalContext } = useAuth()
    const [selected_search_category, setSearchCategory] = useState('')
    const [clients, setClients] = useState<ClientItem[]>([])
    const { data, doFetch } = useFetch(
        `/v1/clients/tenant-id/${tenant?.id}`,
        FetchMethods.GET,
        !!tenant?.id
    )

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
                        user_id,
                        email,
                        first_name,
                        last_name,
                        phone,
                    },
                }
            })
        setClients(list)
    }, [doFetch, data, setClients])

    function handleEdit(idx: number) {
        return () => {
            ModalContext.setAttributes({
                id: clients[idx].id,
                email: clients[idx].user.email,
                first_name: clients[idx].user.first_name,
                last_name: clients[idx].user.last_name,
                phone: clients[idx].user.phone || '',
            })
            ModalContext.open()
        }
    }

    const rows: HTMLTableRowElement[] = (clients || [])
        .map(
            ({ id, user }: ClientItem, idx) => (
                <tr
                    key={id}
                    className={
                        classNames(idx % 2
                            ? 'bg-primary-lighter bg-opacity-30'
                            : '',
                            'hover:bg-secondary hover:bg-opacity-10'
                        )
                    }
                >
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <input
                            type="checkbox"
                            name="selected_items[]"
                            className="h-4 w-4 mr-2 border-gray-300 rounded text-primary focus:ring-primary-light"
                            value={idx}
                        />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap" onClick={handleEdit(idx)}>
                        <div
                            className="text-sm font-medium text-gray-900"
                        >
                            {[
                                user.first_name,
                                user.last_name,
                            ].join(' ')}
                        </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" onClick={handleEdit(idx)}>
                        {user.phone || 'None Specified'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap" onClick={handleEdit(idx)}>
                        <div className="text-sm text-gray-900">
                            {user.email}
                        </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap" onClick={handleEdit(idx)}>
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 uppercase">
                            Current member
                        </span>
                    </td>
                </tr>
            ) as unknown as HTMLTableRowElement
        )

    return (
        <Dashboard actions={<HeaderActions onSearch={setSearchCategory} />}>
            <div className="flex flex-col mt-4">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="flex justify-between">
                        <div className="flex gap-3">
                            <LocationSelector
                                items={[
                                    { id: '1', text: 'Commonwealth' },
                                    { id: '2', text: 'Dhoby Ghaut' },
                                    { id: '3', text: 'Lavender' },
                                    { id: '4', text: 'Tai Seng' },
                                ]}
                            />
                            <FilterSelector items={[]} />
                        </div>
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
                    <div className="overflow-hidden mt-4">
                        <DataTable
                            rows={rows}
                            columns={[
                                { label: '', classNames: 'pl-6 pr-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-4' },
                                { label: 'Name', classNames: 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider' },
                                { label: 'Phone', classNames: 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider' },
                                { label: 'Email', classNames: 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider' },
                                { label: 'Membership status', classNames: 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider' },
                            ]}
                        />
                    </div>
                </div>
            </div>

            <CreateClientModal />
        </Dashboard>
    )
}

export default DashboardClient
