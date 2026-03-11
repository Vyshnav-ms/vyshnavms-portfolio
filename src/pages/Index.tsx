import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CursorTracker from "@/components/CursorTracker";
import PageLoader from "@/components/PageLoader";
import FloatingMusicButton from "@/components/FloatingMusicButton";

const Index = () => {
  return (
    <div className="bg-background text-foreground">
      <PageLoader />
      <CursorTracker />
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
