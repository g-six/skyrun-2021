import Footer from 'components/Footer'
import LoginModal from 'components/Modals/Login'
import Navbar from 'components/Navbar'
import Translation from 'components/Translation'
import { useAppContext } from 'context/AppContext'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useFetch } from 'utils/fetch-helper'
import { FetchMethods } from 'utils/types'

function ComingSoon() {
    const { lang, translations: common_translations } = useAppContext()

    const { data: translation, is_loading } = useFetch(
        `/v1/contents?url=${encodeURI(
            'https://cms.aot.plus/jsonapi/node/page_translation/84a584ff-22a4-4c9f-8ea7-1b88dba4e1e6'
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
            })
        }
    }, [translation, lang, common_translations])

    return (
        <div>
            <Head>
                <title>
                    Nerubia | Your Software as a Solution development
                    partner
                </title>
                <meta
                    name="description"
                    content="Skyrun - A Nerubia base code"
                />
                <link rel="icon" href="/favicon.ico" />
                <script src="//static.aot.plus/js/ac.js" defer />
                <script src="//static.aot.plus/js/fb.js" defer />
                <script src="https://aotplus.activehosted.com/f/embed.php?id=1" type="text/javascript" defer />
                <link
                    href="https://static.aot.plus/feather.css"
                    rel="stylesheet"
                    type="text/css"
                />
            </Head>
            <Navbar />

            <main
                className="bg-no-repeat bg-primary-lighter bg-opacity-50 overflow-hidden bg-contain xl:bg-50% relative"
                style={{
                    backgroundImage:
                        'url(//static.aot.plus/images/coming-soon/sophia-bells-min.png)',
                    backgroundPosition: 'bottom left',
                    minHeight: 800,
                }}
            >
                <section className="container mx-auto py-32">
                    <div className="lg:grid grid-cols-2 xl:grid-cols-5 max-w-4xl gap-12 mx-auto">
                        <div className="xl:col-span-4 xl:col-start-2">
                            <div
                                className="bg-contain h-16 w-alley block"
                                style={{
                                    backgroundImage:
                                        'url(//static.aot.plus/images/coming-soon/aot.svg)',
                                }}
                            />
                            <div className="h-44 pt-12 text-transparent bg-clip-text bg-gradient-to-br from-primary-lighter via-primary-150 to-sky-600">
                                {is_loading ? (
                                    <div className="font-display text-6xl leading-relaxed">
                                        ...
                                    </div>
                                ) : (
                                    <Translation
                                        className="font-display font-bold text-6xl leading-relaxed"
                                        content_key="launching_soon_title"
                                        render_as="div"
                                        translations={translations}
                                    />
                                )}
                            </div>

                            <div className="flex bg-white rounded-full">
                                <input
                                    type="text"
                                    className="py-5 pl-8 pr-4 rounded-l-full border-0 flex-1 placeholder-gray-300 text-gray-700 focus:ring-0 focus:border-0"
                                    placeholder={
                                        translations.enter_email ||
                                        'enter_email'
                                    }
                                />
                                <a
                                    className="bg-primary text-white rounded-full w-56 flex items-center justify-center font-display text-lg"
                                    href="https://aotplus.activehosted.com/f/5"
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
                                    <div className="flex gap-3 mt-3">
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

            <Footer />
            <LoginModal />
        </div>
    )
}

export default ComingSoon
