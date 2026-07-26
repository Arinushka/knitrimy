import { socialLinks } from '../../config/socialLinks'
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll'
import styles from './SocialLinks.module.css'

export function SocialLinks() {
  const { elementRef, isVisible } = useRevealOnScroll<HTMLElement>()

  return (
    <section
      ref={elementRef}
      className={`${styles.social} reveal ${isVisible ? 'visible' : ''}`}
      aria-labelledby="social-title"
    >
      <div className="container">
        <h2 id="social-title" className="section-title">
          Больше моих работ в социальных сетях
        </h2>
        <div className={styles.actions}>
          <a
            className={styles.socialButton}
            href={socialLinks.instagram}
            target="_blank"
            rel="noreferrer"
          >
            <span aria-hidden="true">◉</span>
            Instagram
          </a>
          <a
            className={styles.socialButton}
            href={socialLinks.tiktok}
            target="_blank"
            rel="noreferrer"
          >
            <span aria-hidden="true">♫</span>
            TikTok
          </a>
        </div>
      </div>
    </section>
  )
}
