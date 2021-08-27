import dynamic from 'next/dynamic'
import Head from 'next/head'
import { AppBar, AppBarSection } from '@progress/kendo-react-layout'
import SkyContext, { SkyContextProps } from 'context/AppContext'


const Sidebar = dynamic(
    () => import('./Sidebar'),
    { ssr: false }
)

export interface DashboardPageProps {
    region: string
    ClientId: string
    children: any
}

function Dashboard({ region, ClientId, children }: DashboardPageProps) {
    return (
        <SkyContext.Consumer>{
            (ctx: SkyContextProps) => {
                return (<>
                    <Head>
                        <title>Dashboard</title>
                        <meta property="og:title" content="Dashboard" key="title" />
                        <link
                            href="https://static.aot.plus/feather.css"
                            rel="stylesheet"
                            type="text/css"
                        />
                    </Head>
                    <Sidebar region={region} ClientId={ClientId}>
                        <AppBar
                            className="flex items-stretched h-14"
                            themeColor="inherit"
                        >
                            <AppBarSection className="flex-grow">
                                {
                                    ctx.first_name
                                        ? <h1 className="font-3xl font-bold text-gray-700">
                                            Welcome, {ctx.first_name}!
                                        </h1>
                                        : ''
                                }
                            </AppBarSection>
                            <AppBarSection>
                                <span className="k-appbar-separator"></span>
                            </AppBarSection>
                            <AppBarSection className="actions">
                                {ctx.uuid ? <span>{ctx.uuid}</span> : ''}
                            </AppBarSection>
                        </AppBar>
                        {children}
                    </Sidebar>
                </>)
            }
        }</SkyContext.Consumer>
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

export default Dashboard
