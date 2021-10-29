import { classNames } from 'utils/dom-helpers'
import styles from '../../styles/Landing/section-testimonials.module.scss'
import { SectionProps } from '../../types/landing'

export default function LandingSectionTestimonials(props: SectionProps) {
    return (
        <section
            className={classNames(styles.sectionManResting, 'testimonials')}
        >
            <div className="absolute block rounded-full bg-primary-lighter h-80 w-80 -top-32 -left-24" />
            <div className={styles.largeCircle} />

            <div className="container m-auto">
                <h3 className="text-white drop-shadow text-5xl circular font-thin mb-8 mt-36">
                    {props.section_5_title_1}
                    <br />
                    {props.section_5_title_2}
                </h3>
                <div className="grid relative lg:grid-cols-2 gap-8 lg:px-40 z-0">
                    <figure className="rounded-3xl bg-white min-h-32 w-full pt-12 px-8 shadow-2xl">
                        <blockquote className="text-justify leading-relaxed text-gray-400">
                            {props.section_5_item_1}
                            <figcaption className="flex mt-8">
                                <div className="w-12 h-12 rounded-full bg-primary" />
                                <div className="w-auto pl-3">
                                    <div className="circular text-primary-dark leading-tight">
                                        {props.section_5_item_2}
                                    </div>
                                    <div className="text-gray-400 text-sm mt-1">
                                        {props.section_5_item_3}
                                    </div>
                                </div>
                            </figcaption>
                        </blockquote>
                    </figure>
                    <figure className="rounded-3xl bg-white min-h-32 w-full pt-12 px-8 shadow-2xl">
                        <blockquote className="text-justify leading-relaxed text-gray-400">
                            {props.section_5_item_4}
                            <figcaption className="flex mt-8">
                                <div className="w-12 h-12 rounded-full bg-pink-500" />
                                <div className="w-auto pl-3">
                                    <div className="circular text-primary-dark leading-tight">
                                        {props.section_5_item_5}
                                    </div>
                                    <div className="text-gray-400 text-sm mt-1">
                                        {props.section_5_item_6}
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
