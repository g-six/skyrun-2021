import { ReactElement, MouseEvent, useState } from 'react'
import { useRouter } from 'next/router'
import {
    Drawer,
    DrawerContent,
    DrawerItem,
    DrawerItemProps,
    DrawerSelectEvent,
} from '@progress/kendo-react-layout'
import { classNames } from 'utils/dom-helpers'
import { UserModel } from 'services/profile'
import { useAuth } from 'context/AuthContext'

type SidebarItem = {
    text?: string
    separator?: boolean
    icon?: string
    selected?: boolean
    route?: string
}
interface Props {
    children?: ReactElement | ReactElement[] | string
}
const items: SidebarItem[] = [
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
]

const CustomItem = (props: DrawerItemProps) => {
    return (
        <DrawerItem {...props} title={props.text}>
            <span className={`k-icon ${props.icon}`}></span>
            <div className="item-descr-wrap ml-2 w-full" title={props.text}>
                <div>{props.text}</div>
            </div>
        </DrawerItem>
    )
}

function Sidebar({ children }: Props) {
    const router = useRouter()
    const [expanded, setExpanded] = useState(true)
    const ctx = useAuth()
    const handleClick = (e: MouseEvent) => {
        e.preventDefault()
        setExpanded(!expanded)
    }
    const onSelect = (e: DrawerSelectEvent) => {
        router.push(e.itemTarget.props.route)
        setExpanded(!expanded)
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
            className="h-screen"
            expanded={expanded}
            mode={'push'}
            mini={true}
            onSelect={onSelect}
            position={'start'}
            items={
                ctx.user?.uuid
                    ? items.map((item) => ({
                          ...item,
                          selected: item.text === selected,
                      }))
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
                            : 'left-2 hover:bg-opacity-30 bg-opacity-70',
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
                        'btn-logout absolute bottom-16 left-2 w-9 h-9 rounded-lg',
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
