import { CheckboxChangeEvent } from '@progress/kendo-react-inputs'
import { useState } from 'react'

type ToggleSwitchProps = {
    value: boolean
    action: (value: boolean) => void
}

function ToggleSwitch({ value, action }: ToggleSwitchProps) {
    return (
        <div className="toogle-switch-container">
            <label className="switch">
                <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => action(e.target.checked)}
                />
                <span className="slider round"></span>
            </label>
        </div>
    )
}

export default ToggleSwitch
