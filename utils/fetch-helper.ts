import { useCallback, useEffect, useState } from 'react'

enum FetchMethods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

function fetchPath(path: string) {
    return (process.env.API_PATH || '/api') + path
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
        async (body?: Body, query: string = '') => {
            let req_init: RequestInit = { method }
            if (body) {
                req_init = body
                req_init.headers = { 'Content-Type': 'application/json' }
            }
            setLoading(true)
            const response = await fetch(fetchPath(path) + query, req_init)

            if (expects_json) {
                setData((await response.json()) as Result)
            }

            setLoading(false)
            setStatus(response.status)

            return response
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
