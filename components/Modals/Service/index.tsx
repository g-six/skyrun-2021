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
import { useFetch } from 'utils/fetch-helper'
import { useAppContext } from 'context/AppContext'
import ServiceModalStaff from './Staff'
import { ServiceApiItem } from 'types/service'
import { ServiceType } from './types'
import { TenantInfo } from 'context/types'
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

function ServiceModal() {
    const { ServiceModal, tenant } = useAuth()
    const { lang, translations: common_translations } = useAppContext()
    const [translations, setTranslations] = useState(common_translations)
    const [prompt_message, toggleDialog] = useState<string>('')
    const [attributes, setAttributes] = useState<ModalDataAttributes>({})

    const categories =
        (attributes &&
            (attributes.categories as unknown as Record<
                string,
                string
            >[])) ||
        []

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
    } = useFetch('/v1/categories', FetchMethods.GET, true)

    const {
        data: create_category_api_response,
        status: create_category_status,
        doFetch: createCategory,
    } = useFetch('/v1/categories', FetchMethods.POST, false)

    const {
        data: service_api_response,
        status: service_api_status,
        doFetch: postService,
    } = useFetch(
        attributes?.id ? `/v1/services/${attributes?.id}` : '/v1/services',
        attributes?.id ? FetchMethods.PUT : FetchMethods.POST,
        false
    )

    function handleCloseModal(e: MouseEvent<HTMLButtonElement>) {
        ServiceModal.setAttributes({})
        ServiceModal.close()
    }

    function updateList() {
        ServiceModal.setAttributes({
            has_updates: true,
        })
    }

    if (!attributes || !attributes?.service_type) {
        setAttributes({
            ...attributes,
            service_type: ServiceType.APPOINTMENT,
        })
    }

    const onSubmit = async () => {
        service_api_response.message = undefined
        service_api_response.type = undefined
        try {
            const {
                name,
                category,
                description,
                duration,
                max_participants,
                primary_color,
                price,
                service_type,
            } = attributes as unknown as Record<string, string>
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
                category: {
                    id: category as string,
                },
                description,
                duration: duration as unknown as number,
                name,
                tenant: tenant as TenantInfo,
                maxCapacity: max_participants as unknown as number,
                public: true,
                price: price as unknown as number,
                primaryColorHex: primary_color,
                type: 'APPOINTMENT',
                staff: staff_assigned as unknown as {
                    id: string
                    user: UserModel
                }[],
                series: false,
            }

            if (service_type == ServiceType.APPOINTMENT)
                form_values.type = 'APPOINTMENT'
            if (service_type == ServiceType.GROUP)
                form_values.type = 'GROUP'
            if (service_type == ServiceType.SERIES) {
                form_values.type = 'SERIES'
                form_values.series = true
            }

            const res = await postService(form_values)

            if (res?.ok) {
                updateList()
                ServiceModal.close()
            }
        } catch (e) {
            const { message } = e as Record<string, string>
            toggleDialog(message)
        }
    }
    useEffect(() => {
        if (service_api_response && service_api_response.message) {
            toggleDialog(service_api_response.message)
            service_api_response.message = undefined
            service_api_response.type = undefined
        }
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
        attributes,
        setAttributes,
        categories_api_response,
        categories_api_status,
        create_category_status,
        service_api_response,
        service_api_status,
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

    if (attributes && attributes.service_type == ServiceType.GROUP) {
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
                            offerings: [
                                {
                                    id: 'test',
                                },
                            ],
                        })
                    }}
                    translations={translations}
                />
            ) : tenant ? (
                <ServiceModalOfferClasses
                    onPrevious={() => setSelectedTab(1)}
                    onNext={() => {
                        setSelectedTab(3)
                    }}
                    attributes={attributes}
                    tenant_id={tenant && tenant.id}
                    removeAll={() => {
                        console.log('remove all')
                    }}
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
                translations={translations}
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
                                    {ServiceModal.attributes?.id
                                        ? 'Edit'
                                        : 'New'}{' '}
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