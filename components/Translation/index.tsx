export type TranslationProps = {
    className?: string
    render_as?: 'div' | 'span' | 'p'
    content_key: string
    translations: Record<string, string>
}
export function Translation(p: TranslationProps) {
    if (p.render_as == 'div') {
        return <div className={p.className || ''}>
            {p.translations[p.content_key] || p.content_key}
        </div>
    } else if (p.render_as == 'p') {
        return <p className={p.className || ''}>
            {p.translations[p.content_key] || p.content_key}
        </p>
    } else if (p.render_as == 'span') {
        return <span className={p.className || ''}>
            {p.translations[p.content_key] || p.content_key}
        </span>
    }

    return <>
        {p.translations[p.content_key] || p.content_key}
    </>
}

export default Translation