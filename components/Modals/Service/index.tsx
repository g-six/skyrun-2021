import { useEffect, useState, MouseEvent } from 'react'
import DialogModal from './Dialog'

import { createModal } from '../ModalFactory'
import { AuthContext, useAuth } from 'context/AuthContext'
import { ModalWrapper } from '../ModalWrapper'
import {
    TabStrip,
    TabStripSelectEventArguments,
    TabStripTab,
} from '@progress/kendo-react-layout'
import GeneralForm from './GeneralForm'
import { FetchMethods } from 'utils/types'
import { postApiRequest, putApiRequest, useFetch } from 'utils/fetch-helper'
import { useAppContext } from 'context/AppContext'
import ServiceModalStaff from './Staff'
import {
    ServiceApiItem,
    ServiceApiType,
    ServiceItem,
    ServiceType,
} from 'types/service'
import Translation from 'components/Translation'
import ServiceModalMemberships from './Memberships'
import { ModalDataAttributes, UserModel } from '../types'
import ServiceModalOfferClasses, { BlankOffer } from './OfferClasses'
import { ServiceModalBooking } from './BookingSettings'

const ModalProvider = createModal(
    AuthContext,
    'ServiceModal',
    () => (
        <>
            <i className="feather feather-plus mr-4" />
            <span className="circular">Create</span>
        </>
    ),
    () => (
        <span className="inline-block w-6 h-6 text-primary text-center font-extralight">
            <i className="feather feather-chevron-left " />
        </span>
    )
)

export const ServiceModalCloser = ModalProvider.Closer

