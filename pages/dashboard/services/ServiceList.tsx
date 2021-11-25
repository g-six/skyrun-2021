import { Disclosure } from '@headlessui/react'
import Translation from 'components/Translation'
import { ServiceItem, ServiceType } from 'types/service'
import { classNames } from 'utils/dom-helpers'

export function getServiceBg(service_type: string) {
    switch (service_type) {
        case 'GROUP':
            return 'bg-blue-100 text-grey-600'
        case 'APPOINTMENT':
            return 'bg-green-100 text-green-900'
        case 'SERIES':
            return 'bg-red-100 text-grey-600'
        default:
            return 'bg-green-100 text-green-800'
    }
}
export function ServiceList({
    categories = [],
    group_classes = {},
    translations = {},
    services = [],
    editItem = (e, i) => {},
    deleteEmptyCategory = (category_id: string) => {},
}: {
    categories: Record<string, string>[]
    services: ServiceItem[]
    group_classes: Record<string, Record<string, string | Date>[]>
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
                                    <Translation
                                        content_key="edit_category_btn"
                                        translations={translations}
                                    />
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
                                                        'bg-white py-2 px-6 flex items-center gap-3 text-sm'
                                                    )}
                                                >
                                                    <i className="feather-menu" />
                                                    <span className="2xl:w-72 lg:w-52 text-left">
                                                        {service.name}
                                                    </span>
                                                    <Translation
                                                        render_as="span"
                                                        content_key={
                                                            service.service_type
                                                        }
                                                        translations={
                                                            translations
                                                        }
                                                        className={classNames(
                                                            getServiceBg(
                                                                service.service_type
                                                            ),
                                                            'w-24 px-3 text-xs font-bold rounded-full tracking-widest py-1 w-32 text-center uppercase'
                                                        )}
                                                    />
                                                    <span className="w-24 text-center">
                                                        SGD {service.price}
                                                    </span>

                                                    <strong className="w-16">
                                                        {service.duration}{' '}
                                                        <Translation
                                                            content_key="mins"
                                                            translations={
                                                                translations
                                                            }
                                                        />
                                                    </strong>
                                                    <span className="w-32">
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

                                                    {(service.service_type as string) ==
                                                    'APPOINTMENT' ? (
                                                        <span>
                                                            {
                                                                service
                                                                    .staff
                                                                    .length
                                                            }{' '}
                                                            <Translation
                                                                content_key="staff_assigned"
                                                                translations={
                                                                    translations
                                                                }
                                                            />
                                                        </span>
                                                    ) : (
                                                        ''
                                                    )}

                                                    {(service.service_type as string) ==
                                                        'GROUP' &&
                                                    service.id &&
                                                    group_classes[
                                                        service.id
                                                    ] ? (
                                                        <span>
                                                            <Translation
                                                                content_key="upcoming_classes"
                                                                content_values={{
                                                                    num_of_classes:
                                                                        group_classes[
                                                                            service
                                                                                .id
                                                                        ]
                                                                            .length,
                                                                }}
                                                                translations={
                                                                    translations
                                                                }
                                                            />
                                                        </span>
                                                    ) : (
                                                        <Translation
                                                            content_key="no_upcoming_classes"
                                                            translations={
                                                                translations
                                                            }
                                                        />
                                                    )}

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
