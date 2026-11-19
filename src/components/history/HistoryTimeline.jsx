import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { HISTORY_MILESTONES, COMPANY_INFO } from '../../data/history';

export default function HistoryTimeline({ showHeader = true, headingTag = 'h2' }) {
  const containerRef = useRef(null);
  const Heading = headingTag;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 78%', 'end 68%'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <div ref={containerRef} className="relative">
      {showHeader && (
        <div className="text-center max-w-2xl mx-auto mb-12 rounded-2xl bg-[#fbf3e1]/92 backdrop-blur-md border border-[#8b1d1d]/25 px-6 py-5 shadow-md">
          <span className="text-xs uppercase tracking-[0.22em] text-[#8b1d1d] font-bold">
            {COMPANY_INFO.companyName}
          </span>
          <Heading className="font-display text-3xl sm:text-4xl font-bold text-[#26110a] mt-1.5">
            Nuestra Historia
          </Heading>
          <p className="text-[#8b1d1d] font-semibold italic mt-1.5 text-base sm:text-lg">
            “{COMPANY_INFO.slogan}”
          </p>
        </div>
      )}

      <div className="relative max-w-5xl mx-auto">
        {/* Guía base visible sobre fondo claro/difuminado */}
        <div
          aria-hidden="true"
          className="absolute left-4 md:left-1/2 top-2 bottom-2 w-[2px] -translate-x-1/2 bg-[#26110a]/15"
        />

        {/* Guía que se va dibujando con el scroll */}
        <motion.div
          aria-hidden="true"
          style={{ scaleY, transformOrigin: 'top' }}
          className="absolute left-4 md:left-1/2 top-2 bottom-2 w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#8b1d1d] via-[#a82424] to-[#26110a]"
        />

        <div className="space-y-12 md:space-y-14">
          {HISTORY_MILESTONES.map((milestone, index) => {
            // Par (0, 2): Tarjeta izquierda + Foto derecha
            // Impar (1, 3): Foto izquierda + Tarjeta derecha
            const isEven = index % 2 === 0;

            const cardBlock = (
              <div
                className={`group rounded-2xl bg-[#fbf3e1]/95 backdrop-blur-md border border-[#8b1d1d]/25 hover:border-[#8b1d1d]/60 p-5 sm:p-6 shadow-lg transition-all h-full flex flex-col justify-center ${
                  isEven ? 'md:text-right' : 'md:text-left'
                }`}
              >
                <div
                  className={`flex flex-wrap items-center gap-2 text-xs uppercase tracking-wider font-bold text-[#8b1d1d] ${
                    isEven ? 'md:justify-end' : 'md:justify-start'
                  }`}
                >
                  <span className="px-2.5 py-0.5 rounded-full bg-[#8b1d1d] text-[#fbf3e1]">
                    {milestone.year}
                  </span>
                  <span className="text-[#26110a]/40">•</span>
                  <span className="text-[#3b1c12] font-bold">{milestone.location}</span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#26110a] mt-2.5 group-hover:text-[#8b1d1d] transition-colors">
                  {milestone.title}
                </h3>

                <p className="text-sm sm:text-base text-[#26110a]/90 font-medium mt-2.5 leading-relaxed">
                  {milestone.description}
                </p>
              </div>
            );

            const mediaBlock = milestone.image ? (
              <div className="group overflow-hidden rounded-2xl border border-[#8b1d1d]/25 hover:border-[#8b1d1d]/60 bg-[#fbf3e1] shadow-lg transition-all h-56 sm:h-64">
                <img
                  src={milestone.image}
                  alt={milestone.imageAlt || `${milestone.title} — ${milestone.location}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-[#8b1d1d]/35 bg-[#fbf3e1]/90 backdrop-blur-md h-56 sm:h-64 flex flex-col items-center justify-center p-6 text-center shadow-md">
                <span className="text-xs uppercase tracking-[0.2em] text-[#8b1d1d] font-bold">
                  Archivo Histórico
                </span>
                <span className="font-display text-lg font-bold text-[#26110a] mt-1">
                  {milestone.location}
                </span>
                <span className="text-xs font-semibold text-[#3b1c12] mt-1">{milestone.year}</span>
              </div>
            );

            return (
              <motion.article
                key={milestone.year}
                initial={{ opacity: 0, y: 26, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 'some' }}
                transition={{
                  duration: 0.45,
                  delay: Math.min(index * 0.06, 0.24),
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -2 }}
                className="relative pl-11 md:pl-0"
              >
                {/* Nodo central sobre la línea */}
                <motion.span
                  initial={{ scale: 0.3, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 'some' }}
                  transition={{ duration: 0.35, delay: 0.08 }}
                  aria-hidden="true"
                  className="absolute left-4 md:left-1/2 top-8 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 w-4 h-4 rounded-full bg-[#8b1d1d] border-2 border-[#fbf3e1] shadow-[0_0_0_3px_rgba(139,29,29,0.25)] z-10"
                />

                {/* Grid de 2 columnas simétricas en desktop, apilado en mobile */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-16 items-center">
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