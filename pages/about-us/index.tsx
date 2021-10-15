import Head from 'next/head'
import Navbar from 'components/Navbar'
import Footer from 'components/Footer'
import LoginModal from 'components/Modals/Login'
import SignupModal from 'components/Modals/Signup'
import { FetchMethods, useFetch } from 'utils/fetch-helper'
import { useEffect, useState } from 'react'
import { useAppContext } from 'context/AppContext'
import { getTranslation } from 'utils/language-helper'

function AboutUs() {
    const { lang } = useAppContext()

    const { data: translation } = useFetch(
        `/v1/contents?url=${encodeURI(
            'https://cms.aot.plus/jsonapi/node/page_translation/34b00648-32fb-4c97-a865-f66dcd6642f7'
        )}`,
        FetchMethods.GET,
        true,
        true
    )

    const ui_text = {
        banner_title: 'About Us',
        section_1_title:
            'Best-in-class Scheduling & Business Management Platform +',
        section_1_cofounder: "Hi I'm Greg, the co-founder",
        section_1_story: 'Our story',
        section_1_how_it_started: 'How it started',
        section_1_story_paragraph: 'Loading...',
        section_1_mission: 'Our mission',
        section_1_exist: 'Why We Exist',
        section_1_exist_paragraph: '...',
        section_2_title_1: '...',
        section_2_title_2: '...',
        section_2_paragraph: '...',
        section_3_title: '...',
        section_3_subtitle: '...',
        section_3_item_1_title: '...',
        section_3_item_1_body: '...',
        section_3_item_2_title: '...',
        section_3_item_2_body: '...',
        section_3_item_3_title: '...',
        section_3_item_3_body: '...',
        section_3_item_4_title: '...',
        section_3_item_4_body: '...',
        section_4_title: '...',
        section_4_subtitle: '...',
        join_cta_button: '...',
    }

    const [translations, setTranslations] = useState(ui_text)

    useEffect(() => {
        if (lang && translation.data?.attributes[lang]) {
            setTranslations({
                banner_title: getTranslation(
                    'banner_title',
                    translation.data?.attributes[lang]
                ),
                section_1_title: getTranslation(
                    'section_1_title',
                    translation.data?.attributes[lang]
                ),
                section_1_cofounder: getTranslation(
                    'section_1_cofounder',
                    translation.data?.attributes[lang]
                ),
                section_1_story: getTranslation(
                    'section_1_story',
                    translation.data?.attributes[lang]
                ),
                section_1_story_paragraph: getTranslation(
                    'section_1_story_paragraph',
                    translation.data?.attributes[lang]
                ),
                section_1_how_it_started: getTranslation(
                    'section_1_how_it_started',
                    translation.data?.attributes[lang]
                ),
                section_1_mission: getTranslation(
                    'section_1_mission',
                    translation.data?.attributes[lang]
                ),
                section_1_exist: getTranslation(
                    'section_1_exist',
                    translation.data?.attributes[lang]
                ),
                section_1_exist_paragraph: getTranslation(
                    'section_1_exist_paragraph',
                    translation.data?.attributes[lang]
                ),
                section_2_title_1: getTranslation(
                    'section_2_title_1',
                    translation.data?.attributes[lang]
                ),
                section_2_title_2: getTranslation(
                    'section_2_title_2',
                    translation.data?.attributes[lang]
                ),
                section_2_paragraph: getTranslation(
                    'section_2_paragraph',
                    translation.data?.attributes[lang]
                ),
                section_3_title: getTranslation(
                    'section_3_title',
                    translation.data?.attributes[lang]
                ),
                section_3_subtitle: getTranslation(
                    'section_3_subtitle',
                    translation.data?.attributes[lang]
                ),
                section_3_item_1_title: getTranslation(
                    'section_3_item_1_title',
                    translation.data?.attributes[lang]
                ),
                section_3_item_1_body: getTranslation(
                    'section_3_item_1_body',
                    translation.data?.attributes[lang]
                ),
                section_3_item_2_title: getTranslation(
                    'section_3_item_2_title',
                    translation.data?.attributes[lang]
                ),
                section_3_item_2_body: getTranslation(
                    'section_3_item_2_body',
                    translation.data?.attributes[lang]
                ),
                section_3_item_3_title: getTranslation(
                    'section_3_item_3_title',
                    translation.data?.attributes[lang]
                ),
                section_3_item_3_body: getTranslation(
                    'section_3_item_3_body',
                    translation.data?.attributes[lang]
                ),
                section_3_item_4_title: getTranslation(
                    'section_3_item_4_title',
                    translation.data?.attributes[lang]
                ),
                section_3_item_4_body: getTranslation(
                    'section_3_item_4_body',
                    translation.data?.attributes[lang]
                ),
                section_4_title: getTranslation(
                    'section_4_title',
                    translation.data?.attributes[lang]
                ),
                section_4_subtitle: getTranslation(
                    'section_4_subtitle',
                    translation.data?.attributes[lang]
                ),
                join_cta_button: getTranslation(
                    'join_cta_button',
                    translation.data?.attributes[lang]
                ),
            })
        }
    }, [translation, lang])

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
                        <h2 className="text-7xl binary font-light text-white text-center shadow-2xl">
                            {translations.banner_title}
                        </h2>
                    </div>
                </section>

                <section className="container mx-auto py-32">
                    <div className="lg:grid grid-cols-2 xl:grid-cols-5 max-w-5xl gap-12 mx-auto">
                        <div className="xl:col-span-3 col-span-2 text-primary text-5xl font-light font-display pr-8">
                            {translations.section_1_title}
                        </div>
                        <div className="font-sans leading-relaxed xl:col-span-2">
                            <p>
                                Amet minim mollit non deserunt ullamco est
                                sit aliqua dolor do amet sint. Velit officia
                                consequat duis enim velit mollit.
                                Exercitation veniam consequat sunt nostrud
                                amet. Amet minim mollit non deserunt ullamco
                                est sit aliqua dolor do amet sint. Velit
                                officia consequat duis enim velit mollit
                            </p>
                        </div>
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
                        <span className="text-primary font-display text-3xl mt-2">
                            {translations.section_1_cofounder}
                        </span>
                    </div>
                </section>

                <section className="container mx-auto py-32">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="text-primary-light uppercase tracking-widest mb-3 font-display">
                            {translations.section_1_story}
                        </div>
                        <div className="text-primary font-medium text-5xl mb-5 font-display">
                            {translations.section_1_how_it_started}
                        </div>
                        <div className="font-sans xl:col-span-2">
                            <p className="leading-loose">
                                {translations.section_1_story_paragraph}
                            </p>
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
                            <div className="text-primary-light uppercase tracking-widest mb-3 font-display">
                                {translations.section_1_mission}
                            </div>
                            <div className="text-primary font-medium text-5xl mb-5 font-display">
                                {translations.section_1_exist}
                            </div>
                            <p>{translations.section_1_exist_paragraph}</p>
                        </div>
                    </div>
                </section>

                <section className="bg-primary relative py-28 overflow-hidden">
                    <div className="container mx-auto">
                        <div className="lg:grid grid-cols-2 xl:grid-cols-3 max-w-6xl gap-3 mx-auto text-white">
                            <div className="col-span-1 xl:col-span-1">
                                <div className="text-white mb-2 text-6xl font-light tracking-tight font-display">
                                    {translations.section_2_title_1}
                                </div>
                                <div className="text-gray-400 text-4xl font-light font-display">
                                    {translations.section_2_title_2}
                                </div>
                            </div>
                            <div className="leading-relaxed col-span-1 xl:col-span-2">
                                <p className="font-light">
                                    {translations.section_2_paragraph}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="absolute -top-6 -right-56 h-96 w-96 bg-primary-150 rounded-full" />
                </section>

                <section className="bg-primary-lighter bg-opacity-40 py-20">
                    <div className="container mx-auto">
                        <div className="max-w-6xl mx-auto text-center">
                            <div className="text-primary mb-4 text-5xl font-light tracking-tight font-display">
                                {translations.section_3_title}
                            </div>
                            <p>
                                {translations.section_3_subtitle}
                            </p>
                        </div>
                        <div className="md:grid md:grid-cols-2 gap-10 xl:grid-cols-4 mt-10 max-w-7xl mx-auto">
                            <div className="bg-white px-8 py-10 rounded-3xl shadow-2xl h-80">
                                <i className="bg-no-repeat bg-contain h-12 w-12 mb-6 inline-block" style={{ backgroundImage: 'url(//static.aot.plus/images/about-us/magnify.svg)' }} />
                                <h4 className="font-display text-primary-dark text-xl mb-2">{translations.section_3_item_1_title}</h4>
                                <p className="leading-loose text-gray-400">{translations.section_3_item_1_body}</p>
                            </div>
                            <div className="bg-white px-8 py-10 rounded-3xl shadow-2xl h-80">
                                <i className="bg-no-repeat bg-contain h-12 w-12 mb-6 inline-block" style={{ backgroundImage: 'url(//static.aot.plus/images/about-us/heart.svg)' }} />
                                <h4 className="font-display text-primary-dark text-xl mb-2">{translations.section_3_item_2_title}</h4>
                                <p className="leading-loose text-gray-400">{translations.section_3_item_2_body}</p>
                            </div>
                            <div className="bg-white px-8 py-10 rounded-3xl shadow-2xl h-80">
                                <i className="bg-no-repeat bg-contain h-12 w-12 mb-6 inline-block" style={{ backgroundImage: 'url(//static.aot.plus/images/about-us/bullseye.svg)' }} />
                                <h4 className="font-display text-primary-dark text-xl mb-2">{translations.section_3_item_3_title}</h4>
                                <p className="leading-loose text-gray-400">{translations.section_3_item_3_body}</p>
                            </div>
                            <div className="bg-white px-8 py-10 rounded-3xl shadow-2xl h-80">
                                <i className="bg-no-repeat bg-contain h-12 w-12 mb-6 inline-block" style={{ backgroundImage: 'url(//static.aot.plus/images/about-us/thumbsup.svg)' }} />
                                <h4 className="font-display text-primary-dark text-xl mb-2">{translations.section_3_item_4_title}</h4>
                                <p className="leading-loose text-gray-400">{translations.section_3_item_4_body}</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    className="text-white font-display py-20 text-center"
                    style={{
                        background: 'linear-gradient(104.86deg, #86C5E0 39.52%, #86C5E0 81.67%)'
                    }}
                >
                    <h4 className="text-5xl font-thin mx-auto max-w-2xl mb-3">{translations.section_4_title}</h4>
                    <h5 className="text-3xl font-thin mb-8">{translations.section_4_subtitle}</h5>
                    <button className="bg-secondary text-white text-lg font-display rounded-full py-5 px-12" type="button">{translations.join_cta_button}</button>
                </section>
            </main>

            <Footer />
            <LoginModal />
            <SignupModal />
        </div>
    )
}

export default AboutUs
