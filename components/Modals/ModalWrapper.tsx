import { Wrapper } from 'components/types'

export function ModalWrapper({ children }: Wrapper) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="container m-auto py-4 sm:py-20">
                <div className="pb-10 pt-6">{children}</div>
            </div>
        </div>
    )
}
