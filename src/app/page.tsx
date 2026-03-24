import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Concept from '@/components/Concept';
import Programs from '@/components/Programs';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-primary-700 focus:shadow-lg">
        メインコンテンツへスキップ
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <Concept />
        <Programs />
        <Features />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
