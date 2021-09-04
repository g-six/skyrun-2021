export interface ModalHook {
    is_open: boolean
    open(): void
    close(): void
}
