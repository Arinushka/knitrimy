import { useState } from 'react'
import { ImageModal } from '../../components/ImageModal/ImageModal'
import { PortfolioCard } from '../../components/PortfolioCard/PortfolioCard'
import { portfolioItems, type PortfolioItem } from '../../data/portfolioItems'
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll'
import styles from './Portfolio.module.css'

export function Portfolio() {
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null)
  const { elementRef, isVisible } = useRevealOnScroll<HTMLElement>()

  return (
    <section
      id="portfolio"
      ref={elementRef}
      className={`${styles.portfolio} reveal ${isVisible ? 'visible' : ''}`}
    >
      <div className="container">
        <h2 className="section-title">Мои работы</h2>
        <p className="section-subtitle">
          Каждое изделие создается вручную и может быть адаптировано под ваши
          предпочтения.
        </p>

        <div className={styles.grid}>
          {portfolioItems.map((item) => (
            <PortfolioCard key={item.id} item={item} onOpen={setActiveItem} />
          ))}
        </div>
      </div>

      <ImageModal
        isOpen={Boolean(activeItem)}
        imageSrc={activeItem?.image ?? ''}
        imageAlt={activeItem?.alt ?? ''}
        title={activeItem?.title ?? ''}
        onClose={() => setActiveItem(null)}
      />
    </section>
  )
}
