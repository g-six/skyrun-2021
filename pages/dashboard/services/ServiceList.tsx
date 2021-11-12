import { Disclosure } from '@headlessui/react'
import { UserModel } from 'components/Modals/types'
import Translation from 'components/Translation'
import { useAppContext } from 'context/AppContext'
import { useState } from 'react'
import { ServiceApiItem, ServiceItem } from 'types/service'
export function ServiceList({
    translations = {},
    services = [],
}: {
    services: ServiceApiItem[]
    translations: Record<string, string>
}) {
    const categories: Record<string, string>[] = []
    const normalized: ServiceItem[] = []
    services.forEach((svc: ServiceApiItem) => {
        normalized.push({
            ...svc,
            name: svc.name,
            category: svc.category,
            is_public: svc.public,
            service_type: svc.type,
            max_participants: svc.maxCapacity,
            staff: svc.staff && svc.staff.map(
                ({ id, user }: { id: string; user: UserModel }) => ({
                    id,
                    user_id: user.id as string,
                    first_name: user.firstName,
                    last_name: user.lastName,
                })
            ) || [],
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
                                return service.category.id as string == id ? (
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
                                                : {service.max_participants}
                                            </span>
                                        </div>
                                        <span>
                                            {service.staff.length}{' '}
                                            <Translation
                                                content_key="staff_assgined"
                                                translations={translations}
                                            />
                                        </span>
                                        <div className="flex-1" />
                                        <button
                                            type="button"
                                            className="bg-primary-lighter bg-opacity-50 text-primary-light h-12 w-12 rounded-lg"
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
                                ) : ''
                            })}
                        </Disclosure.Panel>
                    </Disclosure>
                )
            })}
        </div>
    )
}

export default ServiceList
