import { useState } from 'react'
import styles from './Header.module.css'

const navItems = [
  { label: 'Главная', href: '#home' },
  { label: 'Мои работы', href: '#portfolio' },
  { label: 'Обо мне', href: '#about' },
  { label: 'Контакты', href: '#contacts' },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const closeMenu = () => setIsOpen(false)

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a href="#home" className={styles.logo} aria-label="knit.rimy — перейти на главную">
          <span className={styles.logoMark} aria-hidden="true">
            <span />
          </span>
          <span>knit.rimy</span>
        </a>

        <button
          type="button"
          className={styles.burger}
          aria-label="Открыть меню"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={styles.desktopNav} aria-label="Основная навигация">
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <a href="#contacts" className={`button-primary ${styles.contactButton}`}>
          Связаться со мной
        </a>
      </div>

      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${isOpen ? styles.open : ''}`}
        aria-hidden={!isOpen}
      >
        <nav aria-label="Мобильная навигация">
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={closeMenu}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a href="#contacts" className="button-primary" onClick={closeMenu}>
          Связаться со мной
        </a>
      </div>
    </header>
  )
}
