import { Coords } from 'google-map-react'
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService'
import { classNames } from 'utils/dom-helpers'
import { GeneralFormValues as LocationItem } from 'components/Modals/Location/types'
import { useEffect, useState } from 'react'
import { useAuth } from 'context/AuthContext'
import { PlaceDetail } from './types'

export function LocationListItem({
    record,
    apiKey,
    editItem,
    archiveItem,
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
            className="border-t border-b border-gray-100 border-b-gray-150 overflow-hidden flex flex-col"
        >
            <div className="p-6 flex justify-between">
                <div>
                    <div className="flex items-center justify-between">
                        <div className="text-lg font-medium text-gray-900">
                            {record.name}
                        </div>

                        <div className="text-sm text-gray-700 text-right">
                            {record.phone || ''}
                        </div>
                    </div>

                    <address className="text-base leading-snug text-black not-italic">
                        <span>{record.street_1}</span>
                        {record.street_2 ? ', ' : ' '}
                        <span>{record.street_2}</span>
                        <span className="block">
                            {record.city}
                            {record.city && record.state ? ', ' : ' '}
                            {record.state}
                            {record.city || record.state ? ', ' : ' '}
                            {record.zip}
                            {record.zip && record.country ? ', ' : ' '}
                            {record.country}
                        </span>
                    </address>
                </div>
                <div>
                    <div className="grid grid-cols-3 gap-3">
                        <button className="bg-primary text-white rounded-lg text-xl flex items-center w-12 h-12">
                            <i className="feather-calendar m-auto" />
                        </button>

                        <button
                            className="bg-gray-100 rounded-lg text-2xl flex items-center w-12 h-12"
                            onClick={editItem}
                        >
                            <i className="feather-info m-auto" />
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                archiveItem(record)
                            }}
                            className="bg-red-100 rounded-lg flex items-center w-12 h-12 text-red-600 text-xl"
                        >
                            <i className="feather-archive m-auto" />
                        </button>
                    </div>
                    <div className="flex-grow mt-3 text-right">
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
                </div>
            </div>
        </div>
    )
}

export default LocationListItem
