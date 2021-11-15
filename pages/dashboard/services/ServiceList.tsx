import { Disclosure } from '@headlessui/react'
import Translation from 'components/Translation'
import { ServiceItem } from 'types/service'
export function ServiceList({
    translations = {},
    services = [],
    editItem = (e, i) => {},
}: {
    services: ServiceItem[]
    translations: Record<string, string>
    editItem(s: ServiceItem, list_item_idx: number): void
}) {
    const categories: Record<string, string>[] = []
    services.forEach((svc: ServiceItem) => {
        if (
            categories.filter(({ id }) => svc.category.id == id).length == 0
        ) {
            categories.push(svc.category)
        }
    })
    return (
        <div className="flex flex-col gap-6">
            {categories.map(({ id, name }) => {
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
        </div>
    )
}

export default ServiceList
