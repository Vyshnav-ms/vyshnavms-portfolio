import { Link } from 'react-router-dom'
import TopNav from '../components/TopNav'
import useRevealAnimation from '../hooks/useRevealAnimation'

const ProjectDetailPage = () => {
  useRevealAnimation()

  return (
    <main className="mx-auto w-full max-w-[760px] px-6 pb-16 pt-8 text-white md:px-10">
      <TopNav />

      <article className="reveal rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
        <div className="h-[260px] rounded-[22px] bg-[linear-gradient(145deg,#b0b0b0,#5a5a5a)]" />
        <p className="mt-4 text-sm text-white/55">branding, strategy</p>
        <h1 className="mt-3 text-5xl font-semibold md:text-6xl">Swat Agency Stack</h1>
        <p className="mt-5 text-lg leading-relaxed text-white/80">
          Uniting tools for maximum impact through deep research, execution strategy, and continuous
          optimization.
        </p>
      </article>

      <section className="reveal mt-10 grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[24px] bg-[#d9ff00] p-5 text-black">
          <p className="text-xs">• Timeline</p>
          <p className="mt-2 text-4xl font-semibold">January 2025 - March 2025</p>
          <div className="mt-6 h-10 w-10 rounded-full bg-black/10" />
        </div>
        <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
          <p className="text-xs text-white/50">• Service</p>
          <p className="mt-12 text-4xl font-semibold">Branding</p>
          <p className="text-4xl font-semibold">Strategy</p>
        </div>
      </section>

      <section className="reveal mt-10 rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
        <h2 className="text-4xl font-semibold md:text-5xl">Uniting Tools for Maximum Impact</h2>
        <p className="mt-4 leading-relaxed text-white/75">
          Before we implement or upgrade, we listen. Discovery is where the Swat Agency Stack
          strategy is born. We examine current tool usage, data pipelines, and operational
          challenges. This stage is about informed clarity, not guesswork.
        </p>
        <p className="mt-4 leading-relaxed text-white/75">
          Collaboration ensures the stack is tailored for maximum agency productivity. Insights
          guide resource allocation, tech selection, and rollout timing.
        </p>
      </section>

      <section className="reveal mt-10 rounded-[28px] border border-[#d9ff00]/30 bg-black/70 p-6">
        <h2 className="text-4xl font-semibold md:text-5xl">Empowering Agencies to Do More</h2>
        <p className="mt-4 leading-relaxed text-white/75">
          After gathering insights, we move to implementation. Strategies are executed with
          precision, integrating the right tools and automations. Monitoring is continuous,
          ensuring everything works in harmony.
        </p>
        <p className="mt-4 leading-relaxed text-white/75">
          Feedback loops help fine-tune each component of the stack for scalability and future
          growth. The result is a workflow that performs as seamlessly as it scales.
        </p>
      </section>

      <section className="reveal mt-10 rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
        <h2 className="text-4xl font-semibold md:text-5xl">The Result</h2>
        <p className="mt-4 leading-relaxed text-white/75">
          Complexity becomes clarity in this stage. With goals clearly defined, each move is
          calculated for impact. This strategic approach turns the Swat Agency Stack into a true
          competitive advantage for the agency.
        </p>
      </section>

      <section id="contact" className="reveal mt-12 rounded-[28px] border border-[#d9ff00]/35 bg-black/80 p-6">
        <h2 className="text-[64px] font-semibold leading-[0.85]">
          Contact
          <br />
          For Work
        </h2>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="mailto:vyshnams1@gmail.com"
            className="interactive rounded-full bg-[#d9ff00] px-6 py-3 font-semibold text-black"
          >
            Start Project
          </a>
          <Link to="/" className="interactive rounded-full border border-white/20 px-6 py-3">
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  )
}

export default ProjectDetailPage
