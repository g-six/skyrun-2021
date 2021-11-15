import { CheckboxChangeEvent } from '@progress/kendo-react-inputs'
import { useState } from 'react'

function ToggleSwitch({ isOn = false }) {
    const [_isOn, setIsOn] = useState(isOn)

    return (
        <div className="toogle-switch-container">
            <label className="switch">
                <input
                    type="checkbox"
                    checked={_isOn}
                    onChange={(e) => setIsOn(e.target.checked)}
                />
                <span className="slider round"></span>
            </label>
        </div>
    )
}

export default ToggleSwitch
