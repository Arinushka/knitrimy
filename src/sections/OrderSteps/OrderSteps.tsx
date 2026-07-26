import { useRevealOnScroll } from '../../hooks/useRevealOnScroll'
import styles from './OrderSteps.module.css'

const steps = [
  'Вы связываетесь со мной.',
  'Мы обсуждаем модель, размер, цвет и материалы.',
  'Я создаю изделие и показываю процесс.',
  'Вы получаете готовую вещь.',
]

export function OrderSteps() {
  const { elementRef, isVisible } = useRevealOnScroll<HTMLElement>()

  return (
    <section
      ref={elementRef}
      className={`${styles.stepsSection} reveal ${isVisible ? 'visible' : ''}`}
      aria-labelledby="order-steps-title"
    >
      <div className="container">
        <h2 id="order-steps-title" className="section-title">
          Как сделать заказ
        </h2>
        <div className={styles.grid}>
          {steps.map((step, index) => (
            <article key={step} className={styles.card}>
              <p className={styles.number}>{String(index + 1).padStart(2, '0')}</p>
              <p className={styles.text}>{step}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
