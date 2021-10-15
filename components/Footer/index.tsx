import styles from '../../styles/Footer.module.scss'

export default function Footer() {
    return (
        <footer className="container mx-auto pb-8 lg:pb-12">
            <div className="flex flex-col divide-y gap-12">
                <div className="grid grid-cols-4 gap-2">
                    <div className="col-span-1">
                        <div className={styles.logo} />
                    </div>
                    <div className="col-span-1">
                        <div className="text-primary-dark circular font-bold">
                            Get in touch with us
                        </div>
                        <ul className="mt-2">
                            <li>
                                <a href="mailto:support@aot.plus">
                                    support@aot.plus
                                </a>
                            </li>
                            <li>
                                <a href="tel:0063322312705">
                                    +63 32 233 2233
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-span-1">
                        <div className="text-primary-dark circular font-bold">
                            Office address
                        </div>
                        <ul className="mt-2">
                            <li>
                                <a href="mailto:support@aot.plus">
                                    support@aot.plus
                                </a>
                            </li>
                            <li>
                                <a href="tel:0063322312705">
                                    +63 32 233 2233
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-span-1 text-primary-dark">
                        <div className="circular font-bold">Follow us</div>

                        <div className="flex gap-3 mt-3">
                            <a
                                href="https://linkedin.com/aot-plus"
                                className="w-8 h-8 text-center leading-loose inline-block bg-primary-lighter rounded-full"
                            >
                                <i className="k-icon k-i-linkedin" />
                            </a>

                            <a
                                href="https://linkedin.com/aot-plus"
                                className="w-8 h-8 text-center leading-loose inline-block bg-primary-lighter rounded-full"
                            >
                                <i className="k-icon k-i-facebook " />
                            </a>

                            <a
                                href="https://linkedin.com/aot-plus"
                                className="w-8 h-8 text-center leading-loose inline-block bg-primary-lighter rounded-full"
                            >
                                <i className="k-icon k-i-twitter " />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4 py-8 text-primary-light">
                    <span className="col-span-2">
                        Copyright © 2021 <strong>Always On Time</strong>.
                        All Rights Reserved.
                    </span>
                    <span className="col-span-1 text-right">
                        Privacy Policy
                    </span>
                </div>
            </div>
        </footer>
    )
}
