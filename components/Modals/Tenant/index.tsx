import { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { CognitoErrorTypes } from 'services/CognitoErrorTypes'
import { createModal } from '../ModalFactory'
import { AuthContext, useAuth } from 'context/AuthContext'
import { FetchMethods, useFetch } from 'utils/fetch-helper'
import { SubmitError } from '../types'
import { Tier, useAppContext } from 'context/AppContext'
import { getTranslation } from 'utils/language-helper'
import { ModalWrapper } from '../ModalWrapper'
import { classNames } from 'utils/dom-helpers'
import { OfficeBuildingIcon } from '@heroicons/react/solid'

type FormValues = {
    email: string
    password: string
    first_name: string
    last_name: string
    name: string
}

const ModalProvider = createModal(
    AuthContext,
    'TenantModal',
    () => <span>Try it for free</span>,
    undefined,
    undefined
)

export const TenantModalOpener = ModalProvider.Opener
export const TenantModalCloser = ModalProvider.Closer

function TenantModal() {
    const ctx = useAuth()
    const { lang } = useAppContext()
    const [loading, toggleLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const ui_text = {
        title_bar: 'New Tenant',
        first_name_label: 'First name',
        last_name_label: 'Last name',
        email_address_label: 'Email address',
        business_name_label: 'Business name',
        signup_button: 'Sign Up',
    }

    const [translations, setTranslations] = useState(ui_text)

    const api_fetch = useFetch('/v1/tenants', FetchMethods.POST, false)
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        reset,
    } = useForm<FormValues>({
        mode: 'onChange',
    })

    const { data: translation } = useFetch(
        `/v1/contents?url=${encodeURI(
            'https://cms.aot.plus/jsonapi/node/page_translation/c043c316-895c-4d7d-862c-40da5cbb91da'
        )}`,
        FetchMethods.GET,
        true,
        true
    )

    useEffect(() => {
        if (lang && translation.data?.attributes[lang]) {
            setTranslations({
                title_bar: getTranslation(
                    'title_bar',
                    translation.data?.attributes[lang]
                ),
                signup_button: getTranslation(
                    'signup_button',
                    translation.data?.attributes[lang]
                ),
                first_name_label: getTranslation(
                    'first_name_label',
                    translation.data?.attributes[lang]
                ),
                last_name_label: getTranslation(
                    'last_name_label',
                    translation.data?.attributes[lang]
                ),
                email_address_label: getTranslation(
                    'email_address_label',
                    translation.data?.attributes[lang]
                ),
                business_name_label: getTranslation(
                    'business_name_label',
                    translation.data?.attributes[lang]
                ),
            })
        }
    }, [translation, lang])

    const { tier } = ctx.TenantModal.attributes as Record<
        string,
        string | Tier
    >

    const onSubmit: SubmitHandler<FormValues> = async (
        values: Record<string, string>
    ) => {
        toggleLoading(true)
        try {
            const { email, name, first_name, last_name } = values

            const user = {
                email,
                firstName: first_name,
                lastName: last_name,
                cognitoId: ctx.user?.cognito_id,
            }
            const res = await api_fetch.doFetch({
                tier,
                user,
                name,
            })
            if (res) {
                reset()
                setSuccess(true)
            }
        } catch (e) {
            const { name: error_name, message } = e as SubmitError
        }
        toggleLoading(false)
    }

    return (
        <ModalProvider.Visible>
            <ModalWrapper>
                <div className="bg-white shadow-xl overflow-hidden sm:rounded-md w-11/12 sm:w-2/3 lg:w-1/2 xl:w-1/3 m-auto relative py-8">
                    <div className="flex justify-between px-10 text-gray-500 absolute z-10 h-10 w-full">
                        <span className="inline-block self-center text-lg font-light text-gray-600">
                            {success
                                ? 'Congratulations!'
                                : translations.title_bar}
                        </span>
                        <TenantModalCloser className="self-center" />
                    </div>
                    {success ? (
                        <div className="z-20 pt-16 px-10">
                            <p className="text-lg font-light">
                                Please check your email inbox for your
                                account activation link.
                            </p>
                        </div>
                    ) : (
                        <form
                            method="POST"
                            onSubmit={handleSubmit(onSubmit)}
                            className="z-20 pt-12 px-10"
                        >
                            <div className="pb-6 lg:flex">
                                <fieldset className="pb-6 lg:pb-0 lg:w-1/2 lg:pr-2">
                                    <label
                                        htmlFor="first-name"
                                        className={classNames(
                                            'block font-bold text-gray-600',
                                            errors.first_name?.type
                                                ? 'text-red-700'
                                                : ''
                                        )}
                                    >
                                        First name
                                    </label>
                                    <input
                                        type="text"
                                        id="first-name"
                                        autoComplete="first_name"
                                        className={classNames(
                                            'mt-1 focus:ring-primary-light focus:border-primary-light block w-full shadow-sm sm:text-sm border-gray-300 rounded-md',
                                            errors.first_name?.type
                                                ? 'border-red-300 bg-red-100'
                                                : ''
                                        )}
                                        {...register('first_name', {
                                            required: true,
                                            value: ctx.user?.first_name,
                                        })}
                                    />
                                    {errors.first_name?.type ===
                                        'required' && (
                                        <span className="text-sm text-red-700">
                                            First name is required
                                        </span>
                                    )}
                                </fieldset>
                                <fieldset className="lg:w-1/2 lg:pl-2">
                                    <label
                                        htmlFor="last-name"
                                        className={classNames(
                                            'block font-bold text-gray-600',
                                            errors.last_name?.type
                                                ? 'text-red-700'
                                                : ''
                                        )}
                                    >
                                        Last name
                                    </label>
                                    <input
                                        type="text"
                                        id="last-name"
                                        autoComplete="last_name"
                                        className={classNames(
                                            'mt-1 focus:ring-primary-light focus:border-primary-light block w-full shadow-sm sm:text-sm border-gray-300 rounded-md',
                                            errors.last_name?.type
                                                ? 'border-red-300 bg-red-100'
                                                : ''
                                        )}
                                        {...register('last_name', {
                                            required: true,
                                            value: ctx.user?.last_name,
                                        })}
                                    />
                                    {errors.last_name?.type ===
                                        'required' && (
                                        <span className="text-sm text-red-700">
                                            Last name is required
                                        </span>
                                    )}
                                </fieldset>
                            </div>

                            <fieldset className="pb-6">
                                <label
                                    htmlFor="business_name"
                                    className={classNames(
                                        'block font-bold text-gray-600',
                                        errors.name?.type
                                            ? 'text-red-700'
                                            : ''
                                    )}
                                >
                                    {translations.business_name_label}
                                </label>
                                <input
                                    type="text"
                                    id="business_name"
                                    autoComplete="name"
                                    className={classNames(
                                        'mt-1 focus:ring-primary-light focus:border-primary-light block w-full shadow-sm sm:text-sm border-gray-300 rounded-md',
                                        errors.name?.type
                                            ? 'border-red-300 bg-red-100'
                                            : ''
                                    )}
                                    {...register('name', {
                                        required: true,
                                    })}
                                />
                                {errors.email?.type === 'required' && (
                                    <span className="text-sm text-red-700">
                                        Business name is required
                                    </span>
                                )}
                            </fieldset>

                            <fieldset className="pb-6">
                                <label
                                    htmlFor="email-address"
                                    className={classNames(
                                        'block font-bold text-gray-600',
                                        errors.email?.type
                                            ? 'text-red-700'
                                            : ''
                                    )}
                                >
                                    {translations.email_address_label}
                                </label>
                                <input
                                    type="text"
                                    id="email-address"
                                    autoComplete="email"
                                    className={classNames(
                                        'mt-1 focus:ring-primary-light focus:border-primary-light block w-full shadow-sm sm:text-sm border-gray-300 rounded-md',
                                        errors.email?.type
                                            ? 'border-red-300 bg-red-100'
                                            : ''
                                    )}
                                    {...register('email', {
                                        required: true,
                                        value: ctx.user?.email,
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
                                            <OfficeBuildingIcon
                                                className="h-5 w-5 text-white"
                                                aria-hidden="true"
                                            />
                                        )}
                                    </span>
                                    {translations.signup_button}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </ModalWrapper>
        </ModalProvider.Visible>
    )
}

export default TenantModal