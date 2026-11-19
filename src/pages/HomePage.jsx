import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PRODUCTS } from '../data/products';
import { COMPANY_INFO } from '../data/history';
import AlfajorCarousel3D from '../components/products/AlfajorCarousel3D';
import ProductNutritionModal from '../components/products/ProductNutritionModal';
import HistoryTimeline from '../components/history/HistoryTimeline';
import useKeyboardNavigation from '../hooks/useKeyboardNavigation';

export default function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCarouselInView, setIsCarouselInView] = useState(false);
  const carouselRef = useRef(null);
  const alfajoresSectionRef = useRef(null);
  const location = useLocation();

  useKeyboardNavigation({
    isModalOpen: Boolean(selectedProduct),
    onCloseModal: () => setSelectedProduct(null),
    onCarouselPrev: () => carouselRef.current?.slidePrev(),
    onCarouselNext: () => carouselRef.current?.slideNext(),
    isCarouselActive: isCarouselInView,
  });

  useEffect(() => {
    const sectionEl = alfajoresSectionRef.current;
    if (!sectionEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsCarouselInView(entry.isIntersecting),
      { threshold: 0.35 }
    );

    observer.observe(sectionEl);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const scrollTarget = location.state?.scrollTo || location.hash.replace('#', '');
    if (!scrollTarget) return;

    const timer = setTimeout(() => {
      const el = document.getElementById(scrollTarget);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);

    return () => clearTimeout(timer);
  }, [location]);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', `#${sectionId}`);
    }
  };

  return (
    <div className="bg-transparent">
      <section
        id="inicio"
        className="scroll-mt-16 relative overflow-hidden border-b border-[#6b2b18]/25 py-20 px-4"
      >
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="Capitán-ribbon-badge text-[11px] sm:text-xs uppercase tracking-[0.18em] font-display font-bold select-none"
          >
            <span aria-hidden="true" className="Capitán-ribbon-tail-left" />
            Desde 1962 — Quilmes, Buenos Aires
            <span aria-hidden="true" className="Capitán-ribbon-tail-right" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl font-bold text-[#26110a] mt-5 leading-tight drop-shadow-[0_1px_0_rgba(255,248,231,0.65)]"
          >
            “{COMPANY_INFO.slogan}”
          </motion.h1>

          <p className="text-[#3b1c12] font-medium max-w-2xl mx-auto mt-4 text-base sm:text-lg">
            Tradición, sabor y la identidad de siempre en cada alfajor de {COMPANY_INFO.companyName}.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#alfajores"
              onClick={(e) => scrollToSection(e, 'alfajores')}
              className="px-6 py-3 rounded-xl bg-[#8b1d1d] hover:bg-[#6e1414] text-[#fcf2dc] font-bold text-sm border border-Capitán-gold/60 shadow-md transition cursor-pointer"
            >
              Explorar Alfajores
            </a>
            <a
              href="#historia"
              onClick={(e) => scrollToSection(e, 'historia')}
              className="px-6 py-3 rounded-xl bg-[#fbf3e1]/90 hover:bg-[#fcf6e8] text-[#26110a] font-semibold text-sm border border-[#8b1d1d]/30 shadow-md transition cursor-pointer"
            >
              Conocer la Historia
            </a>
          </div>
        </div>
      </section>

      <section
        id="alfajores"
        ref={alfajoresSectionRef}
        className="scroll-mt-16 py-16 px-4 max-w-6xl mx-auto border-b border-[#6b2b18]/25"
      >
        <div className="text-center max-w-2xl mx-auto mb-6 bg-[#fbf3e1]/90 backdrop-blur-md rounded-2xl px-6 py-5 border border-[#8b1d1d]/25 shadow-md">
          <span className="text-xs uppercase tracking-[0.2em] text-[#8b1d1d] font-bold">
            Variedades Clásicas y Triples
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#26110a] mt-1">
            Nuestros Alfajores
          </h2>
          <p className="text-[#47291c] mt-2 text-sm sm:text-base">
            Deslizá y seleccioná cualquier variedad para consultar ingredientes y datos nutricionales.
          </p>
        </div>

        <AlfajorCarousel3D
          ref={carouselRef}
          products={PRODUCTS}
          onSelectProduct={setSelectedProduct}
        />

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/elaboracion"
            className="px-5 py-2.5 rounded-xl bg-[#fbf3e1]/90 hover:bg-[#fcf6e8] text-[#8b1d1d] text-xs sm:text-sm font-bold border border-[#8b1d1d]/30 shadow-sm transition"
          >
            Ver proceso de elaboración →
          </Link>
          <Link
            to="/distribucion"
            className="px-5 py-2.5 rounded-xl bg-[#f3e1b8]/90 hover:bg-[#f7e8c6] text-[#26110a] text-xs sm:text-sm font-semibold border border-[#9c6b21]/35 shadow-sm transition"
          >
            Puntos y distribución
          </Link>
        </div>
      </section>

      <section
        id="historia"
        className="scroll-mt-16 py-16 px-4 bg-transparent"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-12 bg-[#fbf3e1]/90 backdrop-blur-md rounded-2xl px-6 py-5 border border-[#8b1d1d]/25 shadow-md">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#8b1d1d] font-bold">
                1962 — Presente
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#26110a] mt-1">
                Nuestra Historia
              </h2>
              <p className="text-[#47291c] mt-1 text-sm sm:text-base">
                De Ezpeleta y Bernal Oeste a la planta de Quilmes.
              </p>
            </div>
            <Link
              to="/contacto"
              className="px-4 py-2 rounded-xl bg-[#8b1d1d] hover:bg-[#6e1414] text-[#fcf2dc] text-xs sm:text-sm font-semibold border border-Capitán-gold/50 shadow-sm transition"
            >
              Contactar a la fábrica →
            </Link>
          </div>

          <HistoryTimeline showHeader={false} />
        </div>
      </section>

      <ProductNutritionModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}