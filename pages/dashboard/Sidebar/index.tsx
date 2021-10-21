import {
    Drawer,
    DrawerContent,
    DrawerItem,
    DrawerItemProps,
    DrawerSelectEvent,
} from '@progress/kendo-react-layout'
import { Language } from 'components/LanguageSelector'
import { useAuth } from 'context/AuthContext'
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
    logo_class?: string
    logo_style?: Record<string, string>
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
    }

    return props.route != '/' ? (
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
    ) : (
        <a
            href={getHomePath()}
            className="block bg-white cursor-pointer pb-6"
        >
            <span className="block pb-6 shadow-xl">
                <i className={props.logo_class} style={props.logo_style} />
            </span>
        </a>
    )
}

function Sidebar({ children }: Props) {
    const router = useRouter()
    const [expanded, setExpanded] = useState(false)
    const ctx = useAuth()
    const handleClick = (e: MouseEvent) => {
        e.preventDefault()
        setExpanded(!expanded)
    }
    const onSelect = (e: DrawerSelectEvent) => {
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
    return (
        <Drawer
            className="h-screen relative z-0"
            expanded={expanded}
            mode={'push'}
            mini={true}
            miniWidth={60}
            onSelect={onSelect}
            position={'start'}
            items={
                ctx.user?.uuid
                    ? items.map((item) => {
                          if (item.route == '/') {
                              return {
                                  ...item,
                                  selected: item.text === selected,
                                  logo_style: expanded
                                      ? {}
                                      : {
                                            backgroundPosition:
                                                'left 1.1rem center',
                                        },
                                  logo_class: classNames(
                                      expanded
                                          ? 'bg-center w-30 bg-contain'
                                          : 'bg-cover bg-clip-content w-12',
                                      'h-10 block app-logo-icon mt-4'
                                  ),
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
                                      setExpanded(true)
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
                        'absolute bottom-28 bg-primary text-white w-9 h-9 transition-all duration-300',
                        expanded
                            ? 'left-56 shadow-xl border-r border-indigo-50'
                            : 'left-3 hover:bg-opacity-30 bg-opacity-70',
                        'duration-400 ease-linear transition-all rounded-full'
                    )}
                    id="BtnExpandSidebar"
                    onClick={handleClick}
                >
                    <span
                        className={classNames(
                            expanded
                                ? 'feather-chevron-left'
                                : 'feather-chevron-right'
                        )}
                    ></span>
                </button>
                <button
                    className={classNames(
                        'btn-logout absolute bottom-16 left-3 w-9 h-9 rounded-lg',
                        'duration-400 ease-linear transition-all',
                        'hover:bg-indigo-900 hover:bg-opacity-10'
                    )}
                    onClick={ctx.logout}
                >
                    <span className="feather-unlock"></span>
                </button>
            </DrawerContent>
        </Drawer>
    )
}

export default Sidebar
