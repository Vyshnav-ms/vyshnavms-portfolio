import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";
import FloatingMusicButton from "@/components/FloatingMusicButton";
import ScrollProgress from "@/components/ScrollProgress";

const Index = () => {
  return (
    <div style={{ background: "#030712", color: "rgba(200,230,255,0.9)" }}>
      <PageLoader />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Education />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <FloatingMusicButton />
    </div>
  );
};

export default Index;
