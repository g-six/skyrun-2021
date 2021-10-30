import { createModal } from '../ModalFactory'
import { AuthContext } from 'context/AuthContext'
import { ModalWrapper } from '../ModalWrapper'

const ModalProvider = createModal(
    AuthContext,
    'GeneralModal',
    () => (
        <>
            <i className="feather feather-plus mr-4" />
            <span className="circular">Create</span>
        </>
    ),
    () => (
        <span className="inline-block w-6 h-6 text-primary text-center font-extralight">
            <i className="feather feather-x " />
        </span>
    )
)

export const GeneralModalCloser = ModalProvider.Closer

function GeneralModal() {
    return (
        <ModalProvider.Visible>
            <ModalWrapper>
                <div className="bg-white shadow-2xl overflow-hidden sm:rounded-md w-11/12 sm:w-2/3 xl:w-1/2 mx-auto my-4 relative border-2 border-gray-100">
                    <div className="flex px-4 text-gray-500 z-10 w-full pt-4 bg-opacity-30 pb-3 bg-primary-lighter">
                        <div>
                            <span className="inline-block self-center text-lg text-primary-dark">
                                <GeneralModalCloser className="self-center" />
                                <span className="circular">New Client</span>
                            </span>
                        </div>
                    </div>
                </div>
            </ModalWrapper>
        </ModalProvider.Visible>
    )
}

export default GeneralModal