function ServiceModal(
    { tenant_id, data } = {
        tenant_id: '',
        data: {},
    }
) {
    const { setAttributes, attributes, ServiceModal: Context } = useAuth()
    const { lang, translations: common_translations } = useAppContext()
    const [translations, setTranslations] = useState(common_translations)
    const [prompt_message, toggleDialog] = useState<string>('')
    const categories: Record<string, string>[] = []

    const offerings =
        (attributes && (attributes.offerings as ModalDataAttributes[])) ||
        []

    const { data: page_translation } = useFetch(
        `/v1/contents?url=${encodeURI(
            'https://cms.aot.plus/jsonapi/node/page_translation/c59c7fce-c546-4993-a1e7-2c54336c1bc4'
        )}`,
        FetchMethods.GET,
        true,
        true
    )

    const {
        data: categories_api_response,
        status: categories_api_status,
        doFetch: getCategories,
    } = useFetch(
        `/v1/categories/?tenantId=${tenant_id}`,
        FetchMethods.GET,
        true
    )

    const { data: staff_api_response } = useFetch(
        `/v1/staff/?tenantId=${tenant_id}`,
        FetchMethods.GET,
        true
    )
    const staff: Record<string, string>[] =
        staff_api_response &&
        staff_api_response.content &&
        staff_api_response.numberOfElements > 0
            ? staff_api_response.content.map(
                  (s: { id: string; user: Record<string, string> }) => ({
                      value: s.id,
                      text: [
                          (s.user as unknown as Record<string, string>)
                              .firstName,
                          (s.user as unknown as Record<string, string>)
                              .lastName,
                      ].join(' '),
                  })
              )
            : []
    const { data: location_list } = useFetch(
        `/v1/locations/tenant-id/?tenantId=${tenant_id}`,
        FetchMethods.GET,
        true
    )
    const locations =
        location_list && location_list.content && location_list.numberOfElements > 0
            ? location_list.content.map((loc: Record<string, string>) => ({
                    value: loc.id,
                    text: loc.name,
                }))
            : []

    const {
        data: create_category_api_response,
        status: create_category_status,
        doFetch: createCategory,
    } = useFetch('/v1/categories', FetchMethods.POST, false)

    function handleCloseModal(e: MouseEvent<HTMLButtonElement>) {
        setAttributes({
            categories: attributes.categories,
        })
        Context.close()
    }

    function updateList() {
        setAttributes({
            has_updates: true,
        })
    }

    const onSubmit = async () => {
        try {
            const {
                name,
                description,
                duration,
                max_participants,
                primary_color,
                price,
                service_type,
                is_public,
            } = attributes as unknown as ServiceItem

            const { staff_assigned } = attributes as unknown as Record<
                string,
                Record<string, string>[]
            >
            const service: Record<string, string> = {}

            if (attributes && attributes.id) {
                service.id = attributes.id as string
            }

            const form_values: ServiceApiItem = {
                id: attributes?.id as string,
                category: attributes.category as { id: string },
                description,
                duration: duration as unknown as number,
                name,
                tenant: {
                    id: tenant_id,
                },
                maxCapacity: max_participants as unknown as number,
                public: is_public,
                price: price as unknown as number,
                primaryColorHex: primary_color as string,
                type: service_type as unknown as ServiceApiType,
                staff: staff_assigned as unknown as {
                    id: string
                    user: UserModel
                }[],
                series: false,
            }

            if (form_values.type == 'SERIES') {
                form_values.series = true
            }

            let serviceId: string
            if (form_values.id) {
                serviceId = form_values.id
                const api = await putApiRequest(
                    `/v1/services/${form_values.id}`,
                    form_values as unknown as Record<
                        string,
                        string | number | boolean
                    >
                )
                const { list_item_idx } = attributes

                setAttributes({
                    categories: attributes.categories,
                    list_item_idx,
                    updated_item: api,
                })
            } else {
                const api = await postApiRequest(
                    '/v1/services',
                    form_values as unknown as Record<
                        string,
                        string | number | boolean
                    >
                )

                setAttributes({
                    categories: attributes.categories,
                })
            }

            if (offerings.length > 0) {
                const offerings = attributes.offerings as Record<string, string>[]
                console.log(offerings)
                offerings.forEach(async ({
                    date,
                    time,
                    is_recurring,
                    id,
                    duration,
                    location: locationId,
                    staff: staffId,
                }) => {
                    const group_class: Record<string, string | boolean | Record<string, string | boolean>> = {
                        id,
                        effectiveDate: date,
                        startTime: time,
                        endTime: '23:59',
                        recurring: is_recurring,
                        serviceId: attributes.id as string,
                        groupClassSetting: {
                            locationId,
                            staffId,
                        }
                    }
                    if (id) {
                        const offer_api = await putApiRequest(
                            `/v1/group_classes/${id}`,
                            group_class,
                        )
                    } else {
                        const offer_api = await postApiRequest(
                            '/v1/group_classes',
                            group_class,
                        )
                    }
                })
            }
            Context.close()
        } catch (e) {
            const { message } = e as Record<string, string>
            toggleDialog(message)
        }
    }
    useEffect(() => {
        if (
            create_category_status == 200 &&
            create_category_api_response.id &&
            categories.filter(
                ({ id }) => id == create_category_api_response.id
            ).length == 0
        ) {
            categories.push({
                text: create_category_api_response.name,
                value: create_category_api_response.id,
            })
            if (
                !attributes?.category ||
                (attributes?.category as unknown as Record<string, string>)
                    .id != create_category_api_response.id
            ) {
                setAttributes({
                    ...attributes,
                    category: create_category_api_response,
                })
            }
        } else if (
            categories_api_status == 200 &&
            categories_api_response.content.length > 0 &&
            categories_api_response.content.length != categories.length
        ) {
            categories_api_response.content.forEach(
                (category: Record<string, string>) => {
                    if (category.type == 'SERVICE') {
                        categories.push({
                            text: category.name,
                            value: category.id,
                        })
                    }
                }
            )
            if (categories.length > 0) {
                setAttributes({
                    ...attributes,
                    categories,
                })
            }
        }

        if (!attributes || !attributes?.service_type) {
            setAttributes({
                ...attributes,
                service_type: ServiceType.APPOINTMENT,
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
        common_translations,
        page_translation,
        lang,
        categories_api_response,
        categories_api_status,
        create_category_status,
    ])

    const [selected_tab, setSelectedTab] = useState<number>(0)
    const handleSelect = (e: TabStripSelectEventArguments) => {
        setSelectedTab(e.selected)
    }

    let step_2 = (
        <Translation
            content_key="assign_staff_panel_title"
            translations={translations}
        />
    )
    let step_3 = (
        <Translation
            content_key="memberships_panel_title"
            translations={translations}
        />
    )

    let form_2 = (
        <ServiceModalStaff
            onPrevious={() => setSelectedTab(0)}
            onNext={() => {
                onSubmit()
            }}
            translations={translations}
            handleCloseModal={handleCloseModal}
        />
    )

    let form_3 = <span>WIP</span>
    let form_4 = <span>WIP</span>

    if (attributes && attributes.service_type == 'GROUP') {
        step_2 = (
            <Translation
                content_key="memberships_panel_title"
                translations={translations}
            />
        )
        step_3 = (
            <Translation
                content_key="offer_class_panel_title"
                translations={translations}
            />
        )
        form_2 = (
            <ServiceModalMemberships
                onPrevious={() => setSelectedTab(0)}
                onNext={() => {
                    setSelectedTab(2)
                }}
                attributes={attributes}
                removeAll={() => {
                    console.log('remove all')
                }}
                removeMembership={(idx: number) => {
                    console.log('remove membership record', idx)
                }}
                translations={translations}
                handleCloseModal={handleCloseModal}
            />
        )
        form_3 =
            offerings.length == 0 ? (
                <BlankOffer
                    onNext={() => {
                        setSelectedTab(3)
                    }}
                    attributes={attributes}
                    showOfferListForm={() => {
                        setAttributes({
                            ...attributes,
                            offerings: [{
                                date: new Date(Date.now() + 24 * 60 * 60 * 1000),
                                location: locations && locations[0].value,
                                staff: staff && staff[0].value,
                                time: '10:00',
                            }],
                        })
                    }}
                    translations={translations}
                />
            ) : tenant_id ? (
                <ServiceModalOfferClasses
                    onPrevious={() => setSelectedTab(1)}
                    onNext={() => {
                        setSelectedTab(3)
                    }}
                    attributes={attributes}
                    locations={locations}
                    staff={staff}
                    setAttributes={setAttributes}
                    tenant_id={tenant_id}
                    onAttributesChanged={(
                        updated_attributes: ModalDataAttributes,
                        idx: number
                    ) => {
                        const offerings =
                            attributes.offerings as ModalDataAttributes[]
                        offerings[idx] = updated_attributes
                        setAttributes({
                            ...attributes,
                            offerings,
                        })
                    }}
                    removeItem={(idx: number) => {
                        const offerings =
                            attributes.offerings as ModalDataAttributes[]
                        offerings.splice(idx, 1)
                        setAttributes({
                            ...attributes,
                            offerings,
                        })
                    }}
                    translations={translations}
                    handleCloseModal={handleCloseModal}
                />
            ) : (
                <span>Tenant not present</span>
            )

        form_4 = (
            <ServiceModalBooking
                attributes={attributes}
                onChangeAttribute={(
                    updated_attributes: ModalDataAttributes
                ) => {
                    setAttributes({
                        ...attributes,
                        ...updated_attributes,
                    })
                }}
                onPrevious={() => setSelectedTab(2)}
                translations={translations}
                onNext={onSubmit}
            />
        )
    }

    return (
        <ModalProvider.Visible>
            <ModalWrapper>
                <div className="bg-white shadow-3xl w-full overflow-hidden sm:rounded-md mx-auto my-4 relative border-2 border-gray-100 flex flex-col">
                    <div className="flex px-4 text-gray-500 z-10 w-full pt-4 bg-opacity-30 pb-3 bg-primary-lighter">
                        <div>
                            <ul className="ml-6 text-xs flex gap-1 breadcrumbs text-gray-400">
                                <li>Dashboard</li>
                                <li>Service</li>
                            </ul>
                            <span className="inline-block self-center text-lg text-primary-dark">
                                <ServiceModalCloser className="self-center" />
                                <span className="circular">
                                    {attributes?.id ? 'Edit' : 'New'}{' '}
                                    Service
                                </span>
                            </span>
                        </div>
                    </div>
                    <TabStrip
                        selected={selected_tab}
                        onSelect={handleSelect}
                        className="z-20 flex-1"
                        animation={false}
                    >
                        <TabStripTab
                            title={
                                <Translation
                                    content_key="basic_info_panel_title"
                                    translations={translations}
                                />
                            }
                        >
                            <div className="p-10">
                                <GeneralForm
                                    attributes={attributes}
                                    setAttributes={setAttributes}
                                    translations={translations}
                                    onNext={() => setSelectedTab(1)}
                                    handleCloseModal={handleCloseModal}
                                    createCategory={createCategory}
                                    onSubmit={onSubmit}
                                />
                            </div>
                        </TabStripTab>
                        <TabStripTab title={step_2}>
                            <div className="p-10">{form_2}</div>
                        </TabStripTab>
                        <TabStripTab title={step_3}>
                            <div className="p-10">{form_3}</div>
                        </TabStripTab>
                        <TabStripTab
                            title={
                                <Translation
                                    content_key="booking_panel_title"
                                    translations={translations}
                                />
                            }
                        >
                            <div className="p-10">{form_4}</div>
                        </TabStripTab>
                    </TabStrip>
                </div>
            </ModalWrapper>
            <DialogModal
                prompt_message={prompt_message}
                onCloseModal={() => {
                    toggleDialog('')
                }}
            />
        </ModalProvider.Visible>
    )
}

export default ServiceModal
