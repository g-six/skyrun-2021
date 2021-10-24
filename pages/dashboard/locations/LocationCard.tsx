import { Coords } from 'google-map-react'
import dynamic from 'next/dynamic'
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService'
import { classNames } from 'utils/dom-helpers'
import { GeneralFormValues as LocationItem } from 'components/Modals/Location/types'
import { useEffect, useState } from 'react'
import { useAuth } from 'context/AuthContext'
import { getStaticUrl, Marker } from 'components/Map'

const Map = dynamic(() => import('components/Map'), { ssr: false })
type PlaceDetail = {
    geometry: {
        location: {
            lat(): number
            lng(): number
        }
    }
    name: string
    utc_offset_minutes: number
}
export function LocationCard({
    record,
    apiKey,
    archiveItem,
    editItem,
}: {
    record: LocationItem
    apiKey: string
    archiveItem(l: LocationItem): void
    editItem(): void
}) {
    const { LocationModal } = useAuth()
    const {
        placesService: place_svc,
        placePredictions: places,
        getPlacePredictions,
        isPlacePredictionsLoading: is_predicting,
    } = usePlacesService({
        apiKey,
    })
    const [poi_name, setPoiName] = useState<string>('')
    const [map_pin_location, setPinLocation] = useState<Coords>()

    function handleEdit() {
        editItem()
    }

    useEffect(() => {
        function getDetails(place_id: string) {
            place_svc?.getDetails(
                {
                    placeId: places[0].place_id,
                },
                (details: PlaceDetail) => {
                    if (details) {
                        if (details?.utc_offset_minutes) {
                            const minutes = details.utc_offset_minutes % 60
                            const hours =
                                (details.utc_offset_minutes - minutes) / 60
                            console.log(hours, minutes)
                        }
                        const place_pin = {
                            lat: details?.geometry?.location?.lat(),
                            lng: details?.geometry?.location?.lng(),
                        } as Coords

                        if (!map_pin_location) {
                            setPinLocation(place_pin)
                        }
                        if (details.name) {
                            setPoiName(details.name)
                        }
                    } else {
                        setTimeout(() => {
                            getDetails(place_id)
                        }, 100)
                    }
                }
            )
        }
        if (!places.length && !is_predicting && !LocationModal.is_open) {
            const input = [
                record.street_1,
                record.street_2,
                record.zip,
                record.city,
                record.state,
                record.country,
            ].join(' ')
            getPlacePredictions({ input })
        }
        if (places.length && !is_predicting && !LocationModal.is_open) {
            getDetails(places[0].place_id)
        }
    }, [
        places,
        map_pin_location,
        is_predicting,
        places,
        record,
        record.street_1,
        poi_name,
    ])

    return (
        <div
            key={record.id}
            className="shadow-lg rounded-xl border-t border-l border-gray-50 overflow-hidden flex flex-col"
            style={{ minHeight: '520px' }}
        >
            <div className="overflow-hidden h-64 block">
                {map_pin_location ? (
                    <img
                        src={getStaticUrl({
                            center: map_pin_location as unknown as Marker,
                            markers: [
                                map_pin_location as unknown as Marker,
                            ],
                        })}
                    />
                ) : (
                    ''
                )}
            </div>
            <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                    <div className="flex-grow">
                        <div
                            className={classNames(
                                record.online
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-green-100 text-green-800',
                                'px-2 inline-flex text-xs leading-5 font-semibold rounded-full uppercase mb-4'
                            )}
                        >
                            {record.online ? 'Online' : 'Physical'}
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="text-lg font-semibold font-sans text-primary">
                            {record.name}
                            {poi_name ? (
                                <div className="font-sans text-sm text-primary">
                                    {poi_name}
                                </div>
                            ) : (
                                ''
                            )}
                        </div>

                        <div className="text-sm text-gray-700 text-right">
                            {record.phone || ''}
                        </div>
                    </div>

                    <address className="text-base leading-snug text-gray-500 not-italic">
                        <span className="block">{record.street_1}</span>
                        <span className="block">
                            {record.street_2
                                ? [record.street_2, record.city].join(', ')
                                : record.city}{' '}
                            {record.zip}
                        </span>
                        <span className="block">
                            {[record.state, record.country].join(', ')}
                        </span>
                    </address>
                </div>
                <div className="mt-6">
                    <div className="flex gap-3">
                        <button className="bg-primary text-white rounded-lg text-lg font-sans flex-1 py-2">
                            Calendar
                        </button>

                        <button
                            className="border-gray-400 border rounded-lg text-lg font-sans flex-1 py-2"
                            onClick={handleEdit}
                        >
                            See Details
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                archiveItem(record)
                            }}
                            className="bg-red-100 rounded-lg flex items-center w-12 h-12 text-red-600"
                        >
                            <i className="feather-archive m-auto" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LocationCard
