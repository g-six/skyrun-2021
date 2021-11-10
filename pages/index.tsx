import getConfig from 'next/config'
import LoginModal from 'components/Modals/Login'
import SignupModal from 'components/Modals/Signup'
import { useAppContext } from 'context/AppContext'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import { useFetch } from 'utils/fetch-helper'
import { FetchMethods } from 'utils/types'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import LandingHero from './Landing/hero'
import LandingFeaturesSection from './Landing/section-features'
import LandingPricingSection from './Landing/section-pricing'
import LandingSectionTestimonials from './Landing/section-testimonials'
import LandingSectionTryCTA from './Landing/section-try-cta'

const { LANDING_TRANSLATION_ID } = getConfig().publicRuntimeConfig

function Home() {
    const { lang, translations: common_translations } = useAppContext()
    const refs = {
        features: useRef(null),
        testimonials: useRef(null),
        pricing: useRef(null),
    }

    const { data: translation, is_loading } = useFetch(
        `/v1/contents?url=${encodeURI(
            `https://cms.aot.plus/jsonapi/node/page_translation/${LANDING_TRANSLATION_ID}`
        )}`,
        FetchMethods.GET,
        true,
        true
    )

    const [translations, setTranslations] = useState<
        Record<string, string>
    >({})

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

    if (is_loading) return <div className="h-venti w-full flex items-center bg-white animate-pulse">
        <div className="h-4 bg-primary-lighter rounded block" />
    </div>
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

            <LandingHero {...translations} />

            <main className="overflow-hidden">
                <div ref={refs.features} id="features" />
                <LandingFeaturesSection {...translations} />
                <div ref={refs.testimonials} id="testimonials" />
                <LandingSectionTestimonials {...translations} />
                <div ref={refs.pricing} id="pricing" />
                <LandingPricingSection {...translations} />
                <LandingSectionTryCTA {...translations} />
            </main>

            <Footer {...translations} />
            <LoginModal />
            <SignupModal />
        </div>
    )
}

export default Home
