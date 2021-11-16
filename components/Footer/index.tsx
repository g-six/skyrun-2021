import Translation from 'components/Translation'
import styles from '../../styles/Footer.module.scss'

export default function Footer(props: Record<string, string>) {
    return (
        <footer className="container mx-auto lg:pt-20 pb-8 lg:pb-12 lg:px-0 px-6 pt-6">
            <div className="flex flex-col divide-y gap-12">
                <div className="grid lg:grid-cols-4 gap-6 lg:gap-2">
                    <div className="lg:col-span-1">
                        <div className={styles.logo} />
                    </div>
                    <div className="lg:col-span-1">
                        <Translation
                            className="text-primary-dark circular font-bold"
                            content_key="footer_contact_title"
                            render_as="div"
                            translations={props}
                        />
                        <ul className="mt-2">
                            <li>
                                <Translation
                                    content_key="phone_number"
                                    href="tel:0063322312705"
                                    render_as="a"
                                    translations={props}
                                />
                            </li>
                        </ul>
                    </div>
                    <div className="lg:col-span-1">
                        <Translation
                            className="text-primary-dark circular font-bold"
                            content_key="footer_address_title"
                            render_as="div"
                            translations={props}
                        />
                        <ul className="mt-2">
                            <Translation
                                content_key="footer_address"
                                render_as="li"
                                translations={props}
                            />
                            <li>
                                <Translation
                                    content_key="phone_number"
                                    href="tel:0063322312705"
                                    render_as="a"
                                    translations={props}
                                />
                            </li>
                        </ul>
                    </div>
                    <div className="lg:col-span-1 text-primary-dark">
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
                <div className="lg:grid lg:grid-cols-3 gap-4 py-8 text-gray-400">
                    <span className="col-span-2">
                        <Translation
                            content_key="footer_copyright_1"
                            translations={props}
                        />{' '}
                        <strong><Translation
                            content_key="footer_copyright_2"
                            translations={props}
                        /></strong>{' '}
                        <Translation
                            content_key="footer_copyright_3"
                            translations={props}
                        />
                    </span>
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
