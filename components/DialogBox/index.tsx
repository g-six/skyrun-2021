import { Children, FunctionComponent, ReactElement } from 'react'
import { XIcon } from '@heroicons/react/solid'
export interface Props {
    children: ReactElement[] | string
    onClose: () => void
}
export default function DialogBox({ children, onClose }: Props) {
    return (
        <div className="absolute inset-0 w-full h-screen backdrop-filter backdrop-blur-sm">
            <div className="container m-auto py-20">
                <div className="shadow-xl overflow-hidden sm:rounded-md w-3/6 m-auto relative">
                    <div className="px-4 py-5 bg-white sm:p-6">
                        <div className="text-center py-16 text-gray-500">
                            <button
                                className="absolute text-sm top-4 right-0 inline-block w-12 h-12 text-gray-500 font-extralight"
                                onClick={onClose}
                            >
                                <XIcon className="w-6" />
                            </button>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
