import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { HISTORY_MILESTONES, COMPANY_INFO } from '../../data/history';

export default function HistoryTimeline({ showHeader = true, headingTag = 'h2' }) {
  const containerRef = useRef(null);
  const Heading = headingTag;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 65%'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <div ref={containerRef} className="relative">
      {showHeader && (
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.22em] text-Capitán-gold font-semibold">
            {COMPANY_INFO.companyName}
          </span>
          <Heading className="font-display text-3xl sm:text-4xl font-bold text-white mt-2">
            Nuestra Historia
          </Heading>
          <p className="text-Capitán-gold italic mt-2 text-base sm:text-lg">
            “{COMPANY_INFO.slogan}”
          </p>
        </div>
      )}

      <div className="relative max-w-5xl mx-auto">
        {/* Guía base tenue */}
        <div
          aria-hidden="true"
          className="absolute left-4 md:left-1/2 top-2 bottom-2 w-px -translate-x-1/2 bg-white/10"
        />

        {/* Guía dorada que se va dibujando con el scroll */}
        <motion.div
          aria-hidden="true"
          style={{ scaleY, transformOrigin: 'top' }}
          className="absolute left-4 md:left-1/2 top-2 bottom-2 w-[2px] -translate-x-1/2 bg-gradient-to-b from-Capitán-gold via-Capitán-gold-light to-Capitán-red"
        />

        <div className="space-y-14">
          {HISTORY_MILESTONES.map((milestone, index) => {
            // Par (0, 2): Tarjeta izquierda + Foto derecha
            // Impar (1, 3): Foto izquierda + Tarjeta derecha
            const isEven = index % 2 === 0;

            const cardBlock = (
              <div
                className={`group rounded-2xl bg-Capitán-dark/90 border border-Capitán-gold/25 hover:border-Capitán-gold/60 p-6 shadow-xl transition-colors h-full flex flex-col justify-center ${
                  isEven ? 'md:text-right' : 'md:text-left'
                }`}
              >
                <div
                  className={`flex flex-wrap items-center gap-2 text-xs uppercase tracking-wider font-bold text-Capitán-gold ${
                    isEven ? 'md:justify-end' : 'md:justify-start'
                  }`}
                >
                  <span>{milestone.year}</span>
                  <span className="text-white/30">•</span>
                  <span className="text-Capitán-gold-light/90">{milestone.location}</span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-2 group-hover:text-Capitán-gold-light transition-colors">
                  {milestone.title}
                </h3>

                <p className="text-sm sm:text-base text-gray-300 mt-3 leading-relaxed">
                  {milestone.description}
                </p>
              </div>
            );

            const mediaBlock = milestone.image ? (
              <div className="group overflow-hidden rounded-2xl border border-Capitán-gold/25 hover:border-Capitán-gold/60 bg-black/50 shadow-xl transition-colors h-56 sm:h-64">
                <img
                  src={milestone.image}
                  alt={milestone.imageAlt || `${milestone.title} — ${milestone.location}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-Capitán-gold/20 bg-Capitán-dark/40 h-56 sm:h-64 flex flex-col items-center justify-center p-6 text-center">
                <span className="text-xs uppercase tracking-[0.2em] text-Capitán-gold/70 font-semibold">
                  Archivo Histórico
                </span>
                <span className="font-display text-lg text-white/75 mt-1">
                  {milestone.location}
                </span>
                <span className="text-xs text-gray-500 mt-1">{milestone.year}</span>
              </div>
            );

            return (
              <motion.article
                key={milestone.year}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 'some' }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-12 md:pl-0"
              >
                {/* Nodo central sobre la línea */}
                <motion.span
                  initial={{ scale: 0.4, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 'some' }}
                  transition={{ duration: 0.35, delay: 0.1 }}
                  aria-hidden="true"
                  className="absolute left-4 md:left-1/2 top-8 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 w-4 h-4 rounded-full bg-Capitán-red border-2 border-Capitán-gold shadow-[0_0_16px_rgba(234,179,8,0.65)] z-10"
                />

                {/* Grid de 2 columnas simétricas en desktop, apilado en mobile */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 items-center">
                  {isEven ? (
                    <>
                      <div>{cardBlock}</div>
                      <div>{mediaBlock}</div>
                    </>
                  ) : (
                    <>
                      <div className="order-2 md:order-1">{mediaBlock}</div>
                      <div className="order-1 md:order-2">{cardBlock}</div>
                    </>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </div>
  );
}