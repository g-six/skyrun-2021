import LoginModal from 'components/Modals/Login'
import SignupModal from 'components/Modals/Signup'
import { useAppContext } from 'context/AppContext'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import { useFetch } from 'utils/fetch-helper'
import { FetchMethods } from 'utils/types'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import LandingHero, { Props as LandingHeroProps } from './Landing/hero'
import LandingFeaturesSection from './Landing/section-features'
import LandingPricingSection from './Landing/section-pricing'
import LandingSectionTestimonials from './Landing/section-testimonials'
import LandingSectionTryCTA from './Landing/section-try-cta'

function Home() {
    const { lang } = useAppContext()
    const refs = {
        features: useRef(null),
        testimonials: useRef(null),
        pricing: useRef(null),
    }
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
        section_2_checklist: '...',
        section_3_title: '...',
        section_3_body: '...',
        pricing_plans_title: 'Pricing',
    }

    const [translations, setTranslations] = useState(ui_text)

    hero_props.subtitle = translations.hero_line_2
    hero_props.button_label = <>{translations.main_cta_button}</>

    const executeScroll = () => {
        if (
            location.hash &&
            location.hash.substr(1) === 'features' &&
            refs.pricing.current
        ) {
            ;(refs.pricing.current as HTMLDivElement).scrollIntoView()
        }
        if (
            location.hash.substr(1) === 'testimonials' &&
            refs.testimonials.current
        ) {
            ;(refs.testimonials.current as HTMLDivElement).scrollIntoView()
        }
        if (
            location.hash.substr(1) === 'features' &&
            refs.features.current
        ) {
            ;(refs.features.current as HTMLDivElement).scrollIntoView()
        }
    }
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

    executeScroll()

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
                <div ref={refs.features} id="features" />
                <LandingFeaturesSection
                    date_of_exercise={new Date().toLocaleDateString()}
                    location_name="Taiseng"
                    instructor_name="Muhammad Ali"
                    left_title={translations.section_2_left_title}
                    right_title={translations.section_2_right_title}
                    mid_left_title={translations.section_2_mid_left_title}
                    mid_right_title={translations.section_2_mid_right_title}
                    section_2_checklist={translations.section_2_checklist}
                    section_3_title={translations.section_3_title}
                    section_3_body={translations.section_3_body}
                />
                <div ref={refs.testimonials} id="testimonials" />
                <LandingSectionTestimonials />
                <div ref={refs.pricing} id="pricing" />
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
