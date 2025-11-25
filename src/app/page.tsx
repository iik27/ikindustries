import Header from '@/components/header';
import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import Services from '@/components/sections/services';
import Strengths from '@/components/sections/strengths';
import Portfolio from '@/components/sections/portfolio';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Strengths />
        <Portfolio />
        <About />
      </main>
      <Footer />
    </>
  );
}
