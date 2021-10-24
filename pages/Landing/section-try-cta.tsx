import { createModal } from 'components/Modals/ModalFactory'
import { useAppContext } from 'context/AppContext'
import { AuthContext, useAuth } from 'context/AuthContext'
import { useEffect } from 'react'
import { classNames } from 'utils/dom-helpers'
import styles from '../../styles/Landing/section-try-cta.module.scss'

export default function LandingSectionTryCTA() {
    const { tiers } = useAppContext()
    const { SignupModal } = useAuth()

    useEffect(() => {
        if (tiers && tiers[0]) {
            SignupModal.setAttributes({
                ...SignupModal.attributes,
                tier: tiers[0],
            })
        }
    }, [tiers])

    console.log(SignupModal.attributes)

    return (
        <section
            className={classNames(
                styles.sectionGradientBg,
                'try-cta',
                'py-20 px-40 mb-20'
            )}
        >
            <div className="container m-auto h-48">
                <div className="grid grid-cols-2 h-48 place-items-center">
                    <div>
                        <h3 className="text-white drop-shadow text-4xl circular">
                            Try always on time for
                            <br />
                            21 days, absolutely free!
                        </h3>
                        <small className="text-lg text-white circular-thin">
                            Take your business to the next leavel
                        </small>
                        <div className="flex mt-2 items-center">
                            <button
                                type="button"
                                className="shadow 
                                py-3 text-sm text-white font-bold
                                bg-secondary rounded-full
                                transition duration-300 ease-in-out
                                hover:bg-opacity-80
                                md:px-10"
                                onClick={() => {
                                    SignupModal.open()
                                }}
                            >
                                <span>Try it for free</span>
                            </button>
                            <div className="pl-6 align-middle">
                                <span className="text-sm text-white leading-none">
                                    No credit card required
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute -inset-x-48 -inset-y-80">
                            <div
                                className={classNames(
                                    styles.sectionBgImage,
                                    'absolute -inset-x-3.5'
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
