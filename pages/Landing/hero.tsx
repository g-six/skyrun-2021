import Translation from 'components/Translation'
import { useAuth } from 'context/AuthContext'
import { isProdEnv } from 'utils/environment-helper'
import styles from '../../styles/Landing/hero.module.scss'

export default function LandingHero(props: Record<string, string>) {
    const { SignupModal: SignupModalCtx } = useAuth()

    const handleSignupOnClick = () => {
        if (isProdEnv() === true) {
            window
                .open('https://aotplus.activehosted.com/f/5', '_blank')
                ?.focus()
        } else {
            SignupModalCtx.open()
        }
    }

    return (
        <div className={styles.gradBg}>
            <div className={styles.gradHero}>
                <div className={styles.spriteCircle} />
                <main className="py-60 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-0 lg:px-8 text-white">
                    <div className="sm:text-center lg:text-left">
                        <h1 className="binary text-4xl tracking-tight font-light sm:text-5xl md:text-8xl">
                            <Translation
                                className="block xl:inline text-primary"
                                content_key="company_name_1"
                                render_as="span"
                                translations={props}
                            />
                            <Translation
                                className="block xl:inline text-secondary"
                                content_key="company_name_2"
                                render_as="span"
                                translations={props}
                            />
                            <Translation
                                className="block xl:inline text-primary"
                                content_key="company_name_3"
                                render_as="span"
                                translations={props}
                            />
                        </h1>
                        <Translation
                            className="mt-3 text-base text-gray-400 sm:mt-5 sm:text-lg sm:max-w-lg sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
                            content_key="hero_line_2"
                            render_as="p"
                            translations={props}
                        />
                        <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                            <div className="overflow-hidden ">
                                <button
                                    className="shadow w-full flex items-center justify-center
                                px-6 py-4 text-base text-white font-bold
                                bg-primary border rounded-full
                                transition duration-300 ease-in-out
                                hover:bg-transparent border-solid border-primary
                                hover:text-primary
                                md:text-xl md:px-10"
                                    type="button"
                                    onClick={() => handleSignupOnClick()}
                                >
                                    <Translation
                                        content_key="main_cta_button"
                                        translations={props}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
