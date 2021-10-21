type InputProps = {
    id?: string
    error?: string
    value?: string
    className?: string
    onChange?(value: string): void
}
export function MoneyInput(props: InputProps) {
    return (
        <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
                {...props}
                onChange={(e) => {
                    props.onChange ? props.onChange(e.target.value) : ''
                }}
                type="text"
                className={props.className}
            />
        </div>
    )
}

export default MoneyInput
