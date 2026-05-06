import { useEffect } from 'react'

const useRevealAnimation = () => {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('is-visible', entry.isIntersecting)
        })
      },
      { threshold: 0.2, rootMargin: '0px 0px -12% 0px' },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])
}

export default useRevealAnimation
