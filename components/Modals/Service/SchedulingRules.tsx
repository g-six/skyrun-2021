import { RadioGroup, Switch } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/solid'
import Translation from 'components/Translation'
import { useState } from 'react'
import { classNames } from 'utils/dom-helpers'
import { ModalDataAttributes } from '../types'

export function SchedulingRules({
    attributes,
    onChangeAttribute,
    translations,
    onPrevious,
    onNext,
}: {
    attributes: ModalDataAttributes
    onChangeAttribute(d: ModalDataAttributes): void
    translations: Record<string, string>
    onPrevious(): void
    onNext(): void
}) {
    const privacy_options = [
        {
            name: 'Public',
            description:
                'Include this service on your Customer Booking Page',
            value: true,
        },
        {
            name: 'Private',
            description:
                'Only offer this service privately by sharing the direct link',
            value: false,
        },
    ]

    const [use_global_limits, toggleGlobalLimits] = useState<boolean>(false)

    return (
        <div
            className="relative flex flex-col gap-8"
            style={{ minHeight: '600px' }}
        >
            <div>
                <div className="text-primary text-xl font-medium font-display">
                    <div className="grid grid-cols-2 xl:grid-cols-5">
                        <div className="col-span-1 xl:col-span-3">
                            <Translation
                                content_key="scheduling_limits_title"
                                translations={translations}
                            />
                            <Translation
                                render_as="div"
                                className="text-base font-thin font-display text-gray-400 mt-2"
                                content_key="scheduling_limits_body"
                                translations={translations}
                            />
                        </div>
                        <div className="col-span-1 xl:col-span-2 flex gap-3 items-center">
                            <Switch
                                name="use_global_limits"
                                id="use_global_limits"
                                checked={use_global_limits}
                                onChange={toggleGlobalLimits}
                                className={`${
                                    use_global_limits
                                        ? 'bg-primary'
                                        : 'bg-gray-300'
                                }
        block relative inline-flex mt-2 flex-shrink-0 h-7 w-12 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                            >
                                <Translation
                                    translations={translations}
                                    className="sr-only"
                                    content_key="use_global_limits_label"
                                    render_as="span"
                                />
                                <span
                                    aria-hidden="true"
                                    className={`${
                                        use_global_limits
                                            ? 'translate-x-5'
                                            : 'translate-x-0'
                                    }
        pointer-events-none inline-block h-6 w-6 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
                                />
                            </Switch>
                            <div className="flex gap-3 items-center">
                                <Translation
                                    render_as="label"
                                    className="text-gray-500 text-base font-sans"
                                    content_key="use_global_limits_label"
                                    translations={translations}
                                />

                                <Translation
                                    render_as="label"
                                    className="text-primary-150 text-sm font-sans"
                                    content_key="edit_global_limits_label"
                                    translations={translations}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-primary-light text-lg font-medium font-display">
                <Translation
                    content_key="booking_title"
                    translations={translations}
                />
                <div className="block w-full rounded-lg h-20 bg-gray-100 flex">
                    <div></div>
                    <div></div>
                </div>
            </div>
            <div className="my-6 flex-1"></div>

            <div className="flex justify-end">
                <button
                    type="button"
                    className="border border-gray-300 rounded-lg py-3 inline-block mr-3 px-10"
                    onClick={() => {
                        onPrevious()
                    }}
                >
                    <Translation
                        content_key="previous"
                        translations={translations}
                    />
                </button>
                <button
                    type="button"
                    onClick={() => {
                        onNext()
                    }}
                    className={classNames(
                        'group relative flex justify-center',
                        'py-3 px-12 border border-transparent',
                        'rounded-md text-white',
                        'focus:outline-none',
                        attributes.loading
                            ? 'bg-primary-light'
                            : attributes.api_error
                            ? 'bg-red-700 hover:bg-primary-dark focus:ring-2 focus:ring-offset-2 focus:ring-primary-light'
                            : 'bg-primary hover:bg-primary-dark focus:ring-2 focus:ring-offset-2 focus:ring-primary-light'
                    )}
                >
                    <Translation
                        content_key="finish"
                        translations={translations}
                    />
                </button>
            </div>
        </div>
    )
}

export default SchedulingRules
