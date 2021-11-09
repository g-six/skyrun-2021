import Translation from 'components/Translation'
import styles from '../../styles/Footer.module.scss'

export default function Footer(props: Record<string, string>) {
    return (
        <footer className="container mx-auto pt-20 pb-8 lg:pb-12">
            <div className="flex flex-col divide-y gap-12">
                <div className="grid grid-cols-4 gap-2">
                    <div className="col-span-1">
                        <div className={styles.logo} />
                    </div>
                    <div className="col-span-1">
                        <Translation
                            className="text-primary-dark circular font-bold"
                            content_key="footer_contact_title"
                            render_as="div"
                            translations={props}
                        />
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
                        <Translation
                            className="text-primary-dark circular font-bold"
                            content_key="footer_address_title"
                            render_as="div"
                            translations={props}
                        />
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
                        <Translation
                            className="circular font-bold"
                            content_key="footer_follow_us"
                            render_as="div"
                            translations={props}
                        />

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
                    <Translation
                        className="col-span-2"
                        content_key="footer_copyright"
                        render_as="span"
                        translations={props}
                    />
                    <Translation
                        className="col-span-1 text-right"
                        content_key="footer_privacy_policy"
                        render_as="span"
                        translations={props}
                    />
                </div>
            </div>
        </footer>
    )
}
