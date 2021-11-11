import { classNames } from '@progress/kendo-react-common'

type UniversalCreateButtonProps = {
    handleUniversalButtonChange: (text: string) => void
}

export function UniversalCreateButton({
    handleUniversalButtonChange,
}: UniversalCreateButtonProps) {
    return (
        <select
            id="universalCreate"
            name="universalCreate"
            className={classNames(
                'pl-4 h-full bg-primary',
                'border-primary rounded-xl',
                'text-gray-300'
            )}
            defaultValue="default"
            onChange={(e) => handleUniversalButtonChange(e.target.value)}
        >
            <option value="default" disabled selected>
                +&nbsp;&nbsp; New
            </option>
            <option value="Client">Client</option>
            <option value="Staff">Staff</option>
            <option value="Service">Service</option>
        </select>
    )
}

export default UniversalCreateButton
