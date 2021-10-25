import { useEffect, useState, MouseEvent, RefObject } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Switch } from '@headlessui/react'
import { DropDownListChangeEvent } from '@progress/kendo-react-dropdowns'
import { classNames } from 'utils/dom-helpers'
import { useAuth } from 'context/AuthContext'
import { CognitoErrorTypes } from 'services/CognitoErrorTypes'
import { SubmitError } from '../types'
import { GeneralFormValues } from './types'
import { FetchMethods, getApiRequest, useFetch } from 'utils/fetch-helper'
import LanguageSelector from 'components/LanguageSelector'
import TimezoneSelector from 'components/TimezoneSelector'
import { Timezone } from 'components/TimezoneSelector/zones'
import StaffSelector from 'components/StaffSelector'
import CountrySelector from 'components/CountrySelector'
import { Country } from 'components/CountrySelector/countries'

function GeneralForm() {
    const ctx = useAuth()
    const { attributes, setAttributes, close } = ctx.LocationModal
    const [loading, toggleLoading] = useState(false)
    const [online, toggleOnline] = useState(false)
    const [success, setSuccess] = useState(false)
    const [staff, setStaff] = useState()

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        reset,
        setValue,
    } = useForm<GeneralFormValues>({
        mode: 'onSubmit',
    })

    register('manager', { required: true })
    register('country', { required: true })
    register('timezone', { required: true })

    if (attributes?.manager)
        setValue(
            'manager',
            (attributes?.manager as Record<string, string>).id as string
        )
    if (attributes?.country)
        setValue('country', attributes?.country as string)
    if (attributes?.timezone)
        setValue('timezone', attributes?.timezone as string)

    const api_fetch = useFetch(
        attributes?.id
            ? `/v1/locations/${attributes?.id}`
            : '/v1/locations',
        attributes?.id ? FetchMethods.PUT : FetchMethods.POST,
        false
    )

    function updateList() {
        ctx.LocationModal.setAttributes({
            has_updates: true,
        })
    }

    function handleCloseModal(e: MouseEvent<HTMLButtonElement>) {
        setAttributes({})
        close()
    }

    function handleOnline(val: boolean) {
        toggleOnline(val)
    }

    function handleLanguageChange(e: DropDownListChangeEvent) {
        console.log('WIP handleLanguageChange')
    }

    function handleCountryChange(v: Country) {
        setValue('country', v.name)
    }

    function handleManagerChange(v: Record<string, string>) {
        setValue('manager', v.id)
    }

    function handleTimezoneChange(v: Timezone) {
        setValue('timezone', v.text)
    }

    const onSubmit: SubmitHandler<GeneralFormValues> = async (
        values: GeneralFormValues
    ) => {
        toggleLoading(true)
        try {
            const {
                name,
                notes,
                timezone,
                phone,
                street_1,
                street_2,
                zip,
                city,
                state,
                country,
            } = values
            const { tenant } = ctx

            const res = await api_fetch.doFetch({
                country,
                state,
                tenant,
                timezone,
                name,
                manager: {
                    id: values.manager,
                },
                streetAddress1: street_1,
                streetAddress2: street_2,
                city,
                zip,
                online,
                phone,
                notes,
            })

            if (res?.ok) {
                updateList()
                reset()
                setSuccess(true)
                ctx.LocationModal.close()
            }
        } catch (e: unknown) {
            const { name, message } = e as SubmitError
            if (name == CognitoErrorTypes.UserExistsException) {
                setError('name', {
                    type: CognitoErrorTypes.UserExistsException,
                    message,
                })
            }
        }
        toggleLoading(false)
    }

    useEffect(() => {
        async function retrieveStaffList() {
            const { content } = await getApiRequest(
                `/v1/staff/?tenantId=${ctx.tenant?.id}`
            )
            if (content) {
                setStaff(
                    content.map(
                        (st: Record<string, Record<string, string>>) => ({
                            id: st.id,
                            first_name: st.user.firstName,
                            last_name: st.user.lastName,
                        })
                    )
                )
            }
        }
        if (!staff && ctx.tenant?.id) {
            retrieveStaffList()
        }
    }, [staff, attributes])

    return (
        <form method="POST" onSubmit={handleSubmit(onSubmit)}>
            <div className="pb-6 md:flex">
                <fieldset className="md:w-5/6 lg:w-4/5 md:pr-4">
                    <label
                        htmlFor="location-name"
                        className={classNames(
                            'block text-lg',
                            errors.name?.type ? 'text-red-700' : ''
                        )}
                    >
                        Location Name
                    </label>
                    <input
                        type="text"
                        id="location-name-address"
                        autoComplete="email"
                        className={classNames(
                            'px-6 py-3 mt-1 focus:ring-primary-light focus:border-primary-light block w-full shadow-sm border-gray-300 rounded-md',
                            errors.name?.type
                                ? 'border-red-300 bg-red-100'
                                : ''
                        )}
                        {...register('name', {
                            required: true,
                        })}
                        defaultValue={(attributes?.name as string) || ''}
                    />
                    {errors.name?.type === 'required' && (
                        <span className="text-sm text-red-700">
                            Location name is required
                        </span>
                    )}
                </fieldset>
                <fieldset className="pb-6 lg:pb-0 md:w-1/6 lg:w-1/5 lg:pl-4">
                    <label
                        htmlFor="Language"
                        className={classNames(
                            'block text-lg',
                            errors.language?.type ? 'text-red-700' : ''
                        )}
                    >
                        Language
                    </label>
                    <LanguageSelector
                        className="country-selector form-country-selector"
                        onChange={handleLanguageChange}
                        defaultItem={0}
                    />
                </fieldset>
            </div>
            <div className="mb-6">
                <label
                    htmlFor="online"
                    className={classNames(
                        'block text-lg',
                        errors.online?.type ? 'text-red-700' : ''
                    )}
                >
                    Online
                </label>
                <Switch
                    name="online"
                    id="online"
                    checked={online}
                    onChange={handleOnline}
                    className={`${online ? 'bg-primary' : 'bg-gray-300'}
        block relative inline-flex mt-2 flex-shrink-0 h-10 w-20 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                >
                    <span className="sr-only">Use setting</span>
                    <span
                        aria-hidden="true"
                        className={`${
                            online ? 'translate-x-10' : 'translate-x-0'
                        }
        pointer-events-none inline-block h-9 w-9 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
                    />
                </Switch>
            </div>
            {online ? (
                ''
            ) : (
                <div className="flex gap-6 mb-6">
                    <fieldset className="lg:w-1/2 relative">
                        <label
                            htmlFor="street-1"
                            className={classNames(
                                'block text-lg',
                                errors.street_1?.type ? 'text-red-700' : ''
                            )}
                        >
                            Street Address 1
                        </label>
                        <input
                            type="text"
                            id="street-1"
                            className={classNames(
                                errors.street_1?.type
                                    ? 'border-red-300 bg-red-100'
                                    : '',
                                'px-6 py-3 mt-1 focus:ring-primary-light focus:border-primary-light shadow-sm border-gray-300 rounded-md w-full'
                            )}
                            {...register('street_1')}
                            defaultValue={
                                (attributes?.street_1 as string) || ''
                            }
                        />

                        {errors.street_1?.type === 'required' && (
                            <span className="text-sm text-red-700 absolute block">
                                Street address is required
                            </span>
                        )}
                    </fieldset>
                    <fieldset className="lg:w-1/2 relative">
                        <label
                            htmlFor="street-2"
                            className={classNames(
                                'block text-lg',
                                errors.street_2?.type ? 'text-red-700' : ''
                            )}
                        >
                            Street Address 2
                        </label>
                        <input
                            type="text"
                            id="street-2"
                            className={classNames(
                                'px-6 py-3 mt-1 focus:ring-primary-light focus:border-primary-light block w-full shadow-sm border-gray-300 rounded-md',
                                errors.street_2?.type
                                    ? 'border-red-300 bg-red-100'
                                    : ''
                            )}
                            {...register('street_2')}
                            defaultValue={
                                (attributes?.street_2 as string) || ''
                            }
                        />
                        {errors.street_2?.type && (
                            <span className="text-sm absolute text-red-700">
                                {errors.street_2.message}
                            </span>
                        )}
                    </fieldset>
                </div>
            )}
            <div className="flex gap-6 mb-6">
                <fieldset className="lg:w-1/2 relative">
                    <label
                        htmlFor="city"
                        className={classNames(
                            'block text-lg',
                            errors.city?.type ? 'text-red-700' : ''
                        )}
                    >
                        City
                    </label>
                    <input
                        type="text"
                        id="city"
                        className={classNames(
                            'px-6 py-3 mt-1 focus:ring-primary-light focus:border-primary-light block w-full shadow-sm border-gray-300 rounded-md',
                            errors.city?.type
                                ? 'border-red-300 bg-red-100'
                                : ''
                        )}
                        {...register('city')}
                        defaultValue={(attributes?.city as string) || ''}
                    />
                    {errors.city?.type && (
                        <span className="text-sm absolute text-red-700">
                            City is required
                        </span>
                    )}
                </fieldset>
                {online ? (
                    ''
                ) : (
                    <fieldset className="lg:w-1/4 xl:w-1/6 relative">
                        <label
                            htmlFor="zip"
                            className={classNames(
                                'block text-lg',
                                errors.zip?.type ? 'text-red-700' : ''
                            )}
                        >
                            Zip
                        </label>
                        <input
                            type="text"
                            id="zip"
                            className={classNames(
                                'px-6 py-3 mt-1 focus:ring-primary-light focus:border-primary-light block w-full shadow-sm border-gray-300 rounded-md',
                                errors.zip?.type
                                    ? 'border-red-300 bg-red-100'
                                    : ''
                            )}
                            {...register('zip')}
                            defaultValue={(attributes?.zip as string) || ''}
                        />
                        {errors.zip?.type && (
                            <span className="text-sm text-red-700 absolute">
                                Zip is required
                            </span>
                        )}
                    </fieldset>
                )}
                <fieldset className="lg:w-1/4 xl:w-1/3 relative">
                    <label
                        htmlFor="state"
                        className={classNames(
                            'block text-lg',
                            errors.state?.type ? 'text-red-700' : ''
                        )}
                    >
                        State
                    </label>
                    <input
                        type="text"
                        id="state"
                        className={classNames(
                            'px-6 py-3 mt-1 focus:ring-primary-light focus:border-primary-light block w-full shadow-sm border-gray-300 rounded-md',
                            errors.state?.type
                                ? 'border-red-300 bg-red-100'
                                : ''
                        )}
                        {...register('state')}
                        defaultValue={(attributes?.state as string) || ''}
                    />
                    {errors.state?.type && (
                        <span className="text-sm absolute text-red-700">
                            State is required
                        </span>
                    )}
                </fieldset>
            </div>
            <div className="flex gap-6 mb-6">
                <fieldset className="flex-1 relative">
                    <label
                        htmlFor="country"
                        className={classNames(
                            'block text-lg',
                            errors.country?.type ? 'text-red-700' : ''
                        )}
                    >
                        Country
                    </label>
                    <div key={attributes?.country as string}>
                        <CountrySelector
                            id="country"
                            onChange={handleCountryChange}
                            error={errors.country?.type}
                            defaultValue={attributes?.country as string}
                        />
                    </div>

                    {errors.country?.type === 'required' && (
                        <span className="text-sm absolute text-red-700">
                            Country is required
                        </span>
                    )}
                </fieldset>
                <fieldset className="relative lg:w-1/3">
                    <label
                        htmlFor="timezone"
                        className={classNames(
                            'block text-lg',
                            errors.timezone?.type ? 'text-red-700' : ''
                        )}
                    >
                        Timezone
                    </label>
                    <TimezoneSelector
                        id="timezone"
                        onChange={handleTimezoneChange}
                        error={errors.timezone?.type}
                        defaultValue={attributes?.timezone as string}
                    />
                    {errors.timezone?.type === 'required' && (
                        <span className="text-sm text-red-700 relative">
                            Timezone is required
                        </span>
                    )}
                </fieldset>
            </div>
            <div className="pb-6 md:flex flex-wrap">
                <fieldset className="md:w-2/3 lg:w-1/2 md:pr-4">
                    <label
                        htmlFor="manager"
                        className={classNames(
                            'block text-lg',
                            errors.manager?.type ? 'text-red-700' : ''
                        )}
                    >
                        Manager
                    </label>
                    <StaffSelector
                        id="manager"
                        data={staff || []}
                        onChange={handleManagerChange}
                        error={errors.manager?.type}
                        defaultValue={
                            attributes?.manager as Record<string, string>
                        }
                    />

                    {errors.manager?.type === 'required' && (
                        <span className="text-sm text-red-700">
                            Manager is required
                        </span>
                    )}
                </fieldset>
                <fieldset className="md:w-1/2 lg:w-1/3 md:pr-4">
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
                        className={classNames(
                            'px-6 py-3 mt-1 focus:ring-primary-light focus:border-primary-light block w-full shadow-sm border-gray-300 rounded-md',
                            errors.phone?.type
                                ? 'border-red-300 bg-red-100'
                                : ''
                        )}
                        {...register('phone')}
                        defaultValue={attributes?.phone as string}
                    />
                    {errors.phone?.type && (
                        <span className="text-sm text-red-700">
                            {errors.phone?.message}
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
                    placeholder="Private notes about location"
                    {...register('notes', {
                        required: false,
                    })}
                />
                {errors.notes?.type === 'length' && (
                    <span className="text-sm text-red-700">
                        Illegal values found in notes
                    </span>
                )}
            </fieldset>

            <div>
                <div className="flex justify-end">
                    <button
                        type="button"
                        className="border border-gray-300 rounded-lg py-3 inline-block mr-3 px-10"
                        onClick={handleCloseModal}
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
