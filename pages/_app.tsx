import { SkyAuthProvider } from 'context/AuthContext'
import * as fbq from 'lib/fbpixels'
import * as gtag from 'lib/gtag'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { ReactElement, useCallback, useEffect, useState } from 'react'
import { classNames } from 'utils/dom-helpers'
import SkyContext, { SkyAppDataProvider } from '../context/AppContext'
import '../styles/globals.scss'

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
        fbq.pageview()
        const handleRouteChange = () => {
            fbq.pageview()
        }
        router.events.on('routeChangeComplete', handleRouteChange)
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
        }
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
                <Script
                    id="fb-pixel-script"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                        !function(f,b,e,v,n,t,s)
                        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                        n.queue=[];t=b.createElement(e);t.async=!0;
                        t.src=v;s=b.getElementsByTagName(e)[0];
                        s.parentNode.insertBefore(t,s)}(window, document,'script',
                        'https://connect.facebook.net/en_US/fbevents.js');
                        fbq('init', ${fbq.FB_PIXEL_ID});
                    `,
                    }}
                />
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
