import Footer from 'components/Footer'
import LoginModal from 'components/Modals/Login'
import SignupModal from 'components/Modals/Signup'
import Navbar from 'components/Navbar'
import Translation from 'components/Translation'
import { useAppContext } from 'context/AppContext'
import getConfig from 'next/config'
import Head from 'next/head'
import { ChangeEvent, useEffect, useState } from 'react'
import { useFetch } from 'utils/fetch-helper'
import { FetchMethods } from 'utils/types'

const { COMING_SOON_TRANSLATION_ID } = getConfig().publicRuntimeConfig

function ComingSoon() {
    const { lang, translations: common_translations } = useAppContext()
    const [email, setEmail] = useState<string>('')
    const { data: translation, is_loading } = useFetch(
        `/v1/contents?url=${encodeURI(
            `https://cms.aot.plus/jsonapi/node/page_translation/${COMING_SOON_TRANSLATION_ID}`
        )}`,
        FetchMethods.GET,
        true,
        true
    )

    const [translations, setTranslations] = useState<
        Record<string, string>
    >({})

    useEffect(() => {
        if (lang && translation.data?.attributes[lang]) {
            const translations_to_add: Record<string, string> = {}
            translation.data.attributes[lang].forEach(
                ({ key, value }: any) => {
                    translations_to_add[key] = value
                }
            )

            setTranslations({
                ...translations,
                ...translations_to_add,
                ...common_translations,
                COMING_SOON_TRANSLATION_ID,
            })
        }
    }, [translation, lang, common_translations])

    return (
        <div>
            <Head>
                <title>{translations.header_title || 'Coming Soon'}</title>
                <meta
                    property="og:title"
                    content="Coming Soon"
                    key="title"
                />

                <link
                    rel="icon"
                    href="https://static.aot.plus/images/favicon.ico"
                />
                <script src="//static.aot.plus/js/ac.js" defer />
                <script src="//static.aot.plus/js/fb.js" defer />
                <script
                    src="https://aotplus.activehosted.com/f/embed.php?id=1"
                    type="text/javascript"
                    defer
                />
                <link
                    href="https://static.aot.plus/feather.css"
                    rel="stylesheet"
                    type="text/css"
                />
            </Head>
            <Navbar />

            <main
                className="bg-no-repeat h-venti bg-primary-lighter bg-opacity-50 overflow-hidden bg-contain xl:bg-50% relative"
                style={{
                    backgroundImage:
                        'url(//static.aot.plus/images/coming-soon/sophia-bells-min.png)',
                    backgroundPosition: 'bottom left',
                }}
            >
                <section className="container px-6 md:px-12 lg:px-0 lg:mx-auto lg:py-32 py-12">
                    <div className="lg:grid grid-cols-2 xl:grid-cols-5 max-w-4xl gap-12 mx-auto">
                        <div className="xl:col-span-4 xl:col-start-2 text-right lg:text-left">
                            <div
                                className="bg-contain h-10 bg-no-repeat lg:h-16 lg:w-alley inline-block lg:bg-left bg-right w-full"
                                style={{
                                    backgroundImage:
                                        'url(//static.aot.plus/images/coming-soon/aot.svg)',
                                }}
                            />
                            <div className="h-12 lg:h-44 lg:pt-12 text-transparent bg-clip-text bg-gradient-to-br from-primary-lighter via-primary-150 to-sky-600">
                                {is_loading ? (
                                    <div className="font-display lg:text-6xl leading-relaxed">
                                        ...
                                    </div>
                                ) : (
                                    <Translation
                                        className="font-display font-bold text-3xl lg:text-6xl md:text-4xl lg:leading-relaxed"
                                        content_key="launching_soon_title"
                                        render_as="div"
                                        translations={translations}
                                    />
                                )}
                            </div>

                            <div className="flex lg:flex-row flex-col lg:bg-white rounded-full gap-3 lg:gap-0 items-end lg:items-stretch">
                                <input
                                    type="text"
                                    className="lg:py-5 lg:pl-8 lg:pr-4 lg:rounded-l-full lg:rounded-r-0 rounded-full border-0 lg:flex-1 lg:w-auto w-72 placeholder-gray-300 text-gray-700 focus:ring-0 focus:border-0"
                                    placeholder={
                                        translations.enter_email ||
                                        'enter_email'
                                    }
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>
                                    ) => {
                                        setEmail(e.target.value)
                                    }}
                                />
                                <a
                                    className="bg-primary text-white rounded-full w-56 flex items-center justify-center font-display text-lg py-2"
                                    href={`https://aotplus.activehosted.com/f/5?email=${encodeURI(
                                        email
                                    )}`}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <Translation
                                        content_key="be_early_adopter"
                                        translations={translations}
                                    />
                                </a>
                            </div>

                            <div className="mt-6 xl:mt-16 text-primary font-display text-base font-bold">
                                <Translation
                                    render_as="div"
                                    content_key="follow_updates"
                                    translations={translations}
                                />

                                <div>
                                    <div className="flex gap-3 mt-3 justify-end lg:justify-start">
                                        <a
                                            href="https://www.facebook.com/aotplus.software"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="w-8 h-8 flex items-center justify-center text-center bg-primary-lighter rounded-full"
                                        >
                                            <i className="k-icon k-i-facebook " />
                                        </a>

                                        <a
                                            href="https://www.instagram.com/aotplus.software/"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex items-center justify-center w-8 h-8 text-center inline-block bg-primary-lighter rounded-full"
                                        >
                                            <i className="feather-instagram font-bold" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="rounded bg-primary-150 bg-opacity-30 rounded-full h-48 w-48 absolute block -right-10 bottom-10" />
            </main>

            <Footer {...translations} />
            <SignupModal />
            <LoginModal />
        </div>
    )
}

export default ComingSoon
