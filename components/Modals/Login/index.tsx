import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { LockClosedIcon } from '@heroicons/react/solid'
import { useForm, SubmitHandler, ErrorOption } from 'react-hook-form'
import { MaskedTextBox } from '@progress/kendo-react-inputs'
import { CognitoErrorTypes } from 'services/CognitoErrorTypes'
import { classNames } from 'utils/dom-helpers'
import { createModal } from '../ModalFactory'
import { AuthContext, useAuth } from 'context/AuthContext'
import { ModalWrapper } from '../ModalWrapper'
import { SubmitError } from '../types'
import { FetchMethods, useFetch } from 'utils/fetch-helper'
import { getTranslation } from 'utils/language-helper'
import { useAppContext } from 'context/AppContext'
type FormValues = {
    email: string
    password?: string
    new_password?: string
    code?: string
}

const ModalProvider = createModal(AuthContext, 'LoginModal', () => (<>Login</>))

export const LoginModalOpener = ModalProvider.Opener
export const LoginModalCloser = ModalProvider.Closer

const StyledMaskedTextBox = styled(MaskedTextBox)`
    input,
    input:active,
    input:focus {
        border-color: inherit;
        outline: inherit;
        border-radius: inherit;
    }
`

function LoginModal() {
    const router = useRouter()
    const ctx = useAuth()
    const { lang } = useAppContext()
    const [translations, setTranslations] = useState({
        login_button: 'Login',
        login_title: 'Login',
        email_address_label: 'Email',
        password_label: 'Password',
        forgot_password_link: 'Forgot password?',
    })
    const [loading, toggleLoading] = useState(false)
    const [forgot_mode, setForgotMode] = useState(false)
    const [new_password_mode, setNewPasswordMode] = useState(false)
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
        `/v1/contents?url=${encodeURI('https://cms.aot.plus/jsonapi/node/page_translation/1d1a8c44-463b-474e-bc06-fc22ce77ab27')}`,
        FetchMethods.GET,
        true,
        true
    )

    useEffect(() => {
        if (lang && translation.data?.attributes[lang]) {
            setTranslations({
                login_button: getTranslation('login_button', translation.data?.attributes[lang]),
                login_title: getTranslation('login_title', translation.data?.attributes[lang]),
                email_address_label: getTranslation('email_address_label', translation.data?.attributes[lang]),
                password_label: getTranslation('password_label', translation.data?.attributes[lang]),
                forgot_password_link: getTranslation('forgot_password_link', translation.data?.attributes[lang]),
            })
        }
    }, [translation, lang])

    const onSubmitRequestReset: SubmitHandler<FormValues> = async (
        values: Record<string, string>
    ) => {
        toggleLoading(true)
        try {
            const res = await ctx.forgotPassword(values.email)
            setNewPasswordMode(true)
            setForgotMode(false)
        } catch (e) {
            const { name, message } = e as SubmitError
            setError('email', {
                type: name,
                message,
            })
        }
        toggleLoading(false)
    }

    const onSubmitNewPassword: SubmitHandler<FormValues> = async (
        values: Record<string, string>
    ) => {
        toggleLoading(true)
        try {
            await ctx.confirmForgotPassword(
                values.email,
                values.new_password,
                values.code
            )
            reset()
            setNewPasswordMode(false)
        } catch (e) {
            const { name, message } = e as SubmitError
            if (name == CognitoErrorTypes.InvalidParameterException) {
                setError('new_password', {
                    type: CognitoErrorTypes.InvalidParameterException,
                    message,
                })
            } else if (
                name == CognitoErrorTypes.InvalidPasswordException
            ) {
                setError('new_password', {
                    type: CognitoErrorTypes.InvalidPasswordException,
                    message,
                })
            } else {
                setError('email', { message })
            }
        }
        toggleLoading(false)
    }
    const onSubmit: SubmitHandler<FormValues> = async (
        values: Record<string, string>
    ) => {
        toggleLoading(true)
        try {
            const { email, password } = values
            const res = await ctx.login(email, password)

            if (res) {
                reset()
                router.push('/dashboard')
            }
        } catch (e) {
            const { name, message } = e as SubmitError
            if (name == CognitoErrorTypes.NotAuthorizedException) {
                setError('email', {
                    type: CognitoErrorTypes.NotAuthorizedException,
                    message,
                })
                setError('password', {
                    type: CognitoErrorTypes.NotAuthorizedException,
                    message,
                })
            }
            if (name == CognitoErrorTypes.UserNotConfirmedException) {
                setError('email', {
                    type: CognitoErrorTypes.UserNotConfirmedException,
                    message,
                })
                setError('password', {
                    type: CognitoErrorTypes.UserNotConfirmedException,
                    message,
                })
            }
        }
        toggleLoading(false)
    }

    return (
        <ModalProvider.Visible>
            <ModalWrapper>
                <div className="shadow-2xl bg-white overflow-hidden sm:rounded-2xl w-11/12 sm:w-2/3 lg:w-1/2 xl:w-1/3 m-auto relative py-8">
                    <div className="flex justify-between px-10 text-gray-500 absolute z-10 h-10 w-full">
                        {new_password_mode || forgot_mode ? (
                            <button
                                className="text-primary"
                                onClick={() => {
                                    setForgotMode(false)
                                    setNewPasswordMode(false)
                                }}
                            >
                                <span>&larr; </span>
                                <span className="underline">
                                    Back to Login
                                </span>
                            </button>
                        ) : (
                            <span className="inline-block self-center text-lg font-extrabold text-gray-600">
                                {translations.login_title}
                            </span>
                        )}
                        <LoginModalCloser className="self-center" />
                    </div>
                    <form
                        method="POST"
                        onSubmit={handleSubmit(onSubmit)}
                        className="z-20 pt-16 px-10"
                    >
                        <fieldset className="pb-6">
                            <label
                                htmlFor="email-address"
                                className={classNames(
                                    'block font-bold text-gray-600',
                                    errors.email?.type ? 'text-red-700' : ''
                                )}
                            >
                                { translations.email_address_label }
                            </label>
                            <input
                                type="text"
                                id="email-address"
                                autoComplete="email"
                                readOnly={new_password_mode}
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
                        {!forgot_mode && !new_password_mode ? (
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
                            </fieldset>
                        ) : (
                            ''
                        )}

                        {new_password_mode ? (
                            <fieldset className="pb-6">
                                <label
                                    htmlFor="new_password"
                                    className={classNames(
                                        'block font-bold text-gray-600',
                                        errors.new_password?.type
                                            ? 'text-red-700'
                                            : ''
                                    )}
                                >
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    id="new_password"
                                    autoComplete="email"
                                    className={classNames(
                                        'mt-1 focus:ring-primary-light focus:border-primary-light block w-full shadow-sm sm:text-sm border-gray-300 rounded-md',
                                        errors.new_password?.type
                                            ? 'border-red-300 bg-red-100'
                                            : ''
                                    )}
                                    {...register('new_password', {
                                        required: true,
                                        minLength: 8,
                                    })}
                                />
                                {errors.new_password?.type ===
                                    'required' && (
                                    <span className="text-sm text-red-700">
                                        Password is required
                                    </span>
                                )}
                                {errors.new_password?.type === 'length' && (
                                    <span className="text-sm text-red-700">
                                        Password should have at least 8
                                        alpha-numeric
                                    </span>
                                )}
                                {errors.new_password?.type ===
                                    CognitoErrorTypes.InvalidPasswordException && (
                                    <span className="text-sm text-red-700">
                                        {errors.new_password?.message}
                                    </span>
                                )}
                            </fieldset>
                        ) : (
                            ''
                        )}

                        {new_password_mode ? (
                            <fieldset className="pb-6">
                                <label
                                    htmlFor="code"
                                    className={classNames(
                                        'block font-bold text-gray-600',
                                        errors.code?.type
                                            ? 'text-red-700'
                                            : ''
                                    )}
                                >
                                    Code
                                </label>

                                <StyledMaskedTextBox
                                    className={classNames(
                                        'mt-1 focus:ring-primary-light focus:border-primary-light block w-full sm:text-sm border-gray-300 rounded-md',
                                        errors.code?.type
                                            ? 'border-red-300 bg-red-100'
                                            : ''
                                    )}
                                    id="code"
                                    mask="000000"
                                    {...register('code', {
                                        required: true,
                                        minLength: 6,
                                    })}
                                />
                                {errors.code?.type === 'required' && (
                                    <span className="text-sm text-red-700">
                                        Code is required
                                    </span>
                                )}
                            </fieldset>
                        ) : (
                            ''
                        )}

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
                        </div>

                        {forgot_mode ? (
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
                                onClick={handleSubmit(onSubmitRequestReset)}
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
                                        <LockClosedIcon
                                            className="h-5 w-5 text-white"
                                            aria-hidden="true"
                                        />
                                    )}
                                </span>
                                Send Reset Code
                            </button>
                        ) : (
                            ''
                        )}
                        {new_password_mode ? (
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
                                onClick={handleSubmit(onSubmitNewPassword)}
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
                                        <LockClosedIcon
                                            className="h-5 w-5 text-white"
                                            aria-hidden="true"
                                        />
                                    )}
                                </span>
                                Update my account password
                            </button>
                        ) : (
                            ''
                        )}
                        {!new_password_mode && !forgot_mode ? (
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
                                        <LockClosedIcon
                                            className="h-5 w-5 text-white"
                                            aria-hidden="true"
                                        />
                                    )}
                                </span>
                                { translations.login_button }
                            </button>
                        ) : (
                            ''
                        )}
                    </form>
                    {!forgot_mode && !new_password_mode ? (
                        <div className="z-20 px-10">
                            <button
                                className="mt-8"
                                onClick={() => setForgotMode(true)}
                            >
                                <span>{translations.forgot_password_link}</span>
                            </button>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </ModalWrapper>
        </ModalProvider.Visible>
    )
}

export default LoginModal
