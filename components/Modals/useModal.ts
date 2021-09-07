import { useState } from 'react'
import { ModalHook } from './types'

export default function useModal(): ModalHook {
    const [is_open, setOpen] = useState(false)

    return {
        is_open,
        open() {
            setOpen(true)
        },
        close() {
            setOpen(false)
        },
    }
}
