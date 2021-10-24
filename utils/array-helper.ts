export function sortBy(key: string) {
    return (a: Record<string, string | number>, b: Record<string, string | number>) => {
        if (a[key] < b[key]) {
            return -1
        } else if (b[key] < a[key]) {
            return 1
        }
        return 0
    }
}
