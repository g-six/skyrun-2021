import { SignupModalOpener } from 'components/Modals/Signup'
import { withClass } from 'components/types'
import { classNames } from 'utils/dom-helpers'

function SignupButton({ className = '' }: withClass) {
    return (
        <SignupModalOpener
            className={
                className ||
                classNames(
                    'text-gray-800 hover:bg-gray-100 hover:text-black',
                    'px-3 py-2 rounded-md text-sm lg:mr-2',
                    'inline-block btn-navbar-login'
                )
            }
        >asdasd</SignupModalOpener>
    )
}

export default SignupButton
