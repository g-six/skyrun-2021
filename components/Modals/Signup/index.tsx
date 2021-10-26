import { SignUpCommandOutput } from '@aws-sdk/client-cognito-identity-provider'
import { CursorClickIcon } from '@heroicons/react/solid'
import { Tier, useAppContext } from 'context/AppContext'
import { AuthContext, useAuth } from 'context/AuthContext'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { CognitoErrorTypes } from 'services/CognitoErrorTypes'
import { classNames } from 'utils/dom-helpers'
import { useFetch } from 'utils/fetch-helper'
import { FetchMethods } from 'utils/types'
import { createModal } from '../ModalFactory'
import { ModalWrapper } from '../ModalWrapper'
import { SubmitError } from '../types'

type FormValues = {
    email: string
    password: string
    first_name: string
    last_name: string
    name: string
}

const ModalProvider = createModal(
    AuthContext,
    'SignupModal',
    () => <span>Try it for free</span>,
    undefined,
    undefined
)

export const SignupModalOpener = ModalProvider.Opener
export const SignupModalCloser = ModalProvider.Closer

function SignupModal() {
    const ctx = useAuth()
    const { lang } = useAppContext()
    const [loading, toggleLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const ui_text = {
        title_bar: 'Signup',
        promotional_header:
            'Join us today as an early adopter and receive 50% off your first 3 months with AOT!',
        first_name_label: 'First name',
        last_name_label: 'Last name',
        email_address_label: 'Email address',
        password_label: 'Password',
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
            translation.data.attributes[lang].forEach(
                ({ key, value }: any) => {
                    setTranslations((translations) => ({
                        ...translations,
                        [key]: value,
                    }))
                }
            )
        }
    }, [translation, lang])

    const { tier } = ctx.SignupModal.attributes as Record<
        string,
        string | Tier
    >

    const onSubmit: SubmitHandler<FormValues> = async (
        values: Record<string, string>
    ) => {
        toggleLoading(true)
        try {
            const { email, password, name, first_name, last_name } = values
            const cognito_res: SignUpCommandOutput = (await ctx.signup(
                email,
                password,
                first_name,
                last_name
            )) as SignUpCommandOutput

            if (cognito_res) {
                const user = {
                    email,
                    firstName: first_name,
                    lastName: last_name,
                    cognitoId: cognito_res.UserSub,
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
            }
        } catch (e) {
            const { name: error_name, message } = e as SubmitError
            if (error_name == CognitoErrorTypes.UserExistsException) {
                setError('email', {
                    type: CognitoErrorTypes.UserExistsException,
                    message,
                })
            }
            if (error_name == CognitoErrorTypes.InvalidPasswordException) {
                setError('password', {
                    type: CognitoErrorTypes.InvalidPasswordException,
                    message,
                })
            }
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
                        <SignupModalCloser className="self-center" />
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
                            <div className="alert bg-secondary text-white bg-opacity-80 px-3 py-2 rounded-md mb-6">
                                {translations.promotional_header}
                            </div>
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
                                        {translations.first_name_label}
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
                                        {translations.last_name_label}
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

                            <fieldset className="pb-6">
                                <label
                                    htmlFor="password"
                                    className={classNames(
                                        'block font-bold text-gray-600',
                                        errors.password?.type
                                            ? 'text-red-700'
                                            : ''
                                    )}
                                >
                                    {translations.password_label}
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    autoComplete="email"
                                    className={classNames(
                                        'mt-1 focus:ring-primary-light focus:border-primary-light block w-full shadow-sm sm:text-sm border-gray-300 rounded-md',
                                        errors.password?.type
                                            ? 'border-red-300 bg-red-100'
                                            : ''
                                    )}
                                    {...register('password', {
                                        required: true,
                                        minLength: 8,
                                    })}
                                />
                                {errors.password?.type === 'required' && (
                                    <span className="text-sm text-red-700">
                                        Password is required
                                    </span>
                                )}
                                {errors.password?.type === 'length' && (
                                    <span className="text-sm text-red-700">
                                        Password should have at least 8
                                        alpha-numeric
                                    </span>
                                )}
                                {errors.password?.type ===
                                    CognitoErrorTypes.InvalidPasswordException && (
                                    <span className="text-sm text-red-700">
                                        {errors.password.message}
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
                                            <CursorClickIcon
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

export default SignupModal
