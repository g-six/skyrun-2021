import { Wrapper } from 'components/types'

export function ModalWrapper({ children }: Wrapper) {
    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-center z-20">
            <div className="m-auto pt-20 h-screen flex flex-col justify-center xl:w-wide">
                {children}
            </div>
        </div>
    )
}
