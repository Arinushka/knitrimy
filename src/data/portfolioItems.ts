import work1 from '../assets/works/work-1-opt.jpg'
import work2 from '../assets/works/work-2-opt.jpg'
import work3 from '../assets/works/work-3-opt.jpg'
import work4 from '../assets/works/work-4-opt.jpg'
import work5 from '../assets/works/work-5-opt.jpg'
import work6 from '../assets/works/work-6-opt.jpg'
import work7 from '../assets/works/work-7-opt.jpg'
import work8 from '../assets/works/work-8-opt.jpg'
import work9 from '../assets/works/work-9-opt.jpg'
import work10 from '../assets/works/work-10-opt.jpg'

export type PortfolioItem = {
  id: number
  title: string
  description: string
  category: 'Свитеры' | 'Топы' | 'Кардиганы' | 'Аксессуары'
  image: string
  alt: string
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: 'Шапка и варежки "Теплая карамель"',
    description: 'Комплект крупной вязки в уютном горччичном цвете оттенках.',
    category: 'Аксессуары',
    image: work1,
    alt: 'Вязаная карамельная шапка с помпоном и варежками',
  },
  {
    id: 2,
    title: 'Свитер "Шоколадный мохер"',
    description: 'Объемный мягкий свитер ручной работы в глубоком коричневом тоне.',
    category: 'Свитеры',
    image: work2,
    alt: 'Девушка в коричневом вязаном свитере в зеркале',
  },
  {
    id: 3,
    title: 'Шапка "Зимний жемчуг"',
    description: 'Фактурная шапка с помпоном и объемными косами.',
    category: 'Аксессуары',
    image: work3,
    alt: 'Светлая вязаная шапка с узором и помпоном',
  },
  {
    id: 4,
    title: 'Двойной комплект шапок',
    description: 'Базовые шапки в теплых нейтральных оттенках для повседневного образа.',
    category: 'Аксессуары',
    image: work4,
    alt: 'Две вязаные шапки бежевого и серого цвета',
  },
  {
    id: 5,
    title: 'Шапки "Лиловый и графит"',
    description: 'Воздушные мохеровые шапки, связанные вручную.',
    category: 'Аксессуары',
    image: work5,
    alt: 'Две мягкие вязаные шапки лилового и серого цвета',
  },
  {
    id: 6,
    title: 'Косынки "Лаванда и корица"',
    description: 'Легкие вязаные косынки с ажурным рисунком.',
    category: 'Аксессуары',
    image: work6,
    alt: 'Две вязаные косынки на светлом текстиле',
  },
  {
    id: 7,
    title: 'Шапка "Серый твид"',
    description: 'Лаконичная шапка из теплой пряжи с мягкой посадкой.',
    category: 'Аксессуары',
    image: work7,
    alt: 'Серая вязаная шапка на пледе с гирляндой',
  },
  {
    id: 8,
    title: 'Шапка "Пудровый акцент"',
    description: 'Нежная шапка ручной работы в пудровом оттенке.',
    category: 'Аксессуары',
    image: work8,
    alt: 'Пудровая вязаная шапка в руке на темном фоне',
  },
  {
    id: 9,
    title: 'Свитер "Пастельный микс"',
    description: 'Яркий уютный свитер из мягкой пряжи с блоками пастельных цветов.',
    category: 'Свитеры',
    image: work9,
    alt: 'Разноцветный вязаный свитер в пастельных оттенках',
  },
  {
    id: 10,
    title: 'Свитер "Графитовая классика"',
    description: 'Базовый свободный свитер для спокойных и стильных образов.',
    category: 'Свитеры',
    image: work10,
    alt: 'Темно-серый вязаный свитер на тканевом фоне',
  },
]
