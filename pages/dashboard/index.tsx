import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { AppBar, AppBarSection } from '@progress/kendo-react-layout'
import {
    Authenticated,
    NotAuthenticated,
    useAuth,
} from 'context/AuthContext'
import { Wrapper } from 'components/types'
import LoginModal from 'components/Modals/Login'
import LoginButton from 'components/Buttons/LoginButton'
import { toTitleCase } from 'utils/string-helper'

const Sidebar = dynamic(() => import('./Sidebar'), { ssr: false })

function Dashboard({
    actions = [],
    redirect = '/',
    children,
}: { redirect?: string } & Wrapper) {
    const router = useRouter()
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
                    className="flex items-stretched h-24 bg-primary-lighter bg-opacity-50"
                    themeColor="inherit"
                >
                    <AppBarSection className="flex-grow">
                        {user?.first_name ? (
                            <h1 className="text-2xl text-gray-700">
                                {router.pathname.substr(1) === 'dashboard'
                                    ? `Welcome, ${user.first_name}!`
                                    : toTitleCase(
                                          router.pathname.split('/')[
                                              router.pathname.split('/')
                                                  .length - 1
                                          ]
                                      )}
                            </h1>
                        ) : (
                            ''
                        )}
                    </AppBarSection>
                    <AppBarSection className="page-actions">
                        {actions}
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
