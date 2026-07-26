import aboutPhoto from '../../assets/about/about-me.png'
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll'
import styles from './About.module.css'

const perks = [
  'ручная работа',
  'индивидуальный подход',
  'качественные материалы',
  'возможность заказа изделия по индивидуальным меркам',
]

export function About() {
  const { elementRef, isVisible } = useRevealOnScroll<HTMLElement>()

  return (
    <section
      id="about"
      ref={elementRef}
      className={`${styles.about} reveal ${isVisible ? 'visible' : ''}`}
    >
      <div className={`container ${styles.layout}`}>
        <div className={styles.photoWrap}>
          <img
            src={aboutPhoto}
            alt="Мастер knit.rimy"
            loading="lazy"
            width={560}
            height={680}
            className={styles.photo}
          />
        </div>

        <div className={styles.content}>
          <h2 className="section-title">Обо мне</h2>
          <p>
            Привет! Я создаю вязаные изделия ручной работы. Для меня вязание —
            это возможность создавать уникальные, красивые и комфортные вещи,
            которые подчеркивают индивидуальность человека. Каждое изделие я
            создаю с вниманием к деталям и любовью к своему делу.
          </p>

          <ul className={styles.perks}>
            {perks.map((perk) => (
              <li key={perk}>{perk}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
