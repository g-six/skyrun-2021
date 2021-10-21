import { useState } from 'react'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default function DateInput(p: ReactDatePickerProps) {
    return <div>
        <DatePicker
            {...p}
            className={p.className}
        />
    </div>
}