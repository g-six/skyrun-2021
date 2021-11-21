import { Disclosure } from '@headlessui/react'
import Translation from 'components/Translation'
import { ServiceItem } from 'types/service'
import { classNames } from 'utils/dom-helpers'
export function ServiceList({
    categories = [],
    translations = {},
    services = [],
    editItem = (e, i) => {},
    deleteEmptyCategory = (category_id: string) => {},
}: {
    categories: Record<string, string>[]
    services: ServiceItem[]
    translations: Record<string, string>
    deleteEmptyCategory(category_id: string): void
    editItem(s: ServiceItem, list_item_idx: number): void
}) {
    const serviced_categories: Record<string, string>[] = []
    services.forEach((svc: ServiceItem) => {
        if (
            serviced_categories.filter(({ id }) => svc.category.id == id)
                .length == 0
        ) {
            serviced_categories.push(svc.category)
        }
    })
    const empty_categories: Record<string, string>[] = categories.filter(
        (category: Record<string, string>) => {
            return (
                serviced_categories.filter(({ id }) => id == category.value)
                    .length == 0
            )
        }
    )

    let serviced_category_idx = 0

    return (
        <div className="flex flex-col gap-6">
            {serviced_categories.map(({ id, name }) => {
                return (
                    <div
                        key={id}
                        className="overflow-hidden rounded-lg border-b border-r border-gray-100"
                    >
                        <Disclosure defaultOpen>
                            <div className="flex gap-3 bg-primary-lighter bg-opacity-30 text-primary text-lg py-4 px-6 w-full text-left justify-between items-center">
                                <Disclosure.Button className="flex-1 text-left">
                                    {name}
                                </Disclosure.Button>
                                <button
                                    className="border border-primary-lighter font-display text-primary text-base h-10 px-6 rounded-lg"
                                    type="button"
                                >
                                    <Translation content_key="edit_category_btn" translations={translations} />
                                </button>
                                <Disclosure.Button>
                                    <i className="feather-chevron-down text-xl" />
                                </Disclosure.Button>
                            </div>
                            <Disclosure.Panel className="overflow-hidden bg-gray-100 rounded-b-lg">
                                {services.map(
                                    (service: ServiceItem, idx: number) => {
                                        if (
                                            (service.category
                                                .id as string) == id
                                        ) {
                                            serviced_category_idx++
                                            return (
                                                <div
                                                    key={service.id}
                                                    className={classNames(
                                                        serviced_category_idx %
                                                            2
                                                            ? 'bg-opacity-30'
                                                            : 'bg-opacity-70',
                                                        'bg-white py-2 px-6 flex items-center gap-3'
                                                    )}
                                                >
                                                    <i className="feather-menu" />
                                                    <span className="2xl:w-72 lg:w-52 text-left">
                                                        {service.name}
                                                    </span>
                                                    <span className="w-24 px-3 bg-green-100 text-green-800 text-xs font-display rounded-full py-1 w-32 text-center">
                                                        {
                                                            service.service_type
                                                        }
                                                    </span>
                                                    <span className="w-24 text-center">
                                                        SGD {service.price}
                                                    </span>
                                                    <div className="w-60">
                                                        <strong className="text-sm">
                                                            {
                                                                service.duration
                                                            }{' '}
                                                            <Translation
                                                                content_key="mins"
                                                                translations={
                                                                    translations
                                                                }
                                                            />
                                                        </strong>
                                                        <span className="text-sm">
                                                            <Translation
                                                                content_key="max_participants"
                                                                translations={
                                                                    translations
                                                                }
                                                            />
                                                            :{' '}
                                                            {
                                                                service.max_participants
                                                            }
                                                        </span>
                                                    </div>
                                                    <span>
                                                        {
                                                            service.staff
                                                                .length
                                                        }{' '}
                                                        <Translation
                                                            content_key="staff_assgined"
                                                            translations={
                                                                translations
                                                            }
                                                        />
                                                    </span>
                                                    <div className="flex-1" />
                                                    <button
                                                        type="button"
                                                        className="bg-primary-lighter bg-opacity-50 text-xl text-primary-light h-12 w-12 rounded-lg"
                                                        onClick={() => {
                                                            editItem(
                                                                service,
                                                                idx
                                                            )
                                                        }}
                                                    >
                                                        <i className="feather-edit" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="bg-red-100 text-red-500 h-12 w-12 text-xl rounded-lg"
                                                    >
                                                        <i className="feather-archive" />
                                                    </button>
                                                </div>
                                            )
                                        } else return ''
                                    }
                                )}
                            </Disclosure.Panel>
                        </Disclosure>
                    </div>
                )
            })}

            {empty_categories.map(({ text, value }) => {
                return (
                    <div
                        className="bg-gray-50 px-6 py-4 rounded-lg flex flex-col md:flex-row items-center gap-6"
                        key={value}
                    >
                        <span className="text-gray-300 text-lg font-thin font-display flex-1">
                            {text}
                        </span>
                        <div className="flex place-content-end gap-3">
                            <button
                                className="bg-red-100 text-red-600 w-12 h-12 rounded-lg"
                                type="button"
                                onClick={() => {
                                    deleteEmptyCategory(value)
                                }}
                            >
                                <i className="feather-archive" />
                            </button>
                            <button
                                className="bg-primary-lighter bg-opacity-40 text-primary w-12 h-12 rounded-lg"
                                type="button"
                            >
                                <i className="feather-edit" />
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ServiceList
