export function getTranslation(translate_key: string, translations: Record<string, string>): string {
    let text = translations[translate_key]

    if (text == undefined) {
        text = translate_key
    }

    return text
}
