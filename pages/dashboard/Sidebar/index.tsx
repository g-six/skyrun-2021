import {
    Drawer,
    DrawerContent,
    DrawerItem,
    DrawerItemProps,
    DrawerSelectEvent
} from '@progress/kendo-react-layout'
import { useAppContext } from 'context/AppContext'
import { useAuth } from 'context/AuthContext'
import Cookies from 'js-cookie'
import getConfig from 'next/config'
import { useRouter } from 'next/router'
import { MouseEvent, ReactElement, useEffect, useState } from 'react'
import { classNames } from 'utils/dom-helpers'
import { useFetch } from 'utils/fetch-helper'
import { getTranslation } from 'utils/language-helper'
import { betterPathname } from 'utils/string-helper'
import { FetchMethods } from 'utils/types'
import TenantSelector from './TenantSelector'

const { TENANT_SIDEBAR } = getConfig().publicRuntimeConfig

type SidebarItem = {
    translation_key?: string
    text?: string
    separator?: boolean
    icon?: string
    selected?: boolean
    onClickCapture?(): void
    route?: string
}
interface Props {
    children?: ReactElement
}

function Sidebar({ children }: Props) {
    const router = useRouter()
    const ctx = useAuth()
    const { lang, translations: common_translations } = useAppContext()

    const [translations, setTranslations] = useState<
        Record<string, string>
    >(common_translations || {})

    const { data: component_translation, is_loading } = useFetch(
        `/v1/contents?url=${encodeURI(
            `https://cms.aot.plus/jsonapi/node/page_translation/${TENANT_SIDEBAR}`
        )}`,
        FetchMethods.GET,
        true,
        true
    )

    useEffect(() => {
        if (
            lang &&
            component_translation.data &&
            component_translation.data.attributes[lang] &&
            component_translation.data.attributes[lang].length > 0 &&
            Object.keys(translations).length == 0
        ) {
            const translations_to_add: Record<string, string> = {}
            component_translation.attributes[lang].forEach(
                ({ key, value }: any) => {
                    translations_to_add[key] = value
                }
            )

            setTranslations({
                ...translations,
                ...translations_to_add,
                TENANT_SIDEBAR,
            })
        }
    }, [component_translation, lang])

    const items: SidebarItem[] = [
        {},
        {
            translation_key: 'home',
            text: 'Home',
            icon: 'feather-sidebar',
            route: '/dashboard',
        },
        {
            translation_key: 'calendar',
            text: 'Calendar',
            icon: 'feather-calendar',
            route: '/dashboard/calendar',
        },
        {
            translation_key: 'clients',
            text: 'Clients',
            icon: 'feather-users',
            selected: true,
            route: '/dashboard/clients',
        },
        {
            translation_key: 'locations',
            text: 'Locations',
            icon: 'feather-map-pin',
            route: '/dashboard/locations',
        },
        {
            translation_key: 'products',
            text: 'Products',
            icon: 'feather-shopping-bag',
            route: '/dashboard/products',
        },
        {
            translation_key: 'packages',
            text: 'Packages',
            icon: 'feather-gift',
            route: '/dashboard/packages',
        },
        {
            translation_key: 'resources',
            text: 'Resources',
            icon: 'feather-folder',
            route: '/dashboard/resources',
        },
        {
            translation_key: 'services',
            text: 'Services',
            icon: 'feather-briefcase',
            route: '/dashboard/services',
        },
        {
            translation_key: 'staff',
            text: 'Staff',
            icon: 'feather-user',
            route: '/dashboard/staff',
        },
        {
            translation_key: 'reports',
            text: 'Reports',
            icon: 'k-i-star-outline',
            route: '/dashboard/reports',
        },
        {
            translation_key: 'profile',
            text: 'Profile',
            icon: 'feather-user',
            route: '/dashboard/profile',
        },
        { separator: true },
        {
            translation_key: 'settings',
            text: 'Settings',
            icon: 'k-i-cog',
            route: '/dashboard/settings',
        },
        {
            translation_key: 'feedback',
            text: 'Feedback',
            icon: 'k-i-comment',
            route: '/dashboard/feedback',
        },
        {
            translation_key: 'integrations',
            text: 'Integrations',
            icon: 'k-i-html',
            route: '/dashboard/integrations',
        },
        {
            translation_key: 'notifications',
            text: 'Notifications',
            icon: 'feather-bell',
            route: '/dashboard/notifications',
        },
    ]

    const handleClick = (e: MouseEvent) => {
        e.preventDefault()
        ctx.toggleDrawerSize(!ctx.is_drawer_expanded)
    }
    const onSelect = (e: DrawerSelectEvent) => {
        Cookies.set('drawer', 'expanded')
        ctx.toggleDrawerSize(true)
        router.push(e.itemTarget.props.route)
    }
    const setSelectedItem = (path_name: string) => {
        const current_path = items.find(
            (item: SidebarItem) => item.route === path_name
        ) as SidebarItem

        if (current_path && current_path.text) {
            return current_path.text
        }
    }
    const selected = setSelectedItem(router.pathname)

    const CustomItem = (props: DrawerItemProps & SidebarItem) => {
        const [locale] = betterPathname(location.pathname)
        const { tenant, tenants } = useAuth()

        if (!props.icon && !props.route && !props.separator) {
            return (
                <div
                    className={classNames(
                        props.className || '',
                        'bg-white mt-6 mb-3 px-3'
                    )}
                    onClickCapture={props.onClickCapture}
                >
                    <TenantSelector
                        tenant={tenant}
                        tenants={tenants}
                        translations={translations}
                    />
                </div>
            )
        } else if (props.separator) {
            return (
                <div className="justify-self-stretch flex-auto px-5">
                    <div
                        className="block border-b-gray-400 border-b h-full"
                        style={{ height: '1px' }}
                    />
                </div>
            )
        }

        return (
            <DrawerItem
                {...props}
                className="flex items-center text-gray-600"
                title={props.text}
            >
                <span
                    className={classNames(
                        props.selected ? 'text-primary' : 'text-gray-400',
                        `k-icon text-2xl ${props.icon}`
                    )}
                ></span>
                <div
                    className="item-descr-wrap ml-2 w-full"
                    title={props.text}
                >
                    <div
                        className={classNames(
                            props.selected
                                ? 'text-primary'
                                : 'text-gray-700'
                        )}
                    >
                        {props.text}
                    </div>
                </div>
            </DrawerItem>
        )
    }

    const nav_height = '80px'

    return (
        <Drawer
            className="relative z-0"
            expanded={ctx.is_drawer_expanded}
            mode={'push'}
            mini={true}
            miniWidth={60}
            onSelect={onSelect}
            position={'start'}
            style={{ height: `calc(100vh - ${nav_height}` }}
            items={
                ctx.user?.uuid
                    ? items.map((item) => {
                          if (item.translation_key) {
                              item.text = getTranslation(
                                  item.translation_key,
                                  translations
                              )
                          }

                          if (item.route == '/') {
                              return {
                                  ...item,
                                  selected:
                                      item.route === location.pathname,
                              }
                          }
                          if (
                              !item.icon &&
                              !item.route &&
                              !item.separator
                          ) {
                              return {
                                  ...item,
                                  onClickCapture: () => {
                                      Cookies.set('drawer', 'expanded')
                                      ctx.toggleDrawerSize(true)
                                  },
                              }
                          }
                          const [, , page] = location.pathname.split('/')
                          const selected = !!(
                              item.route &&
                              `/dashboard/${page}` == item.route
                          )

                          return {
                              ...item,
                              selected,
                          }
                      })
                    : []
            }
            item={CustomItem}
        >
            <DrawerContent>
                {children}
                <button
                    className={classNames(
                        'absolute bottom-16 bg-primary text-white w-9 h-9 transition-all duration-200 -left-4',
                        ctx.is_drawer_expanded
                            ? 'shadow-xl border-r border-indigo-50'
                            : 'hover:bg-opacity-30 bg-opacity-70',
                        'duration-200 ease-linear transition-all rounded-full'
                    )}
                    id="BtnExpandSidebar"
                    onClick={handleClick}
                >
                    <span
                        className={classNames(
                            ctx.is_drawer_expanded
                                ? 'feather-chevron-left'
                                : 'feather-chevron-right'
                        )}
                    ></span>
                </button>
            </DrawerContent>
        </Drawer>
    )
}

export default Sidebar
