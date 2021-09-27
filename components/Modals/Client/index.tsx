import { useState } from 'react'
import { CursorClickIcon } from '@heroicons/react/solid'
import { useForm, SubmitHandler } from 'react-hook-form'
import { CognitoErrorTypes } from 'services/CognitoErrorTypes'
import { classNames } from 'utils/dom-helpers'
import { createModal } from '../ModalFactory'
import { AuthContext, useAuth } from 'context/AuthContext'
import { ModalWrapper } from '../ModalWrapper'
import {
    TabStrip,
    TabStripSelectEventArguments,
    TabStripTab,
} from '@progress/kendo-react-layout'
type FormValues = {
    email: string
    password: string
    first_name: string
    last_name: string
}

const ModalProvider = createModal(AuthContext, 'CreateClientModal', () => (
    <>
        <i className="feather feather-plus mr-4" />
        <span className="circular">Create</span>
    </>
))

export const CreateClientModalOpener = ModalProvider.Opener
export const CreateClientModalCloser = ModalProvider.Closer

function CreateClientModal() {
    const ctx = useAuth()
    const [loading, toggleLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [selected, setSelected] = useState<number>(0)

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        reset,
    } = useForm<FormValues>({
        mode: 'onChange',
    })

    const onSubmit: SubmitHandler<FormValues> = async (
        values: Record<string, string>
    ) => {
        toggleLoading(true)
        try {
            const { email, password, first_name, last_name } = values
            const res = await ctx.signup(
                email,
                password,
                first_name,
                last_name
            )

            if (res) {
                reset()
                setSuccess(true)
            }
        } catch (e) {
            if (e.name == CognitoErrorTypes.UserExistsException) {
                setError('email', {
                    type: CognitoErrorTypes.UserExistsException,
                    message: e.message,
                })
            }
            if (e.name == CognitoErrorTypes.InvalidPasswordException) {
                setError('password', {
                    type: CognitoErrorTypes.InvalidPasswordException,
                    message: e.message,
                })
            }
        }
        toggleLoading(false)
    }

    const handleSelect = (e: TabStripSelectEventArguments) => {
        setSelected(e.selected)
    }

    return (
        <ModalProvider.Visible>
            <ModalWrapper>
                <div className="bg-white shadow-xl overflow-hidden sm:rounded-md w-11/12 sm:w-2/3 xl:w-1/2 mx-auto my-4 relative py-10 border-2 border-gray-100">
                    <div className="flex justify-between px-10 text-gray-500 absolute z-10 h-10 w-full">
                        <span className="inline-block self-center text-lg font-light text-gray-600">
                            New Client
                        </span>
                        <CreateClientModalCloser className="self-center" />
                    </div>
                    <TabStrip
                        selected={selected}
                        onSelect={handleSelect}
                        className="z-20 pt-16 px-10"
                        animation={false}
                    >
                        <TabStripTab title="General">
                            <form
                                method="POST"
                                onSubmit={handleSubmit(onSubmit)}
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
                                        htmlFor="email-address"
                                        className={classNames(
                                            'block font-bold text-gray-600',
                                            errors.email?.type
                                                ? 'text-red-700'
                                                : ''
                                        )}
                                    >
                                        Email address
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
                                        Password
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
                                    {errors.password?.type ===
                                        'required' && (
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
                                    {Object.values(
                                        CognitoErrorTypes
                                    ).includes(
                                        errors.email
                                            ?.type as CognitoErrorTypes
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
                                        Sign Up
                                    </button>
                                </div>
                            </form>
                        </TabStripTab>
                    </TabStrip>
                </div>
            </ModalWrapper>
        </ModalProvider.Visible>
    )
}

export default CreateClientModal
