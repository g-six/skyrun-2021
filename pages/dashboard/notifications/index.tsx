import ToggleSwitch from 'components/ToggleSwitch'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { classNames } from 'utils/dom-helpers'
import { useFetch } from 'utils/fetch-helper'
import { FetchMethods } from 'utils/types'
import Dashboard from '..'

type FormValues = {
    bccRecipient?: string
    ccRecipient?: string
    toRecipient: string
    subject: string
    bodyHtml: string
}

function NotificationsPage() {
    const [loading, toggleLoading] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        reset,
    } = useForm<FormValues>({
        mode: 'onChange',
    })
    const { doFetch } = useFetch(
        '/v1/notification/send_email',
        FetchMethods.POST,
        false
    )

    const onSubmit: SubmitHandler<FormValues> = async (
        values: Record<string, string>
    ) => {
        toggleLoading(true)

        try {
            const {
                bccRecipient,
                ccRecipient,
                toRecipient,
                subject,
                bodyHtml,
            } = values

            const res = await doFetch({
                toRecipient,
                bccRecipient,
                ccRecipient,
                subject,
                bodyHtml,
            })

            if (res) {
                reset()
            }
        } catch (e) {
            console.log('/v1/notification/send_email error:', e)
        }

        toggleLoading(false)
    }

    return (
        <Dashboard>
            <div className={classNames('py-2 px-8')}>
                <Collapsible headerText="Booking and Appointments Email">
                    <div>
                        {[1, 2, 3, 4, 5].map((i) => (
                            <>
                                <div
                                    className={classNames(
                                        'grid grid-cols-12 border-b-2 border-gray-300 py-3 bg-gray-50'
                                    )}
                                    key={i}
                                >
                                    <div
                                        className={classNames(
                                            'col-span-1 flex justify-center pt-6'
                                        )}
                                    >
                                        <i
                                            className={classNames(
                                                'feather-align-justify'
                                            )}
                                        />
                                    </div>
                                    <div
                                        className={classNames('col-span-6')}
                                    >
                                        <div
                                            className={classNames(
                                                'text-lg font-bold py-2'
                                            )}
                                        >
                                            Booking Confirmation
                                        </div>
                                        <div
                                            className={classNames(
                                                'text-sm'
                                            )}
                                        >
                                            Sent To A Client When A Booking
                                            Is Made
                                        </div>
                                    </div>
                                    <div
                                        className={classNames(
                                            'col-span-1 flex justify-center pt-3'
                                        )}
                                    >
                                        <ToggleSwitch isOn={false} />
                                    </div>
                                    <div
                                        className={classNames(
                                            'col-span-1 flex justify-center pt-6'
                                        )}
                                    >
                                        On
                                    </div>
                                    <div
                                        className={classNames(
                                            'col-span-3 flex justify-center pt-3'
                                        )}
                                    >
                                        <button
                                            className={classNames(
                                                'items-center text-primary px-8 py-2',
                                                'font-thin rounded-lg mb-3 border border-gray-300',
                                                'rounded-r-mdk'
                                            )}
                                        >
                                            Customize Email
                                        </button>
                                    </div>
                                </div>
                            </>
                        ))}
                    </div>
                </Collapsible>
                <Collapsible headerText="Membership Emails">
                    <div>
                        <h1>THIS IS FOR MEMBERSHIP EMAILS</h1>
                    </div>
                </Collapsible>
                <Collapsible headerText="Promotions">
                    <div>
                        <h1>This is for Promotions</h1>
                    </div>
                </Collapsible>
            </div>
            <span>
                {/* <form
                    method="POST"
                    onSubmit={handleSubmit(onSubmit)}
                    className="z-20 pt-16 px-10"
                >
                    <fieldset className="pb-6">
                        <label
                            htmlFor="to-recipient"
                            className={classNames(
                                'block font-bold text-gray-600',
                                errors.toRecipient?.type ? 'text-red-700' : ''
                            )}
                        >
                            To
                        </label>
                        <input
                            type="text"
                            className={classNames(
                                'mt-1 focus:ring-primary-light focus:border-primary-light block w-full shadow-sm sm:text-sm border-gray-300 rounded-md',
                                errors.toRecipient?.type
                                    ? 'border-red-300 bg-red-100'
                                    : ''
                            )}
                            {...register('toRecipient', {
                                required: true,
                            })}
                            placeholder="Separate emails with comma"
                        />
                        {errors.toRecipient?.type === 'required' && (
                            <span className="text-sm text-red-700">
                                To recipients is required
                            </span>
                        )}
                    </fieldset>
                    <fieldset className="pb-6">
                        <label
                            htmlFor="bcc-recipient"
                            className={classNames(
                                'block font-bold text-gray-600',
                                errors.bccRecipient?.type ? 'text-red-700' : ''
                            )}
                        >
                            BCC
                        </label>
                        <input
                            type="text"
                            className={classNames(
                                'mt-1 focus:ring-primary-light focus:border-primary-light block w-full shadow-sm sm:text-sm border-gray-300 rounded-md',
                                errors.bccRecipient?.type
                                    ? 'border-red-300 bg-red-100'
                                    : ''
                            )}
                            {...register('bccRecipient', {
                                required: false,
                            })}
                            placeholder="Separate emails with comma"
                        />
                    </fieldset>
                    <fieldset className="pb-6">
                        <label
                            htmlFor="cc-recipient"
                            className={classNames(
                                'block font-bold text-gray-600',
                                errors.ccRecipient?.type ? 'text-red-700' : ''
                            )}
                        >
                            CC
                        </label>
                        <input
                            type="text"
                            className={classNames(
                                'mt-1 focus:ring-primary-light focus:border-primary-light block w-full shadow-sm sm:text-sm border-gray-300 rounded-md',
                                errors.ccRecipient?.type
                                    ? 'border-red-300 bg-red-100'
                                    : ''
                            )}
                            {...register('ccRecipient', {
                                required: false,
                            })}
                            placeholder="Separate emails with comma"
                        />
                    </fieldset>
                    <fieldset className="pb-6">
                        <label
                            htmlFor="email-subject"
                            className={classNames(
                                'block font-bold text-gray-600',
                                errors.subject?.type ? 'text-red-700' : ''
                            )}
                        >
                            Email Subject
                        </label>
                        <input
                            type="text"
                            className={classNames(
                                'mt-1 focus:ring-primary-light focus:border-primary-light block w-full shadow-sm sm:text-sm border-gray-300 rounded-md',
                                errors.subject?.type
                                    ? 'border-red-300 bg-red-100'
                                    : ''
                            )}
                            {...register('subject', {
                                required: true,
                            })}
                        />
                        {errors.subject?.type === 'required' && (
                            <span className="text-sm text-red-700">
                                Email subject is required
                            </span>
                        )}
                    </fieldset>
                    <fieldset className="pb-6">
                        <label
                            htmlFor="email-body"
                            className={classNames(
                                'block font-bold text-gray-600',
                                errors.bodyHtml?.type ? 'text-red-700' : ''
                            )}
                        >
                            Email Body
                        </label>
                        <textarea
                            id="email-body"
                            className={classNames(
                                'mt-1 focus:ring-primary-light focus:border-primary-light block w-full shadow-sm sm:text-sm border-gray-300 rounded-md',
                                errors.bodyHtml?.type
                                    ? 'border-red-300 bg-red-100'
                                    : ''
                            )}
                            {...register('bodyHtml', {
                                required: true,
                            })}
                        />
                        {errors.bodyHtml?.type === 'required' && (
                            <span className="text-sm text-red-700">
                                Email body is required
                            </span>
                        )}
                    </fieldset>
                    <button
                        type="submit"
                        className={classNames(
                            'group relative w-full flex justify-center',
                            'py-2 mt-4 px-4 border border-transparent',
                            'text-md rounded-md text-white',
                            'focus:outline-none',
                            loading
                                ? 'bg-primary-light'
                                : 'bg-primary hover:bg-primary-dark focus:ring-2 focus:ring-offset-2 focus:ring-primary-light'
                        )}
                        onClick={handleSubmit(onSubmit)}
                    >
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                            {loading ? (
                                <svg
                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                            ) : (
                                <i className="feather-send font-bold" />
                            )}
                        </span>
                        Send Email
                    </button>
                </form> */}
            </span>
        </Dashboard>
    )
}

type CollapsibleProps = {
    headerText: string
    children: string | JSX.Element | JSX.Element[]
}

function Collapsible({ headerText, children }: CollapsibleProps) {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <div className={classNames('collapsible-container mb-4')}>
                <div
                    className={classNames(
                        'collapsible-header ',
                        'flex bg-blue-50 w-full',
                        'py-4 text-xl rounded-t-lg',
                        !isOpen ? 'rounded-b-lg' : ''
                    )}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div
                        className={classNames(
                            'w-11/12 pt-1 pl-4 font-bold'
                        )}
                    >
                        {headerText}
                    </div>
                    <i
                        className={classNames(
                            'px-4 text-2xl cursor-pointer',
                            isOpen
                                ? 'feather-chevron-down'
                                : 'feather-chevron-right'
                        )}
                    />
                </div>
                <div
                    className={classNames(
                        'collapsible-body ',
                        'bg-red-50 align-middle justify-center item-center',
                        isOpen ? 'contents' : 'hidden'
                    )}
                >
                    {children}
                </div>
            </div>
        </>
    )
}

export default NotificationsPage
