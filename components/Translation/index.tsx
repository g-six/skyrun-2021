export type TranslationProps = {
    className?: string
    htmlFor?: string
    render_as?: 'div' | 'span' | 'p' | 'label'
    content_key: string
    translations: Record<string, string>
}

export function Translation(p: TranslationProps) {
    let text = p.translations[p.content_key]
    if (text == undefined) {
        text = ''
    }
    if (p.render_as == 'div') {
        return (
            <div className={p.className || ''}>
                {text}
            </div>
        )
    } else if (p.render_as == 'p') {
        return (
            <p className={p.className || ''}>
                {text}
            </p>
        )
    } else if (p.render_as == 'span') {
        return (
            <span className={p.className || ''}>
                {text}
            </span>
        )
    } else if (p.render_as == 'label') {
        return (
            <label htmlFor={p.htmlFor || ''} className={p.className || ''}>
                {text}
            </label>
        )
    }

    return <>{text}</>
}

export default Translation
