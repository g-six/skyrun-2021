import { useEffect, useState } from 'react'
import { Coords } from 'google-map-react'
import LocationModal from 'components/Modals/Location'
import { GeneralFormValues as LocationItem } from 'components/Modals/Location/types'
import Dashboard from '..'
import {
    deleteApiRequest,
    FetchMethods,
    useFetch,
} from 'utils/fetch-helper'
import { useAuth } from 'context/AuthContext'
import { Language } from 'components/LanguageSelector'
import LocationCard from './LocationCard'
import { classNames } from 'utils/dom-helpers'

function DashboardLocations() {
    const ctx = useAuth()
    const [api_locations, setLocations] = useState<
        Record<string, string>[]
    >([])
    const [map_pin_location, setPinLocation] = useState<Coords>({
        lat: 10.328218864962848,
        lng: 123.90642211578692,
    })
    const [map_center, setMapCenter] = useState<Coords>({
        lat: 10.328218864962848,
        lng: 123.90642211578692,
    })
    const { data, doFetch } = useFetch(
        `/v1/locations/tenant-id/?tenantId=${ctx.tenant?.id}`,
        FetchMethods.GET,
        !!ctx.tenant?.id
    )

    const locations: LocationItem[] = api_locations.map(
        ({
            id,
            name,
            city,
            country,
            language,
            manager,
            online,
            phone,
            timezone,
            zip,
            streetAddress1,
            streetAddress2,
        }) => ({
            id,
            name,
            city,
            country,
            language: language as Language,
            manager,
            online: online as unknown as boolean,
            phone,
            timezone,
            zip,
            street_1: streetAddress1,
            street_2: streetAddress2,
        })
    )

    function handleEdit(idx: number) {
        return () => {
            const location = locations[idx]
            ctx.LocationModal.setAttributes({
                ...(location as unknown as Record<
                    string,
                    string | Language | boolean
                >),
                idx,
            })

            ctx.LocationModal.open()
        }
    }

    useEffect(() => {
        async function fetchData() {
            if (!locations && !!ctx.tenant?.id) {
                await doFetch()
            }
        }

        if (!locations && !!ctx.tenant?.id) {
            setLocations([])
            fetchData()
        } else if (data.content) {
            setLocations(data.content)
        }
        if (ctx.LocationModal.attributes?.has_updates) {
            doFetch()
        }
    }, [
        ctx.tenant,
        data,
        data.content,
        locations,
        doFetch,
        ctx.LocationModal,
    ])

    return (
        <Dashboard>
            <div className="flex flex-col mt-4">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="flex justify-between">
                        <div className="flex gap-3"></div>
                        <button
                            onClick={() => {
                                ctx.LocationModal.open()
                            }}
                            className="flex items-center bg-primary-lighter text-primary px-8 py-2 font-thin rounded-lg mb-3"
                        >
                            <i className="feather-plus text-xl mr-2" />
                            Add New
                        </button>
                    </div>
                </div>
                <div className="overflow-hidden xl:max-w-5xl">
                    <div className="grid lg:grid-cols-2 px-8 pb-12 gap-8">
                        {((locations as LocationItem[]) || []).map(
                            (record: LocationItem) => (
                                <LocationCard
                                    key={record.id}
                                    record={record}
                                    map_pin_location={map_pin_location}
                                    map_center={map_center}
                                    archiveItem={async (
                                        rec: LocationItem
                                    ) => {
                                        await deleteApiRequest(
                                            `/v1/locations/${record.id}`
                                        )
                                    }}
                                />
                            )
                        )}

                        <div
                            onClick={() => {
                                ctx.LocationModal.open()
                            }}
                            className={classNames(
                                'p-8 rounded-xl text-center flex flex-col content-center justify-center',
                                'border-2 border-dashed border-gray-150 cursor-pointer'
                            )}
                        >
                            <i className="block mx-auto mb-4 feather feather-plus font-back text-2xl block w-10 h-10 leading-relaxed px-2 rounded-xl bg-primary-lighter text-primary-light" />
                            <span className="text-xl mx-auto block w-36">
                                Add a new location
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <LocationModal />
        </Dashboard>
    )
}

export default DashboardLocations
