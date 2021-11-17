import Translation from 'components/Translation'
import { useAuth } from 'context/AuthContext'
import { ReactElement } from 'react'
import { classNames } from 'utils/dom-helpers'
import { isProdEnv } from 'utils/environment-helper'
import styles from '../../styles/Landing/section-features.module.scss'

export default function LandingFeaturesSection(
    props: Record<string, string>
) {
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

    const section_3_checklist: ReactElement[] = []
    props['section_3_checklist'] &&
        props['section_3_checklist']
            .split('\n')
            .forEach((i: string, idx) => {
                if (idx >= 0) {
                    section_3_checklist.push(
                        <li
                            key={idx}
                            className="flex center-items leading-8 gap-2 text-gray-400 mb-2"
                        >
                            <i className="feather leading-0 text-primary-light text-2xl feather-check-square mr-2" />
                            {i.split('\n')[0]}
                        </li>
                    )
                }
            })

    return (
        <section className="py-20 container max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
                <div className={classNames(styles.spriteExercising, '')}>
                    <div className="absolute bottom-0 right-3 p-4">
                        <div className="bg-white rounded-xl p-5 shadow-2xl w-44 h-50">
                            <div className="text-primary text-lg circular font-medium">
                                <Translation
                                    content_key="section_2_item_5"
                                    translations={props}
                                />
                            </div>
                            <p className="mt-2">
                                <Translation
                                    className="text-primary-light text-sm"
                                    content_key="section_2_item_6"
                                    render_as="span"
                                    translations={props}
                                />
                                <br />
                                <Translation
                                    className="text-xs text-gray-500"
                                    content_key="section_2_item_7"
                                    render_as="span"
                                    translations={props}
                                />
                            </p>
                            <p className="mt-2">
                                <Translation
                                    className="text-primary-light text-sm"
                                    content_key="section_2_item_8"
                                    render_as="span"
                                    translations={props}
                                />
                                <br />
                                <Translation
                                    className="text-xs text-gray-500"
                                    content_key="section_2_item_9"
                                    render_as="span"
                                    translations={props}
                                />
                            </p>
                            <p className="mt-2">
                                <Translation
                                    className="text-primary-light text-sm"
                                    content_key="section_2_item_10"
                                    render_as="span"
                                    translations={props}
                                />
                                <br />
                                <Translation
                                    className="text-xs text-gray-500"
                                    content_key="section_2_item_11"
                                    render_as="span"
                                    translations={props}
                                />
                            </p>
                        </div>
                        <div className="block absolute top-0 right-0 h-12 w-12 rounded-full flex items-center text-center bg-primary-light text-white">
                            <i className="feather-bell feather w-16 text-2xl" />
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-1">
                    <h1 className="mt-20 mb-10 lg:mb-5 text-5xl circular leading-none tracking-wide">
                        <Translation
                            className="text-primary-dark"
                            content_key="section_2_title"
                            render_as="span"
                            translations={props}
                        />
                    </h1>

                    <Translation
                        className="text-gray-400 leading-relaxed"
                        content_key="section_2_body"
                        render_as="p"
                        translations={props}
                    />

                    <div className="grid grid-cols-2 grid-rows-2 grid-flow-col gap-4 mt-5">
                        <div>
                            <i className="inline-block align-middle feather feather-calendar text-secondary mr-4 text-2xl" />
                            <Translation
                                className="inline-block align-middle"
                                content_key="section_2_item_1"
                                render_as="span"
                                translations={props}
                            />
                        </div>
                        <div>
                            <i className="inline-block align-middle feather feather-box text-secondary mr-4 text-2xl" />
                            <Translation
                                className="inline-block align-middle"
                                content_key="section_2_item_2"
                                render_as="span"
                                translations={props}
                            />
                        </div>
                        <div>
                            <i className="inline-block align-middle feather feather-user-plus text-secondary mr-4 text-2xl" />
                            <Translation
                                className="inline-block align-middle"
                                content_key="section_2_item_3"
                                render_as="span"
                                translations={props}
                            />
                        </div>
                        <div>
                            <i className="inline-block align-middle feather feather-message-square text-secondary mr-4 text-2xl" />
                            <Translation
                                className="inline-block align-middle"
                                content_key="section_2_item_4"
                                render_as="span"
                                translations={props}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-2">
                <div className="lg:col-span-1 lg:pl-32 relative">
                    <div
                        className={classNames(
                            styles.largeRoundedSquare,
                            'absolute -inset-x-64 top-4'
                        )}
                    />
                    <div
                        className={classNames(
                            styles.smallRoundedSquare,
                            'absolute rounded-2xl top-80 inset-x-0'
                        )}
                    />
                    <h1 className="mt-20 mb-10 lg:mb-5 text-5xl circular leading-none tracking-wide">
                        <Translation
                            className="text-primary-dark"
                            content_key="section_3_title"
                            render_as="span"
                            translations={props}
                        />
                        <Translation
                            className="text-gray-600 text-3xl block font-light"
                            content_key="section_3_subtitle"
                            render_as="span"
                            translations={props}
                        />
                    </h1>

                    <ul className="text-gray-500 leading-relaxed">
                        {section_3_checklist}
                    </ul>

                    <Translation
                        className="text-gray-400 leading-relaxed"
                        content_key="section_3_body"
                        render_as="p"
                        translations={props}
                    />
                </div>
                <div className={styles.spriteTools} />
            </div>

            <div className="grid md:grid-cols-2 gap-8 leaping-lady">
                <div className="p-12 relative">
                    <div className="absolute top-32 left-0 p-4 z-10">
                        <div className="bg-white rounded-xl p-4 shadow-2xl w-auto h-42">
                            <div className="bg-primary-lighter bg-opacity-50 rounded-full text-primary-light text-lg font-thin w-8 h-8 align-middle text-center">
                                <i className="feather feather-user align-middle text-center" />
                            </div>
                            <p className="mt-2">
                                <span className="text-primary-light text-3xl circular-light">
                                    <i className="feather feather-plus text-xl" />{' '}
                                    40
                                </span>
                                <br />
                                <Translation
                                    className="text-xs text-gray-400 font-medium tracking-widest"
                                    content_key="members"
                                    render_as="span"
                                    translations={props}
                                />
                            </p>
                        </div>
                    </div>
                    <div className="absolute bottom-24 right-0 p-4 z-10">
                        <div className="bg-white rounded-3xl p-4 shadow-2xl w-auto h-42">
                            <div className="grid sm:grid-cols-3 gap-4 mx-auto">
                                <div>
                                    <div className="bg-primary-light rounded shadow-2xl mt-12 h-8"></div>
                                    <p className="mt-5">Aug</p>
                                </div>
                                <div>
                                    <div className="bg-secondary rounded shadow-2xl mt-10 h-10"></div>
                                    <p className="mt-5">Sep</p>
                                </div>
                                <div>
                                    <div className="bg-primary-light rounded shadow-2xl mt-8 h-12"></div>
                                    <p className="mt-5">Oct</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.spriteLeapingLady}></div>
                </div>
                <div className="lg:col-span-1 relative">
                    <div
                        className={classNames(
                            styles.largeRoundedSquare,
                            'absolute -right-72 top-16'
                        )}
                    />
                    <div
                        className={classNames(
                            styles.smallRoundedSquare,
                            'absolute rounded-2xl -top-4 right-0'
                        )}
                    />
                    <h1 className="mt-20 mb-10 lg:mb-5 text-5xl circular leading-none tracking-wide">
                        <Translation
                            className="text-primary-dark"
                            content_key="section_4_title"
                            render_as="span"
                            translations={props}
                        />
                    </h1>

                    <Translation
                        className="text-gray-500 leading-relaxed"
                        content_key="section_4_body"
                        render_as="p"
                        translations={props}
                    />

                    <div className="sm:flex sm:justify-center lg:justify-start max-w-5xl mx-auto mt-5">
                        <div className="overflow-hidden ">
                            <button
                                className="shadow w-full flex items-center justify-center
                                px-6 py-4 text-base text-white font-bold
                                bg-secondary border rounded-full
                                transition duration-300 ease-in-out
                                hover:bg-opacity-80
                                md:text-xl md:px-10"
                                type="button"
                                onClick={() => handleSignupOnClick()}
                            >
                                <Translation
                                    content_key="section_4_cta_button"
                                    translations={props}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
