export type TranslationProps = {
    className?: string
    href?: string
    htmlFor?: string
    render_as?:
        | 'div'
        | 'span'
        | 'p'
        | 'label'
        | 'h2'
        | 'h3'
        | 'h4'
        | 'h5'
        | 'small'
        | 'li'
        | 'strong'
        | 'i'
        | 'a'
    content_key: string
    content_values?: Record<string, string | number | Date>
    translations: Record<string, string>
}

export function Translation(p: TranslationProps) {
    let text = p.translations[p.content_key]
    if (text == undefined) {
        text = p.content_key
    } else if (
        p.content_values &&
        Object.keys(p.content_values).length > 0
    ) {
        Object.keys(p.content_values).forEach((key: string) => {
            text = text.split(`{${key}}`).join(p.content_values[key])
        })
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
        case 'h2':
            return <h2 className={p.className || ''}>{text}</h2>
        case 'h3':
            return <h3 className={p.className || ''}>{text}</h3>
        case 'h4':
            return <h4 className={p.className || ''}>{text}</h4>
        case 'h5':
            return <h5 className={p.className || ''}>{text}</h5>
        case 'small':
            return <small className={p.className || ''}>{text}</small>
        case 'li':
            return <li className={p.className || ''}>{text}</li>
        case 'strong':
            return <strong className={p.className || ''}>{text}</strong>
        case 'i':
            return <i className={p.className || ''}>{text}</i>
        case 'a':
            return (
                <a className={p.className || ''} href={p.href || ''}>
                    {text}
                </a>
            )
        default:
            return <>{text}</>
    }
}

export default Translation
