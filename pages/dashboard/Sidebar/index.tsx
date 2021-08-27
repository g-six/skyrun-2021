import { ReactElement, MouseEvent, useState } from 'react'
import { useRouter } from 'next/router'
import {
    Drawer,
    DrawerContent,
    DrawerSelectEvent,
} from '@progress/kendo-react-layout'
import logout from 'services/logout'
import { classNames } from 'utils/dom-helpers'
import { UserModel } from 'services/profile'

type SidebarItem = {
    text?: string
    separator?: boolean
    icon?: string
    selected?: boolean
    route?: string
}
interface Props {
    children?: ReactElement[] | string
    region: string
    ClientId: string
    user?: UserModel
}
const items: SidebarItem[] = [
    { text: 'Home', icon: 'feather-sidebar', route: '/dashboard' },
    {
        text: 'Calendar',
        icon: 'k-i-calendar',
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
        icon: 'k-i-star-outline',
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

function Sidebar({ children, region, ClientId, user }: Props) {
    const router = useRouter()
    const [expanded, setExpanded] = useState(false)
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
        <>
            <Drawer
                className="h-screen"
                expanded={expanded}
                mode={'push'}
                mini={true}
                onSelect={onSelect}
                position={'start'}
                items={items.map((item) => ({
                    ...item,
                    selected: item.text === selected,
                }))}
            >
                <DrawerContent>
                    {children}
                    <button
                        className={classNames(
                            'absolute bottom-28 bg-white text-indigo-900 w-9 h-9 transition-all duration-300',
                            expanded
                                ? 'left-56 shadow-xl border-r border-indigo-50 hover:text-indigo-700 rounded-full'
                                : 'left-2 hover:bg-indigo-900 hover:bg-opacity-10 rounded-lg',
                            'duration-400 ease-in-out transition-all'
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
                            'duration-400 ease-in-out transition-all',
                            'hover:bg-indigo-900 hover:bg-opacity-10'
                        )}
                        onClick={() => logout({ region, ClientId })}
                    >
                        <span className="feather-unlock"></span>
                    </button>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default Sidebar
