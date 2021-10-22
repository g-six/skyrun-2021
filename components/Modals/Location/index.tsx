import { useState } from 'react'
import { createModal } from '../ModalFactory'
import { AuthContext } from 'context/AuthContext'
import { ModalWrapper } from '../ModalWrapper'
import {
    TabStrip,
    TabStripSelectEventArguments,
    TabStripTab,
} from '@progress/kendo-react-layout'
import GeneralForm from './GeneralForm'
import Appointments from './Appointments'

const ModalProvider = createModal(
    AuthContext,
    'LocationModal',
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

export const LocationModalOpener = ModalProvider.Opener
export const LocationModalCloser = ModalProvider.Closer

function LocationModal() {
    const [selected, setSelected] = useState<number>(0)
    const handleSelect = (e: TabStripSelectEventArguments) => {
        setSelected(e.selected)
    }

    return (
        <ModalProvider.Visible>
            <ModalWrapper>
                <div className="bg-white shadow-2xl overflow-hidden sm:rounded-md w-11/12 xl:w-2/3 mx-auto my-4 relative border-2 border-gray-100">
                    <div className="flex px-4 text-gray-500 z-10 w-full pt-4 bg-opacity-30 pb-3 bg-primary-lighter">
                        <div>
                            <ul className="ml-6 text-xs flex gap-1 breadcrumbs text-gray-400">
                                <li>Dashboard</li>
                                <li>Location</li>
                            </ul>
                            <span className="inline-block self-center text-lg text-primary-dark">
                                <LocationModalCloser className="self-center" />
                                <span className="circular">
                                    New Location
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
                        <TabStripTab title="General">
                            <div className="p-10">
                                <GeneralForm />
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

export default LocationModal
