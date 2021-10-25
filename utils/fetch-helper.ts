import Cookies from 'js-cookie'
import getConfig from 'next/config'
import { useCallback, useEffect, useState } from 'react'
import { FetchMethods } from './types'

function fetchPath(path: string) {
    const { API_ENDPOINT } = getConfig().publicRuntimeConfig
    return (API_ENDPOINT || '/api') + path
}

export async function getApiRequest(
    path: string,
    headers: Record<string, string> = {},
) {

    let req_init: RequestInit = {
        method: FetchMethods.GET,
        mode: 'cors',
        headers: {
            ...headers,
            'Content-Type': 'application/json',
        },
    }

    if (Cookies.get('id_token')) {
        (req_init.headers as Record<string, string>)['Authorization'] = `Bearer ${Cookies.get('id_token')}`
    }

    try {
        const response = await fetch(fetchPath(path), req_init)

        try {
            return await response.json()
        } catch (e) {
            return { error: 'API error' }
        }

    } catch (e) {
        console.error('doFetch:', (e as unknown as Error).message)
    }
}

export async function deleteApiRequest(
    path: string,
    headers: Record<string, string> = {},
) {

    let req_init: RequestInit = {
        method: FetchMethods.DELETE,
        mode: 'cors',
        headers: {
            ...headers,
            'Content-Type': 'application/json',
        },
    }

    if (Cookies.get('id_token')) {
        (req_init.headers as Record<string, string>)['Authorization'] = `Bearer ${Cookies.get('id_token')}`
    }

    try {
        const response = await fetch(fetchPath(path), req_init)

        try {
            return await response.json()
        } catch (e) {
            return { error: 'API error' }
        }

    } catch (e) {
        console.error('doFetch:', (e as unknown as Error).message)
    }
}


export function useFetch<Body = any, Result = any>(
    path: string,
    method: FetchMethods = FetchMethods.GET,
    fetch_on_mount: boolean = true,
    expects_json: boolean = true,
) {
    const [is_loading, setLoading] = useState(fetch_on_mount)
    const [data, setData] = useState<Result>({} as Result)
    const [status, setStatus] = useState(0)

    const doFetch = useCallback(
        async (body?: Body, query: string = '', headers = {}) => {
            let req_init: RequestInit = {
                method,
                mode: 'cors',
                headers: {
                    ...headers,
                    'Authorization': Cookies.get('id_token') ? `Bearer ${Cookies.get('id_token')}` : undefined,
                    'Content-Type': 'application/json',
                },
            }
            if (body) {
                req_init = {
                    ...req_init,
                    body: JSON.stringify(body),
                }
            }

            setLoading(true)

            try {
                const response = await fetch(fetchPath(path) + query, req_init)

                if (expects_json) {
                    try {
                        setData((await response.json()) as Result)
                    } catch (e) {
                        setData({ error: 'API error' } as unknown as
                        Result)
                    }
                }

                setLoading(false)
                setStatus(response.status)
                return response
            } catch (e) {
                console.error('doFetch:', (e as unknown as Error).message)
            }
        },
        [method, path, expects_json]
    )

    useEffect(() => {
        fetch_on_mount && doFetch()
    }, [doFetch, fetch_on_mount])

    return {
        is_loading,
        data,
        status,
        doFetch,
    }
}
