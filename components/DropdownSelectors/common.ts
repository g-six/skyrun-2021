export enum DropPosition {
    TOP_LEFT = 'origin-top-left left-0',
    TOP_RIGHT = 'origin-top-right right-0',
}
export type SelectorProps = {
    className?: string
    position?: DropPosition
    items: Record<string, string>[]
    selected?: Record<string, string>
}
