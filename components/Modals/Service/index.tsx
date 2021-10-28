import { useEffect, useState } from 'react'
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
    const { ServiceModal } = useAuth()
    const { lang } = useAppContext()
    const ui_text = {
        title_bar: 'New Tenant',
        service_type_label: 'Service type',
        last_name_label: 'Last name',
        email_address_label: 'Email address',
        business_name_label: 'Business name',
        signup_button: 'Sign Up',
    }

    const [translations, setTranslations] = useState(ui_text)
    const { data: translation } = useFetch(
        `/v1/contents?url=${encodeURI(
            'https://cms.aot.plus/jsonapi/node/page_translation/c59c7fce-c546-4993-a1e7-2c54336c1bc4'
        )}`,
        FetchMethods.GET,
        true,
        true
    )

    useEffect(() => {
        if (lang && translation.data?.attributes[lang]) {
            translation.data.attributes[lang].forEach(
                ({ key, value }: any) => {
                    setTranslations((translations) => ({
                        ...translations,
                        [key]: value,
                    }))
                }
            )
        }
    }, [translation, lang])

    const [selected, setSelected] = useState<number>(0)
    const handleSelect = (e: TabStripSelectEventArguments) => {
        setSelected(e.selected)
    }

    return (
        <ModalProvider.Visible>
            <ModalWrapper>
                <div className="bg-white shadow-2xl overflow-hidden sm:rounded-md w-full lg:w-3/4 xl:w-2/3 mx-auto my-4 relative border-2 border-gray-100">
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
                        selected={selected}
                        onSelect={handleSelect}
                        className="z-20"
                        animation={false}
                    >
                        <TabStripTab title="Basic Info">
                            <div className="p-10">
                                <GeneralForm translations={translations} />
                            </div>
                        </TabStripTab>
                        <TabStripTab title="Appointments">
                            <div className="p-10">
                                <Appointments />
                            </div>
                        </TabStripTab>
                        <TabStripTab title="Memberships">WIP</TabStripTab>
                        <TabStripTab title="Orders">WIP</TabStripTab>
                    </TabStrip>
                </div>
            </ModalWrapper>
        </ModalProvider.Visible>
    )
}

export default ServiceModal
