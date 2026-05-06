import emailjs from '@emailjs/browser'
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { FormEvent, MouseEvent, ReactNode } from 'react'
import { FaLinkedinIn } from 'react-icons/fa6'
import { FiArrowUpRight, FiCheck, FiDownload, FiGithub, FiMail, FiX } from 'react-icons/fi'
import { HiOutlineCubeTransparent } from 'react-icons/hi2'
import { SiGithub } from 'react-icons/si'
import TopNav from '../components/TopNav'
import { CodeMark, education, experience, metrics, projects, skillGroups, skills, socials } from '../data/portfolioData'

type Project = (typeof projects)[number]
type TimelineItem = {
  period: string
  title: string
  place: string
  notes: string[]
  kind: 'Experience' | 'Education'
}

const ease = [0.22, 1, 0.36, 1] as const

const reveal = {
  hidden: { opacity: 0, y: 44, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.75, ease } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.075 } },
}

const SectionTitle = ({ eyebrow, title }: { eyebrow: string; title: string }) => (
  <motion.div
    variants={reveal}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-120px' }}
    className="mx-auto mb-10 max-w-3xl text-center"
  >
    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.38em] text-cyan-200/70">{eyebrow}</p>
    <h2 className="text-balance text-4xl font-semibold leading-tight text-white md:text-6xl">{title}</h2>
  </motion.div>
)

const MagneticButton = ({
  href,
  children,
  variant = 'light',
}: {
  href: string
  children: ReactNode
  variant?: 'light' | 'glass'
}) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 180, damping: 18 })
  const springY = useSpring(y, { stiffness: 180, damping: 18 })

  const handleMove = (event: MouseEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    x.set((event.clientX - rect.left - rect.width / 2) * 0.18)
    y.set((event.clientY - rect.top - rect.height / 2) * 0.18)
  }

  return (
    <motion.a
      href={href}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
      whileTap={{ scale: 0.97 }}
      className={`group relative inline-flex min-h-12 items-center justify-center overflow-hidden rounded-full px-6 text-sm font-semibold transition ${
        variant === 'light'
          ? 'bg-white text-black shadow-[0_0_44px_rgba(255,255,255,0.2)]'
          : 'border border-white/12 bg-white/[0.06] text-white backdrop-blur-xl'
      }`}
    >
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cyan-200/30 to-transparent transition duration-700 group-hover:translate-x-full" />
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </motion.a>
  )
}

const AnimatedCursor = () => {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const x = useSpring(cursorX, { stiffness: 500, damping: 38 })
  const y = useSpring(cursorY, { stiffness: 500, damping: 38 })

  useEffect(() => {
    const move = (event: PointerEvent) => {
      cursorX.set(event.clientX - 18)
      cursorY.set(event.clientY - 18)
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [cursorX, cursorY])

  return <motion.div style={{ x, y }} className="pointer-events-none fixed left-0 top-0 z-50 hidden h-9 w-9 rounded-full border border-cyan-200/45 mix-blend-difference md:block" />
}

const HeroAtmosphere = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    <div className="hero-stage absolute left-1/2 top-24 h-[520px] w-[min(900px,92vw)] -translate-x-1/2 rounded-[3rem] opacity-80" />
    <motion.div
      animate={{ x: ['-18%', '12%', '-18%'] }}
      transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute left-1/2 top-[18%] h-px w-[72vw] -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-100/70 to-transparent shadow-[0_0_28px_rgba(103,232,249,0.55)]"
    />
    <motion.div
      animate={{ x: ['14%', '-12%', '14%'] }}
      transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute left-1/2 top-[34%] h-px w-[64vw] -translate-x-1/2 bg-gradient-to-r from-transparent via-fuchsia-100/50 to-transparent shadow-[0_0_30px_rgba(217,70,239,0.36)]"
    />
    <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#030406] via-[#030406]/72 to-transparent" />
    <div className="absolute left-1/2 top-[52%] h-[300px] w-[820px] -translate-x-1/2 -skew-y-6 rounded-[50%] border border-cyan-100/10 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent)] [transform:perspective(900px)_rotateX(64deg)]" />
    {['interface.deploy()', 'motion.stack()', 'typed.frontend()', 'ai.assist()'].map((code, index) => (
      <motion.span
        key={code}
        animate={{ y: [0, -18, 0], opacity: [0.24, 0.62, 0.24] }}
        transition={{ duration: 4 + index, repeat: Infinity, ease: 'easeInOut', delay: index * 0.4 }}
        className="absolute hidden rounded-full border border-white/10 bg-black/30 px-4 py-2 font-mono text-xs text-cyan-50/55 backdrop-blur-md md:block"
        style={{
          left: `${12 + index * 20}%`,
          top: `${22 + (index % 2) * 28}%`,
        }}
      >
        {code}
      </motion.span>
    ))}
  </div>
)

const Loader = ({ done }: { done: boolean }) => (
  <AnimatePresence>
    {!done ? (
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.55, ease } }}
        className="fixed inset-0 z-[80] grid place-items-center bg-[#030406]"
      >
        <motion.div
          initial={{ scale: 0.86, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.08, opacity: 0 }}
          className="relative grid h-32 w-32 place-items-center rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-xl"
        >
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-2 rounded-full border border-transparent border-t-cyan-200"
          />
          <span className="text-sm font-black tracking-[0.3em] text-white">VM</span>
        </motion.div>
      </motion.div>
    ) : null}
  </AnimatePresence>
)

