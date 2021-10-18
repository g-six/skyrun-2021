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
import LanguageSelector from 'components/LanguageSelector'
import { useAppContext } from 'context/AppContext'
import { DropDownListChangeEvent } from '@progress/kendo-react-dropdowns'

const Sidebar = dynamic(() => import('./Sidebar'), { ssr: false })

function Dashboard({
    actions = [],
    redirect = '/',
    children,
}: { redirect?: string } & Wrapper) {
    const router = useRouter()
    const auth = useAuth()
    const { onLanguageChange } = useAppContext()
    const { user } = auth

    function handleLanguageChange(e: DropDownListChangeEvent) {
        onLanguageChange(e.value)
    }

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
            <Authenticated>
                <Sidebar>
                    <>
                        <AppBar
                            className="flex items-stretched h-20 bg-white shadow-lg px-2 py-2"
                            themeColor="inherit"
                        >
                            <AppBarSection className="flex-grow">
                                {user?.first_name ? (
                                    <h1 className="text-2xl font-medium text-primary-dark">
                                        {router.pathname.substr(1) ===
                                        'dashboard'
                                            ? `Welcome, ${user.first_name}!`
                                            : toTitleCase(
                                                  router.pathname.split(
                                                      '/'
                                                  )[
                                                      router.pathname.split(
                                                          '/'
                                                      ).length - 1
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

                            <AppBarSection>
                                <LanguageSelector
                                    className="country-selector flex"
                                    onChange={handleLanguageChange}
                                />
                            </AppBarSection>
                        </AppBar>
                        {children}
                    </>
                </Sidebar>
            </Authenticated>
            <NotAuthenticated>
                <LoginModal />
                <div className="flex justify-center vertical-center">
                    <LoginButton className="button primary text-2xl inline-block p-4 flex-1" />
                </div>
            </NotAuthenticated>
        </>
    )
}

export default Dashboard
