import Head from 'next/head'
import { NextPage } from 'next'
import styles from '../styles/Index.module.scss'

interface Props {
    user_agent?: string
}

const Login: NextPage<Props> = ({ user_agent }) => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Skywalk Front-end | NextTs</title>
                <meta
                    name='description'
                    content='Skywalk Front-end | NextTs'
                />
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>Login</h1>

                <p className={styles.description}>
                    Your user agent
                    <code className={styles.code}>{ user_agent }</code>
                </p>

                <div className={styles.grid}>
                    <a
                        href='https://bitbucket.org/Greg_AOT/aot_backend'
                        className={styles.card}
                    >
                        <h2>Documentation &rarr;</h2>
                        <p>
                            Link to the AOT API <br/>Documentation
                        </p>
                    </a>

                    <a
                        href='https://nextjs.org/learn'
                        className={styles.card}
                    >
                        <h2>Learn NextJs &rarr;</h2>
                        <p>
                            Learn about the framework &ldquo;Next.js&rdquo;
                        </p>
                    </a>

                    <a
                        href='https://www.telerik.com/kendo-ui'
                        className={styles.card}
                    >
                        <h2>Learn KendoUI &rarr;</h2>
                        <p>
                            Discover KendoUI.<br />&nbsp;
                            <br />&nbsp;
                            <br />&nbsp;
                        </p>
                    </a>

                    <div
                        className={styles.card}
                    >
                        <h2>Demo App &rarr;</h2>
                        <p>
                            Check this out!<br />&nbsp;
                            <br />&nbsp;
                            <input name="TextToSynth" type="text" />
                        </p>
                    </div>
                </div>
            </main>

            <footer className={styles.footer}>
                <a
                    href='https://www.nerubia.com/'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    Powered by&nbsp;<strong>NERUBIA</strong>
                </a>
            </footer>
        </div>
    )
}

Login.getInitialProps = async ({ req }) => {
    const user_agent = req ? req.headers['user-agent'] : navigator.userAgent
    return { user_agent }
}

export default Login