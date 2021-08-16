import styles from '../../styles/Footer.module.scss'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <a
                href="https://www.nerubia.com"
                target="_blank"
                rel="noopener noreferrer"
            >
                Powered by Nerubia
            </a>
        </footer>
    )
}
