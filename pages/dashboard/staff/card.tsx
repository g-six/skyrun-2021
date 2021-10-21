import { useAuth } from 'context/AuthContext'
import { MouseEvent, PropsWithChildren } from 'react'
import { Staff, StaffModalProps, StaffCardActions } from 'types/staff'

function Card(
    props: PropsWithChildren<StaffModalProps & StaffCardActions>
) {
    const ctx = useAuth()
    const record: Staff = props.list[props.idx]
    function handleEdit(e: MouseEvent<HTMLButtonElement>) {
        ctx.StaffModal.setAttributes({
            ...record.user,
            user_id: record.user.id,
            id: record.id,
            idx: props.idx,
        })
        ctx.StaffModal.open()
    }

    return (
        <div className="shadow-2xl p-8 rounded-xl border border-t-0 border-l-0  border-r-0 border-gray-150 text-center">
            <div className="flex flex-wrap text-center content-center rounded-full bg-primary-lighter w-36 h-36 block mx-auto mb-4 overflow-hidden">
                <div className="flex-1 font-black text-primary text-2xl">
                    {[record.user.first_name[0], record.user.last_name[0]].join('.')}.
                </div>
            </div>
            <div className="text-base font-bold text-gray-600 block my-1">
                {[record.user.first_name, record.user.last_name].join(' ')}
            </div>
            <div className="text-sm block my-1">{record.user.email}</div>
            <div className="text-sm block my-1">
                {record.user.phone || 'None Specified'}
            </div>
            <button
                className="button bg-primary md:w-40 w-56 rounded-lg text-white py-3 my-2"
                type="button"
                onClick={handleEdit}
            >
                Edit
            </button>
            <button
                className="button border border-1 md:w-40 w-56 rounded-lg my-2 py-3"
                type="button"
                onClick={handleEdit}
            >
                View More
            </button>
        </div>
    )
}

export default Card
