import { Dispatch, ReactElement, ReactNode, SetStateAction } from 'react'

export enum DropPosition {
    BOTTOM_RIGHT = 'origin-bottom-right bottom-14 right-0',
    TOP_LEFT = 'origin-top-left left-0',
    TOP_RIGHT = 'origin-top-right right-0',
}
export type SelectorItemProps = {
    label?: ReactElement
    updateGroupSelection?(selection: number[]): void
    is_expanded?: boolean
    onClick?: (expanded: boolean) => void
    value?: string
    selection?: number[]
    input_component?: ReactElement
    options?: {
        label: string
        value: string
    }[]
}

export type SelectorProps = {
    className?: string
    dropboxClassname?: string
    position?: DropPosition
    items: SelectorItemProps[]
    selected?: Record<string, string>
    is_opened?: boolean
    is_search_enabled?: boolean
    label?: ReactElement
    style?: Record<string, string>
}
