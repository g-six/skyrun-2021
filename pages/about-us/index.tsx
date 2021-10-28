import Footer from 'components/Footer'
import LoginModal from 'components/Modals/Login'
import Navbar from 'components/Navbar'
import { useAppContext } from 'context/AppContext'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useFetch } from 'utils/fetch-helper'
import { FetchMethods } from 'utils/types'

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
        section_1_body:
            'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. \
            Velit officia consequat duis enim velit mollit. Exercitation veniam consequat \
            sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua \
            dolor do amet sint. Velit officia consequat duis enim velit mollit',
        section_1_cofounder: "Hi I'm Greg, the co-founder",
        section_1_story: 'Our story',
        section_1_how_it_started: 'How it started',
        section_1_story_paragraph:
            'We have been in the market, using various market-ready scheduling software, \
            to help with my wife and her team manage her classes. After realising that \
            market-ready softwares not being intuitive and actually helpful, I used \
            existing softwares as a foundation, and built so much customization, \
            it became a nightmare to support and maintain, but at the same time \
            it transformed the system we were using from a basic booking portal \
            into a fully-fledged scheduling and small business management platform, \
            and that added a ton of value for our business.',
        section_1_mission: 'Our mission',
        section_2_mid_left_title: '',
        section_2_mid_right_title: '120 hours saved, per business',
        section_2_checklist:
            'scheduling, comms distributions, bookings\
            simple, structured, intuitive\
            we get that business owners are busy/ no time\
            we really put in the hours to make it easy to use, so that you can pick and go\
            we are receptive, give us feedback and we will put it in',
        section_1_exist: 'Why We Exist',
        section_1_exist_paragraph:
            'Despite all the customization, the application was limited in its functions, \
            and couldn’t meet our business needs.It was then we realise that we have \
            the know how and knowledge to build a solution inside out, fit for the industry.',
        section_2_title_1: '8 Months &',
        section_2_title_2: '4 Days Later',
        section_2_paragraph:
            'led to the creation of AOT, a customisable\
            integrated software that offers an all- inclusive suite, including payroll\
            calculation and package management.It has helped us streamlined the\
            process and helped us in franchising our dance and yoga business.',
        section_3_title: 'Values We Live By',
        section_3_subtitle:
            'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
        section_3_item_1_title: 'Detail-oriented',
        section_3_item_1_body:
            'Help our customers by adding the small details and finishing touches \
            that set Always On Time apart from the crowd',
        section_3_item_2_title: 'Genuine and Helpful',
        section_3_item_2_body:
            'We do the little things that help our customers be on time and run their business better',
        section_3_item_3_title: 'Methodolical',
        section_3_item_3_body:
            'Take a detailed, structured, and reasoned approach to everything we do',
        section_3_item_4_title: 'Simple and Intuitive',
        section_3_item_4_body:
            'Our software must be simple enough to be used intuitively by our users',
        section_4_title:
            'We are confident that our solution can help any studio,',
        section_4_subtitle: 'so that you can work smart and save time.',
        join_cta_button: 'Join as an early adopter',
    }

    const [translations, setTranslations] = useState(ui_text)

    useEffect(() => {
        if (lang && translation.data?.attributes[lang]) {
            translation.data.attributes[lang].forEach(
                ({ key, value }: any) => {
                    setTranslations((translations) => ({
                        ...translations,
                        [key]: value,
                    }))
                }
            )
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
                            <p>{translations.section_1_body}</p>
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
                                <h4 className="font-display text-primary-dark text-xl mb-2">
                                    {translations.section_3_item_1_title}
                                </h4>
                                <p className="leading-loose text-gray-400">
                                    {translations.section_3_item_1_body}
                                </p>
                            </div>
                            <div className="bg-white px-8 py-10 rounded-3xl shadow-2xl h-80">
                                <i
                                    className="bg-no-repeat bg-contain h-12 w-12 mb-6 inline-block"
                                    style={{
                                        backgroundImage:
                                            'url(//static.aot.plus/images/about-us/heart.svg)',
                                    }}
                                />
                                <h4 className="font-display text-primary-dark text-xl mb-2">
                                    {translations.section_3_item_2_title}
                                </h4>
                                <p className="leading-loose text-gray-400">
                                    {translations.section_3_item_2_body}
                                </p>
                            </div>
                            <div className="bg-white px-8 py-10 rounded-3xl shadow-2xl h-80">
                                <i
                                    className="bg-no-repeat bg-contain h-12 w-12 mb-6 inline-block"
                                    style={{
                                        backgroundImage:
                                            'url(//static.aot.plus/images/about-us/bullseye.svg)',
                                    }}
                                />
                                <h4 className="font-display text-primary-dark text-xl mb-2">
                                    {translations.section_3_item_3_title}
                                </h4>
                                <p className="leading-loose text-gray-400">
                                    {translations.section_3_item_3_body}
                                </p>
                            </div>
                            <div className="bg-white px-8 py-10 rounded-3xl shadow-2xl h-80">
                                <i
                                    className="bg-no-repeat bg-contain h-12 w-12 mb-6 inline-block"
                                    style={{
                                        backgroundImage:
                                            'url(//static.aot.plus/images/about-us/thumbsup.svg)',
                                    }}
                                />
                                <h4 className="font-display text-primary-dark text-xl mb-2">
                                    {translations.section_3_item_4_title}
                                </h4>
                                <p className="leading-loose text-gray-400">
                                    {translations.section_3_item_4_body}
                                </p>
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
                    <h4 className="text-5xl font-thin mx-auto max-w-2xl mb-3">
                        {translations.section_4_title}
                    </h4>
                    <h5 className="text-3xl font-thin mb-8">
                        {translations.section_4_subtitle}
                    </h5>
                    <button
                        className="bg-secondary text-white text-lg font-display rounded-full py-5 px-12"
                        type="button"
                    >
                        {translations.join_cta_button}
                    </button>
                </section>
            </main>

            <Footer />
            <LoginModal />
        </div>
    )
}

export default AboutUs
