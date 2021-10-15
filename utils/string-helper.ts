export function toTitleCase(text: string) {
    const words = text.split(' ').map((word: string) => {
        return `${word.substr(0, 1).toUpperCase()}${word.substr(1).toLowerCase()}`
    })

    return words.join(' ')
}

export function betterPathname(pathname: string) {
    const words: string[] = []
    pathname.split('/').forEach((word: string) => {
        if (word.length > 0) words.push(word)
    })

    return words
}
