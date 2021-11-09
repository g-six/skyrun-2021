export type StaffCardItemProps = {
    first_name: string
    last_name: string
    id: string
    staff_user_id: string
    staff_image: string
    translations?: Record<string, string>
    onDelete(): void
}

export function StaffCardItem({
    first_name,
    last_name,
    id,
    staff_user_id,
    staff_image,
    translations,
    onDelete,
}: StaffCardItemProps) {
    const { set_availability } = translations as Record<string, string>
    return (
        <div className="flex items-center gap-5 p-4 py-5 justify-between bg-white rounded-lg shadow-lg text-base">
            <div className="rounded-full w-10 h-10 overflow-hidden block bg-gray-100 flex items-center justify-center">
                {staff_image ? (
                    <div
                        className="w-10 h-10"
                        style={{ backgroundImage: `url(${staff_image})` }}
                    />
                ) : (
                    <i className="feather-user text-2xl text-primary" />
                )}
            </div>
            <div className="text-left flex-1 flex flex-col">
                <div>
                    {first_name} {last_name}
                </div>
                <div className="text-xs">
                    {first_name} {last_name}
                </div>
            </div>
            <div className="flex items-center gap-2">
                <button
                    type="button"
                    className="bg-primary-lighter bg-opacity-40 hover:bg-opacity-80 text-primary-light text-sm rounded h-8 px-3 font-sans flex items-center gap-1 font-medium"
                >
                    <i className="feather-calendar" />
                    {set_availability || 'set_availability'}
                </button>

                <button
                    type="button"
                    onClick={onDelete}
                    className="bg-red-100 bg-opacity-40 hover:bg-opacity-100 text-red-700 text-sm rounded h-8 w-8 text-center"
                >
                    <i className="feather-trash-2" />
                </button>
            </div>
        </div>
    )
}

export default StaffCardItem
