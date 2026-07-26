import { socialLinks } from './socialLinks'

export type ContactsConfig = {
  instagram: string
  tiktok: string
  telegram: string
  email: string
}

export const contactsConfig: ContactsConfig = {
  instagram: socialLinks.instagram,
  tiktok: socialLinks.tiktok,
  telegram: 'https://t.me/arinamousy',
  email: 'arrina.mykhova@yandex.ru',
}
