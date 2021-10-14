import { Context, FunctionComponent, ReactNode } from 'react'
import { XIcon } from '@heroicons/react/solid'
import { action } from 'components/Buttons/ButtonFactory'
import { createWrapper } from 'components/LogicalWrapperFactory'
import { ModalHook } from './types'

export interface ActionElementProps {
    children?: ReactNode
    elementType?: keyof JSX.IntrinsicElements
}

export function createModal<T extends object>(
    context: Context<T>,
    name: keyof T,
    OpenerComponent: () => JSX.Element,
    CloserComponent: () => JSX.Element = () => (
        <span className="text-sm inline-block w-6 h-6 text-gray-400 text-center font-extralight">
            <XIcon />
        </span>
    ),
    attributes?: Record<string, string>
) {
    return {
        Visible: createWrapper(
            context,
            (ctx) => (ctx[name] as unknown as ModalHook).is_open
        ),
        Opener: action(OpenerComponent, context, (ctx) => {
            if (attributes) {
                ;(ctx[name] as unknown as ModalHook).setAttributes(
                    attributes
                )
            }
            return (ctx[name] as unknown as ModalHook).open()
        }),
        Closer: action(CloserComponent, context, (ctx) =>
            (ctx[name] as unknown as ModalHook).close()
        ),
    }
}
