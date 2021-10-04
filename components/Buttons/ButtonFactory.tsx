import { ReactNode, useCallback, useContext, useMemo } from 'react'
import { JSXProvider, withClass } from 'components/types'
import Link from 'next/link'

export function link<Props extends object = {}>(
    label: string | JSXProvider<Props>,
    to: string
) {
    return function LinkButton({ className, ...props }: withClass & Props) {
        return (
            <Link href={to} passHref>
                <a className={className}>
                    {typeof label === 'string'
                        ? label
                        : label(props as unknown as Props)}
                </a>
            </Link>
        )
    }
}

export function action<T extends object, Props extends object = {}>(
    label: string | JSXProvider<Props> | ReactNode,
    context: React.Context<T>,
    consumer: (ctx: T) => void,
    disabledConsumer?: (ctx: T) => boolean
) {
    return function ContextAction({
        className,
        ...props
    }: withClass & Props) {
        const ctx = useContext(context)
        const action = useCallback(() => consumer(ctx), [ctx])
        const disabled = useMemo(
            () => !!disabledConsumer && disabledConsumer(ctx),
            [ctx]
        )
        return (
            <button
                onClick={action}
                className={className}
                disabled={disabled}
            >
                {typeof label === 'string'
                    ? label
                    : (label as JSXProvider<Props>)(props as unknown as Props)}
            </button>
        )
    }
}
