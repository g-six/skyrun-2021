import UniversalSearch from 'components/UniversalSearch'
import { useAuth } from 'context/AuthContext'
import { useState, MouseEvent, createRef } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { classNames } from 'utils/dom-helpers'
import { getApiRequest } from 'utils/fetch-helper'
import StaffCardItem, { StaffCardItemProps } from './StaffCardItem'
import StaffListItem, { StaffListItemProps } from './StaffListItem'

function ServiceModalStaff({
    translations,
    handleCloseModal,
    onPrevious,
    onNext,
}: {
    translations: Record<string, string>
    handleCloseModal: (e: MouseEvent<HTMLButtonElement>) => void
    onPrevious(): void
    onNext(): void
}) {
    const { ServiceModal, tenant } = useAuth()
    const { attributes, setAttributes } = ServiceModal
    const api_error =
        attributes && (attributes.api_error as Record<string, string>)
    const loading = (attributes && attributes.loading) || false
    const [staff, setStaffList] = useState<Record<string, string>[]>([])
    const [selected_staff, selectStaff] = useState<number>()
    let timeout: NodeJS.Timeout | number = 0
    const universal_search = createRef()

    async function searchEmployee(keyword: string) {
        if (tenant && tenant.id) {
            const { content } = await getApiRequest(
                `/v1/staff/search?tenantId=${tenant.id}&searchStr=${keyword}`
            )

            const results = content.map(
                (s: Record<string, string | Record<string, string>>) => {
                    const { id } = s
                    const {
                        imageUrl: staff_image,
                        id: staff_user_id,
                        firstName: first_name,
                        lastName: last_name,
                    } = s.user as Record<string, string>
                    return {
                        id,
                        staff_image,
                        staff_user_id,
                        first_name,
                        last_name,
                    }
                }
            )

            setStaffList(
                results.filter(({ id }: Record<string, string>) => {
                    const { staff_assigned } = attributes as Record<
                        string,
                        unknown
                    >
                    if (staff_assigned) {
                        return (
                            (
                                staff_assigned as Record<string, string>[]
                            ).filter(
                                (s: Record<string, string>) => s.id == id
                            ).length == 0
                        )
                    } else return true
                })
            )
        }
    }

    function appendStaff() {
        if (
            staff.length > 0 &&
            (selected_staff || selected_staff === 0) &&
            staff[selected_staff]
        ) {
            let { staff_assigned } = attributes as unknown as Record<
                string,
                Record<string, string>[]
            >
            if (!staff_assigned) {
                staff_assigned = [staff[selected_staff]]
            } else if (
                staff_assigned.filter(({ id }) => {
                    return id == staff[selected_staff].id
                }).length == 0
            ) {
                staff_assigned.push(staff[selected_staff])
            }
            staff.splice(selected_staff, 1)
            setAttributes({
                ...attributes,
                staff_assigned,
            })
        }
    }
    function removeStaff(idx: number) {
        const staff_assigned =
            attributes &&
            (attributes.staff_assigned as unknown as Record<
                string,
                string
            >[])
        if (staff_assigned) {
            staff_assigned.splice(idx, 1)
            setAttributes({
                ...attributes,
                staff_assigned,
            })
        }
    }

    function updateSearchKeyword(keyword: string) {
        if (!keyword) {
            setStaffList([])
        } else if (tenant && tenant.id) {
            if (timeout != 0) {
                clearTimeout(timeout as NodeJS.Timeout)
            }
            timeout = setTimeout(() => {
                searchEmployee(keyword)
            }, 300)
        }
    }

    const is_staff_assigned =
        attributes &&
        attributes.staff_assigned &&
        (attributes.staff_assigned as unknown as StaffCardItemProps[])
            .length > 0

    return (
        <div
            className="relative flex flex-col"
            style={{ minHeight: '600px' }}
        >
            <div className="text-primary text-xl font-medium font-display">
                Assign Staff Members
                <div className="text-base font-thin font-display text-gray-400 mt-2">
                    Assign staff members for this service
                </div>
            </div>

            <div
                className={classNames(
                    is_staff_assigned ? '' : '',
                    'text-center px-3 py-6 mb-6 rounded-xl bg-gray-100 mt-6 relative flex-1'
                )}
            >
                <div className="flex mb-6 mx-3">
                    <UniversalSearch
                        className="flex-1"
                        categories={['staff']}
                        onChange={(e: { target: { value: string } }) => {
                            updateSearchKeyword(e.target.value)
                        }}
                        onClose={() => {
                            updateSearchKeyword('')
                        }}
                        scrollUp={() => {
                            if (selected_staff && selected_staff > 0) {
                                selectStaff(selected_staff - 1)
                            } else if (staff.length > 1) {
                                selectStaff(staff.length - 1)
                            }
                        }}
                        scrollDown={() => {
                            if (selected_staff == undefined) {
                                selectStaff(0)
                            } else if (
                                selected_staff ||
                                selected_staff === 0
                            ) {
                                if (selected_staff < staff.length - 1) {
                                    selectStaff(selected_staff + 1)
                                } else if (staff.length > 0) {
                                    selectStaff(0)
                                }
                            } else if (staff.length > 0) {
                                selectStaff(0)
                            }
                        }}
                        ref={universal_search}
                        chooseItem={appendStaff}
                    />
                    <button
                        type="button"
                        className="text-primary-light text-center w-32"
                        onClick={() => {
                            setAttributes({
                                ...attributes,
                                staff_assigned: [],
                            })
                        }}
                    >
                        Remove All
                    </button>
                </div>
                {staff && staff.length > 0 ? (
                    <div className="absolute w-2/3 left-6 bg-white rounded-lg shadow-xl max-h-80 overflow-auto">
                        {(staff as unknown as StaffListItemProps[]).map(
                            (s: StaffListItemProps, idx) => (
                                <StaffListItem
                                    {...s}
                                    key={s.id}
                                    onClick={() => {
                                        selectStaff(idx)
                                        universal_search.current &&
                                            (
                                                universal_search.current as HTMLInputElement
                                            ).focus()
                                    }}
                                    selectItem={() => {
                                        selectStaff(idx)
                                        appendStaff()
                                    }}
                                    is_selected={idx === selected_staff}
                                    translations={{
                                        add:
                                            translations.add_staff ||
                                            'add_staff',
                                    }}
                                />
                            )
                        )}
                    </div>
                ) : (
                    ''
                )}
                <div
                    className={classNames(
                        is_staff_assigned
                            ? 'justify-start'
                            : 'justify-center',
                        'overflow-auto max-h-96 h-96 flex-1 flex flex-col p-3'
                    )}
                >
                    {is_staff_assigned ? (
                        <div className="grid gap-6 grid-cols-2">
                            {(
                                attributes.staff_assigned as unknown as StaffCardItemProps[]
                            ).map((s, idx) => {
                                return (
                                    <StaffCardItem
                                        key={s.id}
                                        {...s}
                                        onDelete={() => {
                                            removeStaff(idx)
                                        }}
                                        translations={{
                                            add:
                                                translations.add_staff ||
                                                'add_staff',
                                        }}
                                    />
                                )
                            })}
                        </div>
                    ) : (
                        <>
                            <div className="rounded-full bg-gray-200 w-20 h-20 inline-block leading-loose text-center self-center align-middle">
                                <i className="text-gray-400 feather feather-user text-4xl leading-loose" />
                            </div>
                            <div className="text-gray-400 block mt-4 mx-auto">
                                Search for a staff member to assign for this
                                service
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div>
                {api_error && api_error.message ? (
                    <div className="text-sm text-red-700">
                        {api_error.message}
                    </div>
                ) : (
                    ''
                )}
            </div>

            <div>
                <div className="flex justify-end">
                    <button
                        type="button"
                        className="border border-gray-300 rounded-lg py-3 inline-block mr-3 px-10"
                        onClick={() => {
                            onPrevious()
                        }}
                    >
                        Previous
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            onNext()
                        }}
                        className={classNames(
                            'group relative flex justify-center',
                            'py-3 px-12 border border-transparent',
                            'rounded-md text-white',
                            'focus:outline-none',
                            loading
                                ? 'bg-primary-light'
                                : api_error && api_error.message
                                ? 'bg-red-700 hover:bg-primary-dark focus:ring-2 focus:ring-offset-2 focus:ring-primary-light'
                                : 'bg-primary hover:bg-primary-dark focus:ring-2 focus:ring-offset-2 focus:ring-primary-light'
                        )}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ServiceModalStaff
