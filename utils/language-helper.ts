export function getTranslation(translate_key: string, translation: Record<string, string>[]): string {
    const item = translation.filter(( t: Record<string, string> ) => {
        return t.key == translate_key
    })
    return item.length > 0 ? item[0].value : ''
}
