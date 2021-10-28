import { RadioGroup } from '@headlessui/react'
import DropdownComponent from 'components/DropdownSelectors'
import { DropPosition } from 'components/DropdownSelectors/common'
import MoneyInput from 'components/MoneyInput'
import { useAuth } from 'context/AuthContext'
import { MouseEvent, useState } from 'react'
import { HexColorInput, HexColorPicker } from 'react-colorful'
import { SubmitHandler, useForm } from 'react-hook-form'
import { classNames } from 'utils/dom-helpers'
import { useFetch } from 'utils/fetch-helper'
import { FetchMethods } from 'utils/types'
import { SubmitError } from '../types'
import { ServiceType } from './types'

import 'react-dropzone-uploader/dist/styles.css'
import ImageFileUploader from 'components/FileUploader/Image'
import Translation from 'components/Translation'
import { ServiceApiItem, ServiceFormModel } from 'types/service'
import OptionList, {
    ListFlyFrom,
    OptionListItem,
} from 'components/OptionList'
import { TenantInfo } from 'context/types'

const categories = [
    { text: 'Please select a category', disabled: true },
    { text: 'Private Lessons', value: 'some-id-1' },
    { text: 'Public Lessons', value: 'some-id-2' },
]
const durations = [
    { text: 'Please select duration', disabled: true },
    { text: '5 minutes', value: 5 },
    { text: '10 minutes', value: 10 },
    { text: '15 minutes', value: 15 },
    { text: '30 minutes', value: 30 },
    { text: '60 minutes', value: 60 },
]

