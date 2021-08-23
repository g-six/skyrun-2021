import Head from 'next/head'
import Navbar, {
    NavigationItem,
    Props as NavbarProps,
} from '../components/Navbar'
import styles from '../styles/Home.module.scss'
import LandingHero, { Props as LandingHeroProps } from './Landing/hero'

interface HomePageProps {
    region: string
    ClientId: string
}

function Home({ region, ClientId }: HomePageProps) {
    const hero_props: LandingHeroProps = {
        title_left: 'On time, ',
        title_right: 'Always',
        subtitle: 'Connecting with your customers',
        button_label: 'View Plans',
    }
    const navbar_props: NavbarProps = {
        current: NavigationItem.menu_1,
        region,
        ClientId,
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
            </Head>
            <Navbar {...navbar_props} />

            <LandingHero {...hero_props} />

            <main className="container mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1 lg:col-start-2">
                        <h1 className="mt-20 mb-10 lg:mb-5 text-purple-900 text-5xl font-extrabold leading-none tracking-tight">
                            Anim aute id magna aliqua ad.
                        </h1>

                        <p className="text-regal-blue">
                            Anim aute id magna aliqua ad ad non deserunt
                            sunt. Qui irure qui lorem cupidatat commodo.
                            Elit sunt amet fugiat veniam occaecat fugiat
                            aliqua.
                        </p>
                    </div>

                    <div className="mt-20">
                        <div className={styles.vectorA} />
                    </div>
                </div>
            </main>
        </div>
    )
}

export async function getStaticProps() {
    return {
        props: {
            region: process.env.COGNITO_REGION,
            ClientId: process.env.COGNITO_CLIENT_ID,
        },
    }
}

export default Home
