import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import LandingHero, { Props as LandingHeroProps } from './Landing/hero'
import LoginModal from 'components/Modals/Login'
import SignupModal from 'components/Modals/Signup'
import LandingFeaturesSection from './Landing/section-features'
import LandingSectionTestimonials from './Landing/section-testimonials'
import LandingPricingSection from './Landing/section-pricing'
import LandingSectionTryCTA from './Landing/section-try-cta'
import { FetchMethods, useFetch } from 'utils/fetch-helper'
import { useEffect, useState } from 'react'
import { useAppContext } from 'context/AppContext'
import { getTranslation } from 'utils/language-helper'

function Home() {
    const { lang } = useAppContext()
    const hero_props: LandingHeroProps = {
        title_left: 'always',
        title_center: 'on',
        title_right: 'time',
        subtitle:
            'Scheduling, booking and business management platform for your business.',
        button_label: <>Try it for free</>,
    }

    const { data: translation } = useFetch(
        `/v1/contents?url=${encodeURI(
            'https://cms.aot.plus/jsonapi/node/page_translation/be42cdfb-b39b-4b19-9bee-9b983024f917'
        )}`,
        FetchMethods.GET,
        true,
        true
    )

    const ui_text = {
        hero_line_2: 'Scheduling, booking and business management platform',
        main_cta_button: 'Try it for free',
        section_2_left_title: 'Scheduling & Booking',
        section_2_right_title: 'System',
        section_2_mid_left_title: 'Scheduling & Booking',
        section_2_mid_right_title: 'System',
        pricing_plans_title: 'Pricing',
    }

    const [translations, setTranslations] = useState(ui_text)

    hero_props.subtitle = translations.hero_line_2
    hero_props.button_label = <>{translations.main_cta_button}</>

    useEffect(() => {
        if (lang && translation.data?.attributes[lang]) {
            setTranslations({
                hero_line_2: getTranslation(
                    'hero_line_2',
                    translation.data?.attributes[lang]
                ),
                main_cta_button: getTranslation(
                    'main_cta_button',
                    translation.data?.attributes[lang]
                ),
                section_2_left_title: getTranslation(
                    'section_2_left_title',
                    translation.data?.attributes[lang]
                ),
                section_2_right_title: getTranslation(
                    'section_2_right_title',
                    translation.data?.attributes[lang]
                ),
                section_2_mid_left_title: getTranslation(
                    'section_2_mid_left_title',
                    translation.data?.attributes[lang]
                ),
                section_2_mid_right_title: getTranslation(
                    'section_2_mid_right_title',
                    translation.data?.attributes[lang]
                ),
                pricing_plans_title: getTranslation(
                    'pricing_plans_title',
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

            <LandingHero {...hero_props} />

            <main className="overflow-hidden">
                <LandingFeaturesSection
                    date_of_exercise={new Date().toLocaleDateString()}
                    location_name="Taiseng"
                    instructor_name="Muhammad Ali"
                    left_title={translations.section_2_left_title}
                    right_title={translations.section_2_right_title}
                    mid_left_title={translations.section_2_mid_left_title}
                    mid_right_title={translations.section_2_mid_right_title}
                />
                <LandingSectionTestimonials />
                <LandingPricingSection {...translations} />
                <LandingSectionTryCTA />
            </main>

            <Footer />
            <LoginModal />
            <SignupModal />
        </div>
    )
}

export default Home
