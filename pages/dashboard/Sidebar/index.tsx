import {
    Drawer,
    DrawerContent,
    DrawerItem,
    DrawerItemProps,
    DrawerSelectEvent,
} from '@progress/kendo-react-layout'
import { Language } from 'components/LanguageSelector'
import { useAuth } from 'context/AuthContext'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { MouseEvent, ReactElement, useState } from 'react'
import { classNames } from 'utils/dom-helpers'
import { betterPathname } from 'utils/string-helper'
import TenantSelector from './TenantSelector'

type SidebarItem = {
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
const items: SidebarItem[] = [
    {},
    { text: 'Home', icon: 'feather-sidebar', route: '/dashboard' },
    {
        text: 'Calendar',
        icon: 'feather-calendar',
        route: '/dashboard/calendar',
    },
    {
        text: 'Clients',
        icon: 'feather-users',
        selected: true,
        route: '/dashboard/clients',
    },
    {
        text: 'Locations',
        icon: 'feather-map-pin',
        route: '/dashboard/locations',
    },
    {
        text: 'Products',
        icon: 'feather-shopping-bag',
        route: '/dashboard/products',
    },
    {
        text: 'Packages',
        icon: 'feather-gift',
        route: '/dashboard/packages',
    },
    {
        text: 'Resources',
        icon: 'feather-folder',
        route: '/dashboard/resources',
    },
    {
        text: 'Services',
        icon: 'feather-briefcase',
        route: '/dashboard/services',
    },
    { text: 'Staff', icon: 'feather-user', route: '/dashboard/staff' },
    {
        text: 'Reports',
        icon: 'k-i-star-outline',
        route: '/dashboard/reports',
    },
    { separator: true },
    { text: 'Settings', icon: 'k-i-cog', route: '/dashboard/settings' },
    { text: 'Feedback', icon: 'k-i-comment', route: '/dashboard/feedback' },
    {
        text: 'Integrations',
        icon: 'k-i-html',
        route: '/dashboard/integrations',
    },
    {
        text: 'Notifications',
        icon: 'feather-bell',
        route: '/dashboard/notifications',
    },
]

const CustomItem = (props: DrawerItemProps & SidebarItem) => {
    const [locale] = betterPathname(location.pathname)
    const { tenant, tenants } = useAuth()
    function getHomePath() {
        if (Object.keys(Language).indexOf(locale.toUpperCase()) > 0) {
            return ['', locale, 'dashboard/'].join('/')
        }
        return '/dashboard/'
    }

    if (!props.icon && !props.route && !props.separator) {
        return (
            <div
                className={classNames(
                    props.className || '',
                    'bg-white mt-6 mb-3 px-3'
                )}
                onClickCapture={props.onClickCapture}
            >
                <TenantSelector tenant={tenant} tenants={tenants} />
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
            <div className="item-descr-wrap ml-2 w-full" title={props.text}>
                <div
                    className={classNames(
                        props.selected ? 'text-primary' : 'text-gray-700'
                    )}
                >
                    {props.text}
                </div>
            </div>
        </DrawerItem>
    )
}

function Sidebar({ children }: Props) {
    const router = useRouter()
    const ctx = useAuth()
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
                          if (item.route == '/') {
                              return {
                                  ...item,
                                  selected: item.text === selected,
                              }
                          }
                          if (
                              !item.icon &&
                              !item.route &&
                              !item.separator
                          ) {
                              return {
                                  ...item,
                                  selected: item.text === selected,
                                  onClickCapture: () => {
                                      Cookies.set('drawer', 'expanded')
                                      ctx.toggleDrawerSize(true)
                                  },
                              }
                          }
                          return {
                              ...item,
                              selected: item.text === selected,
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
                        'absolute bottom-28 bg-primary text-white w-9 h-9 transition-all duration-200',
                        ctx.is_drawer_expanded
                            ? 'left-56 shadow-xl border-r border-indigo-50'
                            : 'left-10 hover:bg-opacity-30 bg-opacity-70',
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
