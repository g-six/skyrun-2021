import { useEffect } from 'react'
import styles from '../../styles/Landing/hero.module.scss'
export interface Props {
    title_left: string
    title_right: string
    subtitle: string
    button_label: string
}
export default function LandingHero({
    title_left,
    title_right,
    subtitle,
    button_label,
}: Props) {
    return (
        <div className="bg-hero-pattern">
            <div className={styles.gradHero}>
                <main className="py-60 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-0 lg:px-8 text-white">
                    <div className="sm:text-center lg:text-left">
                        <h1 className="text-4xl tracking-tight font-extralight sm:text-5xl md:text-6xl">
                            <span className="block xl:inline">
                                {title_left}
                            </span>
                            <span className="block xl:inline font-extrabold">
                                {title_right}
                            </span>
                        </h1>
                        <p className="mt-3 text-base sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                            {subtitle}
                        </p>
                        <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                            <div className="overflow-hidden ">
                                <a
                                    href="#"
                                    className="
                                shadow w-full flex items-center justify-center 
                                px-6 py-4 text-base text-black 
                                bg-white border rounded-full
                                transition duration-300 ease-in-out
                                hover:bg-transparent hover:border-solid hover:border-white 
                                hover:text-white
                                md:py-2 md:text-sm md:px-10"
                                >
                                    {button_label}
                                </a>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
