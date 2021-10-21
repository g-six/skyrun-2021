import { createModal } from 'components/Modals/ModalFactory'
import { withClass } from 'components/types'
import { useAppContext } from 'context/AppContext'
import { AuthContext } from 'context/AuthContext'
import { classNames } from 'utils/dom-helpers'

function SignupButton({ className = '' }: withClass) {
    const { tiers } = useAppContext()
    const FreePlanModalProvider = createModal(
        AuthContext,
        'SignupModal',
        () => <span>Try it for free</span>,
        () => <span>Cancel</span>,
        { tier: tiers[0] }
    )
    return (
        <FreePlanModalProvider.Opener
            className={
                className ||
                classNames(
                    'text-gray-800 hover:bg-gray-100 hover:text-black',
                    'px-3 py-2 rounded-md text-sm lg:mr-2',
                    'inline-block btn-navbar-login'
                )
            }
        />
    )
}

export default SignupButton
