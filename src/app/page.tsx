import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Concept from '@/components/Concept';
import Programs from '@/components/Programs';
import Features from '@/components/Features';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Concept />
        <Programs />
        <Features />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
