import {
    Scheduler,
    WeekView,
    WorkWeekView,
  } from '@progress/kendo-react-scheduler'
import { Day } from '@progress/kendo-date-math'
import Dashboard from '..'

function DashboardCalendar() {
    return (
        <Dashboard>
            <Scheduler>
            <WorkWeekView
                title="Work Week"
                workWeekStart={Day.Monday}
                workWeekEnd={Day.Thursday}
            />
            <WeekView
                title="Full Week"
                workWeekStart={Day.Monday}
                workWeekEnd={Day.Thursday}
            />
            </Scheduler>
            <span>Calendar panel is a work in progress</span>
        </Dashboard>
    )
}

export default DashboardCalendar
