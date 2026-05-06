import { motion } from 'framer-motion'
import type { Dispatch, SetStateAction } from 'react'
import { FiX } from 'react-icons/fi'

const navItems = ['about', 'skills', 'experience', 'education', 'projects', 'contact']

interface MobileNavDrawerProps {
  isOpen: boolean
  onClose: Dispatch<SetStateAction<boolean>>
  active: string
}

const MobileNavDrawer = ({ isOpen, onClose, active }: MobileNavDrawerProps) => {
  const handleNavClick = () => {
    onClose(false)
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => onClose(false)}
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm"
        />
      )}

      {/* Drawer */}
      <motion.div
        initial={{ x: '-100%', opacity: 0 }}
        animate={isOpen ? { x: 0, opacity: 1 } : { x: '-100%', opacity: 0 }}
        exit={{ x: '-100%', opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 z-40 h-screen w-64 overflow-y-auto border-r border-white/10 bg-[#080a0f]/95 backdrop-blur-2xl"
      >
        {/* Close button */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <span className="text-sm font-medium text-white/85">Menu</span>
          <button
            onClick={() => onClose(false)}
            className="rounded-lg p-2 hover:bg-white/10 transition"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation items */}
        <nav className="space-y-2 px-4 py-6">
          {navItems.map((item, index) => (
            <motion.a
              key={item}
              href={`#${item}`}
              onClick={handleNavClick}
              initial={{ opacity: 0, x: -20 }}
              animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: index * 0.05 }}
              className={`block rounded-lg px-4 py-3 text-sm font-medium uppercase tracking-[0.12em] transition ${
                active === item
                  ? 'bg-white/10 text-white'
                  : 'text-white/64 hover:bg-white/5 hover:text-white'
              }`}
            >
              {item}
            </motion.a>
          ))}
        </nav>

        {/* Divider */}
        <div className="mx-4 border-t border-white/10" />

        {/* Contact CTA */}
        <div className="px-4 py-6">
          <motion.a
            href="#contact"
            onClick={handleNavClick}
            initial={{ opacity: 0, y: 10 }}
            animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: navItems.length * 0.05 }}
            className="block w-full rounded-full bg-white px-4 py-2 text-center text-sm font-semibold text-black transition hover:shadow-[0_0_24px_rgba(255,255,255,0.3)]"
          >
            Contact
          </motion.a>
        </div>
      </motion.div>
    </>
  )
}

export default MobileNavDrawer
