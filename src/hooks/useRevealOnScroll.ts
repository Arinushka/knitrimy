import { useEffect, useRef, useState } from 'react'

export function useRevealOnScroll<T extends HTMLElement>() {
  const elementRef = useRef<T | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) {
      return
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reducedMotion.matches) {
      setIsVisible(true)
      return
    }

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2, rootMargin: '0px 0px -40px 0px' },
    )

    observer.observe(element)
    const fallbackTimer = window.setTimeout(() => {
      setIsVisible(true)
    }, 1200)

    return () => {
      window.clearTimeout(fallbackTimer)
      observer.disconnect()
    }
  }, [])

  return { elementRef, isVisible }
}
