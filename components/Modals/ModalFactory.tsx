import { Context, ReactNode } from 'react'
import { XIcon } from '@heroicons/react/solid'
import { action } from 'components/Buttons/ButtonFactory'
import { createWrapper } from 'components/LogicalWrapperFactory'
import { ModalHook } from './types'
import { JSXProvider } from 'components/types'

type Props = {
    children?: ReactNode
}

export function createModal<T extends object>(
    context: Context<T>,
    name: keyof T,
    opener_label: string | JSXProvider<Props>,
    CloserComponent: ReactNode = () => (
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
        Opener: action(opener_label, context, (ctx) => {
            if (attributes) {
                (ctx[name] as unknown as ModalHook).setAttributes(attributes)
            }
            return (ctx[name] as unknown as ModalHook).open()
        }),
        Closer: action(
            CloserComponent,
            context,
            (ctx) => (ctx[name] as unknown as ModalHook).close()
        ),
    }
}
