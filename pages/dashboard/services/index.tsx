import DropdownComponent from 'components/DropdownSelectors'
import { DropPosition } from 'components/DropdownSelectors/common'
import { UserModel } from 'components/Modals/types'
import ViewModeSelector from 'components/ViewModeSelector'
import { ViewMode } from 'components/ViewModeSelector/types'
import { useAppContext } from 'context/AppContext'
import { useAuth } from 'context/AuthContext'
import getConfig from 'next/config'
import { useEffect, useState } from 'react'
import { ServiceApiItem, ServiceItem } from 'types/service'
import { useFetch } from 'utils/fetch-helper'
import { FetchMethods } from 'utils/types'
import Dashboard from '..'
import ServiceList from './ServiceList'

const { SERVICE_MODAL_TRANSLATION_ID } = getConfig().publicRuntimeConfig

function DashboardServices() {
    const { tenant, ServiceModal: ModalContext } = useAuth()
    const [services, setServices] = useState<
        Record<
            string,
            string | boolean | number | Record<string, string | boolean>
        >[]
    >([])
    const { lang, translations: common_translations } = useAppContext()
    const [translations, setTranslations] = useState(common_translations)
    const [is_instructor_expanded, toggleInstructorFilter] =
        useState<boolean>(false)
    const [is_category_expanded, toggleCategoryFilter] =
        useState<boolean>(false)
    const [view_mode, setViewMode] = useState<ViewMode>(ViewMode.GRID)
    const [selected_instructors, selectInstructors] = useState<number[]>([])
    const [selected_categories, selectCategories] = useState<number[]>([])
    const [all_selected, selectAll] = useState<boolean>(false)
    const { data, doFetch } = useFetch(
        `/v1/services/tenant-id/${tenant?.id}`,
        FetchMethods.GET,
        !!tenant?.id
    )

    const { data: page_translation } = useFetch(
        `/v1/contents?url=${encodeURI(
            `https://cms.aot.plus/jsonapi/node/page_translation/${SERVICE_MODAL_TRANSLATION_ID}`
        )}`,
        FetchMethods.GET,
        true,
        true
    )

    const instructor_filter = {
        label: <>Instructor</>,
        is_expanded: is_instructor_expanded,
        onClick: () => {
            toggleInstructorFilter(!is_instructor_expanded)
        },
        options: [
            {
                value: 'asdasd',
                label: 'Anastasha Zhang',
            },
            {
                value: 'xxx',
                label: 'Carol Li',
            },
        ],
        selection: selected_instructors,
        updateGroupSelection: (s: number[]) => {
            selectInstructors(s)
        },
    }
    const category_filter = {
        label: <>Category</>,
        is_expanded: is_category_expanded,
        onClick: () => {
            toggleCategoryFilter(!is_category_expanded)
        },
        options: [
            {
                value: 'asdasd',
                label: 'Aerial Yoga Stretch',
            },
            {
                value: 'xxxxx',
                label: 'Ballet Body Sculpting',
            },
        ],
        selection: selected_categories,
        updateGroupSelection: (s: number[]) => {
            selectCategories(s)
        },
    }

    useEffect(() => {
        const list: Record<string, string | boolean | number>[] =
            data &&
            data.content &&
            data.content.map((s: ServiceApiItem): ServiceItem => {
                const {
                    id,
                    accentColorHex: accent_color,
                    primaryColorHex: primary_color,
                    secondaryColorHex: secondary_color,
                    duration,
                    addons,
                    blockTimeAfter: blocked_from,
                    blockTimeBefore: blocked_to,
                    category,
                    name,
                    price,
                    maxCapacity: max_capacity,
                    description,
                    longDescription: long_description,
                    customSlug: slug,
                    imageUrl: image_src,
                    staff,
                } = s

                let service_type = s.series ? 'series' : ''

                return {
                    id,
                    accent_color,
                    primary_color,
                    secondary_color,
                    duration,
                    addons,
                    is_public: s.public || false,
                    max_participants: s.maxCapacity || 0,
                    blocked_from,
                    blocked_to,
                    category,
                    name,
                    price,
                    description,
                    long_description,
                    service_type,
                    slug,
                    staff: staff.map(
                        ({
                            id,
                            user,
                        }: {
                            id: string
                            user: UserModel
                        }) => ({
                            id,
                            user_id: user.id as string,
                            first_name: user.firstName,
                            last_name: user.lastName,
                        })
                    ),
                    image_src,
                }
            })
        setServices(list)

        const update_selection: number[] = []
        if (all_selected) {
            services.forEach((x, idx) => {
                update_selection.push(idx)
            })
        }

        if (lang && page_translation.data?.attributes[lang]) {
            const translations_to_add: Record<string, string> = {}
            page_translation.data.attributes[lang].forEach(
                ({ key, value }: any) => {
                    translations_to_add[key] = value
                }
            )
            setTranslations({
                ...common_translations,
                ...translations_to_add,
            })
        }
    }, [
        data,
        common_translations,
        page_translation,
        lang,
        setServices,
        all_selected,
    ])

    return (
        <Dashboard>
            <div className="flex flex-col mt-4 gap-6 py-2 sm:px-6 lg:px-8">
                <div className="align-middle inline-block min-w-full">
                    <div className="flex justify-between">
                        <div className="flex gap-4 items-center">
                            <ViewModeSelector
                                view_mode={view_mode}
                                setViewMode={setViewMode}
                            />
                            <DropdownComponent
                                items={[instructor_filter, category_filter]}
                            />
                        </div>

                        <div className="flex items-center gap-6">
                            <div>
                                <DropdownComponent
                                    items={[
                                        {
                                            label: (
                                                <button
                                                    type="button"
                                                    className="flex items-center gap-2 text-primary text-sm px-6 py-3 rounded-md hover:bg-primary hover:text-primary-lighter"
                                                >
                                                    <i className="feather-settings" />
                                                    <span>
                                                        Customize Booking
                                                        Page
                                                    </span>
                                                </button>
                                            ),
                                        },
                                    ]}
                                    label={
                                        <div className="flex items-center gap-2 text-base font-thin text-primary">
                                            <i className="feather-eye" />
                                            <span className="mr-1">
                                                Preview Booking Page
                                            </span>
                                            <span className="border-l-gray-300 border-l -mt-4 -mr-4 px-3 h-full -mb-4 py-2">
                                                <i className="feather-chevron-down" />
                                            </span>
                                        </div>
                                    }
                                    style={{}}
                                    dropboxClassname="border-0"
                                    position={DropPosition.TOP_RIGHT}
                                />
                            </div>
                            <button
                                onClick={() => {
                                    ModalContext.open()
                                }}
                                className="flex items-center bg-primary-lighter text-primary px-8 py-2 font-thin rounded-lg"
                            >
                                <i className="feather-plus text-xl mr-2" />
                                Add New
                            </button>
                        </div>
                    </div>
                </div>

                <ServiceList
                    services={data.content as ServiceApiItem[]}
                    translations={translations}
                />
            </div>
        </Dashboard>
    )
}

export default DashboardServices
