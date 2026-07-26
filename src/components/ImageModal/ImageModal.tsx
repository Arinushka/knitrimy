import { useEffect, useRef } from 'react'
import styles from './ImageModal.module.css'

type ImageModalProps = {
  isOpen: boolean
  imageSrc: string
  imageAlt: string
  title: string
  onClose: () => void
}

export function ImageModal({
  isOpen,
  imageSrc,
  imageAlt,
  title,
  onClose,
}: ImageModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEsc)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleEsc)
    }
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  return (
    <div
      className={styles.backdrop}
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-label={`Увеличенное изображение: ${title}`}
      >
        <button
          ref={closeButtonRef}
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Закрыть окно"
        >
          ×
        </button>
        <img src={imageSrc} alt={imageAlt} className={styles.image} />
        <p className={styles.caption}>{title}</p>
      </div>
    </div>
  )
}
