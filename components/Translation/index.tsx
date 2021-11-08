export type TranslationProps = {
    className?: string
    htmlFor?: string
    render_as?: 'div' | 'span' | 'p' | 'label' | 'h3' | 'small' | 'li'
    content_key: string
    translations: Record<string, string>
}

export function Translation(p: TranslationProps) {
    let text = p.translations[p.content_key]
    if (text == undefined) {
        text = p.content_key
    }

    switch (p.render_as) {
        case 'div':
            return <div className={p.className || ''}>{text}</div>
        case 'p':
            return <p className={p.className || ''}>{text}</p>
        case 'span':
            return <span className={p.className || ''}>{text}</span>
        case 'label':
            return (
                <label
                    htmlFor={p.htmlFor || ''}
                    className={p.className || ''}
                >
                    {text}
                </label>
            )
        case 'h3':
            return <h3 className={p.className || ''}>{text}</h3>
        case 'small':
            return <small className={p.className || ''}>{text}</small>
        case 'li':
            return <li className={p.className || ''}>{text}</li>
        default:
            return <>{text}</>
    }
}

export default Translation
