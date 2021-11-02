import { Disclosure } from '@headlessui/react'
import { ServiceApiItem, ServiceItem } from 'types/service'
export function ServiceList({
    services = [],
}: {
    services: ServiceApiItem[]
}) {
    const categories: Record<string, string>[] = []
    const normalized: ServiceItem[] = []
    services.forEach((svc: ServiceApiItem) => {
        normalized.push({
            name: svc.name,
            category: svc.category,
            is_public: svc.public,
            service_type: svc.type,
        })
        if (
            categories.filter(({ id }) => svc.category.id == id).length == 0
        ) {
            categories.push(svc.category)
        }
    })
    return (
        <div>
            {categories.map(({ id, name }) => {
                return (
                    <Disclosure key={id} defaultOpen>
                        <Disclosure.Button className="bg-primary-lighter bg-opacity-30 text-primary text-lg py-4 px-6 rounded-t-lg w-full text-left flex justify-between items-center">
                            {name}
                            <i className="feather-chevron-down text-xl" />
                        </Disclosure.Button>
                        <Disclosure.Panel>
                            {normalized.map((service: ServiceItem, idx) => {
                                return (
                                    <div
                                        key={idx}
                                        className="bg-gray-50 py-2 px-6 flex items-center gap-3"
                                    >
                                        <i className="feather-menu" />
                                        <span>{service.name}</span>
                                    </div>
                                )
                            })}
                        </Disclosure.Panel>
                    </Disclosure>
                )
            })}
        </div>
    )
}

export default ServiceList
