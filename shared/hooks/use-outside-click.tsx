import { useEffect, useRef } from 'react'

type Handler = (event: Event) => void;

export function useOutsideClick<T extends HTMLElement>(
    handler: Handler,
    enabled: boolean = true,
) {
    const ref = useRef<T>(null)

    useEffect(() => {
        if (!enabled) return

        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                handler(event)
            }
        }

        const handleEscapePress = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handler(event)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('keydown', handleEscapePress)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('keydown', handleEscapePress)
        }
    }, [handler, enabled])

    return ref
}
