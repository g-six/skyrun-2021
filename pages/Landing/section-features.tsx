import { ReactElement } from 'react'
import { classNames } from 'utils/dom-helpers'
import styles from '../../styles/Landing/section-features.module.scss'

export type SectionProps = {
    [key: string]: string
}

export default function LandingFeaturesSection(props: SectionProps) {
    const section_2_checklist: ReactElement[] = []
    props.section_2_checklist.split('<li>').forEach((i: string, idx) => {
        if (idx > 0) {
            section_2_checklist.push(
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
                                Aerobics
                            </div>
                            <p className="mt-2">
                                <span className="text-primary-light text-sm">
                                    Date:
                                </span>
                                <br />
                                <span className="text-xs text-gray-500">
                                    {props.date_of_exercise}
                                </span>
                            </p>
                            <p className="mt-2">
                                <span className="text-primary-light text-sm">
                                    Location:
                                </span>
                                <br />
                                <span className="text-xs text-gray-500">
                                    {props.location_name}
                                </span>
                            </p>
                            <p className="mt-2">
                                <span className="text-primary-light text-sm">
                                    Instructor:
                                </span>
                                <br />
                                <span className="text-xs text-gray-500">
                                    {props.instructor_name}
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
                            {props.left_title}
                        </span>
                        <span className="text-primary-dark">
                            {props.right_title}
                        </span>
                    </h1>

                    <p className="text-gray-400 leading-relaxed">
                        Anim aute id magna aliqua ad ad non deserunt sunt.{' '}
                        <br />
                        Qui irure qui lorem cupidatat commodo. <br />
                        Elit sunt amet fugiat veniam occaecat fugiat aliqua.
                    </p>

                    <div className="grid grid-cols-2 grid-rows-2 grid-flow-col gap-4 mt-5">
                        <div>
                            <i className="inline-block align-middle feather feather-calendar text-secondary mr-4 text-2xl" />
                            <span className="inline-block align-middle">
                                Appointment Scheduling
                            </span>
                        </div>
                        <div>
                            <i className="inline-block align-middle feather feather-box text-secondary mr-4 text-2xl" />
                            <span className="inline-block align-middle">
                                Packages &amp; Membership
                            </span>
                        </div>
                        <div>
                            <i className="inline-block align-middle feather feather-user-plus text-secondary mr-4 text-2xl" />
                            <span className="inline-block align-middle">
                                Group Booking
                            </span>
                        </div>
                        <div>
                            <i className="inline-block align-middle feather feather-message-square text-secondary mr-4 text-2xl" />
                            <span className="inline-block align-middle">
                                Multi-lingual
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
                            {props.mid_left_title}{' '}
                        </span>
                        <span className="text-gray-600 text-3xl block font-light">
                            {props.mid_right_title}
                        </span>
                    </h1>

                    <ul className="text-gray-500 leading-relaxed">
                        {section_2_checklist}
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
                            {props.section_3_title}
                        </span>
                    </h1>

                    <p className="text-gray-500 leading-relaxed">
                        {props.section_3_body}
                    </p>
                </div>
            </div>
        </section>
    )
}
