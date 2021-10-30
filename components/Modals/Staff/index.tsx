import { useState } from 'react'
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

const ModalProvider = createModal(
    AuthContext,
    'StaffModal',
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

export const StaffModalOpener = ModalProvider.Opener
export const StaffModalCloser = ModalProvider.Closer

function StaffModal() {
    const { StaffModal } = useAuth()
    const [selected, setSelected] = useState<number>(0)
    const handleSelect = (e: TabStripSelectEventArguments) => {
        setSelected(e.selected)
    }

    return (
        <ModalProvider.Visible>
            <ModalWrapper>
                <div className="bg-white shadow-3xl w-full overflow-hidden sm:rounded-md mx-auto my-4 relative border-2 border-gray-100 flex flex-col">
                    <div className="flex px-4 text-gray-500 z-10 w-full pt-4 bg-opacity-30 pb-3 bg-primary-lighter">
                        <div>
                            <ul className="ml-6 text-xs flex gap-1 breadcrumbs text-gray-400">
                                <li>Dashboard</li>
                                <li>Staff</li>
                            </ul>
                            <span className="inline-block self-center text-lg text-primary-dark">
                                <StaffModalCloser className="self-center" />
                                <span className="circular">
                                    {StaffModal.attributes?.id
                                        ? 'Edit'
                                        : 'New'}{' '}
                                    Staff
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

export default StaffModal
