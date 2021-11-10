import getConfig from 'next/config'
import Footer from 'components/Footer'
import LoginModal from 'components/Modals/Login'
import Navbar from 'components/Navbar'
import Translation from 'components/Translation'
import { useAppContext } from 'context/AppContext'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useFetch } from 'utils/fetch-helper'
import { FetchMethods } from 'utils/types'

const { ABOUT_US_TRANSLATION_ID } = getConfig().publicRuntimeConfig
function AboutUs() {
    const { lang, translations: common_translations } = useAppContext()

    const { data: translation } = useFetch(
        `/v1/contents?url=${encodeURI(
            `https://cms.aot.plus/jsonapi/node/page_translation/${ABOUT_US_TRANSLATION_ID}`
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
                <link
                    href="https://static.aot.plus/feather.css"
                    rel="stylesheet"
                    type="text/css"
                />
            </Head>
            <Navbar />

            <main className="overflow-hidden">
                <section
                    className="banner bg-cover h-96 w-full "
                    style={{
                        backgroundImage:
                            'url(//static.aot.plus/images/about-us/banner.jpeg)',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    <div className="flex justify-center items-center bg-black bg-opacity-25 h-full w-full">
                        <Translation
                            className="text-7xl binary font-light text-white text-center shadow-2xl"
                            content_key="banner_title"
                            render_as="h2"
                            translations={translations}
                        />
                    </div>
                </section>

                <section className="container mx-auto py-32">
                    <div className="lg:grid grid-cols-2 xl:grid-cols-5 max-w-5xl gap-12 mx-auto">
                        <Translation
                            className="xl:col-span-3 col-span-2 text-primary text-5xl font-light font-display pr-8"
                            content_key="section_1_title"
                            render_as="div"
                            translations={translations}
                        />
                        <Translation
                            className="font-sans leading-relaxed xl:col-span-2"
                            content_key="section_1_body"
                            render_as="div"
                            translations={translations}
                        />
                    </div>
                </section>

                <section
                    className="flex items-center justify-center bg-contain bg-center bg-no-repeat w-full mt-16"
                    style={{
                        backgroundImage:
                            'url(//static.aot.plus/images/about-us/midsection-1-min.png)',
                        height: '722px',
                    }}
                >
                    <div className="bg-white w-80 py-8 rounded-2xl flex justify-center items-center shadow-xl px-14 text-center flex-col">
                        <i
                            className="bg-no-repeat bg-contain h-10 w-10"
                            style={{
                                backgroundImage:
                                    'url(//static.aot.plus/images/about-us/emoji.svg)',
                            }}
                        />
                        <Translation
                            className="text-primary font-display text-3xl mt-2"
                            content_key="section_1_cofounder"
                            render_as="span"
                            translations={translations}
                        />
                    </div>
                </section>

                <section className="container mx-auto py-32">
                    <div className="max-w-4xl mx-auto text-center">
                        <Translation
                            className="text-primary-light uppercase tracking-widest mb-3 font-display"
                            content_key="section_1_story"
                            render_as="div"
                            translations={translations}
                        />
                        <Translation
                            className="text-primary font-medium text-5xl mb-5 font-display"
                            content_key="section_1_how_it_started"
                            render_as="div"
                            translations={translations}
                        />
                        <div className="font-sans xl:col-span-2">
                            <Translation
                                className="leading-loose"
                                content_key="section_1_story_paragraph"
                                render_as="p"
                                translations={translations}
                            />
                        </div>
                    </div>
                </section>

                <section className="container mx-auto py-32">
                    <div className="lg:grid grid-cols-2 max-w-5xl gap-12 mx-auto">
                        <div
                            className="col-span-1 bg-no-repeat bg-contain h-96 w-96"
                            style={{
                                backgroundImage:
                                    'url(//static.aot.plus/images/about-us/midsection-2.png)',
                            }}
                        />
                        <div className="font-sans leading-relaxed col-span-1">
                            <Translation
                                className="text-primary-light uppercase tracking-widest mb-3 font-display"
                                content_key="section_1_mission"
                                render_as="div"
                                translations={translations}
                            />
                            <Translation
                                className="text-primary font-medium text-5xl mb-5 font-display"
                                content_key="section_1_exist"
                                render_as="div"
                                translations={translations}
                            />
                            <Translation
                                content_key="section_1_exist_paragraph"
                                render_as="p"
                                translations={translations}
                            />
                        </div>
                    </div>
                </section>

                <section className="bg-primary relative py-28 overflow-hidden">
                    <div className="container mx-auto">
                        <div className="lg:grid grid-cols-2 xl:grid-cols-3 max-w-6xl gap-3 mx-auto text-white">
                            <div className="col-span-1 xl:col-span-1">
                                <Translation
                                    className="text-white mb-2 text-6xl font-light tracking-tight font-display"
                                    content_key="section_2_title_1"
                                    render_as="div"
                                    translations={translations}
                                />
                                <Translation
                                    className="text-gray-400 text-4xl font-light font-display"
                                    content_key="section_2_title_2"
                                    render_as="div"
                                    translations={translations}
                                />
                            </div>
                            <div className="leading-relaxed col-span-1 xl:col-span-2">
                                <Translation
                                    className="font-light"
                                    content_key="section_2_paragraph"
                                    render_as="p"
                                    translations={translations}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="absolute -top-6 -right-56 h-96 w-96 bg-primary-150 rounded-full" />
                </section>

                <section className="bg-primary-lighter bg-opacity-40 py-20">
                    <div className="container mx-auto">
                        <div className="max-w-6xl mx-auto text-center">
                            <Translation
                                className="text-primary mb-4 text-5xl font-light tracking-tight font-display"
                                content_key="section_3_title"
                                render_as="div"
                                translations={translations}
                            />
                            <p>{translations.section_3_subtitle}</p>
                        </div>
                        <div className="md:grid md:grid-cols-2 gap-10 xl:grid-cols-4 mt-10 max-w-7xl mx-auto">
                            <div className="bg-white px-8 py-10 rounded-3xl shadow-2xl h-80">
                                <i
                                    className="bg-no-repeat bg-contain h-12 w-12 mb-6 inline-block"
                                    style={{
                                        backgroundImage:
                                            'url(//static.aot.plus/images/about-us/magnify.svg)',
                                    }}
                                />
                                <Translation
                                    className="font-display text-primary-dark text-xl mb-2"
                                    content_key="section_3_item_1_title"
                                    render_as="h4"
                                    translations={translations}
                                />
                                <Translation
                                    className="leading-loose text-gray-400"
                                    content_key="section_3_item_1_body"
                                    render_as="p"
                                    translations={translations}
                                />
                            </div>
                            <div className="bg-white px-8 py-10 rounded-3xl shadow-2xl h-80">
                                <i
                                    className="bg-no-repeat bg-contain h-12 w-12 mb-6 inline-block"
                                    style={{
                                        backgroundImage:
                                            'url(//static.aot.plus/images/about-us/heart.svg)',
                                    }}
                                />
                                <Translation
                                    className="font-display text-primary-dark text-xl mb-2"
                                    content_key="section_3_item_2_title"
                                    render_as="h4"
                                    translations={translations}
                                />
                                <Translation
                                    className="leading-loose text-gray-400"
                                    content_key="section_3_item_2_body"
                                    render_as="p"
                                    translations={translations}
                                />
                            </div>
                            <div className="bg-white px-8 py-10 rounded-3xl shadow-2xl h-80">
                                <i
                                    className="bg-no-repeat bg-contain h-12 w-12 mb-6 inline-block"
                                    style={{
                                        backgroundImage:
                                            'url(//static.aot.plus/images/about-us/bullseye.svg)',
                                    }}
                                />
                                <Translation
                                    className="font-display text-primary-dark text-xl mb-2"
                                    content_key="section_3_item_3_title"
                                    render_as="h4"
                                    translations={translations}
                                />
                                <Translation
                                    className="leading-loose text-gray-400"
                                    content_key="section_3_item_3_body"
                                    render_as="p"
                                    translations={translations}
                                />
                            </div>
                            <div className="bg-white px-8 py-10 rounded-3xl shadow-2xl h-80">
                                <i
                                    className="bg-no-repeat bg-contain h-12 w-12 mb-6 inline-block"
                                    style={{
                                        backgroundImage:
                                            'url(//static.aot.plus/images/about-us/thumbsup.svg)',
                                    }}
                                />
                                <Translation
                                    className="font-display text-primary-dark text-xl mb-2"
                                    content_key="section_3_item_4_title"
                                    render_as="h4"
                                    translations={translations}
                                />
                                <Translation
                                    className="leading-loose text-gray-400"
                                    content_key="section_3_item_4_body"
                                    render_as="p"
                                    translations={translations}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    className="text-white font-display py-20 text-center"
                    style={{
                        background:
                            'linear-gradient(104.86deg, #86C5E0 39.52%, #86C5E0 81.67%)',
                    }}
                >
                    <Translation
                        className="text-5xl font-thin mx-auto max-w-2xl mb-3"
                        content_key="section_4_title"
                        render_as="h4"
                        translations={translations}
                    />
                    <Translation
                        className="text-3xl font-thin mb-8"
                        content_key="section_4_subtitle"
                        render_as="h5"
                        translations={translations}
                    />
                    <button
                        className="bg-secondary text-white text-lg font-display rounded-full py-5 px-12"
                        type="button"
                    >
                        {translations.join_cta_button}
                        <Translation
                            content_key="join_cta_button"
                            translations={translations}
                        />
                    </button>
                </section>
            </main>

            <Footer />
            <LoginModal />
        </div>
    )
}

export default AboutUs
