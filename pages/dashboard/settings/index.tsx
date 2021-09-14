import { useEffect, useState } from 'react'
import { classNames } from 'utils/dom-helpers'
import Dashboard from '..'

function chargebeePortalButton() {
    const classnames = classNames(
        'text-gray-800 hover:bg-gray-100 hover:text-black',
        'px-3 py-2 rounded-md text-sm lg:mr-2',
        'inline-block btn-navbar-login'
    )
    return {
        __html: `<a class="${classnames}" href="javascript:void(0)" data-cb-type="portal">Manage Account</a>`,
    }
}

function chargebeeSubscribeButton() {
    const classnames = classNames(
        'text-gray-800 hover:bg-gray-100 hover:text-black',
        'px-3 py-2 rounded-md text-sm lg:mr-2',
        'inline-block btn-navbar-login'
    )
    return {
        __html: `<a class="${classnames}" 
            href="javascript:void(0)" 
            data-cb-type="checkout"
            data-cb-item-0="cbdemo_lite-USD-monthly"
            data-cb-item-0-quantity="1"
        >Susbcribe</a>`,
    }
}

function DashboardSettings() {
    const [registered, setRegistered] = useState(false)
    window.Chargebee.registerAgain()
    useEffect(() => {
        if (!registered) {
            window.Chargebee.registerAgain()
        }
        setRegistered(true)
    }, [registered])
    return (
        <Dashboard>
            <div dangerouslySetInnerHTML={chargebeePortalButton()} />
            <div dangerouslySetInnerHTML={chargebeeSubscribeButton()} />
        </Dashboard>
    )
}

export default DashboardSettings
