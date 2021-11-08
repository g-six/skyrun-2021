import { SectionProps } from 'types/landing'
import styles from '../../styles/Footer.module.scss'

export default function Footer(props: SectionProps) {
    return (
        <footer className="container mx-auto pt-20 pb-8 lg:pb-12">
            <div className="flex flex-col divide-y gap-12">
                <div className="grid grid-cols-4 gap-2">
                    <div className="col-span-1">
                        <div className={styles.logo} />
                    </div>
                    <div className="col-span-1">
                        <div className="text-primary-dark circular font-bold">
                            {props.footer_contact_title}
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
                            {props.footer_address_title}
                        </div>
                        <ul className="mt-2">
                            <li>{props.footer_address}</li>
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
                        <div className="circular font-bold">
                            {props.footer_follow_us}
                        </div>

                        <div className="flex gap-3 mt-3">
                            <a
                                href="https://twitter.com/aotplus"
                                className="w-8 h-8 flex items-center justify-center text-center bg-primary-lighter rounded-full"
                            >
                                <i className="k-icon k-i-twitter" />
                            </a>

                            <a
                                href="https://www.facebook.com/aotplus.software"
                                className="w-8 h-8 flex items-center justify-center text-center bg-primary-lighter rounded-full"
                            >
                                <i className="k-icon k-i-facebook " />
                            </a>

                            <a
                                href="https://www.instagram.com/aotplus.software/"
                                className="flex items-center justify-center w-8 h-8 text-center inline-block bg-primary-lighter rounded-full"
                            >
                                <i className="feather-instagram font-bold" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4 py-8 text-gray-400">
                    <span className="col-span-2">
                        {props.footer_copyright_1}{' '}
                        <strong>{props.footer_copyright_2}</strong>{' '}
                        {props.footer_copyright_3}
                    </span>
                    <span className="col-span-1 text-right">
                        {props.footer_privacy_policy}
                    </span>
                </div>
            </div>
        </footer>
    )
}
