import Head from 'next/head'
import Navbar, {
    NavigationItem,
    Props as NavbarProps,
} from '../components/Navbar'
import Footer from '../components/Footer'
import LandingHero, { Props as LandingHeroProps } from './Landing/hero'
import LoginModal from 'components/Modals/Login'
import SignupModal from 'components/Modals/Signup'
import LandingFeaturesSection from './Landing/section-features'
import LandingSectionTestimonials from './Landing/section-testimonials'
import LandingPricingSection from './Landing/section-pricing'

function Home() {
    const hero_props: LandingHeroProps = {
        title_left: 'always',
        title_center: 'on',
        title_right: 'time',
        subtitle:
            'Scheduling, booking and business management platform for your business.',
        button_label: 'Try it for free',
    }
    const navbar_props: NavbarProps = {
        current: NavigationItem.menu_1,
        nav_labels: {
            menu_1: 'Industries',
            menu_2: 'Features',
        },
    }

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
            <Navbar {...navbar_props} />

            <LandingHero {...hero_props} />

            <main className="overflow-hidden">
                <LandingFeaturesSection
                    date_of_exercise={new Date().toLocaleDateString()}
                    location_name="Taiseng"
                    instructor_name="Muhammad Ali"
                />
                <LandingSectionTestimonials />
                <LandingPricingSection />
            </main>


            <Footer />
            <LoginModal />
            <SignupModal />
        </div>
    )
}

export default Home
