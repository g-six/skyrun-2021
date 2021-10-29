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
        company_name_1: 'always',
        company_name_2: 'on',
        company_name_3: 'time',
        hero_line_2:
            'Scheduling, booking and business management platform for your business',
        main_cta_button: 'Try it for free',
        section_2_title: 'Scheduling & Booking, Done Native',
        section_2_left_title: 'Scheduling & Booking',
        section_2_right_title: 'System',
        section_2_body:
            'Anim aute id magna aliqua ad ad non deserunt sunt.\
            Qui irure qui lorem cupidatat commodo.\
            Elit sunt amet fugiat veniam occaecat fugiat aliqua.',
        section_2_item_1: 'Appointment Scheduling',
        section_2_item_2: 'Packages & Membership',
        section_2_item_3: 'Group Booking',
        section_2_item_4: 'Multi-lingual',
        section_2_item_5: 'Aerobics',
        section_2_item_6: 'Date:',
        section_2_item_7: '10/23/2021',
        section_2_item_8: 'Location:',
        section_2_item_9: 'Tai Seng',
        section_2_item_10: 'Instructor:',
        section_2_item_11: 'Muhammad Ali',
        section_3_title: 'Scheduling+',
        section_3_subtitle: '120 hours saved, per business',
        section_3_checklist:
            '<ul>\r\n\t<li>scheduling, comms distributions, bookings</li>\r\n\t\
            <li>simple, structured, intuitive</li>\r\n\t\
            <li>we get that business owners are busy/no time</li>\r\n\t\
            <li>we really put in the hours to make it easy to use, so that you can pick and go</li>\r\n\t\
            <li>we are receptive, give us feedback and we will put it in</li>\r\n</ul>\r\n',
        section_4_title:
            'A solution for gyms and studios, tested by gyms and studios',
        section_4_body:
            'Amet minim mollit non deserunt hello hello hello ullamco est sit aliqua dolor do amet sint. \
            Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud \
            amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit \
            officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
        section_5_title_1: 'What our members',
        section_5_title_2: 'have to say',
        section_5_item_1:
            'Always on time just seemed so user- friendly for clients and staff.\
            Everything from managing the waitlist and doing the late cancels to inputting \
            the schedule is very straightforward.A new staff member could get on to AOT and \
            do whatever they needed to do without much training.',
        section_5_item_2: 'Arnold Chen',
        section_5_item_3: 'Dance Studio Owner',
        section_5_item_4:
            'Always on time just seemed so user- friendly for clients and staff.Everything \
            from managing the waitlist and doing the late cancels to inputting the \
            schedule is very straightforward.A new staff member could get on to AOT \
            and do whatever they needed to do without much training.',
        section_5_item_5: 'Trish',
        section_5_item_6: 'Yoga Studio Owner',
        pricing_title: 'Pricing Plans',
        pricing_body:
            'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.\
            Velit officia consequat duis enim velit mollit.Exercitation veniam\
            consequat sunt nostrud amet.',
        pricing_monthly: 'Monthly',
        pricing_yearly: 'Yearly',
        pricing_promo_tag: 'Save 20%',
        pricing_currency_title: 'Pricing in',
        pricing_subtitle_monthly: '/ month',
        pricing_subtitle_yearly: '/ year',
        pricing_coming_soon: 'Coming soon',
        pricing_tier_0_name: 'Free',
        pricing_tier_0_price_usd: '$0',
        pricing_tier_0_subtitle_monthly: 'forever',
        pricing_tier_0_subtitle_yearly: 'forever',
        pricing_tier_0_subtitle:
            'For individuals, small businesses, and entrepreneurs',
        pricing_tier_0_feature_list_1: 'Up to 100 appointments / mo',
        pricing_tier_0_feature_list_2: '1 location',
        pricing_tier_0_feature_list_3: 'Up to 2 staff',
        pricing_tier_0_disabled_feature_list_1: 'Open API',
        pricing_tier_0_disabled_feature_list_2: 'Branded app',
        pricing_tier_0_subfeature_title: 'Free forever',
        pricing_tier_0_subfeature_checklist_1: 'No credit card required',
        pricing_tier_0_subfeature_checklist_2: 'No commitment',
        pricing_tier_0_subfeature_checklist_3:
            'Includes free trial of our Multi- location plan for 21 days',
        pricing_tier_0_cta: 'Choose plan',
        pricing_tier_1_name: 'Single Studio',
        pricing_tier_1_price_usd: '$49',
        pricing_tier_1_subtitle:
            'For small businesses with one or two locations',
        pricing_tier_1_feature_list_1: 'Up to 1, 000 appointments / mo',
        pricing_tier_1_feature_list_2: '1 location',
        pricing_tier_1_feature_list_3: '5 staff included',
        pricing_tier_1_disabled_feature_list_1: 'Open API',
        pricing_tier_1_disabled_feature_list_2: 'Branded app',
        pricing_tier_1_subfeature_title: 'Bring your business online',
        pricing_tier_1_subfeature_checklist_1:
            '$20 per additional location',
        pricing_tier_1_subfeature_checklist_2: '$5 per additional staff',
        pricing_tier_1_subfeature_checklist_3:
            '$5 per additional 1, 000 appointments',
        pricing_tier_1_cta: 'Try it for free',
        pricing_tier_2_name: 'Multi - location Business',
        pricing_tier_2_price_usd: '$89',
        pricing_tier_2_subtitle:
            'For growing businesses with multiple locations',
        pricing_tier_2_feature_list_1: 'Unlimited appointments',
        pricing_tier_2_feature_list_2: '3 locations included',
        pricing_tier_2_feature_list_3: '10 staff included',
        pricing_tier_2_feature_list_4: 'Open API',
        pricing_tier_2_feature_list_5: 'Branded app',
        pricing_tier_2_disabled_feature_list: '',
        pricing_tier_2_subfeature_title: 'Everything you will need',
        pricing_tier_2_subfeature_checklist_1:
            '$20 per additional location',
        pricing_tier_2_subfeature_checklist_2: '$5 per additional staff',
        pricing_tier_2_subfeature_checklist_3: 'Unlimited appointments',
        pricing_tier_2_cta: 'Try it for free',
        section_6_title_1: 'Try always on time for',
        section_6_title_2: '21 days, absolutely free!',
        section_6_subtitle: 'Take your business to the next leavel',
        section_6_cta: 'Try it for free',
        section_6_cta_note: 'No credit card required',
        footer_contact_title: 'Get in touch with us',
        footer_address_title: 'Office address',
        footer_address: 'AOT building, SIngapore 1234567',
        footer_follow_us: 'Follow us',
        footer_copyright_1: 'Copyright © 2021',
        footer_copyright_2: 'Always On Time.',
        footer_copyright_3: 'All Rights Reserved.',
        footer_privacy_policy: 'Privacy Policy',
        footer_terms: 'Terms and Conditions',
    }

    const [translations, setTranslations] = useState(ui_text)

    hero_props.title_left = translations.company_name_1
    hero_props.title_center = translations.company_name_2
    hero_props.title_right = translations.company_name_3
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
