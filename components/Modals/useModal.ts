import { useState } from 'react'
import { ModalHook } from './types'

export default function useModal(): ModalHook {
    const [is_open, setOpen] = useState(false)
    const [attributes, setAttributesData] = useState<
        Record<string, string>
    >({})

    return {
        attributes,
        is_open,
        setAttributes(data: Record<string, string>) {
            setAttributesData(data)
        },
        open() {
            setOpen(true)
        },
        close() {
            setOpen(false)
        },
    }
}
