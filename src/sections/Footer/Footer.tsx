import { socialLinks } from '../../config/socialLinks'
import styles from './Footer.module.css'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.layout}`}>
        <div>
          <p className={styles.brand}>knit.rimy</p>
          <p>Вязаные изделия ручной работы</p>
        </div>

        <div className={styles.meta}>
          <p>{currentYear}</p>
          <div className={styles.links}>
            <a href={socialLinks.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href={socialLinks.tiktok} target="_blank" rel="noreferrer">
              TikTok
            </a>
            <a href="#home">Наверх</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
