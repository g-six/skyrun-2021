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
import CreateClientModal from 'components/Modals/Client'
import StaffModal from 'components/Modals/Staff'
import ServiceModal from 'components/Modals/Service'
import { betterPathname, toTitleCase } from 'utils/string-helper'
import LanguageSelector, { Language } from 'components/LanguageSelector'
import { useAppContext } from 'context/AppContext'
import { DropDownListChangeEvent } from '@progress/kendo-react-dropdowns'
import TenantModal from 'components/Modals/Tenant'
import Cookies from 'js-cookie'
import { classNames } from 'utils/dom-helpers'
import UniversalSearch from 'components/UniversalSearch'
import UserDropdown from 'components/Navbar/UserDropdown'

const Sidebar = dynamic(() => import('./Sidebar'), { ssr: false })

function Dashboard({
    redirect = '/',
    children,
}: { redirect?: string } & Wrapper) {
    const router = useRouter()
    const {
        user,
        LoginModal: LoginModalContext,
        CreateClientModal: NewClientModal,
        StaffModal: NewStaffModal,
        ServiceModal: NewServiceModal,
        is_drawer_expanded,
    } = useAuth()
    const { onLanguageChange } = useAppContext()
    const [first_part] = betterPathname(location.pathname)
    let locale = '/en'

    if (
        first_part &&
        Object.keys(Language).indexOf(first_part.toUpperCase()) > 0
    ) {
        locale = `/${first_part.toLowerCase()}`
    }

    function handleLanguageChange(e: DropDownListChangeEvent) {
        onLanguageChange(e.value)
    }

    function handleUniversalButtonChange(e: DropDownListChangeEvent) {
        const value = e.target.value
        if (value === 'Client') { 
            NewClientModal.open()
        } else if (value === 'Staff') {
            NewStaffModal.open()
        } else if (value === 'Service') {
            NewServiceModal.open()
        }
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
                        <UniversalSearch />
                    </AppBarSection>
                    <AppBarSection className="page-actions">
                        <select
                            id="universalCreate"
                            name="universalCreate"
                            className={classNames(
                                'h-full py-0 pl-2 pr-8 bg-primary',
                                'focus:ring-primary-dark focus:border-primary-dark ',
                                'border-transparent rounded',
                                'text-gray-300 w-146 h-41'
                            )}
                            defaultValue="default"
                            onChange={handleUniversalButtonChange}
                            >
                                <option value="default">+ New</option>
                                <option value="Client">Client</option>
                                <option value="Staff">Staff</option>
                                <option value="Service">Service</option>
                        </select>
                    </AppBarSection>
                    <AppBarSection className="page-actions">
                        <UserDropdown locale={locale} />
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
                <CreateClientModal />
                <StaffModal />
                <ServiceModal />
            </Authenticated>

            <NotAuthenticated>
                <span>Relogging you in</span>
                <LoginModal />
            </NotAuthenticated>
        </>
    )
}

export default Dashboard
