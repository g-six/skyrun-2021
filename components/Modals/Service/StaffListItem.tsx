import { classNames } from 'utils/dom-helpers'
export type StaffListItemProps = {
    id: string
    staff_user_id: string
    first_name: string
    last_name: string
    staff_image?: string
    translations?: Record<string, string>
    is_selected?: boolean
    onClick?(): void
    selectItem?(): void
}
export function StaffListItem({
    first_name,
    last_name,
    id,
    staff_user_id,
    staff_image,
    translations,
    is_selected,
    onClick,
    selectItem,
}: StaffListItemProps) {
    const { add } = translations as Record<string, string>
    return (
        <div
            className={classNames(
                'flex items-center gap-5 p-4 justify-between',
                is_selected ? 'bg-primary text-white' : ''
            )}
            onClick={onClick}
        >
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
                <div>
                    {first_name} {last_name}
                </div>
            </div>
            <button
                type="button"
                onClick={selectItem}
                className={classNames(
                    is_selected
                        ? 'text-primary-lighter'
                        : 'text-primary-light'
                )}
            >
                {add || 'add'}
            </button>
        </div>
    )
}

export default StaffListItem
