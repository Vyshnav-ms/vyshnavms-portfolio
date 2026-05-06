import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useState } from 'react'

const navItems = ['about', 'skills', 'experience', 'education', 'projects', 'contact']

const TopNav = () => {
  const [active, setActive] = useState('hero')
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', () => {
    const current = ['hero', ...navItems].findLast((id) => {
      const element = document.getElementById(id)
      return element ? element.getBoundingClientRect().top <= 120 : false
    })
    if (current) setActive(current)
  })

  return (
    <motion.header
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-4 z-40 px-4"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/10 bg-[#080a0f]/70 px-3 py-2 shadow-2xl shadow-black/30 backdrop-blur-2xl md:px-4">
        <a href="#hero" className="group flex items-center gap-3 rounded-full px-2 py-1">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-sm font-black text-black transition group-hover:scale-105">
            VM
          </span>
          <span className="hidden text-sm font-medium text-white/85 sm:block">Vyshnav M S</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="relative rounded-full px-4 py-2 text-sm capitalize text-white/64 transition hover:text-white"
            >
              {active === item ? (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute inset-0 rounded-full bg-white/10"
                  transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                />
              ) : null}
              <span className="relative">{item}</span>
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="group relative overflow-hidden rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:shadow-[0_0_36px_rgba(255,255,255,0.34)]"
        >
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/10 to-transparent transition duration-700 group-hover:translate-x-full" />
          <span className="relative">Contact</span>
        </a>
      </div>
    </motion.header>
  )
}

export default TopNav
