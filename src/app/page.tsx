import Header from '@/components/header';
import Hero from '@/components/sections/hero';
import DevelopmentProcess from '@/components/sections/development-process';
import About from '@/components/sections/about';
import Services from '@/components/sections/services';
import InteractiveTechStack from '@/components/sections/interactive-tech-stack';
import Strengths from '@/components/sections/strengths';
import Portfolio from '@/components/sections/portfolio';
import Testimonials from '@/components/sections/testimonials';
import Blog from '@/components/sections/blog';
import Contact from '@/components/sections/contact';
import Footer from '@/components/footer';

// Mengatur durasi maksimum untuk Server Actions di halaman ini (Vercel Hobby: 10s, Pro: up to 300s)
// Karena AI seringkali butuh waktu > 10 detik, kita set ke 60 detik.
export const maxDuration = 60;

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <DevelopmentProcess />
        <Services />
        <InteractiveTechStack />
        <Strengths />
        <Portfolio />
        <Testimonials />
        <Blog />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
