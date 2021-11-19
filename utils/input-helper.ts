export function handleInputEnter(onSubmit: () => void) {
    return ({ key }: { key: string }) => {
        if (key.toUpperCase() == 'ENTER') {
            onSubmit()
        }
    }
}