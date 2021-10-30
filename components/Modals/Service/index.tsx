import { useEffect, useState, MouseEvent } from 'react'
import { createModal } from '../ModalFactory'
import { AuthContext, useAuth } from 'context/AuthContext'
import { ModalWrapper } from '../ModalWrapper'
import {
    TabStrip,
    TabStripSelectEventArguments,
    TabStripTab,
} from '@progress/kendo-react-layout'
import GeneralForm from './GeneralForm'
import Appointments from './Appointments'
import { FetchMethods } from 'utils/types'
import { useFetch } from 'utils/fetch-helper'
import { useAppContext } from 'context/AppContext'
import GeneralModal from '../General'
import ServiceModalStaff from './Staff'
import {
    FieldValues,
    SubmitHandler,
    useForm,
    UseFormReturn,
} from 'react-hook-form'
import { ServiceFormModel } from 'types/service'
import { ServiceType } from './types'

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
    const { attributes, setAttributes } = ServiceModal
    const { lang, translations: common_translations } = useAppContext()
    const [translations, setTranslations] = useState(common_translations)

    const categories =
        (attributes &&
            (attributes.categories as unknown as Record<
                string,
                string
            >[])) ||
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

    const form: UseFormReturn = useForm<FieldValues>({
        mode: 'onChange',
    })

    function handleCloseModal(e: MouseEvent<HTMLButtonElement>) {
        ServiceModal.setAttributes({})
        ServiceModal.close()
    }

    function updateList() {
        ServiceModal.setAttributes({
            has_updates: true,
        })
    }

    form.register('category', { required: true })
    form.register('price', { required: true, valueAsNumber: true })
    form.register('service_type', {
        required: true,
        value:
            (attributes?.service_type as ServiceType) ||
            ServiceType.APPOINTMENT,
    })

    const onSubmit: SubmitHandler<Record<string, string>> = async (
        values: Record<string, string>
    ) => {
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
            } = values
            const service: Record<string, string> = {}

            if (attributes && attributes.id) {
                service.id = attributes.id as string
            }

            const form_values: ServiceApiItem = {
                id: attributes?.id as string,
                category: {
                    id: category,
                },
                description,
                duration: duration as unknown as number,
                name,
                tenant: tenant as TenantInfo,
                maxCapacity: max_participants as unknown as number,
                price: price as unknown as number,
                primaryColorHex: primary_color,
                type: undefined,
                series: false,
            }

            if (service_type == ServiceType.APPOINTMENT)
                form_values.type = 'APPOINTMENT'
            if (service_type == ServiceType.GROUP_CLASS)
                form_values.type = 'GROUP_CLASS'
            if (service_type == ServiceType.SERIES) {
                form_values.type = 'SERIES'
                form_values.series = true
            }

            const res = await postService(form_values)

            if (res?.ok) {
                updateList()
                form.reset()
                ServiceModal.close()
            }
        } catch (e: unknown) {
            const { name, message } = e as SubmitError
            console.log(name, message)
        }
    }

    useEffect(() => {
        if (create_category_status == 200) {
            console.log(create_category_api_response)
            // categories.push({
            //     text: category.name,
            //     value: category.id,
            // })
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

        // if (service_api_status >= 500) {
        //     setAttributes({
        //         ...attributes,
        //         api_error: {
        //             message: translations.api_5XX_error || 'api_5XX_error',
        //         },
        //     } as unknown as Record<string, string>)
        // } else if (service_api_status != 200) {
        //     setAttributes({
        //         ...attributes,
        //         api_error: service_api_response,
        //     } as unknown as Record<string, string>)
        // }
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
                        <TabStripTab title="Basic Info">
                            <div className="p-10">
                                <GeneralForm
                                    translations={translations}
                                    service_api_response={
                                        service_api_response
                                    }
                                    form={form}
                                    onNext={() => setSelectedTab(1)}
                                    handleCloseModal={handleCloseModal}
                                    createCategory={createCategory}
                                />
                            </div>
                        </TabStripTab>
                        <TabStripTab title="Assign Staff">
                            <div className="p-10">
                                <ServiceModalStaff
                                    onPrevious={() => setSelectedTab(0)}
                                    onNext={() => setSelectedTab(2)}
                                    translations={translations}
                                    handleCloseModal={handleCloseModal}
                                />
                            </div>
                        </TabStripTab>
                        <TabStripTab title="Memberships">WIP</TabStripTab>
                        <TabStripTab title="Orders">WIP</TabStripTab>
                    </TabStrip>
                </div>
            </ModalWrapper>
            <GeneralModal />
        </ModalProvider.Visible>
    )
}

export default ServiceModal
