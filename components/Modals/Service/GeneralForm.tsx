import { RadioGroup } from '@headlessui/react'
import DropdownComponent from 'components/DropdownSelectors'
import { DropPosition } from 'components/DropdownSelectors/common'
import MoneyInput from 'components/MoneyInput'
import { MouseEvent, useEffect, useState } from 'react'
import { HexColorInput, HexColorPicker } from 'react-colorful'
import { classNames } from 'utils/dom-helpers'
import { FormErrors } from './types'

import 'react-dropzone-uploader/dist/styles.css'
import ImageFileUploader from 'components/FileUploader/Image'
import Translation from 'components/Translation'
import OptionList, {
    ListFlyFrom,
    OptionListItem,
} from 'components/OptionList'
import { ModalDataAttributes } from '../types'
import { ServiceType } from 'types/service'

function GeneralForm({
    attributes,
    setAttributes,
    translations,
    handleCloseModal,
    onSubmit,
    onNext,
    createCategory,
}: {
    attributes: ModalDataAttributes
    setAttributes(r: ModalDataAttributes): void
    translations: Record<string, string>
    handleCloseModal: (e: MouseEvent<HTMLButtonElement>) => void
    onSubmit(): void
    onNext(): void
    createCategory(c: Record<string, string>): void
}) {
    const [is_category_opened, toggleCategoryOpen] =
        useState<boolean>(false)
    const api_error =
        attributes && (attributes.api_error as Record<string, string>)
    const form_errors: FormErrors =
        (attributes && (attributes.form_errors as unknown as FormErrors)) ||
        {}
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

    function handleCategoryChange({
        value: id,
        text: name,
    }: OptionListItem) {
        toggleCategoryOpen(false)
        if (id) {
            setAttributes({
                ...attributes,
                category: {
                    id,
                    name,
                },
            })
        }
    }

    function handleNewCategory() {
        toggleCategoryForm(true)
    }

    function submitNewCategory() {
        createCategory({
            name: category_name,
            type: 'SERVICE',
        })
        toggleCategoryOpen(false)
    }
    console.log(attributes)
    return (
        <form method="POST" onSubmit={onSubmit}>
            <div className="pb-6 lg:flex gap-8 border-b border-b-gray-300 mb-6">
                <fieldset className="xl:w-3/5">
                    <div className="text-primary text-xl font-medium font-display">
                        Enter the basic information for your new service
                    </div>

                    <div className="my-8">
                        <RadioGroup
                            value={
                                attributes?.service_type as unknown as ServiceType
                            }
                            onChange={(v) => {
                                setAttributes({
                                    ...attributes,
                                    service_type: v as string,
                                })
                            }}
                        >
                            <RadioGroup.Label
                                className={classNames(
                                    form_errors.service_type
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
                                {Object.keys(ServiceType).map((v, idx) => {
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
                                                        {
                                                            Object.values(
                                                                ServiceType
                                                            )[idx]
                                                        }
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
                        htmlFor="primary-color"
                        className={classNames(
                            'block text-lg',
                            form_errors.primary_color ? 'text-red-700' : ''
                        )}
                    >
                        Primary Color
                    </label>

                    <div className="flex gap-3 items-center border border-gray-300 px-3 rounded-lg w-96">
                        <i
                            className="w-6 h-6 rounded-full"
                            style={{
                                backgroundColor:
                                    attributes?.primary_color as string,
                            }}
                        />

                        <HexColorInput
                            id="primary-color"
                            className="focus:outline-none font-mono flex-1 py-3"
                            color={attributes?.primary_color as string}
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
                            form_errors.name ? 'text-red-700' : ''
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
                            form_errors.name
                                ? 'border-red-300 bg-red-100'
                                : ''
                        )}
                        onChange={(e) => {
                            setAttributes({
                                ...attributes,
                                name: e.target.value,
                            })
                        }}
                        defaultValue={(attributes?.name as string) || ''}
                    />
                    {form_errors.name && (
                        <span className="text-sm text-red-700">
                            <Translation
                                content_key={form_errors.name}
                                translations={translations}
                            />
                        </span>
                    )}
                </fieldset>
                <fieldset className="lg:w-1/2">
                    <Translation
                        className={classNames(
                            'block text-lg mb-1',
                            form_errors.category ? 'text-red-700' : ''
                        )}
                        htmlFor="category"
                        content_key="category_label"
                        translations={translations}
                        render_as="label"
                    />
                    <OptionList
                        id="category"
                        error={form_errors.category}
                        position={ListFlyFrom.TOP_RIGHT}
                        onChange={handleCategoryChange}
                        onActivate={() => {
                            toggleCategoryOpen(true)
                        }}
                        defaultValue={
                            (attributes &&
                                attributes.category &&
                                ((
                                    attributes.category as ModalDataAttributes
                                ).id as string)) ||
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
                        static={is_category_opened}
                    >
                        {is_adding_category ? (
                            <div className="bg-white text-primary-light flex flex-col gap-2 w-full h-12">
                                <div className="border-t border-t-gray-300 w-11/12 mx-auto" />
                                <div className="text-primary-light flex items-center gap-2 w-full justify-center cursor-default h-full px-5">
                                    <input
                                        type="text"
                                        className={classNames(
                                            'h-full border-gray-300',
                                            'focus:ring-primary-light focus:border-primary-light',
                                            'w-64 shadow-sm rounded-md flex-1'
                                        )}
                                        onChange={(e) => {
                                            setServiceCategory(
                                                e.target.value
                                            )
                                        }}
                                        onKeyDown={(e) => {
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
                                        className="flex items-center bg-primary gap-1 text-white rounded px-2 h-full"
                                        onClick={submitNewCategory}
                                    >
                                        <i className="feather-plus text-lg" />{' '}
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
                                <div className="border-t border-t-gray-300 w-11/12 mx-auto" />
                                <div className="text-primary-light flex items-center gap-4 w-full justify-center cursor-default hover:bg-gray-50 py-2">
                                    <i className="feather-plus text-lg" />{' '}
                                    <Translation
                                        content_key="add_new_category"
                                        translations={translations}
                                        render_as="span"
                                    />
                                </div>
                            </div>
                        )}
                    </OptionList>

                    {form_errors.category && (
                        <Translation
                            render_as="span"
                            className="text-sm text-red-700 block"
                            content_key={form_errors.category}
                            translations={translations}
                        />
                    )}
                </fieldset>
            </div>

            <div className="pb-6 lg:flex gap-8">
                <fieldset className="pb-6 lg:pb-0 w-full">
                    <Translation
                        className="block text-lg"
                        htmlFor="description"
                        content_key="description_label"
                        translations={translations}
                        render_as="label"
                    />
                    <textarea
                        className={classNames(
                            'placeholder-gray-300 mt-1 h-40',
                            'focus:ring-primary-light focus:border-primary-light',
                            'block w-full shadow-sm border-gray-300 rounded-md px-6 py-3'
                        )}
                        rows={3}
                        placeholder={
                            translations.description_of_service ||
                            'description_of_service'
                        }
                        onChange={(e) => {
                            setAttributes({
                                ...attributes,
                                description: e.target.value,
                            })
                        }}
                        defaultValue={
                            (attributes?.description as string) || ''
                        }
                    />
                </fieldset>
            </div>

            <div className="pb-6 lg:flex gap-8">
                <fieldset className="lg:w-1/3">
                    <Translation
                        className={classNames(
                            'block text-lg mb-1',
                            form_errors.duration ? 'text-red-700' : ''
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
                            form_errors.duration
                                ? 'border-red-300 bg-red-100'
                                : ''
                        )}
                        defaultValue={
                            (attributes?.duration as string) || ''
                        }
                        onChange={(e) => {
                            setAttributes({
                                ...attributes,
                                duration: e.target.value,
                            })
                        }}
                    />

                    {form_errors.duration && (
                        <Translation
                            content_key={form_errors.duration}
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
                            form_errors.max_participants
                                ? 'text-red-700'
                                : ''
                        )}
                        htmlFor="max_participants"
                        content_key="max_participants_label"
                        translations={translations}
                        render_as="label"
                    />
                    <input
                        type="number"
                        id="max_participants"
                        className={classNames(
                            'px-6 py-3 mt-1 focus:ring-primary-light focus:border-primary-light block w-full shadow-sm border-gray-300 rounded-md',
                            form_errors.max_participants
                                ? 'border-red-300 bg-red-100'
                                : ''
                        )}
                        defaultValue={
                            (attributes?.max_participants as string) || ''
                        }
                        onChange={(e) => {
                            setAttributes({
                                ...attributes,
                                max_participants: e.target.value,
                            })
                        }}
                    />

                    {form_errors.max_participants && (
                        <Translation
                            content_key={form_errors.max_participants}
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
                            form_errors.price ? 'text-red-700' : ''
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
                            form_errors.price
                                ? 'border-red-300 bg-red-100'
                                : ''
                        )}
                        defaultValue={
                            attributes && (attributes.price as number)
                        }
                        onChange={(v: string) => {
                            setAttributes({
                                ...attributes,
                                price: v,
                            })
                        }}
                    />
                    {form_errors.price && (
                        <Translation
                            content_key={form_errors.price}
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
                        <Translation
                            content_key="cancel_button"
                            translations={translations}
                        />
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            onSubmit()
                        }}
                        className={classNames(
                            'group relative flex justify-center',
                            'py-3 px-12 border border-gray-300',
                            'rounded-md',
                            'focus:outline-none mr-3',
                            loading
                                ? 'bg-primary-light'
                                : api_error && api_error.message
                                ? 'border-red-700 focus:ring-2 focus:ring-offset-2 focus:ring-red-300'
                                : 'bg-white focus:ring-2 focus:ring-offset-2 focus:ring-primary-light'
                        )}
                    >
                        <Translation
                            content_key="save_button"
                            translations={translations}
                        />
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
                        <Translation
                            content_key="next_button"
                            translations={translations}
                        />
                    </button>
                </div>
            </div>
        </form>
    )
}

export default GeneralForm
