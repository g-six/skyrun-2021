import { DropDownListChangeEvent } from '@progress/kendo-react-dropdowns'
import { AppBar, AppBarSection } from '@progress/kendo-react-layout'
import UniversalCreateButton from 'components/DropdownSelectors/UniversalCreateButton'
import LanguageSelector, { Language } from 'components/LanguageSelector'
import CreateClientModal from 'components/Modals/Client'
import LoginModal from 'components/Modals/Login'
import ServiceModal from 'components/Modals/Service'
import StaffModal from 'components/Modals/Staff'
import TenantModal from 'components/Modals/Tenant'
import UserDropdown from 'components/Navbar/UserDropdown'
import { Wrapper } from 'components/types'
import UniversalSearch from 'components/UniversalSearch'
import { useAppContext } from 'context/AppContext'
import {
    Authenticated,
    NotAuthenticated,
    useAuth,
} from 'context/AuthContext'
import Cookies from 'js-cookie'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { classNames } from 'utils/dom-helpers'
import { betterPathname, toTitleCase } from 'utils/string-helper'

const Sidebar = dynamic(() => import('./Sidebar'), { ssr: false })

function Dashboard({
    redirect = '/',
    children,
}: { redirect?: string } & Wrapper) {
    const router = useRouter()
    const {
        attributes,
        setAttributes,
        user,
        tenant,
        LoginModal: LoginModalContext,
        CreateClientModal: NewClientModal,
        StaffModal: NewStaffModal,
        ServiceModal: NewServiceModal,
        is_drawer_expanded,
    } = useAuth()
    const { onLanguageChange, translations } = useAppContext()
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

    function handleUniversalButtonChange(value: string) {
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
                <title>{translations.dashboard || 'Dashboard'}</title>
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
                    <AppBarSection className="mr-5">
                        <UniversalCreateButton
                            handleUniversalButtonChange={
                                handleUniversalButtonChange
                            }
                        />
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
                {tenant && tenant.id ? <StaffModal /> : <></>}
                {tenant && tenant.id ? (
                    <ServiceModal tenant_id={tenant.id} data={attributes} />
                ) : (
                    <></>
                )}
            </Authenticated>

            <NotAuthenticated>
                <span>Relogging you in</span>
                <LoginModal />
            </NotAuthenticated>
        </>
    )
}

export default Dashboard
