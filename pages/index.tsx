import Head from 'next/head'
import Navbar, {
    NavigationItem,
    Props as NavbarProps,
} from '../components/Navbar'
import Footer from '../components/Footer'
import styles from '../styles/Home.module.scss'
import LandingHero, { Props as LandingHeroProps } from './Landing/hero'
import LoginModal from 'components/Modals/Login'
import SignupModal from 'components/Modals/Signup'
import { useState } from 'react'
import { Switch, SwitchChangeEvent } from '@progress/kendo-react-inputs'
import { Button, ButtonGroup } from '@progress/kendo-react-buttons'
import LandingFeaturesSection from './Landing/section-features'
import LandingSectionTestimonials from './Landing/section-testimonials'

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
    const [checked, setChecked] = useState<boolean>(true)
    const handleToggleSwitch = () => {
        setChecked(!checked)
    }

    const date_of_exercise = new Date().toLocaleDateString()
    const location_name = 'Taiseng'
    const instructor_name = 'Muhammad Ali'

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

            <main className="container max-w-7xl mx-auto">
                <LandingFeaturesSection
                    date_of_exercise={new Date().toLocaleDateString()}
                    location_name="Taiseng"
                    instructor_name="Muhammad Ali"
                />
            </main>
            <LandingSectionTestimonials />

            <section className="pricing-plans">
                <h3 className="text-center text-primary-dark drop-shadow text-5xl circular font-thin mb-8 mt-36">
                    Pricing Plans
                </h3>
                <p className="text-gray-400 text-center leading-relaxed">
                    Amet minim mollit non deserunt ullamco est sit aliqua
                    dolor do amet sint.
                    <br />
                    Velit officia consequat duis enim velit mollit.
                    Exercitation veniam <br />
                    consequat sunt nostrud amet.
                </p>
                <div className="flex justify-center items-center w-auto my-5">
                    <span className="text-gray-400 mr-4">Monthly</span>

                    <Switch
                        onLabel={''}
                        offLabel={''}
                        onChange={handleToggleSwitch}
                        checked={checked}
                    />

                    <span className="text-gray-400 ml-3 mr-2">Yearly</span>
                    <span className="text-white text-xs bg-primary-light rounded px-2 py-1">
                        Save 20%
                    </span>
                </div>
                <div className="flex justify-center items-center w-auto my-5">
                    <ButtonGroup className="bg-primary-light">
                        <Button togglable={true}>USD</Button>
                        <Button togglable={true}>SGD</Button>
                        <Button togglable={true}>PHP</Button>
                        <Button togglable={true}>MYR</Button>
                    </ButtonGroup>
                </div>
            </section>

            <Footer />
            <LoginModal />
            <SignupModal />
        </div>
    )
}

export default Home
