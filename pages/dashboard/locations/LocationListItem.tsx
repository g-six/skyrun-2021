import { classNames } from 'utils/dom-helpers'
import { GeneralFormValues as LocationItem } from 'components/Modals/Location/types'

export function LocationListItem({
    record,
    editItem,
    archiveItem,
}: {
    record: LocationItem
    archiveItem(l: LocationItem): void
    editItem(): void
}) {
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
