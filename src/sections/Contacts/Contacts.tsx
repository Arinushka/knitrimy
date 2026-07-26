import { contactsConfig } from '../../config/contacts'
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll'
import styles from './Contacts.module.css'

const contactItems = [
  { label: 'Instagram', value: contactsConfig.instagram },
  { label: 'TikTok', value: contactsConfig.tiktok },
  { label: 'Telegram', value: contactsConfig.telegram },
  { label: 'Электронная почта', value: contactsConfig.email },
]

type ContactItem = {
  label: string
  value?: string
}

function hasValue(item: ContactItem): item is { label: string; value: string } {
  return Boolean(item.value && item.value.trim())
}

function formatContactValue(value: string) {
  return value.replace(/^https?:\/\//, '').replace(/^mailto:/, '')
}

export function Contacts() {
  const { elementRef, isVisible } = useRevealOnScroll<HTMLElement>()

  return (
    <section
      id="contacts"
      ref={elementRef}
      className={`${styles.contacts} reveal ${isVisible ? 'visible' : ''}`}
      aria-labelledby="contacts-title"
    >
      <div className={`container ${styles.layout}`}>
        <div className={styles.info}>
          <h2 id="contacts-title" className="section-title">
            Давайте создадим что-то особенное
          </h2>
          <p className="section-subtitle">
            Напишите мне, чтобы обсудить идею, модель, размер, цвет и сроки
            изготовления.
          </p>

          <ul className={styles.list}>
            {contactItems
              .filter(hasValue)
              .map((item) => (
                <li key={item.label}>
                  <span>{item.label}</span>
                  <a
                    href={
                      item.label === 'Электронная почта'
                        ? `mailto:${item.value}`
                        : item.value
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    {formatContactValue(item.value)}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
