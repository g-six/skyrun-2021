import dynamic from 'next/dynamic'
import Head from 'next/head'
import { AppBar, AppBarSection } from '@progress/kendo-react-layout'
import {
    Authenticated,
    NotAuthenticated,
    useAuth,
} from 'context/AuthContext'
import { Wrapper } from 'components/types'
import LoginModal from 'components/Modals/Login'
import LoginButton from 'components/Buttons/LoginButton'
import { useEffect } from 'react'

const Sidebar = dynamic(() => import('./Sidebar'), { ssr: false })

function Dashboard({
    redirect = '/',
    children,
}: { redirect?: string } & Wrapper) {
    const auth = useAuth()
    const { user } = auth

    return (
        <>
            <Head>
                <title>Dashboard</title>
                <meta property="og:title" content="Dashboard" key="title" />
                <link
                    href="https://static.aot.plus/feather.css"
                    rel="stylesheet"
                    type="text/css"
                />
            </Head>
            <Sidebar>
                <AppBar
                    className="flex items-stretched h-14"
                    themeColor="inherit"
                >
                    <AppBarSection className="flex-grow">
                        {user?.first_name ? (
                            <h1 className="font-3xl font-bold text-gray-700">
                                Welcome, {user.first_name}!
                            </h1>
                        ) : (
                            ''
                        )}
                    </AppBarSection>
                    <AppBarSection>
                        <span className="k-appbar-separator"></span>
                    </AppBarSection>
                    <AppBarSection className="actions">
                        {user?.uuid ? <span>{user.uuid}</span> : ''}
                    </AppBarSection>
                </AppBar>
                <Authenticated>{children}</Authenticated>
                <NotAuthenticated>
                    <LoginModal />
                    <LoginButton className="btn" />
                </NotAuthenticated>
            </Sidebar>
        </>
    )
}

export default Dashboard
