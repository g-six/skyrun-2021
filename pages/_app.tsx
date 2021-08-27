import { useCallback, useState, useEffect } from 'react'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import '../styles/globals.scss'
import SkyContext from '../context/AppContext'
import profile, { UserModel } from 'services/profile'
import { classNames } from 'utils/dom-helpers'

const GridSpinner = dynamic(
    () => import('components/Spinners/grid'),
    { ssr: false }
)

function MyApp({ Component, pageProps }: AppProps) {
    SkyContext.displayName = 'AppContext'
    const [is_mounted, setMounted] = useState(false)
    const [is_fetching, setFetching] = useState(true)
    const [context, setContext] = useState(SkyContext)
    const [blur, removeBlur] = useState(true)

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
            const results: UserModel = await profile(
                pageProps.region,
                pageProps.ClientId
            )
            const ctx = {
                ...context,
                first_name: results.given_name,
                last_name: results.family_name,
                uuid: results.uuid,
            }

            setContext(ctx)
            setTimeout(() => {
                setMounted(true)
                setTimeout(() => {
                    removeBlur(true)
                }, 510)
            }, 2500)
        }
        if (is_fetching) getProfile()
        setFetching(false)
    }, [is_fetching, context, pageProps])

    return (
        <>
            <SkyContext.Provider value={context}>
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
            </SkyContext.Provider>
        </>
    )
}

export async function getStaticProps() {
    return {
        props: {
            region: process.env.COGNITO_REGION,
            ClientId: process.env.COGNITO_CLIENT_ID,
        },
    }
}

export default MyApp
