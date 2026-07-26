import dotenv from 'dotenv'
import express from 'express'
import nodemailer from 'nodemailer'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '../.env') })

const app = express()
const port = Number(process.env.PORT ?? process.env.SERVER_PORT ?? 8787)

app.use(express.json())

function validateBody(body) {
  if (!body || typeof body !== 'object') {
    return 'Некорректные данные формы.'
  }

  const { name, contactMethod, message } = body

  if (!name || typeof name !== 'string' || !name.trim()) {
    return 'Укажите имя.'
  }
  if (!contactMethod || typeof contactMethod !== 'string' || !contactMethod.trim()) {
    return 'Укажите способ связи.'
  }
  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    return 'Сообщение должно содержать минимум 10 символов.'
  }

  return null
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.post('/api/contact', async (req, res) => {
  const validationError = validateBody(req.body)
  if (validationError) {
    return res.status(400).json({ message: validationError })
  }

  const smtpHost = process.env.SMTP_HOST
  const smtpPort = Number(process.env.SMTP_PORT ?? 465)
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS
  const smtpSecure = process.env.SMTP_SECURE !== 'false'
  const mailTo = process.env.MAIL_TO ?? 'arrina.mykhova@yandex.ru'
  const mailFrom = process.env.MAIL_FROM ?? smtpUser

  if (!smtpHost || !smtpUser || !smtpPass || !mailFrom) {
    const missing = [
      !smtpHost ? 'SMTP_HOST' : null,
      !smtpUser ? 'SMTP_USER' : null,
      !smtpPass ? 'SMTP_PASS' : null,
      !mailFrom ? 'MAIL_FROM' : null,
    ].filter(Boolean)

    return res.status(500).json({
      message: `Сервер почты не настроен. Отсутствуют: ${missing.join(', ')}`,
    })
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  })

  const { name, contactMethod, message } = req.body

  const subject = `Новая заявка с сайта knit.rimy от ${name.trim()}`
  const text = [
    'Новая заявка с сайта knit.rimy',
    '',
    `Имя: ${name.trim()}`,
    `Способ связи: ${contactMethod.trim()}`,
    '',
    'Сообщение:',
    message.trim(),
  ].join('\n')

  try {
    await transporter.sendMail({
      from: mailFrom,
      to: mailTo,
      replyTo: mailFrom,
      subject,
      text,
    })

    return res.status(200).json({ ok: true })
  } catch (error) {
    console.error('Email send error:', error)
    const details =
      error && typeof error === 'object'
        ? [error.code, error.responseCode, error.response]
            .filter(Boolean)
            .join(' | ')
        : ''

    return res.status(500).json({
      message: details
        ? `Не удалось отправить сообщение. SMTP: ${details}`
        : 'Не удалось отправить сообщение. Проверьте SMTP настройки.',
    })
  }
})

const distPath = path.resolve(__dirname, '../dist')
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath))
  app.get(/^(?!\/api).*/, (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'))
  })
}

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})
