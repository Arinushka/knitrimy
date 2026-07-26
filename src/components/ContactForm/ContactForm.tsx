import { useState } from 'react'
import type { FormEvent } from 'react'
import styles from './ContactForm.module.css'

type FormState = {
  name: string
  contactMethod: string
  message: string
}

type Errors = Partial<Record<keyof FormState, string>>

const initialState: FormState = {
  name: '',
  contactMethod: '',
  message: '',
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState)
  const [errors, setErrors] = useState<Errors>({})
  const [successMessage, setSuccessMessage] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validate = (values: FormState) => {
    const nextErrors: Errors = {}

    if (!values.name.trim()) {
      nextErrors.name = 'Пожалуйста, укажите ваше имя.'
    }
    if (!values.contactMethod.trim()) {
      nextErrors.contactMethod = 'Укажите удобный способ связи.'
    }
    if (!values.message.trim()) {
      nextErrors.message = 'Введите сообщение.'
    } else if (values.message.trim().length < 10) {
      nextErrors.message = 'Сообщение должно содержать минимум 10 символов.'
    }

    return nextErrors
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)
    setSuccessMessage('')
    setSubmitError('')

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    try {
      setIsSubmitting(true)

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      const payload = (await response.json()) as { message?: string }

      if (!response.ok) {
        throw new Error(payload.message ?? 'Не удалось отправить сообщение.')
      }

      setSuccessMessage('Сообщение отправлено. Я свяжусь с вами в ближайшее время.')
      setForm(initialState)
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Произошла ошибка при отправке. Попробуйте позже.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.group}>
        <label htmlFor="name">Имя</label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={form.name}
          onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name ? (
          <p id="name-error" className={styles.error} role="alert">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div className={styles.group}>
        <label htmlFor="contactMethod">Способ связи</label>
        <input
          id="contactMethod"
          name="contactMethod"
          type="text"
          placeholder="Instagram, Telegram, WhatsApp..."
          value={form.contactMethod}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, contactMethod: event.target.value }))
          }
          aria-invalid={Boolean(errors.contactMethod)}
          aria-describedby={errors.contactMethod ? 'contact-error' : undefined}
        />
        {errors.contactMethod ? (
          <p id="contact-error" className={styles.error} role="alert">
            {errors.contactMethod}
          </p>
        ) : null}
      </div>

      <div className={styles.group}>
        <label htmlFor="message">Сообщение</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={form.message}
          onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message ? (
          <p id="message-error" className={styles.error} role="alert">
            {errors.message}
          </p>
        ) : null}
      </div>

      <button type="submit" className="button-primary" disabled={isSubmitting}>
        {isSubmitting ? 'Отправка...' : 'Отправить'}
      </button>

      {successMessage ? (
        <p className={styles.success} role="status">
          {successMessage}
        </p>
      ) : null}

      {submitError ? (
        <p className={styles.error} role="alert">
          {submitError}
        </p>
      ) : null}
    </form>
  )
}
