import signUp from 'services/UserPool'
import { LockClosedIcon, RefreshIcon } from '@heroicons/react/outline'
import { useForm, SubmitHandler } from 'react-hook-form'
import { CognitoErrorTypes } from 'services/CognitoErrorTypes'
import { classNames } from 'utils/dom-helpers'
import DialogBox from 'components/DialogBox'
import { useState } from 'react'

interface LoginPageProps {
    region: string
    ClientId: string
    onSuccess: (toggle: boolean) => void
}

type FormValues = {
    given_name: string
    family_name: string
    email: string
    password: string
}

function SignUpForm({ region, ClientId, onSuccess }: LoginPageProps) {
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

    const onSubmit: SubmitHandler<FormValues> = async (
        data: Record<string, string>
    ) => {
        toggleLoading(true)
        try {
            const res = await signUp({
                ...data,
                region,
                ClientId,
            })
            if (res.UserSub) {
                onSuccess(true)
                reset()
            }
        } catch (e) {
            let message = e.message
            if (e.name == CognitoErrorTypes.InvalidPasswordException) {
                setError('password', {
                    type: e.name,
                    message,
                })
            } else if (e.name == CognitoErrorTypes.UserExistsException) {
                setError('email', {
                    type: e.name,
                    message: 'User already exists',
                })
            }
        }
        toggleLoading(false)
    }

    return (
        <form method="POST" onSubmit={handleSubmit(onSubmit)}>
            <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6">
                            <label
                                htmlFor="first-name"
                                className={classNames(
                                    'block text-sm font-medium text-gray-700',
                                    errors.given_name?.type
                                        ? 'text-red-700'
                                        : ''
                                )}
                            >
                                First name
                            </label>
                            <input
                                type="text"
                                id="first-name"
                                autoComplete="given-name"
                                className={classNames(
                                    'mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md',
                                    errors.given_name?.type
                                        ? 'border-red-300 bg-red-100'
                                        : ''
                                )}
                                {...register('given_name', {
                                    required: true,
                                })}
                            />
                            {errors.given_name?.type === 'required' && (
                                <span className="text-sm text-red-700">
                                    Given name is required
                                </span>
                            )}
                        </div>

                        <div className="col-span-6">
                            <label
                                htmlFor="last-name"
                                className={classNames(
                                    'block text-sm font-medium text-gray-700',
                                    errors.family_name?.type
                                        ? 'text-red-700'
                                        : ''
                                )}
                            >
                                Last name
                            </label>
                            <input
                                type="text"
                                id="last-name"
                                autoComplete="family-name"
                                className={classNames(
                                    'mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md',
                                    errors.family_name?.type
                                        ? 'border-red-300 bg-red-100'
                                        : ''
                                )}
                                {...register('family_name', {
                                    required: true,
                                })}
                            />
                            {errors.family_name?.type === 'required' && (
                                <span className="text-sm text-red-700">
                                    Family name is required
                                </span>
                            )}
                        </div>

                        <div className="col-span-6">
                            <label
                                htmlFor="email-address"
                                className={classNames(
                                    'block text-sm font-medium text-gray-700',
                                    errors.email?.type ? 'text-red-700' : ''
                                )}
                            >
                                Email address
                            </label>
                            <input
                                type="text"
                                id="email-address"
                                autoComplete="email"
                                className={classNames(
                                    'mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md',
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
                        </div>

                        <div className="col-span-6">
                            <label
                                htmlFor="password"
                                className={classNames(
                                    'block text-sm font-medium text-gray-700',
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
                                    'mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md',
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
                                    {errors.password?.message}
                                </span>
                            )}
                        </div>
                        <div className="col-span-6">
                            <button
                                type="submit"
                                className={classNames(
                                    'group relative w-full flex justify-center',
                                    'py-2 px-4 border border-transparent',
                                    'text-md font-medium rounded-md text-white',
                                    'focus:outline-none',
                                    loading
                                        ? 'bg-indigo-300'
                                        : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                )}
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
                                            className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                            aria-hidden="true"
                                        />
                                    )}
                                </span>
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

function Signup(props: LoginPageProps) {
    const [dialog_state, setDialog] = useState(false)
    const toggleDialog = () => {
        setDialog(!dialog_state)
    }
    return (
        <div className="bg-gray-50 p-10">
            <div className="container m-auto xl:px-0 p-10 xl:w-1/4 lg:w-2/5 md:w-2/3 sm:w-full">
                <SignUpForm {...props} onSuccess={toggleDialog} />
                {dialog_state ? (
                    <DialogBox onClose={toggleDialog}>
                        <div className="mb-3 uppercase tracking-wide font-black text-3xl text-indigo-800">
                            Congratulations!
                        </div>
                        <p className="text-lg font-light">
                            Please check your email inbox for account
                            activation.
                        </p>
                    </DialogBox>
                ) : (
                    ''
                )}
            </div>
        </div>
    )
}

export async function getStaticProps() {
    return {
        props: {
            region: process.env.COGNITO_REGION,
            ClientId: process.env.COGNITO_CLIENT_ID,
        },
    }
}

export default Signup
