import { AuthContext, useAuth } from 'context/AuthContext'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { CognitoErrorTypes } from 'services/CognitoErrorTypes'
import { classNames } from 'utils/dom-helpers'
import { useFetch } from 'utils/fetch-helper'
import { FetchMethods } from 'utils/types'
import { createModal } from '../ModalFactory'
import { SubmitError, UserModel } from '../types'
import { GeneralFormValues } from './types'

const ModalProvider = createModal(
    AuthContext,
    'CreateClientModal',
    () => (
        <>
            <i className="feather feather-plus mr-4" />
            <span className="circular">Create</span>
        </>
    ),
    () => (
        <span className="border border-gray-300 rounded-lg py-3 inline-block mr-3 px-10">
            Cancel
        </span>
    )
)

function GeneralForm() {
    const ctx = useAuth()
    const { attributes, setAttributes } = ctx.CreateClientModal
    const [loading, toggleLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        reset,
    } = useForm<GeneralFormValues>({
        mode: 'onSubmit',
    })

    const api_fetch = useFetch(
        attributes?.id ? `/v1/clients/${attributes?.id}` : '/v1/clients',
        attributes?.id ? FetchMethods.PUT : FetchMethods.POST,
        false
    )

    function updateList() {
        ctx.CreateClientModal.setAttributes({
            has_updates: true,
        })
    }

    async function handleClose() {
        reset()
        ctx.CreateClientModal.close()
    }

    const onSubmit: SubmitHandler<GeneralFormValues> = async (
        values: Record<string, string>
    ) => {
        toggleLoading(true)
        try {
            const { email, notes, phone, first_name, last_name } = values
            const { tenant } = ctx
            const user: UserModel = {
                firstName: first_name,
                lastName: last_name,
                email,
                phone,
            }

            if (attributes && attributes.id) {
                user.id = attributes.user_id as string
            }

            const res = await api_fetch.doFetch({
                tenant,
                user,
                notes,
            })

            if (res) {
                updateList()
                reset()
                setSuccess(true)
                ctx.CreateClientModal.close()
            }
        } catch (e: unknown) {
            const { name, message } = e as SubmitError
            if (name == CognitoErrorTypes.UserExistsException) {
                setError('email', {
                    type: CognitoErrorTypes.UserExistsException,
                    message,
                })
            }
        }
        toggleLoading(false)
    }

    return (
        <form method="POST" onSubmit={handleSubmit(onSubmit)}>
            <div className="pb-6 lg:flex">
                <fieldset className="pb-6 lg:pb-0 lg:w-1/2 lg:pr-4">
                    <label
                        htmlFor="first-name"
                        className={classNames(
                            'block text-lg',
                            errors.first_name?.type ? 'text-red-700' : ''
                        )}
                    >
                        First name
                    </label>
                    <input
                        type="text"
                        id="first-name"
                        autoComplete="first_name"
                        className={classNames(
                            'px-6 py-3 mt-1 focus:ring-primary-light focus:border-primary-light block w-full shadow-sm border-gray-300 rounded-md',
                            errors.first_name?.type
                                ? 'border-red-300 bg-red-100'
                                : ''
                        )}
                        {...register('first_name', {
                            required: true,
                            value: (attributes?.first_name as string) || '',
                        })}
                    />
                    {errors.first_name?.type === 'required' && (
                        <span className="text-sm text-red-700">
                            First name is required
                        </span>
                    )}
                </fieldset>
                <fieldset className="lg:w-1/2 lg:pl-4">
                    <label
                        htmlFor="last-name"
                        className={classNames(
                            'block text-lg',
                            errors.last_name?.type ? 'text-red-700' : ''
                        )}
                    >
                        Last name
                    </label>
                    <input
                        type="text"
                        id="last-name"
                        autoComplete="last_name"
                        className={classNames(
                            'px-6 py-3 mt-1 focus:ring-primary-light focus:border-primary-light block w-full shadow-sm border-gray-300 rounded-md',
                            errors.last_name?.type
                                ? 'border-red-300 bg-red-100'
                                : ''
                        )}
                        {...register('last_name', {
                            required: true,
                            value: (attributes?.last_name as string) || '',
                        })}
                    />
                    {errors.last_name?.type === 'required' && (
                        <span className="text-sm text-red-700">
                            Last name is required
                        </span>
                    )}
                </fieldset>
            </div>

            <div className="pb-6 lg:flex">
                <fieldset className="lg:w-1/2 lg:pr-4">
                    <label
                        htmlFor="email-address"
                        className={classNames(
                            'block text-lg',
                            errors.email?.type ? 'text-red-700' : ''
                        )}
                    >
                        Email
                    </label>
                    <input
                        type="text"
                        id="email-address"
                        autoComplete="email"
                        className={classNames(
                            'px-6 py-3 mt-1 focus:ring-primary-light focus:border-primary-light block w-full shadow-sm border-gray-300 rounded-md',
                            errors.email?.type
                                ? 'border-red-300 bg-red-100'
                                : ''
                        )}
                        {...register('email', {
                            required: true,
                            value: (attributes?.email as string) || '',
                            pattern:
                                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        })}
                    />
                    {errors.email?.type === 'required' && (
                        <span className="text-sm text-red-700">
                            Email is required
                        </span>
                    )}
                    {errors.email?.type === 'pattern' && (
                        <span className="text-sm text-red-700">
                            A valid email is required
                        </span>
                    )}
                    {errors.email?.type ===
                        CognitoErrorTypes.UserExistsException && (
                        <span className="text-sm text-red-700">
                            {errors.email.message}
                        </span>
                    )}
                </fieldset>
                <fieldset className="pb-6 lg:pb-0 lg:w-1/2 lg:pl-4">
                    <label
                        htmlFor="phone"
                        className={classNames(
                            'block text-lg',
                            errors.phone?.type ? 'text-red-700' : ''
                        )}
                    >
                        Phone
                    </label>
                    <input
                        type="text"
                        id="phone"
                        autoComplete="phone"
                        className={classNames(
                            'px-6 py-3 mt-1 focus:ring-primary-light focus:border-primary-light block w-full shadow-sm border-gray-300 rounded-md',
                            errors.phone?.type
                                ? 'border-red-300 bg-red-100'
                                : ''
                        )}
                        {...register('phone', {
                            value: (attributes?.phone as string) || '',
                        })}
                    />
                    {errors.phone?.type === 'pattern' && (
                        <span className="text-sm text-red-700">
                            A valid phone is required
                        </span>
                    )}
                </fieldset>
            </div>

            <fieldset className="pb-6">
                <label
                    htmlFor="notes"
                    className={classNames(
                        'block text-lg',
                        errors.notes?.type ? 'text-red-700' : ''
                    )}
                >
                    Notes
                </label>
                <textarea
                    id="notes"
                    className={classNames(
                        'placeholder-gray-300 mt-1 h-40 focus:ring-primary-light focus:border-primary-light block w-full shadow-sm border-gray-300 rounded-md px-6 py-3',
                        errors.notes?.type
                            ? 'border-red-300 bg-red-100'
                            : ''
                    )}
                    placeholder="Private notes about client"
                    {...register('notes', {
                        required: false,
                        value: (attributes?.notes as string) || '',
                    })}
                />
                {errors.notes?.type === 'length' && (
                    <span className="text-sm text-red-700">
                        Illegal values found in notes
                    </span>
                )}
            </fieldset>

            <div>
                {Object.values(CognitoErrorTypes).includes(
                    errors.email?.type as CognitoErrorTypes
                ) ? (
                    <div className="bg-red-100 rounded px-3 py-1 mb-5">
                        {errors.email?.message && (
                            <span className="text-sm text-red-700">
                                {errors.email?.message}
                            </span>
                        )}
                    </div>
                ) : (
                    ''
                )}

                <div className="flex justify-end gap-3">
                    <button
                        type="reset"
                        onClick={() => {
                            handleClose()
                        }}
                        className="border-gray-200 rounded-lg border px-6"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className={classNames(
                            'group relative flex justify-center',
                            'py-3 px-12 border border-transparent',
                            'rounded-md text-white',
                            'focus:outline-none',
                            loading
                                ? 'bg-primary-light'
                                : 'bg-primary hover:bg-primary-dark focus:ring-2 focus:ring-offset-2 focus:ring-primary-light'
                        )}
                    >
                        Save
                    </button>
                </div>
            </div>
        </form>
    )
}

export default GeneralForm
