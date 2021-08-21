import type { AppProps } from 'next/app'
import '../styles/globals.scss'
import Footer from '../components/Footer'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Component {...pageProps} />
            <Footer />
        </>
    )
}
export default MyApp
