export type withClass = { className?: string }
export type JSXProvider<Props> = (props: Props) => JSX.Element

export interface Wrapper {
    children: string | JSX.Element | JSX.Element[]
}

export interface SVGProps {
    viewbox?: string
    className?: string
    width: number
    height: number
}
