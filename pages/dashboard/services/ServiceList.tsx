import { Disclosure } from '@headlessui/react'
import Translation from 'components/Translation'
import { ServiceItem } from 'types/service'
export function ServiceList({
    categories = [],
    translations = {},
    services = [],
    editItem = (e, i) => {},
    deleteEmptyCategory = (category_id: string) => {}
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
    const empty_categories: Record<string, string>[] = categories.filter((category: Record<string, string>) => {
        return serviced_categories.filter(({ id }) => (id == category.value)).length == 0
    })

    return (
        <div className="flex flex-col gap-6">
            {serviced_categories.map(({ id, name }) => {
                return (
                    <div key={id}>
                        <Disclosure defaultOpen>
                            <Disclosure.Button className="bg-primary-lighter bg-opacity-30 text-primary text-lg py-4 px-6 rounded-t-lg w-full text-left flex justify-between items-center">
                                {name}
                                <i className="feather-chevron-down text-xl" />
                            </Disclosure.Button>
                            <Disclosure.Panel>
                                {services.map(
                                    (service: ServiceItem, idx) => {
                                        return (service.category
                                            .id as string) == id ? (
                                            <div
                                                key={idx}
                                                className="bg-gray-50 py-2 px-6 flex items-center gap-3"
                                            >
                                                <i className="feather-menu" />
                                                <span className="2xl:w-72 text-left">
                                                    {service.name}
                                                </span>
                                                <span className="w-24 px-3 bg-green-100 text-green-800 text-xs font-display rounded-full py-1 w-32 text-center">
                                                    {service.service_type}
                                                </span>
                                                <span className="w-24 text-center">
                                                    SGD {service.price}
                                                </span>
                                                <div className="w-60">
                                                    <strong className="text-sm">
                                                        {service.duration}{' '}
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
                                                    {service.staff.length}{' '}
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
                                                    className="bg-primary-lighter bg-opacity-50 text-primary-light h-12 w-12 rounded-lg"
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
                                                    className="bg-red-100 text-red-600 h-12 w-12 rounded-lg"
                                                >
                                                    <i className="feather-archive" />
                                                </button>
                                            </div>
                                        ) : (
                                            ''
                                        )
                                    }
                                )}
                            </Disclosure.Panel>
                        </Disclosure>
                    </div>
                )
            })}

            {empty_categories.map(({ text, value }) => {
                return <div className="bg-gray-50 px-5 py-4 rounded-lg flex flex-col md:flex-row items-center gap-6" key={value}>
                    <span className="text-gray-400 text-lg font-thin font-display flex-1">{text}</span>
                    <div className="flex place-content-end gap-2">
                        <button
                            className="bg-red-100 text-red-600 w-10 h-10 rounded"
                            type="button"
                            onClick={() => { deleteEmptyCategory(value) }}
                            ><i className="feather-trash" /></button>
                        <button
                            className="bg-primary-lighter bg-opacity-40 text-primary w-10 h-10 rounded"
                            type="button"
                            ><i className="feather-edit" /></button>
                    </div>
                </div>
            })}
        </div>
    )
}

export default ServiceList
