# knit.rimy

Современный адаптивный сайт-визитка для мастера по вязанию ручной работы на `React + TypeScript + Vite`.

## Установка зависимостей

```bash
npm install
```

Создайте `.env` на основе `.env.example` и заполните данные Resend API.

## Запуск проекта

```bash
npm run dev
```

Откройте адрес из терминала (обычно `http://localhost:5173`).
Команда запускает одновременно фронтенд и сервер отправки формы.

## Настройка отправки формы на email (Resend)

Форма отправляет данные на серверный endpoint `POST /api/contact`, а сервер пересылает письмо через Resend API (HTTPS).

Минимальные переменные в `.env`:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxx
MAIL_TO=arina.mykhova@yandex.ru
MAIL_FROM=onboarding@resend.dev
```

- `MAIL_TO` — почта получателя заявок.
- `MAIL_FROM` — отправитель, должен быть разрешен в Resend.
- `RESEND_API_KEY` — API ключ из панели Resend.

## Деплой на Render

Проект подготовлен для деплоя в Render как единый Node-сервис (фронтенд + API формы).

1. Загрузите проект в GitHub.
2. В Render нажмите **New +** -> **Blueprint** и выберите репозиторий.
3. Render автоматически подхватит `render.yaml`.
4. Заполните переменные окружения в Render:
   - `RESEND_API_KEY`
   - `MAIL_TO`
   - `MAIL_FROM`
5. Запустите деплой.

Что происходит на проде:
- `npm run build` собирает фронтенд в `dist/`.
- `npm start` запускает `server/index.js`.
- Сервер раздает `dist` и обрабатывает `POST /api/contact`.

## Структура проекта

```text
src/
  assets/
    works/
      work-1.jpg ... work-6.jpg
  components/
    ContactForm/
    ImageModal/
    PortfolioCard/
  config/
    contacts.ts
    socialLinks.ts
  data/
    portfolioItems.ts
  hooks/
    useRevealOnScroll.ts
  sections/
    About/
    Contacts/
    Footer/
    Header/
    Hero/
    OrderSteps/
    Portfolio/
    SocialLinks/
  styles/
    global.css
  App.tsx
  main.tsx
```

## Куда добавлять фотографии

- **Фото для галереи:** заменяйте файлы в `src/assets/works/` (`work-1.jpg`, `work-2.jpg` и т.д.).
- **Главное фото первого экрана:** сейчас используется `work-1.jpg` в `src/sections/Hero/Hero.tsx`, можно заменить на любой локальный файл.
- **Open Graph изображение:** файл `public/og-cover.jpg`.

## Где менять ссылки на социальные сети

- Instagram и TikTok: `src/config/socialLinks.ts`.

## Где менять контактные данные

- Telegram, email и общие ссылки: `src/config/contacts.ts`.

## Как добавлять новые работы в галерею

1. Добавьте изображение в `src/assets/works/`.
2. Добавьте новый объект в массив `portfolioItems` в `src/data/portfolioItems.ts`.
3. Укажите поля:
   - `title`
   - `description`
   - `category`
   - `image`
   - `alt`

Компонент галереи обновится автоматически без изменения разметки.
