export function toTitleCase(text: string) {
    const words = text.split(' ').map((word: string) => {
        return `${word.substr(0, 1).toUpperCase()}${word.substr(1).toLowerCase()}`
    })

    return words.join(' ')
}
