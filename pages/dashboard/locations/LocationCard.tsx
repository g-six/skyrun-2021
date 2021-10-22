import { Coords } from 'google-map-react'
import dynamic from 'next/dynamic'
import { classNames } from 'utils/dom-helpers'
import { GeneralFormValues as LocationItem } from 'components/Modals/Location/types'

const Map = dynamic(() => import('components/Map'), { ssr: false })

export function LocationCard({
    record,
    map_center,
    map_pin_location,
    archiveItem,
    editItem,
}: {
    record: LocationItem
    map_pin_location: Coords
    map_center: Coords
    archiveItem(l: LocationItem): void
    editItem(): void
}) {
    return (
        <div
            key={record.id}
            className="shadow-lg rounded-xl border-t border-l border-gray-50 overflow-hidden flex flex-col"
            style={{ minHeight: '520px' }}
        >
            <div className="overflow-hidden -mt-6 -mx-8 h-64 block">
                <Map
                    center={map_center}
                    zoom={16}
                    lat={map_pin_location.lat}
                    lng={map_pin_location.lng}
                />
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
                        <div className="text-lg font-medium text-gray-900">
                            {record.name}
                        </div>

                        <div className="text-sm text-gray-700 text-right">
                            {record.phone || ''}
                        </div>
                    </div>

                    <address className="text-base leading-snug text-black not-italic">
                        <span className="block">{record.street_1}</span>
                        <span className="block">{record.street_2}</span>
                        <span className="block">
                            {record.city} {record.state}
                        </span>
                        <span className="block">
                            {record.zip} {record.country}
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
                            onClick={editItem}>
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
