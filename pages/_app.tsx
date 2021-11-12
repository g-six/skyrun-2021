import { useCallback, useState, useEffect, ReactElement } from 'react'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import '../styles/globals.scss'
import SkyContext, { SkyAppDataProvider } from '../context/AppContext'
import { classNames } from 'utils/dom-helpers'
import { SkyAuthProvider } from 'context/AuthContext'
import { useRouter } from 'next/router'
import * as gtag from 'lib/gtag'

const GridSpinner = dynamic(() => import('components/Spinners/grid'), {
    ssr: false,
})

function SafeHydrate({ children }: Record<string, ReactElement>) {
    return (
        <div suppressHydrationWarning>
            {typeof window === 'undefined' ? null : children}
        </div>
    )
}

function MyApp({ Component, pageProps }: AppProps) {
    SkyContext.displayName = 'AppContext'
    const [is_mounted, setMounted] = useState(false)
    const [is_fetching, setFetching] = useState(true)
    const [context, setContext] = useState({
        locale_id: '',
    })
    const [blur, setBlur] = useState(true)
    const router = useRouter()

    const onLanguageChange = useCallback(
        (event) => {
            const ctx = {
                ...context,
                locale_id: event.value.locale_id || '',
            }
            setContext(ctx)
        },
        [context, setContext]
    )

    useEffect(() => {
        async function getProfile() {
            setTimeout(() => {
                setMounted(true)
                setTimeout(() => {
                    setBlur(false)
                }, 310)
            }, 600)
        }

        if (is_fetching) {
            getProfile()
        }

        setFetching(false)
    }, [is_fetching, context])

    useEffect(() => {
        import('react-facebook-pixel')
            .then((x) => x.default)
            .then((ReactPixel) => {
                ReactPixel.init(`${process.env.FACEBOOK_PIXEL_ID}`)
                ReactPixel.pageView()
                router.events.on('routeChangeComplete', () => {
                    ReactPixel.pageView()
                })
            })
    }, [router.events])

    useEffect(() => {
        const handleRouteChange = (url: URL) => {
            gtag.pageview(url)
        }
        router.events.on('routeChangeComplete', handleRouteChange)
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, [router.events])

    return (
        <SafeHydrate>
            <SkyAppDataProvider>
                <SkyAuthProvider>
                    {blur ? (
                        <div
                            className={classNames(
                                'absolute z-10 backdrop-filter backdrop-blur-sm',
                                'flex flex-col justify-center self-center w-screen h-screen',
                                'transition transition-all ease-in-out duration-500',
                                is_fetching
                                    ? ''
                                    : is_mounted
                                    ? 'opacity-0'
                                    : 'opacity-100'
                            )}
                        >
                            <div className="self-center">
                                <GridSpinner height={24} width={24} />
                            </div>
                        </div>
                    ) : (
                        ''
                    )}
                    <Component
                        {...pageProps}
                        onLanguageChange={onLanguageChange}
                    />
                </SkyAuthProvider>
            </SkyAppDataProvider>
        </SafeHydrate>
    )
}

export default MyApp
