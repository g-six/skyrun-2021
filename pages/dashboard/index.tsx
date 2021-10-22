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
import TenantModal from 'components/Modals/Tenant'
import Cookies from 'js-cookie'
import { classNames } from 'utils/dom-helpers'

const Sidebar = dynamic(() => import('./Sidebar'), { ssr: false })

function Dashboard({
    actions = [],
    redirect = '/',
    children,
}: { redirect?: string } & Wrapper) {
    const router = useRouter()
    const {
        user,
        LoginModal: LoginModalContext,
        is_drawer_expanded,
    } = useAuth()
    const { onLanguageChange } = useAppContext()

    function handleLanguageChange(e: DropDownListChangeEvent) {
        onLanguageChange(e.value)
    }

    if (!user?.uuid && !Cookies.get('id_token')) {
        LoginModalContext.open()
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
                <AppBar
                    className="flex items-stretched h-20 bg-white shadow-lg px-8 py-2 z-10 relative"
                    themeColor="inherit"
                >
                    <AppBarSection
                        className={classNames(
                            is_drawer_expanded
                                ? 'w-44 mr-14 bg-center'
                                : 'w-32 bg-top-left',
                            'bg-contain h-10 block app-logo-icon mb-2'
                        )}
                    />
                    <AppBarSection className="flex-grow">
                        {user?.first_name ? (
                            <h1 className="text-2xl font-medium text-primary-dark">
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

                    <AppBarSection>
                        <LanguageSelector
                            className="country-selector flex"
                            onChange={handleLanguageChange}
                        />
                    </AppBarSection>
                </AppBar>
                <Sidebar>
                    <>{children}</>
                </Sidebar>
                <TenantModal />
                <LoginModal />
            </Authenticated>

            <NotAuthenticated>
                <span>Relogging you in</span>
                <LoginModal />
            </NotAuthenticated>
        </>
    )
}

export default Dashboard
