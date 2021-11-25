import { useEffect, useState, MouseEvent, ReactElement } from 'react'
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
import {
    deleteApiRequest,
    postApiRequest,
    putApiRequest,
    useFetch,
} from 'utils/fetch-helper'
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
import { TenantInfo } from 'context/types'
import SchedulingRules from './SchedulingRules'

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

function getEndTime(time: string, duration: number) {
    const [hour, minutes] = time.split(':')
    let total_minutes = parseInt(hour) * 60 + parseInt(minutes)
    total_minutes = total_minutes + duration
    const to_hour = Math.floor(total_minutes / 60)
    const end_time = [
        to_hour,
        `0${(total_minutes - to_hour * 60) % 60}`.substr(-2),
    ].join(':')

    return end_time
}

export const ServiceModalCloser = ModalProvider.Closer

function ServiceModal(
    { tenant_id, data } = {
        tenant_id: '',
        data: {},
    }
) {
    const {
        setAttributes,
        attributes,
        ServiceModal: Context,
        tenant,
    } = useAuth()
    const { lang, translations: common_translations } = useAppContext()
    const [translations, setTranslations] = useState(common_translations)
    const [prompt_message, toggleDialog] = useState<string | ReactElement>(
        ''
    )
    const categories: Record<string, string>[] = (attributes.categories ||
        []) as Record<string, string>[]

    const group_classes =
        (attributes &&
            (attributes.group_classes as ModalDataAttributes[])) ||
        []

    const { data: page_translation } = useFetch(
        `/v1/contents?url=${encodeURI(
            'https://cms.aot.plus/jsonapi/node/page_translation/c59c7fce-c546-4993-a1e7-2c54336c1bc4'
        )}`,
        FetchMethods.GET,
        true,
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
        location_list &&
        location_list.content &&
        location_list.numberOfElements > 0
            ? location_list.content.map((loc: Record<string, string>) => ({
                  value: loc.id,
                  text: loc.name,
              }))
            : []

    async function createCategory(category: {
        name: string
        type: string
        tenantId: string
    }) {
        const created_category = await postApiRequest(
            '/v1/categories',
            category
        )

        if (created_category.id) {
            categories.push({
                value: created_category.id,
                text: created_category.name,
            })
            setAttributes({
                ...attributes,
                category: created_category.id,
                categories,
            })
        }
    }

    function handleCloseModal(e: MouseEvent<HTMLButtonElement>) {
        setAttributes({
            categories: attributes.categories,
        })
        Context.close()
        setSelectedTab(0)
    }

    function updateList() {
        setAttributes({
            has_updates: true,
        })
    }

    function handleOfferClassClick() {
        const missing_prerequisites = []
        if (locations.length > 0) {
        } else {
            missing_prerequisites.push('location')
        }
        if (staff.length > 0) {
        } else {
            missing_prerequisites.push('staff')
        }

        if (missing_prerequisites.length > 0) {
            const message = `missing_${missing_prerequisites.join('_')}`
            toggleDialog(
                <Translation
                    content_key={message}
                    translations={translations}
                />
            )
        } else {
            setAttributes({
                ...attributes,
                group_classes: [
                    {
                        date: new Date(Date.now() + 24 * 60 * 60 * 1000),
                        location: locations && locations[0].value,
                        duration: attributes.duration as number,
                        staff: staff && staff[0].value,
                        time: '10:00',
                    },
                ],
            })
        }
    }

    const onSubmit = async () => {
        let success = false
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
                category: { id: attributes.category as string },
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

                if (api.id) {
                    success = true
                }
            } else {
                const api = await postApiRequest(
                    '/v1/services',
                    form_values as unknown as Record<
                        string,
                        string | number | boolean
                    >
                )

                if (api.ok) {
                    success = true
                    setAttributes({
                        categories: attributes.categories,
                        refetch: true,
                    })
                } else {
                    toggleDialog(api.message)
                }
            }
            if (success && group_classes.length > 0) {
                success = false
                group_classes.forEach(
                    async ({
                        date,
                        time,
                        is_recurring,
                        id,
                        location: locationId,
                        staff: staffId,
                    }) => {
                        const group_class: {} = {
                            id,
                            effectiveDate: date,
                            startTime: time,
                            endTime: getEndTime(
                                time as string,
                                form_values.duration as number
                            ),
                            recurring: is_recurring,
                            duration: form_values.duration,
                            serviceId: attributes.id as string,
                            groupClassSetting: {
                                locationId,
                                staffId,
                            },
                        }
                        let offer_api
                        if (id) {
                            offer_api = await putApiRequest(
                                `/v1/group_classes/${id}`,
                                group_class
                            )
                        } else {
                            offer_api = await postApiRequest(
                                '/v1/group_classes',
                                group_class
                            )
                        }
                        if (!offer_api.ok) {
                            console.log('API Error for Group Class')
                            console.log(offer_api.message, id, time, date)
                        }
                    }
                )
                success = true
            }
            if (success) Context.close()
        } catch (e) {
            const { message } = e as Record<string, string>
            toggleDialog(message)
        }
    }
    useEffect(() => {
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
    }, [attributes.category, common_translations, page_translation, lang])

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
    let form_5

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
            group_classes.length == 0 ? (
                <BlankOffer
                    onNext={() => {
                        setSelectedTab(3)
                    }}
                    attributes={attributes}
                    showOfferListForm={handleOfferClassClick}
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
                        const group_classes =
                            attributes.group_classes as ModalDataAttributes[]
                        group_classes[idx] = updated_attributes
                        setAttributes({
                            ...attributes,
                            group_classes,
                        })
                    }}
                    removeItem={async (idx: number) => {
                        const group_classes =
                            attributes.group_classes as ModalDataAttributes[]
                        const { id } = group_classes[idx]
                        group_classes.splice(idx, 1)
                        setAttributes({
                            ...attributes,
                            group_classes,
                        })
                        if (id) {
                            await deleteApiRequest(
                                `/v1/group_classes/${id}?hardDelete=true`
                            )
                        }
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
                onClose={handleCloseModal}
            />
        )

        form_5 = (
            <SchedulingRules
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
                                    tenant={tenant as TenantInfo}
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
                        {form_5 ? (
                            <TabStripTab
                                title={
                                    <Translation
                                        content_key="scheduling_rules_title"
                                        translations={translations}
                                    />
                                }
                            >
                                <div className="p-10">{form_5}</div>
                            </TabStripTab>
                        ) : (
                            ''
                        )}
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
