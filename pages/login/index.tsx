import { useEffect, useState } from 'react'
import Link from 'next/link'
import { LockClosedIcon } from '@heroicons/react/outline'
import { useForm, SubmitHandler } from 'react-hook-form'
import { CognitoErrorTypes } from 'services/CognitoErrorTypes'
import { classNames } from 'utils/dom-helpers'
import login from 'services/login'

interface LoginPageProps {
    region: string
    ClientId: string
}

type FormValues = {
    email: string
    password: string
}

function Login(props: LoginPageProps) {
    const [loading, toggleLoading] = useState(true)
    const [mounted, setMounted] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        reset,
    } = useForm<FormValues>({
        mode: 'onChange',
    })

    useEffect(() => {
        setMounted(true)
        toggleLoading(false)
    }, [])


    const onSubmit: SubmitHandler<FormValues> = async (
        data: Record<string, string>
    ) => {
        toggleLoading(true)
        try {
            const res = await login({
                ...data,
                region: props.region,
                ClientId: props.ClientId,
            })

            if (res.AuthenticationResult) {
                const { AccessToken, ExpiresIn, RefreshToken } =
                    res.AuthenticationResult
                document.cookie = `email=${
                    data.email
                }; path=/; max-age=${Number(ExpiresIn)}`
                document.cookie = `access_token=${AccessToken}; path=/; max-age=${Number(
                    ExpiresIn
                )}`
                document.cookie = `refresh_token=${RefreshToken}; path=/`
                reset()
                document.location.href = '/'
            }
        } catch (e) {
            if (e.name == CognitoErrorTypes.NotAuthorizedException) {
                setError('email', {
                    type: CognitoErrorTypes.NotAuthorizedException,
                    message: e.message,
                })
                setError('password', {
                    type: CognitoErrorTypes.NotAuthorizedException,
                    message: e.message,
                })
            }
            if (e.name == CognitoErrorTypes.UserNotConfirmedException) {
                setError('email', {
                    type: CognitoErrorTypes.UserNotConfirmedException,
                    message: e.message,
                })
                setError('password', {
                    type: CognitoErrorTypes.UserNotConfirmedException,
                    message: e.message,
                })
            }
        }
        toggleLoading(false)
    }

    if (!mounted) return <></>

    return (
        <div className="bg-gray-50 p-10">
            <div className="container m-auto xl:px-0 p-10 xl:w-1/4 lg:w-2/5 md:w-2/3 sm:w-full">
                <form method="POST" onSubmit={handleSubmit(onSubmit)}>
                    <div className="shadow overflow-hidden sm:rounded-md">
                        <div className="px-4 py-5 bg-white sm:p-6">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6">
                                    <label
                                        htmlFor="email-address"
                                        className={classNames(
                                            'block text-sm font-medium text-gray-700',
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
                                </div>


                                <div className="col-span-6 hidden">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <input
                                                id="remember-me"
                                                name="remember-me"
                                                type="checkbox"
                                                className={
                                                    classNames('h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded')
                                                }
                                            />
                                            <label htmlFor="remember-be" className="ml-2 block text-sm text-gray-900">
                                                Remember me
                                            </label>
                                        </div>

                                        <div className="text-sm">
                                            <Link passHref href="#">
                                                <a className="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-6">
                                    {Object.values(CognitoErrorTypes).includes(errors.email?.type as CognitoErrorTypes) ? (
                                        <div className="bg-red-100 rounded px-3 py-1 mb-5">
                                            {
                                                errors.email?.message && (
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
                                            'py-2 px-4 border border-transparent',
                                            'text-md font-medium rounded-md text-white',
                                            'focus:outline-none',
                                            loading
                                                ? 'bg-indigo-300'
                                                : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
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
                                                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                                    aria-hidden="true"
                                                />
                                            )}
                                        </span>
                                        Login
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
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

export default Login
