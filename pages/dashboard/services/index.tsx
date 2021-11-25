import DropdownComponent from 'components/DropdownSelectors'
import { DropPosition } from 'components/DropdownSelectors/common'
import { ModalDataAttributes, UserModel } from 'components/Modals/types'
import GridSpinner from 'components/Spinners/grid'
import Translation from 'components/Translation'
import ViewModeSelector from 'components/ViewModeSelector'
import { ViewMode } from 'components/ViewModeSelector/types'
import { useAppContext } from 'context/AppContext'
import { useAuth } from 'context/AuthContext'
import getConfig from 'next/config'
import { useEffect, useState } from 'react'
import { ServiceApiItem, ServiceItem, ServiceType } from 'types/service'
import {
    useFetch,
    deleteApiRequest,
    getApiRequest,
} from 'utils/fetch-helper'
import { FetchMethods } from 'utils/types'
import { normalizeItem } from 'utils/normalize-item'
import Dashboard from '..'
import ServiceList from './ServiceList'

const { SERVICE_MODAL_TRANSLATION_ID } = getConfig().publicRuntimeConfig

function DashboardServices() {
    const {
        tenant,
        ServiceModal: ModalContext,
        attributes,
        setAttributes,
    } = useAuth()
    const categories = attributes.categories as Record<string, string>[]

    const [services, setServices] = useState<ServiceItem[]>([])
    const [group_classes, setGroupClasses] = useState<
        Record<string, Record<string, string | Date>[]>
    >({})
    const { lang, translations: common_translations } = useAppContext()
    const [translations, setTranslations] = useState(common_translations)
    const [is_instructor_expanded, toggleInstructorFilter] =
        useState<boolean>(false)
    const [is_category_expanded, toggleCategoryFilter] =
        useState<boolean>(false)
    const [view_mode, setViewMode] = useState<ViewMode>(ViewMode.GRID)
    const [selected_instructors, selectInstructors] = useState<number[]>([])
    const [selected_categories, selectCategories] = useState<number[]>([])
    const [should_fetch_categories, toggleFetchCategories] =
        useState<boolean>(true)
    const { data, doFetch, is_loading } = useFetch(
        `/v1/services/tenant-id/${tenant?.id}`,
        FetchMethods.GET,
        !!tenant?.id
    )

    const { data: group_classes_data, doFetch: fetchGroupClasses } =
        useFetch(
            `/v1/group_classes/?tenantId=${tenant?.id}`,
            FetchMethods.GET,
            !!tenant?.id
        )

    const {
        data: categories_api_response,
        status: categories_api_status,
        doFetch: getCategories,
    } = useFetch(
        `/v1/categories/?tenantId=${tenant?.id}`,
        FetchMethods.GET,
        false
    )

    const { data: page_translation, is_loading: is_loading_translations } =
        useFetch(
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

    function handleItemEdit(
        {
            id,
            name,
            category,
            description,
            duration,
            is_public,
            max_participants,
            price,
            primary_color,
            service_type,
        }: ServiceItem,
        idx: number
    ) {
        if (id) {
            setAttributes({
                ...attributes,
                id,
                name,
                category: category.id,
                description: description || '',
                duration: duration || '',
                is_public,
                max_participants: max_participants || '',
                price: price || '',
                primary_color: primary_color || '',
                service_type,
                list_item_idx: idx,
                group_classes: group_classes[id] || [],
            })
            ModalContext.open()
        }
    }

    async function handleDeleteCategory(category_id: string) {
        setAttributes({
            ...attributes,
            categories: categories.filter((c) => {
                return c.value != category_id
            }),
        })
        await deleteApiRequest(`/v1/categories/${category_id}`)
    }

    useEffect(() => {
        const list: ServiceItem[] =
            data && data.content && data.content.map(normalizeItem)
        if (list && list.length > 0 && services.length != list.length) {
            setServices(list)
        }

        if (
            lang &&
            page_translation.data?.attributes[lang] &&
            !is_loading_translations
        ) {
            const translations_to_add: Record<string, string> = {}
            page_translation.data.attributes[lang].forEach(
                ({ key, value }: any) => {
                    translations_to_add[key] = value
                }
            )
            if (
                Object.keys({
                    ...translations,
                    ...translations_to_add,
                }).length > Object.keys(translations).length
            ) {
                setTranslations({
                    ...translations,
                    ...translations_to_add,
                })
            }
        }

        if (attributes.list_item_idx && attributes.updated_item) {
            services[attributes.list_item_idx as number] = normalizeItem(
                attributes.updated_item as ServiceApiItem
            )
            setAttributes({
                categories: attributes.categories,
            })
            setServices(services)
        }
        if (
            categories_api_status == 200 &&
            categories_api_response.content.length > 0
        ) {
            let fetched_categories = [] as ModalDataAttributes[]
            if (attributes.categories) {
                fetched_categories =
                    attributes.categories as ModalDataAttributes[]
            }
            if (
                categories_api_response.content.length !=
                fetched_categories.length
            )
                categories_api_response.content.forEach(
                    (category: Record<string, string>) => {
                        if (category.type == 'SERVICE') {
                            fetched_categories.push({
                                text: category.name,
                                value: category.id,
                            })
                        }
                    }
                )
            if (fetched_categories.length > 0 && !attributes.categories) {
                setAttributes({
                    ...attributes,
                    categories: fetched_categories,
                })
            }
        }

        if (attributes.refetch) {
            setAttributes({
                ...attributes,
                refetch: false,
            })
            doFetch()
        }

        if (attributes.refetch_classes) {
            setAttributes({
                ...attributes,
                refetch_classes: false,
            })
            fetchGroupClasses()
        }
        if (tenant?.id && should_fetch_categories) {
            toggleFetchCategories(false)
            getCategories()
        }
        if (
            group_classes_data.content &&
            Object.keys(group_classes).length == 0
        ) {
            const already_added: string[] = []
            group_classes_data.content.forEach(
                (item: Record<string, string>) => {
                    if (item.id && already_added.indexOf(item.id) == -1) {
                        const { effectiveDate, startTime, recurring } = item
                        const {
                            locationId: group_location_id,
                            staffId: group_staff_id,
                        } = item.groupClassSetting as unknown as Record<
                            string,
                            string
                        >
                        const rec = {
                            id: item.id,
                            date: new Date(effectiveDate),
                            location: group_location_id,
                            staff: group_staff_id,
                            is_recurring: recurring,
                            time: startTime.substr(0, 5),
                        }
                        if (item.serviceId) {
                            if (!group_classes[item.serviceId]) {
                                group_classes[item.serviceId] = []
                            }
                            group_classes[item.serviceId].push(rec)
                        }
                        already_added.push(item.id)
                    }
                }
            )

            if (
                group_classes_data.number *
                    group_classes_data.numberOfElements >
                group_classes_data.totalElements
            ) {
                ;(async () => {
                    const { content } = await getApiRequest(
                        `/v1/group_classes/?tenantId=${tenant?.id}&page=${
                            group_classes_data.number + 1
                        }`
                    )
                    console.log(content)
                })()
            }

            setGroupClasses(group_classes)
        }
    }, [
        data,
        page_translation,
        lang,
        attributes.list_item_idx,
        attributes.updated_item,
        attributes.refetch,
        categories_api_status,
        categories_api_response,
        should_fetch_categories,
        tenant,
        services.length,
        group_classes_data.content,
        is_loading_translations,
    ])

    return (
        <Dashboard>
            {!tenant?.id ||
            is_loading_translations ||
            should_fetch_categories ||
            is_loading ? (
                <div className="absolute inset-0 block flex flex-col justify-center items-center">
                    <div className="flex-1" />
                    <GridSpinner height={24} width={24} />
                    <div className="flex-1" />
                </div>
            ) : (
                <div className="flex flex-col mt-4 gap-6 py-2 sm:px-6 lg:px-8">
                    <div className="align-middle inline-block min-w-full">
                        <div className="flex justify-between">
                            <div className="flex gap-4 items-center">
                                <ViewModeSelector
                                    view_mode={view_mode}
                                    setViewMode={setViewMode}
                                />
                                <DropdownComponent
                                    items={[
                                        instructor_filter,
                                        category_filter,
                                    ]}
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
                                                            Customize
                                                            Booking Page
                                                        </span>
                                                    </button>
                                                ),
                                            },
                                        ]}
                                        label={
                                            <div className="flex items-center gap-2 text-base font-thin text-primary">
                                                <i className="feather-eye" />
                                                <Translation
                                                    render_as="span"
                                                    className="mr-1"
                                                    translations={
                                                        translations
                                                    }
                                                    content_key="preview_booking_btn"
                                                />
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
                                        setAttributes({
                                            ...attributes,
                                            service_type: 'GROUP',
                                        })
                                        ModalContext.open()
                                    }}
                                    className="flex items-center bg-primary-lighter text-primary px-8 py-2 font-thin rounded-lg"
                                >
                                    <i className="feather-plus text-xl mr-2" />
                                    <Translation
                                        content_key="add_new_btn"
                                        translations={translations}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>

                    <ServiceList
                        services={services}
                        group_classes={group_classes}
                        categories={categories}
                        translations={translations}
                        editItem={handleItemEdit}
                        deleteEmptyCategory={handleDeleteCategory}
                    />
                </div>
            )}
        </Dashboard>
    )
}

export default DashboardServices
