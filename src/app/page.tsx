import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Stack from "@/components/Stack";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import AskAI from "@/components/AskAI";
import Certs from "@/components/Certs";
import Connect from "@/components/Connect";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <About />
        <Stack />
        <Experience />
        <Projects />
        <AskAI />
        <Certs />
        <Connect />
      </main>
      <Footer />
    </>
  );
}
