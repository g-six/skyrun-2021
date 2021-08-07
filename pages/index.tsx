import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
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
                <h1 className={styles.title}>
                    Welcome to <Link href="/">Always On Time</Link>
                </h1>

                <p className={styles.description}>
                    Edit this page
                    <code className={styles.code}>pages/index.tsx</code>
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
                        </p>
                    </a>

                    <a
                        href='https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
                        className={styles.card}
                    >
                        <h2>Deploy &rarr;</h2>
                        <p>
                            Instantly deploy your Next.js site to a
                            public URL with Vercel.
                        </p>
                    </a>
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
