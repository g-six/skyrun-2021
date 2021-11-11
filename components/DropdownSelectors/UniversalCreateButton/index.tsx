import { classNames } from '@progress/kendo-react-common'

type UniversalCreateButtonProps = {
    handleUniversalButtonChange: (text: string) => void
}

export function UniversalCreateButton({
    handleUniversalButtonChange,
}: UniversalCreateButtonProps) {
    return (
        <>
            <select
                id="universalCreate"
                name="universalCreate"
                className={classNames(
                    'h-full py-0 pl-2 pr-8 bg-primary',
                    'focus:ring-primary-dark focus:border-primary-dark ',
                    'border-transparent rounded',
                    'text-gray-300 universal-create-button'
                )}
                defaultValue="default"
                onChange={(e) =>
                    handleUniversalButtonChange(e.target.value)
                }
            >
                <option value="default" disabled selected>
                    +&nbsp;&nbsp; New
                </option>
                <option value="Client">Client</option>
                <option value="Staff">Staff</option>
                <option value="Service">Service</option>
            </select>
        </>
    )
}

export default UniversalCreateButton
