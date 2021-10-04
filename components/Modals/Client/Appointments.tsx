import { useAuth } from 'context/AuthContext'

function EmptyAppointments() {
    return (<div className="text-center py-10">
        <div className="rounded-full bg-gray-100 w-20 h-20 inline-block leading-loose text-center align-middle">
            <i className="text-gray-400 feather feather-calendar text-4xl leading-loose" />
        </div>
        <div className="text-gray-400 block mt-4 mx-auto">This client currently has no appointments</div>
        <button className="rounded-lg border-gray-200 py-3 px-12 border shadow-xl mt-6 text-gray-500">
            Schedule
        </button>
    </div>)
}
export function Appointments() {
    return (<div>
        <EmptyAppointments />
    </div>)
}

export default Appointments