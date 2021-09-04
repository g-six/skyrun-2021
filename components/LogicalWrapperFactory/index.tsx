import { Wrapper } from 'components/types'
import { useMemo } from 'react'
import { useContext } from 'react'

export function createWrapper<T extends object>(
    context: React.Context<T>,
    consumer: (context: T) => boolean
) {
    return function ConditionalWrapper({ children }: Wrapper) {
        const context_value = useContext(context)
        const condition = useMemo(
            () => consumer(context_value),
            [context_value]
        )

        return <>{condition ? children : null}</>
    }
}