const ProjectStackCard = ({
  project,
  index,
  activeIndex,
  onOpen,
}: {
  project: Project
  index: number
  activeIndex: number
  onOpen: (project: Project) => void
}) => {
  const depth = index - activeIndex
  const isPast = depth < 0
  const translateY = isPast ? -72 : depth * 34
  const scale = isPast ? 0.88 : 1 - Math.min(depth, 2) * 0.055
  const opacity = isPast ? 0 : 1 - Math.max(depth, 0) * 0.18

  return (
    <motion.article
      animate={{ y: translateY, scale, opacity, rotate: isPast ? -3 : depth * 1.5 }}
      transition={{ type: 'spring', stiffness: 150, damping: 28 }}
      className="absolute inset-0 origin-center"
      style={{ zIndex: projects.length - Math.abs(depth) }}
    >
      <div className="relative h-full overflow-hidden rounded-[2rem] border border-white/12 bg-[#070910] p-3 shadow-[0_34px_120px_rgba(0,0,0,0.55)] md:p-4">
        <div className={`relative flex h-full flex-col overflow-hidden rounded-[1.45rem] border border-white/10 bg-gradient-to-br ${project.color} p-5 md:p-8`}>
          <div className="absolute -left-20 top-1/3 h-52 w-52 rounded-full bg-cyan-100/10 blur-3xl" />
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/12 blur-3xl" />
          <div className="absolute inset-x-6 top-1/2 h-px bg-gradient-to-r from-transparent via-white/28 to-transparent" />
          <div className="relative mb-12 flex items-center justify-between gap-4">
            <span className="rounded-full border border-white/12 bg-black/24 px-3 py-1 text-xs text-white/64">{project.role}</span>
            <span className="font-mono text-xs text-white/38">0{index + 1}/0{projects.length}</span>
          </div>
          <div className="relative grid flex-1 items-end gap-8 md:grid-cols-[0.9fr_1.1fr]">
            <div>
              <CodeMark className="mb-5 text-4xl text-white/58" />
              <h3 className="text-5xl font-semibold tracking-[-0.05em] md:text-7xl">{project.title}</h3>
            </div>
            <div className="md:self-end">
              <p className="max-w-md text-base leading-8 text-white/68 md:text-lg">{project.summary}</p>
              <div className="mt-7 flex flex-wrap gap-2">
                {project.stack.map((tag) => (
                  <span key={tag} className="rounded-full bg-black/30 px-3 py-1 text-xs text-white/72">{tag}</span>
                ))}
              </div>
              <button
                onClick={() => onOpen(project)}
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:scale-[1.02]"
              >
                Open Case Study <FiArrowUpRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

const ProjectStack = ({ onOpen }: { onOpen: (project: Project) => void }) => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const activeValue = useTransform(scrollYProgress, [0, 0.24, 0.52, 0.78], [0, 1, 2, 3])
  const [activeIndex, setActiveIndex] = useState(0)
  const [manualIndex, setManualIndex] = useState<number | null>(null)

  useEffect(() => {
    const unsubscribe = activeValue.on('change', (value) => {
      if (manualIndex === null) {
        setActiveIndex(Math.min(projects.length - 1, Math.max(0, Math.round(value))))
      }
    })
    return unsubscribe
  }, [activeValue, manualIndex])

  const showProject = (index: number) => {
    setManualIndex(index)
    setActiveIndex(index)
  }

  return (
    <section ref={sectionRef} id="projects" className="relative z-10 min-h-[175vh] px-5 py-6 md:px-8">
      <div className="sticky top-4 flex min-h-[calc(100vh-2rem)] items-center py-6">
        <div className="mx-auto w-full max-w-6xl">
          <SectionTitle eyebrow="Projects" title="Scroll through a stacked deck of selected builds." />
          <div className="grid items-center gap-8 lg:grid-cols-[0.72fr_1.28fr]">
            <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="hidden lg:block">
              <p className="text-sm uppercase tracking-[0.3em] text-white/38">Stack Progress</p>
              <div className="mt-6 space-y-4">
                {projects.map((project, index) => (
                  <button
                    key={project.title}
                    type="button"
                    onClick={() => showProject(index)}
                    className={`w-full rounded-2xl border p-4 text-left transition ${
                      activeIndex === index
                        ? 'border-cyan-100/35 bg-white/[0.08] text-white'
                        : 'border-white/10 bg-white/[0.025] text-white/48 hover:text-white'
                    }`}
                  >
                    <span className="text-xs font-semibold">0{index + 1}</span>
                    <span className="ml-3 text-sm font-semibold">{project.title}</span>
                  </button>
                ))}
              </div>
            </motion.div>
            <div className="relative mx-auto h-[520px] w-full max-w-3xl md:h-[580px]">
              {projects.map((project, index) => (
                <ProjectStackCard
                  key={project.title}
                  project={project}
                  index={index}
                  activeIndex={activeIndex}
                  onOpen={onOpen}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const HomePage = () => {
  const [loaded, setLoaded] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [selectedTimeline, setSelectedTimeline] = useState<TimelineItem | null>(null)
  const [successOpen, setSuccessOpen] = useState(false)
  const [emailCopied, setEmailCopied] = useState(false)
  const [formError, setFormError] = useState('')
  const [isSending, setIsSending] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.35], [0, shouldReduceMotion ? 0 : -120])
  const groupedSkills = useMemo(
    () => skillGroups.map((group) => ({ group, items: skills.filter((skill) => skill.group === group) })),
    [],
  )

  useEffect(() => {
    const timeout = window.setTimeout(() => setLoaded(true), 900)
    return () => window.clearTimeout(timeout)
  }, [])

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormError('')
    const form = event.currentTarget
    const formData = new FormData(form)
    const name = String(formData.get('name') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim()
    const phone = String(formData.get('phone') ?? '').trim()
    const message = String(formData.get('message') ?? '').trim()

    if (name.length < 2) {
      setFormError('Please enter a valid name.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormError('Please enter a valid email address.')
      return
    }
    if (phone && !/^[+()\d\s-]{7,18}$/.test(phone)) {
      setFormError('Please enter a valid phone number or leave it empty.')
      return
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    const autoReplyTemplateId = import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID
    const hasEmailJsConfig = [serviceId, templateId, publicKey, autoReplyTemplateId].every(
      (value) => value && !String(value).startsWith('your_'),
    )

    setIsSending(true)
    try {
      if (hasEmailJsConfig) {
        const templateParams = {
          to_email: 'vyshnams1@gmail.com',
          from_name: name,
          from_email: email,
          user_name: name,
          user_email: email,
          phone,
          message: message || 'No message provided.',
          reply_message: 'Thank you for reaching out. Your message was received, and I will respond soon.',
        }

        await emailjs.send(serviceId, templateId, templateParams, { publicKey })
        await emailjs.send(
          serviceId,
          autoReplyTemplateId,
          {
            to_email: email,
            to_name: name,
            user_email: email,
            user_name: name,
            message:
              'Thank you for contacting me. I received your message and will respond soon with the next steps.',
          },
          { publicKey },
        )
      } else {
        const payload = new FormData()
        payload.append('_subject', `New portfolio inquiry from ${name}`)
        payload.append('_captcha', 'false')
        payload.append('_template', 'table')
        payload.append('_autoresponse', 'Thank you for contacting me. I received your message and will respond soon with the next steps.')
        payload.append('Name', name)
        payload.append('Email', email)
        payload.append('Phone', phone || 'Not provided')
        payload.append('Message', message || 'No message provided.')

        const response = await fetch('https://formsubmit.co/ajax/vyshnams1@gmail.com', {
          method: 'POST',
          body: payload,
          headers: { Accept: 'application/json' },
        })

        if (!response.ok) {
          throw new Error('Fallback contact request failed')
        }
      }

      form.reset()
      setSuccessOpen(true)
    } catch {
      setFormError(
        hasEmailJsConfig
          ? 'EmailJS could not send this message. Check your service, template variables, and public key.'
          : 'Unable to send right now. Add real EmailJS values in .env or try again in a moment.',
      )
    } finally {
      setIsSending(false)
    }
  }

  const resumeActions = (
    <motion.a
      href="/Vyshnav_MS_Resume.pdf"
      target="_blank"
      rel="noreferrer"
      whileTap={{ scale: 0.97 }}
      className="group relative inline-flex min-h-12 items-center justify-center overflow-hidden rounded-full border border-cyan-100/20 bg-cyan-100/10 px-6 text-sm font-semibold text-cyan-50 backdrop-blur-xl transition hover:border-cyan-100/40 hover:shadow-[0_0_36px_rgba(103,232,249,0.2)]"
    >
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cyan-200/20 to-transparent transition duration-700 group-hover:translate-x-full" />
      <span className="relative inline-flex items-center gap-2">View / Download Resume <FiDownload /></span>
    </motion.a>
  )

  const copyEmail = async () => {
    await navigator.clipboard.writeText('vyshnams1@gmail.com')
    setEmailCopied(true)
    window.setTimeout(() => setEmailCopied(false), 1800)
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#030406] text-white">
      <Loader done={loaded} />
      <AnimatedCursor />
      <TopNav />

      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-[-12rem] h-[420px] w-[420px] rounded-full bg-fuchsia-400/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.032)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.032)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle_at_top,black,transparent_72%)]" />
      </div>

      <motion.section
        id="hero"
        style={{ y: heroY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.8, ease }}
        className="relative z-10 flex min-h-screen items-center px-5 pb-20 pt-32 md:px-8"
      >
        <HeroAtmosphere />
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.p variants={reveal} className="mb-5 w-fit rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-cyan-100/80">
              Software Developer | Frontend Developer
            </motion.p>
            <motion.h1 variants={reveal} className="max-w-4xl text-balance text-6xl font-semibold leading-[0.9] tracking-[-0.04em] text-white md:text-8xl">
              Vyshnav M S
            </motion.h1>
            <motion.p variants={reveal} className="mt-7 max-w-2xl text-lg leading-8 text-white/66 md:text-xl">
              Frontend-focused software developer building polished web interfaces, full stack workflows, and AI-assisted development systems that feel fast, clear, and memorable.
            </motion.p>
            <motion.div variants={reveal} className="mt-9 flex flex-wrap gap-4">
              <MagneticButton href="#projects">View Projects <FiArrowUpRight /></MagneticButton>
              <MagneticButton href="#contact" variant="glass">Contact Me <FiMail /></MagneticButton>
            </motion.div>
            <motion.div variants={reveal} className="mt-4 flex flex-wrap gap-4">
              {resumeActions}
            </motion.div>
          </motion.div>

          <motion.div variants={reveal} initial="hidden" animate="visible" className="relative mx-auto w-full max-w-md">
            <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }} className="rounded-[2rem] border border-white/12 bg-white/[0.06] p-4 shadow-2xl shadow-cyan-950/30 backdrop-blur-2xl">
              <div className="rounded-[1.4rem] border border-white/10 bg-[#06080d] p-5">
                <div className="mb-6 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.3em] text-white/40">Build Console</span>
                  <HiOutlineCubeTransparent className="text-2xl text-cyan-100/70" />
                </div>
                <div className="space-y-4 font-mono text-sm text-white/72">
                  <p><span className="text-cyan-200">const</span> role = "Frontend Developer"</p>
                  <p><span className="text-fuchsia-200">ship</span>("React", "TypeScript", "AI")</p>
                  <p><span className="text-emerald-200">status</span>: available for work</p>
                </div>
                <div className="mt-8 grid grid-cols-3 gap-3">
                  {metrics.map(([value, label]) => (
                    <div key={value} className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                      <p className="text-sm font-semibold">{value}</p>
                      <p className="mt-1 text-xs text-white/42">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <section id="about" className="relative z-10 px-5 py-24 md:px-8">
        <div className="mx-auto max-w-5xl">
          <SectionTitle eyebrow="About" title="Premium frontend craft with full stack range." />
          <motion.p variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mx-auto max-w-3xl text-center text-xl leading-9 text-white/66">
            Passionate software developer focused on frontend development and full-stack solutions with experience in web development, AI-assisted development, and scalable applications.
          </motion.p>
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-8 flex flex-wrap justify-center gap-4">
            {resumeActions}
          </motion.div>
        </div>
      </section>

      <section id="skills" className="relative z-10 px-5 py-24 md:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionTitle eyebrow="Skills" title="A focused stack for polished product interfaces." />
          <div className="space-y-12">
            {groupedSkills.map(({ group, items }) => (
              <motion.div key={group} variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
                <motion.h3 variants={reveal} className="mb-5 text-sm font-semibold uppercase tracking-[0.28em] text-white/45">{group}</motion.h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {items.map((skill) => (
                    <motion.article
                      key={skill.name}
                      variants={reveal}
                      whileHover={{ y: -8, rotateX: 6, scale: 1.025 }}
                      className="group rounded-3xl border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl transition hover:border-white/24 hover:shadow-[0_0_44px_rgba(103,232,249,0.14)]"
                    >
                      <div className="mb-6 flex items-start justify-between">
                        <div style={{ color: skill.accent }} className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-black/30 text-2xl shadow-inner">
                          {skill.icon ? <skill.icon /> : <span className="text-[10px] font-black uppercase tracking-[-0.02em]">{skill.logoText}</span>}
                        </div>
                        <span className="rounded-full border border-white/10 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-white/38">Skill</span>
                      </div>
                      <h4 className="text-lg font-semibold">{skill.name}</h4>
                      <p className="mt-3 text-sm text-white/46">{skill.group}</p>
                    </motion.article>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="relative z-10 px-5 py-24 md:px-8">
        <div className="mx-auto max-w-5xl">
          <SectionTitle eyebrow="Experience" title="Production practice shaped through real delivery." />
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="relative space-y-5 before:absolute before:left-4 before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-gradient-to-b before:from-cyan-200 before:to-transparent">
              {experience.map((item) => (
                <motion.article key={item.title} variants={reveal} className="relative pl-12">
                  <span className="absolute left-[0.45rem] top-2 h-5 w-5 rounded-full border border-cyan-200/70 bg-[#06080d] shadow-[0_0_24px_rgba(103,232,249,0.35)]" />
                  <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl md:p-8">
                    <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                      <div>
                        <p className="text-sm text-cyan-100/64">{item.period}</p>
                        <h4 className="mt-2 text-2xl font-semibold">{item.title}</h4>
                        <p className="mt-1 text-sm text-white/52">{item.place}</p>
                      </div>
                      <button
                        onClick={() => setSelectedTimeline({ ...item, kind: 'Experience' })}
                        className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:scale-[1.02]"
                      >
                        View Details <FiArrowUpRight />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="education" className="relative z-10 px-5 py-24 md:px-8">
        <div className="mx-auto max-w-5xl">
          <SectionTitle eyebrow="Education" title="Academic grounding for scalable software thinking." />
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="relative space-y-5 before:absolute before:left-4 before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-gradient-to-b before:from-fuchsia-100 before:to-transparent">
              {education.map((item) => (
                <motion.article key={item.title} variants={reveal} className="relative pl-12">
                  <span className="absolute left-[0.45rem] top-2 h-5 w-5 rounded-full border border-fuchsia-100/60 bg-[#06080d] shadow-[0_0_24px_rgba(217,70,239,0.28)]" />
                  <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl md:p-8">
                    <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                      <div>
                        <p className="text-sm text-fuchsia-100/64">{item.period}</p>
                        <h4 className="mt-2 text-2xl font-semibold">{item.title}</h4>
                        <p className="mt-1 text-sm text-white/52">{item.place}</p>
                      </div>
                      <button
                        onClick={() => setSelectedTimeline({ ...item, kind: 'Education' })}
                        className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:scale-[1.02]"
                      >
                        View Details <FiArrowUpRight />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <ProjectStack onOpen={setSelectedProject} />

      <section id="contact" className="relative z-10 px-5 py-24 md:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl md:p-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.38em] text-cyan-200/70">Contact</p>
            <h2 className="text-5xl font-semibold leading-none tracking-[-0.04em] md:text-7xl">Let us build the next sharp interface.</h2>
            <p className="mt-6 leading-8 text-white/58">Send a short note. Required fields are name and email; phone and message are optional.</p>
          </div>
          <form onSubmit={handleContactSubmit} className="space-y-5">
            {[
              ['name', 'Name', 'text', true],
              ['email', 'Email', 'email', true],
              ['phone', 'Phone Number', 'tel', false],
            ].map(([name, label, type, required]) => (
              <label key={String(name)} className="block">
                <span className="mb-2 block text-sm text-white/55">{label}</span>
                <input name={String(name)} type={String(type)} required={Boolean(required)} className="w-full rounded-2xl border border-white/10 bg-black/28 px-4 py-4 text-white outline-none transition placeholder:text-white/28 focus:border-cyan-200/60 focus:shadow-[0_0_0_4px_rgba(103,232,249,0.12)]" />
              </label>
            ))}
            <label className="block">
              <span className="mb-2 block text-sm text-white/55">Message</span>
              <textarea name="message" rows={4} className="w-full resize-none rounded-2xl border border-white/10 bg-black/28 px-4 py-4 text-white outline-none transition placeholder:text-white/28 focus:border-cyan-200/60 focus:shadow-[0_0_0_4px_rgba(103,232,249,0.12)]" />
            </label>
            <button disabled={isSending} className="group relative w-full overflow-hidden rounded-full bg-white px-5 py-4 font-semibold text-black transition disabled:opacity-70">
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cyan-200/40 to-transparent transition duration-700 group-hover:translate-x-full" />
              <span className="relative">{isSending ? 'Sending...' : 'Send Message'}</span>
            </button>
            {formError ? <p className="text-sm text-rose-200">{formError}</p> : null}
          </form>
        </div>
      </section>

      <footer className="relative z-10 px-5 pb-10 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/45 md:flex-row">
          <p>© 2026 Vyshnav M S. Software Developer.</p>
          <div className="flex items-center gap-3">
            <a
              href={socials.find((social) => social.label === 'GitHub')?.href}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-lg text-white/64 transition hover:border-white/25 hover:text-white"
            >
              <SiGithub />
            </a>
            <a
              href={socials.find((social) => social.label === 'LinkedIn')?.href}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-lg text-white/64 transition hover:border-white/25 hover:text-white"
            >
              <FaLinkedinIn />
            </a>
            <button
              type="button"
              onClick={copyEmail}
              aria-label="Copy email address"
              className="relative grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-lg text-white/64 transition hover:border-white/25 hover:text-white"
            >
              <FiMail />
              <AnimatePresence>
                {emailCopied ? (
                  <motion.span
                    initial={{ opacity: 0, y: 6, scale: 0.94 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.94 }}
                    className="absolute -top-9 rounded-full border border-white/10 bg-white px-3 py-1 text-xs font-semibold text-black shadow-xl"
                  >
                    Copied
                  </motion.span>
                ) : null}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {selectedProject ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] grid place-items-center bg-black/72 p-4 backdrop-blur-xl" onClick={() => setSelectedProject(null)}>
            <motion.article initial={{ opacity: 0, y: 32, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.97 }} transition={{ duration: 0.35, ease }} onClick={(event) => event.stopPropagation()} className="w-full max-w-2xl rounded-[2rem] border border-white/12 bg-[#080a0f] p-6 shadow-2xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-cyan-100/64">{selectedProject.role}</p>
                  <h3 className="mt-2 text-4xl font-semibold">{selectedProject.title}</h3>
                </div>
                <button onClick={() => setSelectedProject(null)} className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white/70 transition hover:text-white"><FiX /></button>
              </div>
              <p className="mt-6 leading-8 text-white/66">{selectedProject.details}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {selectedProject.stack.map((tag) => <span key={tag} className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-sm text-white/70">{tag}</span>)}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {selectedProject.live !== '#' ? (
                  <a href={selectedProject.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black">Live Demo <FiArrowUpRight /></a>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-white/45">Live Demo Pending</span>
                )}
                <a href={selectedProject.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/12 px-5 py-3 text-sm font-semibold text-white">GitHub <FiGithub /></a>
              </div>
            </motion.article>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {selectedTimeline ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[72] grid place-items-center bg-black/72 p-4 backdrop-blur-xl"
            onClick={() => setSelectedTimeline(null)}
          >
            <motion.article
              initial={{ opacity: 0, y: 34, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.35, ease }}
              onClick={(event) => event.stopPropagation()}
              className="w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/12 bg-[#080a0f] shadow-2xl"
            >
              <div className="relative border-b border-white/10 bg-white/[0.04] p-6 md:p-8">
                <div className="absolute -right-16 -top-20 h-52 w-52 rounded-full bg-cyan-200/10 blur-3xl" />
                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-100/60">{selectedTimeline.kind}</p>
                    <h3 className="mt-3 text-3xl font-semibold md:text-4xl">{selectedTimeline.title}</h3>
                    <p className="mt-2 text-white/58">{selectedTimeline.place}</p>
                    <p className="mt-1 text-sm text-white/42">{selectedTimeline.period}</p>
                  </div>
                  <button
                    onClick={() => setSelectedTimeline(null)}
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 text-white/70 transition hover:text-white"
                  >
                    <FiX />
                  </button>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <p className="text-sm uppercase tracking-[0.28em] text-white/38">Detail View</p>
                <div className="mt-5 space-y-3">
                  {selectedTimeline.notes.map((note, index) => (
                    <motion.div
                      key={note}
                      initial={{ opacity: 0, x: -18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.06, duration: 0.35 }}
                      className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-sm leading-7 text-white/68"
                    >
                      {note}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.article>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {successOpen ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[75] grid place-items-center bg-black/72 p-4 backdrop-blur-xl">
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 28 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.94 }} className="max-w-md rounded-[2rem] border border-emerald-200/20 bg-[#080a0f] p-7 text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-300 text-black"><FiCheck /></div>
              <h3 className="mt-5 text-2xl font-semibold">Message received</h3>
              <p className="mt-3 text-white/62">Thank you for reaching out. A confirmation email was sent, and I will respond soon.</p>
              <button onClick={() => setSuccessOpen(false)} className="mt-6 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black">Close</button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  )
}

export default HomePage
