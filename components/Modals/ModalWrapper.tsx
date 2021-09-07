import { Wrapper } from 'components/types'

export function ModalWrapper({ children }: Wrapper) {
    return (
        <div className="fixed inset-0 backdrop-filter backdrop-blur-sm flex items-center justify-center z-50">
            <div className="container m-auto py-4 sm:py-20">
                <div className="shadow-xl overflow-hidden sm:rounded-md w-11/12 sm:w-2/3 lg:w-1/2 xl:w-1/3 m-auto relative">
                    <div className="bg-white pb-10 pt-6">{children}</div>
                </div>
            </div>
        </div>
    )
}
