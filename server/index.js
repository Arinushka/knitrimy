import dotenv from 'dotenv'
import express from 'express'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '../.env') })

const app = express()
const port = Number(process.env.PORT ?? process.env.SERVER_PORT ?? 8787)

app.use(express.json())

function getMailEnvState() {
  const required = ['RESEND_API_KEY', 'MAIL_TO', 'MAIL_FROM']
  const missing = required.filter((key) => !process.env[key])
  return {
    configured: missing.length === 0,
    missing,
  }
}

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
  const state = getMailEnvState()
  res.json({
    ok: true,
    mailConfigured: state.configured,
    missing: state.missing,
    provider: 'resend',
    runtime: process.env.RENDER ? 'render' : 'local',
  })
})

app.post('/api/contact', async (req, res) => {
  try {
    const validationError = validateBody(req.body)
    if (validationError) {
      return res.status(400).json({ message: validationError })
    }

    const resendApiKey = process.env.RESEND_API_KEY
    const mailTo = process.env.MAIL_TO ?? 'arina.mykhova@yandex.ru'
    const mailFrom = process.env.MAIL_FROM ?? 'onboarding@resend.dev'

    if (!resendApiKey || !mailTo || !mailFrom) {
      const missing = [
        !resendApiKey ? 'RESEND_API_KEY' : null,
        !mailTo ? 'MAIL_TO' : null,
        !mailFrom ? 'MAIL_FROM' : null,
      ].filter(Boolean)

      return res.status(500).json({
        message: `Сервер почты не настроен. Отсутствуют: ${missing.join(', ')}`,
      })
    }

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

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: mailFrom,
        to: [mailTo],
        subject,
        text,
      }),
    })

    const rawBody = await resendResponse.text()
    let payload = {}
    if (rawBody) {
      try {
        payload = JSON.parse(rawBody)
      } catch {
        payload = { message: rawBody }
      }
    }

    if (!resendResponse.ok) {
      return res.status(502).json({
        message: 'Сервис отправки писем недоступен.',
        details: payload,
      })
    }

    return res.status(200).json({
      ok: true,
      provider: 'resend',
    })
  } catch (error) {
    console.error('Email send error:', error)
    const details =
      error && typeof error === 'object'
        ? [error.code, error.message].filter(Boolean).join(' | ')
        : ''

    return res.status(500).json({
      message: details
        ? `Не удалось отправить сообщение. Email API: ${details}`
        : 'Не удалось отправить сообщение. Проверьте настройки Email API.',
    })
  }
})

app.use((error, _req, res, _next) => {
  console.error('Unhandled server error:', error)
  res.status(500).json({
    message: 'Внутренняя ошибка сервера при обработке формы.',
  })
})

const distPath = path.resolve(__dirname, '../dist')
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath))
  app.get(/^(?!\/api).*/, (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'))
  })
}

app.listen(port, () => {
  const state = getMailEnvState()
  console.log(`App is running on http://localhost:${port}`)
  if (!state.configured) {
    console.warn(`Email API is not configured. Missing: ${state.missing.join(', ')}`)
  }
})
