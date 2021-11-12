import { createModal } from 'components/Modals/ModalFactory'
import Translation from 'components/Translation'
import { withClass } from 'components/types'
import { useAppContext } from 'context/AppContext'
import { AuthContext } from 'context/AuthContext'
import { classNames } from 'utils/dom-helpers'

interface SignupButtonProps {
    translations: Record<string, string>
} 
function SignupButton({ className = '', translations = {} }: SignupButtonProps & withClass) {
    const { tiers } = useAppContext()
    const FreePlanModalProvider = createModal(
        AuthContext,
        'SignupModal',
        () => <Translation content_key="try_it_for_free" translations={translations} />,
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
