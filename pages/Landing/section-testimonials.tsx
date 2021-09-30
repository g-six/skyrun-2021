import { classNames } from 'utils/dom-helpers'
import styles from '../../styles/Landing/section-testimonials.module.scss'

export default function LandingSectionTestimonials() {
    return (
        <section
            className={classNames(styles.sectionManResting, 'testimonials')}
        >
            <div className="absolute block rounded-full bg-primary-lighter h-80 w-80 -top-32 -left-24" />
            <div className={styles.largeCircle} />

            <div className="container m-auto">
                <h3 className="text-white drop-shadow text-5xl circular font-thin mb-8 mt-36">
                    What our members
                    <br />
                    have to say
                </h3>
                <div className="grid relative lg:grid-cols-2 gap-8 lg:px-40 z-0">
                    <figure className="rounded-3xl bg-white h-32 w-full pt-12 px-8 shadow-2xl">
                        <blockquote className="text-justify leading-relaxed text-gray-400">
                            Always on time just seemed so user-friendly for
                            clients and staff. Everything from managing the
                            waitlist and doing the late cancels to inputting the
                            schedule is very straightforward. A new staff member
                            could get on to AOT and do whatever they needed to
                            do without much training.
                            <figcaption className="flex mt-8">
                                <div className="w-12 h-12 rounded-full bg-primary" />
                                <div className="w-auto pl-3">
                                    <div className="circular text-primary-dark leading-tight">
                                        Arnold Chen
                                    </div>
                                    <div className="text-gray-400 text-sm mt-1">
                                        Dance Studio Owner
                                    </div>
                                </div>
                            </figcaption>
                        </blockquote>
                    </figure>
                    <figure className="rounded-3xl bg-white h-32 w-full pt-12 px-8 shadow-2xl">
                        <blockquote className="text-justify leading-relaxed text-gray-400">
                            Always on time just seemed so user-friendly for
                            clients and staff. Everything from managing the
                            waitlist and doing the late cancels to inputting the
                            schedule is very straightforward. A new staff member
                            could get on to AOT and do whatever they needed to
                            do without much training.
                            <figcaption className="flex mt-8">
                                <div className="w-12 h-12 rounded-full bg-pink-500" />
                                <div className="w-auto pl-3">
                                    <div className="circular text-primary-dark leading-tight">
                                        Trish
                                    </div>
                                    <div className="text-gray-400 text-sm mt-1">
                                        Yoga Studio Owner
                                    </div>
                                </div>
                            </figcaption>
                        </blockquote>
                    </figure>
                </div>
            </div>
        </section>
    )
}
