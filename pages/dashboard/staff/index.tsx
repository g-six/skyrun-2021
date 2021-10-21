import StaffModal from 'components/Modals/Staff'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { classNames } from 'utils/dom-helpers'
import Dashboard from '..'
import Card from './card'
import { FetchMethods, useFetch } from 'utils/fetch-helper'
import { useAuth } from 'context/AuthContext'
import { Staff } from 'types/staff'

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
    user: Record<string, string>
}
type StaffResponseList = {
    [key: string]:
        | string
        | boolean
        | number
        | Record<string, string>
        | StaffResponseItem[]
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
    const [selected_search_category, setSearchCategory] = useState('')
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

        if (Modal.attributes?.has_updates) {
            Modal.setAttributes({
                has_updates: false,
            })
            doFetch()
        }
    }, [setStaff, data, doFetch, Modal.is_open])

    if (!tenant?.id) return <></>
    return (
        <Dashboard actions={<HeaderActions onSearch={setSearchCategory} />}>
            <div className="grid w-80 sm:w-auto lg:grid-cols-2 xl:grid-cols-3 xl:max-w-5xl md:max-w-sm lg:max-w-2xl mx-auto lg:mx-0 p-8 gap-6">
                {staff && staff.length > 0
                    ? ((staff as Staff[]) || []).map(
                          (record: Staff, idx) => (
                              <Card
                                  key={idx}
                                  list={staff as Staff[]}
                                  idx={idx}
                                  archiveItem={console.log}
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

            <StaffModal />
        </Dashboard>
    )
}

export default DashboardStaff
