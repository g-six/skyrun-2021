import { useCallback, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import getConfig from 'next/config'

export enum FetchMethods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

function fetchPath(path: string) {
    const { API_ENDPOINT } = getConfig().publicRuntimeConfig
    return (API_ENDPOINT || '/api') + path
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
                console.error('doFetch:', e.message)
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
