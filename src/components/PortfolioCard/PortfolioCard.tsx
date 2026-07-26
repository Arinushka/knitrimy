import type { PortfolioItem } from '../../data/portfolioItems'
import styles from './PortfolioCard.module.css'

type PortfolioCardProps = {
  item: PortfolioItem
  onOpen: (item: PortfolioItem) => void
}

export function PortfolioCard({ item, onOpen }: PortfolioCardProps) {
  return (
    <article className={styles.card}>
      <button
        type="button"
        className={styles.imageButton}
        onClick={() => onOpen(item)}
        aria-label={`Открыть работу: ${item.title}`}
      >
        <img
          src={item.image}
          alt={item.alt}
          loading="lazy"
          className={styles.image}
          width={420}
          height={520}
        />
        <span className={styles.overlay}>
          <span className={styles.overlayText}>Открыть фото</span>
        </span>
      </button>
      <div className={styles.content}>
        <p className={styles.category}>{item.category}</p>
        <h3 className={styles.title}>{item.title}</h3>
        <p>{item.description}</p>
      </div>
    </article>
  )
}
