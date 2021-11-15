import { RadioGroup } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/solid'
import Translation from 'components/Translation'
import { classNames } from 'utils/dom-helpers'
import { ModalDataAttributes } from '../types'

export function ServiceModalBooking({
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
            description: 'Include this service on your Customer Booking Page',
            value: true,
        },
        {
            name: 'Private',
            description: 'Only offer this service privately by sharing the direct link',
            value: false,
        },
    ]
    return (
        <div
            className="relative flex flex-col gap-8"
            style={{ minHeight: '600px' }}
        >
            <div>
                <div className="text-primary text-xl font-medium font-display">
                    <Translation
                        content_key="privacy_title_1"
                        translations={translations}
                    />
                    <Translation
                        render_as="div"
                        className="text-base font-thin font-display text-gray-400 mt-2"
                        content_key="privacy_body"
                        translations={translations}
                    />
                </div>
                <div className="my-6">
                    <RadioGroup
                        value={attributes.is_public as boolean}
                        onChange={(is_public) => {
                            onChangeAttribute({
                                is_public,
                            })
                        }}
                    >
                        <RadioGroup.Label className="sr-only">
                            <Translation
                                content_key="privacy"
                                translations={translations}
                            />
                        </RadioGroup.Label>

                        <div className="space-y-2 xl:flex gap-6">
                            {privacy_options.map((op) => {
                                return (
                                    <RadioGroup.Option
                                        key={op.name}
                                        value={op.value}
                                        className={({ active, checked }) => {
                                            return classNames(
                                                active
                                                    ? 'ring-2 ring-offset-2 ring-offset-sky-300 ring-primary-light ring-opacity-60'
                                                    : '',
                                                checked
                                                    ? 'text-primary'
                                                    : 'bg-red',
                                                'relative rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none'
                                            )
                                        }}
                                    >
                                        {({ active, checked }) => {
                                            return (
                                                <>
                                                    <div className="flex items-center justify-between w-full">
                                                        <div className="flex-shrink-0 text-primary w-10">
                                                            {checked && (
                                                            <CheckIcon className="w-6 h-6" />
                                                            )}
                                                        </div>
                                                        <div className="flex flex-1 items-center">
                                                            <div className="text-sm">
                                                                <RadioGroup.Label
                                                                    as="p"
                                                                    className={`font-medium  ${
                                                                        checked
                                                                            ? 'text-primary'
                                                                            : 'text-gray-400'
                                                                    }`}
                                                                >
                                                                    {op.name}
                                                                </RadioGroup.Label>
                                                                <RadioGroup.Description
                                                                    as="span"
                                                                    className={`inline ${
                                                                        checked
                                                                            ? 'text-primary'
                                                                            : 'text-gray-400'
                                                                    }`}
                                                                >
                                                                    <span>
                                                                        {
                                                                            op.description
                                                                        }
                                                                    </span>
                                                                </RadioGroup.Description>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        }}
                                    </RadioGroup.Option>
                                )
                            })}
                        </div>
                    </RadioGroup>
                </div>
            </div>
            <div className="text-primary text-xl font-medium font-display">
                <Translation
                    content_key="sharing_title_2"
                    translations={translations}
                />
                <Translation
                    render_as="div"
                    className="text-base font-thin font-display text-gray-400 mt-2"
                    content_key="sharing_body"
                    translations={translations}
                />
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
                        content_key="previous_button"
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
                        content_key="finish_button"
                        translations={translations}
                    />
                </button>
            </div>
        </div>
    )
}

export default ServiceModalBooking
