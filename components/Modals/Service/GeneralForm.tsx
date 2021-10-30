import { RadioGroup } from '@headlessui/react'
import DropdownComponent from 'components/DropdownSelectors'
import { DropPosition } from 'components/DropdownSelectors/common'
import MoneyInput from 'components/MoneyInput'
import { useAuth } from 'context/AuthContext'
import { MouseEvent, useState } from 'react'
import { HexColorInput, HexColorPicker } from 'react-colorful'
import { SubmitHandler, useForm, UseFormReturn } from 'react-hook-form'
import { classNames } from 'utils/dom-helpers'
import { useFetch } from 'utils/fetch-helper'
import { FetchMethods } from 'utils/types'
import { SubmitError } from '../types'
import { CategoryItem, ServiceType } from './types'

import 'react-dropzone-uploader/dist/styles.css'
import ImageFileUploader from 'components/FileUploader/Image'
import Translation from 'components/Translation'
import { ServiceApiItem, ServiceFormModel } from 'types/service'
import OptionList, {
    ListFlyFrom,
    OptionListItem,
} from 'components/OptionList'
import { TenantInfo } from 'context/types'

function GeneralForm({
    translations,
    form,
    handleCloseModal,
    onSubmit,
    onNext,
    createCategory,
}: {
    translations: Record<string, string>
    form: UseFormReturn
    handleCloseModal: (e: MouseEvent<HTMLButtonElement>) => void
    onSubmit(): void
    onNext(): void
    createCategory(c: Record<string, string>): void
}) {
    const { ServiceModal, tenant } = useAuth()
    const { attributes, setAttributes } = ServiceModal
    const api_error =
        attributes && (attributes.api_error as Record<string, string>)
    const categories =
        (attributes &&
            (attributes.categories as unknown as Record<
                string,
                string
            >[])) ||
        []
    const loading = attributes && (attributes.loading as boolean)

    const [is_adding_category, toggleCategoryForm] =
        useState<boolean>(false)
    const [category_name, setServiceCategory] = useState<string>('')

    function handleCategoryChange({ value }: OptionListItem) {
        const category = value as string
        form.setValue('category', category)
        setAttributes({
            ...attributes,
            category,
        })
    }

    function handleNewCategory() {
        toggleCategoryForm(true)
    }

    function submitNewCategory() {
        createCategory({
            name: category_name,
            type: 'SERVICE',
        })
    }

    return (
        <form method="POST" onSubmit={onSubmit}>
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
                                form.setValue('service_type', v as string)
                            }}
                        >
                            <RadioGroup.Label
                                className={classNames(
                                    form.formState.errors.service_type?.type
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
                            form.formState.errors.primary_color?.type
                                ? 'text-red-700'
                                : ''
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

                <fieldset className="xl:w-2/5 w-full">
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
                            form.formState.errors.name?.type
                                ? 'text-red-700'
                                : ''
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
                            form.formState.errors.name?.type
                                ? 'border-red-300 bg-red-100'
                                : ''
                        )}
                        {...form.register('name', {
                            required: true,
                        })}
                        defaultValue={(attributes?.name as string) || ''}
                    />
                    {form.formState.errors.name?.type === 'required' && (
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
                            form.formState.errors.category?.type
                                ? 'text-red-700'
                                : ''
                        )}
                        htmlFor="category"
                        content_key="category_label"
                        translations={translations}
                        render_as="label"
                    />
                    <OptionList
                        id="category"
                        error={form.formState.errors.category?.type}
                        position={ListFlyFrom.TOP_RIGHT}
                        onChange={handleCategoryChange}
                        defaultValue={
                            (attributes &&
                                (attributes.category as string)) ||
                            ''
                        }
                        className="overflow-auto"
                        options={categories.map(
                            ({ text, value, disabled }, idx) => {
                                return {
                                    text,
                                    value,
                                }
                            }
                        )}
                        static
                    >
                        {is_adding_category ? (
                            <div className="bg-white text-primary-light flex flex-col gap-2 w-full">
                                <div className="border-t border-t-gray-300 w-11/12 mx-auto mt-2" />
                                <div className="text-primary-light flex items-center gap-2 w-full justify-center cursor-default hover:bg-gray-50">
                                    <input
                                        type="text"
                                        className={classNames(
                                            'px-6 py-2 border-gray-300',
                                            'focus:ring-primary-light focus:border-primary-light',
                                            'w-64 shadow-sm rounded-md'
                                        )}
                                        onChange={(e) => {
                                            setServiceCategory(
                                                e.target.value
                                            )
                                        }}
                                        onKeyDown={(e) => {
                                            console.log(
                                                e.code.toUpperCase()
                                            )
                                            if (
                                                e.code
                                                    .toUpperCase()
                                                    .indexOf('SPACE') >= 0
                                            ) {
                                                e.preventDefault()
                                                toggleCategoryForm(true)
                                            }
                                            if (
                                                e.code
                                                    .toUpperCase()
                                                    .indexOf('ENTER') >= 0
                                            ) {
                                                e.preventDefault()
                                                submitNewCategory()
                                            }
                                        }}
                                    />
                                    <button
                                        type="button"
                                        className="flex items-center bg-primary text-white rounded px-2 h-10"
                                        onClick={submitNewCategory}
                                    >
                                        <i className="feather-plus text-2xl" />{' '}
                                        <Translation
                                            content_key="add"
                                            translations={translations}
                                            render_as="span"
                                        />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div
                                onClick={handleNewCategory}
                                className="bg-white w-full py-2 flex flex-col"
                            >
                                <div className="border-t border-t-gray-300 w-11/12 mx-auto mt-2" />
                                <div className="text-primary-light flex items-center gap-2 w-full justify-center cursor-default hover:bg-gray-50">
                                    <i className="feather-plus text-2xl" />{' '}
                                    <Translation
                                        content_key="add_new_category"
                                        translations={translations}
                                        render_as="span"
                                    />
                                </div>
                            </div>
                        )}
                    </OptionList>

                    {form.formState.errors.category?.type ===
                        'required' && (
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
                            form.formState.errors.description?.type
                                ? 'text-red-700'
                                : ''
                        )}
                        htmlFor="description"
                        content_key="description_label"
                        translations={translations}
                        render_as="label"
                    />
                    <textarea
                        className={classNames(
                            'placeholder-gray-300 mt-1 h-40 focus:ring-primary-light focus:border-primary-light block w-full shadow-sm border-gray-300 rounded-md px-6 py-3',
                            form.formState.errors.description?.type
                                ? 'border-red-300 bg-red-100'
                                : ''
                        )}
                        rows={3}
                        placeholder={
                            translations.description_of_service ||
                            'description_of_service'
                        }
                        {...form.register('description')}
                        defaultValue={
                            (attributes?.description as string) || ''
                        }
                    />
                    {form.formState.errors.description?.type ===
                        'pattern' && (
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
                            form.formState.errors.duration?.type
                                ? 'text-red-700'
                                : ''
                        )}
                        htmlFor="duration"
                        content_key="duration_label"
                        translations={translations}
                        render_as="label"
                    />
                    <input
                        type="number"
                        id="duration"
                        className={classNames(
                            'px-6 py-3 mt-1 focus:ring-primary-light focus:border-primary-light block w-full shadow-sm border-gray-300 rounded-md',
                            form.formState.errors.duration?.type
                                ? 'border-red-300 bg-red-100'
                                : ''
                        )}
                        {...form.register('duration', {
                            required: true,
                            min: 5,
                            valueAsNumber: true,
                        })}
                        defaultValue={
                            (attributes?.duration as string) || ''
                        }
                        onChangeCapture={() => {
                            setAttributes({
                                ...attributes,
                                duration: form.getValues(
                                    'duration'
                                ) as number,
                            })
                        }}
                    />

                    {form.formState.errors.duration?.type ===
                        'required' && (
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
                            form.formState.errors.max_participants?.type
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
                            form.formState.errors.max_participants?.type
                                ? 'border-red-300 bg-red-100'
                                : ''
                        )}
                        {...form.register('max_participants', {
                            required: true,
                        })}
                        defaultValue={
                            (attributes?.max_participants as string) || ''
                        }
                    />

                    {form.formState.errors.max_participants?.type ===
                        'required' && (
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
                            form.formState.errors.price?.type
                                ? 'text-red-700'
                                : ''
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
                            form.formState.errors.price?.type
                                ? 'border-red-300 bg-red-100'
                                : ''
                        )}
                        onChange={(v: string) => {
                            form.setValue('price', v as unknown as number)
                            setAttributes({
                                ...attributes,
                                price: v,
                            })
                        }}
                    />
                    {form.formState.errors.price?.type == 'required' && (
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
                {api_error && api_error.message ? (
                    <div className="text-sm text-red-700">
                        {api_error.message}
                    </div>
                ) : (
                    ''
                )}
                <div className="flex justify-end">
                    <button
                        type="button"
                        className="border border-gray-300 rounded-lg py-3 inline-block mr-3 px-10"
                        onClick={handleCloseModal}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            onNext()
                        }}
                        className={classNames(
                            'group relative flex justify-center',
                            'py-3 px-12 border border-transparent',
                            'rounded-md text-white',
                            'focus:outline-none',
                            loading
                                ? 'bg-primary-light'
                                : api_error && api_error.message
                                ? 'bg-red-700 hover:bg-primary-dark focus:ring-2 focus:ring-offset-2 focus:ring-primary-light'
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
