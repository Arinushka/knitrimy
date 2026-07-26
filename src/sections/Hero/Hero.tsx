import heroMain from '../../assets/hero/hero-main.png'
import styles from './Hero.module.css'

export function Hero() {
  return (
    <section id="home" className={styles.hero}>
      <div className={`container ${styles.layout}`}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>Ручная работа knit.rimy</p>
          <h1>Вязаные изделия, созданные с теплом</h1>
          <p className={styles.subtitle}>
            Уникальная одежда и аксессуары ручной работы, созданные специально для
            вас
          </p>
          <div className={styles.actions}>
            <a href="#portfolio" className="button-primary">
              Посмотреть работы
            </a>
            <a href="#contacts" className="button-secondary">
              Связаться со мной
            </a>
          </div>
        </div>

        <div className={styles.imageWrap}>
          {/* Здесь можно заменить heroMain на другую главную фотографию/логотип */}
          <img
            src={heroMain}
            alt="Логотип бренда knit.rimy"
            loading="eager"
            width={640}
            height={760}
            className={styles.image}
          />
        </div>
      </div>
    </section>
  )
}