function GeneralForm({
    translations,
}: {
    translations: Record<string, string>
}) {
    const { ServiceModal, tenant } = useAuth()
    const { attributes, setAttributes } = ServiceModal
    const [is_duration_opened, toggleDuration] = useState<boolean>(false)
    const [loading, toggleLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        setValue,
        reset,
    } = useForm<ServiceFormModel>({
        mode: 'onSubmit',
    })

    register('category', { required: true })
    register('service_type', {
        required: true,
        value:
            (attributes?.service_type as ServiceType) ||
            ServiceType.APPOINTMENT,
    })
    register('duration', {
        min: 5,
        required: true,
        valueAsNumber: true,
    })

    const api_fetch = useFetch(
        attributes?.id ? `/v1/services/${attributes?.id}` : '/v1/services',
        attributes?.id ? FetchMethods.PUT : FetchMethods.POST,
        false
    )

    const category_api_fetch = useFetch(
        '/v1/categories',
        FetchMethods.GET,
        true
    )

    function updateList() {
        ServiceModal.setAttributes({
            has_updates: true,
        })
    }

    function handleCategoryChange({ value }: OptionListItem) {
        const category = value as string
        setValue('category', category)
        setAttributes({
            ...attributes,
            category,
        })
    }
    function handleDurationChange({ value }: OptionListItem) {
        setValue('duration', value as number)
        setAttributes({
            ...attributes,
            duration: value as string,
        })
    }

    const onSubmit: SubmitHandler<Record<string, string>> = async (
        values: Record<string, string>
    ) => {
        toggleLoading(true)
        try {
            const {
                name,
                category,
                description,
                duration,
                max_participants,
                primary_color,
                price,
                service_type,
            } = values
            const service: Record<string, string> = {}

            if (attributes && attributes.id) {
                service.id = attributes.id as string
            }

            const form_values: ServiceApiItem = {
                id: attributes?.id as string,
                category: {
                    name: category,
                },
                description,
                duration: duration as unknown as number,
                name,
                tenant: tenant as TenantInfo,
                maxCapacity: max_participants as unknown as number,
                price: price as unknown as number,
                primaryColorHex: primary_color,
                type: undefined,
                series: false,
            }

            if (service_type == ServiceType.APPOINTMENT)
                form_values.type = 'APPOINTMENT'
            if (service_type == ServiceType.GROUP_CLASS)
                form_values.type = 'GROUP_CLASS'
            if (service_type == ServiceType.SERIES) {
                form_values.type = 'SERIES'
                form_values.series = true
            }

            const res = await api_fetch.doFetch(form_values)

            if (res) {
                updateList()
                reset()
                setSuccess(true)
                ServiceModal.close()
            }
        } catch (e: unknown) {
            const { name, message } = e as SubmitError
            console.log(name, message)
        }
        toggleLoading(false)
    }

    function handleCloseModal(e: MouseEvent<HTMLButtonElement>) {
        ServiceModal.setAttributes({})
        ServiceModal.close()
    }

    return (
        <form method="POST" onSubmit={handleSubmit(onSubmit)}>
            <div className="pb-6 lg:flex gap-8 border-b border-b-gray-300 mb-6">
                <fieldset className="xl:w-3/5">
                    <div className="text-primary text-xl font-medium font-display">
                        Enter the basic information for your new service
                    </div>

                    <div className="my-8">
                        <RadioGroup
                            value={attributes?.service_type}
                            onChange={(v) => {
                                setAttributes({
                                    ...attributes,
                                    service_type: v as string,
                                })
                                setValue('service_type', v as string)
                            }}
                        >
                            <RadioGroup.Label
                                className={classNames(
                                    errors.service_type?.type
                                        ? 'text-red-700'
                                        : '',
                                    'text-lg block'
                                )}
                            >
                                <Translation
                                    content_key="service_type_label"
                                    translations={translations}
                                />
                            </RadioGroup.Label>
                            <div className="flex gap-6">
                                {Object.values(ServiceType).map((v) => {
                                    return (
                                        <RadioGroup.Option
                                            key={v}
                                            value={v}
                                        >
                                            {({ checked }) => (
                                                <div className="flex items-center gap-2 text-base cursor-pointer">
                                                    <div
                                                        className={classNames(
                                                            checked
                                                                ? 'border-primary-light'
                                                                : 'border-gray-400',
                                                            'rounded-full w-6 h-6 border-2 flex items-center'
                                                        )}
                                                    >
                                                        <i
                                                            className={classNames(
                                                                checked
                                                                    ? 'bg-primary-light'
                                                                    : '',
                                                                'rounded-full w-4 h-4 block m-auto'
                                                            )}
                                                        />
                                                    </div>
                                                    <span
                                                        className={
                                                            checked
                                                                ? 'text-primary-light'
                                                                : ''
                                                        }
                                                    >
                                                        {v}
                                                    </span>
                                                </div>
                                            )}
                                        </RadioGroup.Option>
                                    )
                                })}
                            </div>
                        </RadioGroup>
                    </div>

                    <label
                        htmlFor="last-name"
                        className={classNames(
                            'block text-lg',
                            errors.primary_color?.type ? 'text-red-700' : ''
                        )}
                    >
                        Primary Color
                    </label>

                    <div className="flex gap-3 items-center border border-gray-300 px-3 rounded-lg w-96">
                        <i
                            className="w-6 h-6 rounded-full"
                            style={{
                                backgroundColor:
                                    (attributes &&
                                        (attributes.primary_color as string)) ||
                                    '#23476B',
                            }}
                        />

                        <HexColorInput
                            className="focus:outline-none font-mono flex-1 py-3"
                            color={
                                (attributes &&
                                    (attributes.primary_color as string)) ||
                                '#23476B'
                            }
                            onChange={(primary_color) => {
                                setAttributes({
                                    ...attributes,
                                    primary_color,
                                })
                            }}
                        />

                        <DropdownComponent
                            label={
                                <span className="bg-secondary bg-opacity-10 hover:bg-opacity-5 text-secondary text-thin font-display rounded px-3 text-sm py-1">
                                    <i className="feather feather-edit-2" />{' '}
                                    Pick color
                                </span>
                            }
                            dropboxClassname="p-1 border border-gray-200 rounded-lg"
                            className="p-0"
                            position={DropPosition.TOP_RIGHT}
                            style={{}}
                            items={[
                                {
                                    input_component: (
                                        <HexColorPicker
                                            onChange={(primary_color) => {
                                                setAttributes({
                                                    ...attributes,
                                                    primary_color,
                                                })
                                            }}
                                            color={
                                                (attributes &&
                                                    (attributes.primary_color as string)) ||
                                                '#ccccef'
                                            }
                                        />
                                    ),
                                },
                            ]}
                        />
                    </div>
                </fieldset>

                <fieldset className="xl:w-2/5">
                    <Translation
                        translations={translations}
                        content_key="thumbnail_label"
                        render_as="label"
                        className="text-lg block"
                    />
                    <ImageFileUploader
                        accept="image/*"
                        form_context={{
                            attributes: attributes || {},
                            setAttributes: setAttributes as unknown as (
                                data: Record<string, string | File>
                            ) => void,
                        }}
                        addClassNames={{
                            dropzone:
                                'bg-transparent p-0 overflow-hidden h-64 border-0',
                            inputLabel:
                                'text-gray-400 font-medium text-lg flex-grow',
                            submitButtonContainer: 'mt-3',
                            submitButton:
                                'flex gap-3 items-center bg-primary-light text-white px-6 py-3 rounded-lg w-full text-lg font-serif font-light justify-center',
                        }}
                    />
                </fieldset>
            </div>

            <div className="pb-6 lg:flex gap-8">
                <fieldset className="lg:w-1/2">
                    <label
                        htmlFor="name"
                        className={classNames(
                            'block text-lg',
                            errors.name?.type ? 'text-red-700' : ''
                        )}
                    >
                        <Translation
                            content_key="name_of_service"
                            translations={translations}
                        />
                    </label>
                    <input
                        type="text"
                        id="name"
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
                            <Translation
                                content_key="error_name_of_service_required"
                                translations={translations}
                            />
                        </span>
                    )}
                </fieldset>
                <fieldset className="lg:w-3/4">
                    <Translation
                        className={classNames(
                            'block text-lg mb-1',
                            errors.category?.type ? 'text-red-700' : ''
                        )}
                        htmlFor="category"
                        content_key="category_label"
                        translations={translations}
                        render_as="label"
                    />
                    <OptionList
                        id="category"
                        error={errors.category?.type}
                        position={ListFlyFrom.TOP_RIGHT}
                        onChange={handleCategoryChange}
                        defaultValue={
                            attributes && (attributes.category as string)
                        }
                        options={categories.map(
                            ({ text, value, disabled }, idx) => {
                                return {
                                    text,
                                    value,
                                }
                            }
                        )}
                    />

                    {errors.category?.type === 'required' && (
                        <Translation
                            render_as="span"
                            className="text-sm text-red-700 block"
                            content_key="error_category_required"
                            translations={translations}
                        />
                    )}
                </fieldset>
            </div>

            <div className="pb-6 lg:flex gap-8">
                <fieldset className="pb-6 lg:pb-0 w-full">
                    <Translation
                        className={classNames(
                            'block text-lg',
                            errors.description?.type ? 'text-red-700' : ''
                        )}
                        htmlFor="description"
                        content_key="description_label"
                        translations={translations}
                        render_as="label"
                    />
                    <textarea
                        className={classNames(
                            'placeholder-gray-300 mt-1 h-40 focus:ring-primary-light focus:border-primary-light block w-full shadow-sm border-gray-300 rounded-md px-6 py-3',
                            errors.description?.type
                                ? 'border-red-300 bg-red-100'
                                : ''
                        )}
                        rows={3}
                        placeholder={
                            translations.description_of_service ||
                            'description_of_service'
                        }
                        {...register('description')}
                        defaultValue={
                            (attributes?.description as string) || ''
                        }
                    />
                    {errors.description?.type === 'pattern' && (
                        <Translation
                            render_as="span"
                            className="text-sm text-red-700"
                            content_key="error_description_required"
                            translations={translations}
                        />
                    )}
                </fieldset>
            </div>

            <div className="pb-6 lg:flex gap-8">
                <fieldset className="lg:w-1/3">
                    <Translation
                        className={classNames(
                            'block text-lg mb-1',
                            errors.duration?.type ? 'text-red-700' : ''
                        )}
                        htmlFor="duration"
                        content_key="duration_label"
                        translations={translations}
                        render_as="label"
                    />
                    <OptionList
                        id="duration"
                        error={errors.duration?.type}
                        position={ListFlyFrom.BOTTOM_RIGHT}
                        onChange={handleDurationChange}
                        defaultValue={
                            attributes && (attributes.duration as string)
                        }
                        options={durations.map(
                            ({ text, value, disabled }, idx) => {
                                return {
                                    text,
                                    value,
                                }
                            }
                        )}
                    />

                    {errors.duration?.type === 'required' && (
                        <Translation
                            content_key="error_duration_required"
                            className="text-sm text-red-700"
                            render_as="span"
                            translations={translations}
                        />
                    )}
                </fieldset>

                <fieldset className="lg:w-1/3">
                    <Translation
                        className={classNames(
                            'block text-lg',
                            errors.max_participants?.type
                                ? 'text-red-700'
                                : ''
                        )}
                        htmlFor="max_participants"
                        content_key="max_participants_label"
                        translations={translations}
                        render_as="label"
                    />
                    <input
                        type="text"
                        id="max_participants"
                        className={classNames(
                            'px-6 py-3 mt-1 focus:ring-primary-light focus:border-primary-light block w-full shadow-sm border-gray-300 rounded-md',
                            errors.max_participants?.type
                                ? 'border-red-300 bg-red-100'
                                : ''
                        )}
                        {...register('max_participants', {
                            required: true,
                        })}
                        defaultValue={
                            (attributes?.max_participants as string) || ''
                        }
                    />

                    {errors.max_participants?.type === 'required' && (
                        <Translation
                            content_key="error_max_participants_required"
                            className="text-sm text-red-700"
                            render_as="span"
                            translations={translations}
                        />
                    )}
                </fieldset>

                <fieldset className="lg:w-1/3">
                    <Translation
                        className={classNames(
                            'block text-lg',
                            errors.price?.type ? 'text-red-700' : ''
                        )}
                        htmlFor="price"
                        content_key="price_label"
                        translations={translations}
                        render_as="label"
                    />
                    <MoneyInput
                        id="price"
                        className={classNames(
                            'px-6 py-3 mt-1 focus:ring-primary-light focus:border-primary-light block w-full shadow-sm border-gray-300 rounded-md',
                            errors.price?.type
                                ? 'border-red-300 bg-red-100'
                                : ''
                        )}
                        value={(attributes?.price as string) || ''}
                        onChange={(v: string) => {
                            setValue('price', v as unknown as number)
                            setAttributes({
                                ...attributes,
                                price: v,
                            })
                        }}
                    />
                    {errors.price?.type == 'required' && (
                        <Translation
                            content_key="error_price_required"
                            className="text-sm text-red-700"
                            render_as="span"
                            translations={translations}
                        />
                    )}
                </fieldset>
            </div>

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
                        Next
                    </button>
                </div>
            </div>
        </form>
    )
}

export default GeneralForm
