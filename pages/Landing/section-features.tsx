import { ReactElement } from 'react'
import { classNames } from 'utils/dom-helpers'
import styles from '../../styles/Landing/section-features.module.scss'
import { SectionProps } from '../../types/landing'

export default function LandingFeaturesSection(props: SectionProps) {
    const section_3_checklist: ReactElement[] = []
    props.section_3_checklist.split('<li>').forEach((i: string, idx) => {
        if (idx > 0) {
            section_3_checklist.push(
                <li
                    key={idx}
                    className="flex center-items leading-8 gap-2 text-gray-400 mb-2"
                >
                    <i className="feather leading-0 text-primary-light text-2xl feather-check-square mr-2" />
                    {i.split('</li')[0]}
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
                                {props.section_2_item_5}
                            </div>
                            <p className="mt-2">
                                <span className="text-primary-light text-sm">
                                    {props.section_2_item_6}
                                </span>
                                <br />
                                <span className="text-xs text-gray-500">
                                    {props.section_2_item_7}
                                </span>
                            </p>
                            <p className="mt-2">
                                <span className="text-primary-light text-sm">
                                    {props.section_2_item_8}
                                </span>
                                <br />
                                <span className="text-xs text-gray-500">
                                    {props.section_2_item_9}
                                </span>
                            </p>
                            <p className="mt-2">
                                <span className="text-primary-light text-sm">
                                    {props.section_2_item_10}
                                </span>
                                <br />
                                <span className="text-xs text-gray-500">
                                    {props.section_2_item_11}
                                </span>
                            </p>
                        </div>
                        <div className="block absolute top-0 right-0 h-12 w-12 rounded-full flex items-center text-center bg-primary-light text-white">
                            <i className="feather-bell feather w-16 text-2xl" />
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-1">
                    <h1 className="mt-20 mb-10 lg:mb-5 text-5xl circular leading-none tracking-wide">
                        <span className="text-primary-dark">
                            {props.section_2_title}
                        </span>
                    </h1>

                    <p className="text-gray-400 leading-relaxed">
                        {props.section_2_body}
                    </p>

                    <div className="grid grid-cols-2 grid-rows-2 grid-flow-col gap-4 mt-5">
                        <div>
                            <i className="inline-block align-middle feather feather-calendar text-secondary mr-4 text-2xl" />
                            <span className="inline-block align-middle">
                                {props.section_2_item_1}
                            </span>
                        </div>
                        <div>
                            <i className="inline-block align-middle feather feather-box text-secondary mr-4 text-2xl" />
                            <span className="inline-block align-middle">
                                {props.section_2_item_2}
                            </span>
                        </div>
                        <div>
                            <i className="inline-block align-middle feather feather-user-plus text-secondary mr-4 text-2xl" />
                            <span className="inline-block align-middle">
                                {props.section_2_item_3}
                            </span>
                        </div>
                        <div>
                            <i className="inline-block align-middle feather feather-message-square text-secondary mr-4 text-2xl" />
                            <span className="inline-block align-middle">
                                {props.section_2_item_4}
                            </span>
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
                        <span className="text-primary-dark">
                            {props.section_3_title}{' '}
                        </span>
                        <span className="text-gray-600 text-3xl block font-light">
                            {props.section_3_subtitle}
                        </span>
                    </h1>

                    <ul className="text-gray-500 leading-relaxed">
                        {section_3_checklist}
                    </ul>
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
                                <span className="text-xs text-gray-400 font-medium tracking-widest">
                                    MEMBERS
                                </span>
                            </p>
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
                        <span className="text-primary-dark">
                            {props.section_4_title}
                        </span>
                    </h1>

                    <p className="text-gray-500 leading-relaxed">
                        {props.section_4_body}
                    </p>
                </div>
            </div>
        </section>
    )
}
