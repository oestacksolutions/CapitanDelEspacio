import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import paso1Img from '../assets/elaboracion/paso1.webp';
import paso2Img from '../assets/elaboracion/paso2.webp';
import paso3Img from '../assets/elaboracion/paso3.webp';
import paso4Img from '../assets/elaboracion/paso4.webp';
import paso5Img from '../assets/elaboracion/paso5.webp';
import paso6Img from '../assets/elaboracion/paso6.webp';
import paso7Img from '../assets/elaboracion/paso7.webp';

const STEPS = [
  { num: '01', src: paso1Img, alt: 'Paso 1 — Elaboración Capitán del Espacio' },
  { num: '02', src: paso2Img, alt: 'Paso 2 — Elaboración Capitán del Espacio' },
  { num: '03', src: paso3Img, alt: 'Paso 3 — Elaboración Capitán del Espacio' },
  { num: '04', src: paso4Img, alt: 'Paso 4 — Elaboración Capitán del Espacio' },
  { num: '05', src: paso5Img, alt: 'Paso 5 — Elaboración Capitán del Espacio' },
  { num: '06', src: paso6Img, alt: 'Paso 6 — Elaboración Capitán del Espacio' },
  { num: '07', src: paso7Img, alt: 'Paso 7 — Elaboración Capitán del Espacio' },
];

export default function ElaborationPage() {
  const [activeStep, setActiveStep] = useState(STEPS[0]);

  return (
    <section className="py-12 px-4 max-w-5xl mx-auto bg-transparent">
      {/* Encabezado */}
      <div className="max-w-2xl mb-8">
        <span className="text-xs uppercase tracking-[0.2em] text-[#8b1d1d] font-bold">
          Planta Quilmes — Proceso de Producción
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#26110a] mt-1.5 leading-tight drop-shadow-[0_1px_0_rgba(255,248,231,0.65)]">
          Elaboración
        </h1>
        <p className="text-[#3b1c12] font-medium mt-2 text-sm sm:text-base">
          Recorrido por las 7 etapas del proceso. Seleccioná cualquier estación para inspeccionarla en detalle.
        </p>
      </div>

      {/* Selector de estaciones tipo línea de tiempo */}
      <div className="relative mb-6">
        <div
          aria-hidden="true"
          className="hidden sm:block absolute left-6 right-6 top-1/2 -translate-y-1/2 h-[2px] bg-[#26110a]/20"
        />
        <div className="relative z-10 flex items-center justify-between gap-2 overflow-x-auto pb-2 sm:pb-0">
          {STEPS.map((step) => {
            const isSelected = activeStep.num === step.num;
            return (
              <button
                key={step.num}
                type="button"
                onClick={() => setActiveStep(step)}
                className={`group relative shrink-0 px-4 py-1.5 rounded-full font-display text-xs sm:text-sm font-bold tracking-wider transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#8b1d1d] text-[#fbf3e1] shadow-md scale-105 ring-2 ring-[#fbf3e1]'
                    : 'bg-[#fbf3e1]/90 text-[#26110a] hover:bg-[#fffaf0] border border-[#26110a]/20'
                }`}
              >
                {step.num}
              </button>
            );
          })}
        </div>
      </div>

      {/* Escenario principal del paso activo */}
      <div className="rounded-3xl bg-[#fbf3e1]/85 backdrop-blur-md border border-[#26110a]/15 p-4 sm:p-6 shadow-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep.num}
            initial={{ opacity: 0, y: 12, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.985 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="flex flex-col items-center"
          >
            <div className="w-full max-w-lg sm:max-w-xl overflow-hidden rounded-2xl border border-[#26110a]/20 shadow-md bg-[#fffaf0]">
              <img
                src={activeStep.src}
                alt={activeStep.alt}
                className="w-full max-h-[380px] object-contain mx-auto block"
              />
            </div>

            <div className="mt-4 w-full max-w-xl flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-[#3b1c12]">
              <span className="inline-flex items-center gap-1.5 font-semibold">
                <Sparkles className="w-4 h-4 text-[#8b1d1d]" />
                Etapa {activeStep.num} de {STEPS.length}
              </span>

              <div className="flex items-center gap-2">
                {STEPS.findIndex((s) => s.num === activeStep.num) > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      const i = STEPS.findIndex((s) => s.num === activeStep.num);
                      setActiveStep(STEPS[i - 1]);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-[#fffaf0] hover:bg-white text-[#26110a] font-semibold border border-[#26110a]/20 transition cursor-pointer"
                  >
                    ← Anterior
                  </button>
                )}
                {STEPS.findIndex((s) => s.num === activeStep.num) < STEPS.length - 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      const i = STEPS.findIndex((s) => s.num === activeStep.num);
                      setActiveStep(STEPS[i + 1]);
                    }}
                    className="inline-flex items-center gap-1 px-4 py-1.5 rounded-xl bg-[#8b1d1d] hover:bg-[#6e1414] text-[#fbf3e1] font-semibold transition cursor-pointer"
                  >
                    Siguiente etapa
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Tira de miniaturas limpia para saltar directo a cualquier paso */}
      <div className="mt-5 grid grid-cols-4 sm:grid-cols-7 gap-2.5">
        {STEPS.map((step) => {
          const isSelected = activeStep.num === step.num;
          return (
            <button
              key={step.num}
              type="button"
              onClick={() => setActiveStep(step)}
              className={`group relative overflow-hidden rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? 'border-[#8b1d1d] ring-2 ring-[#8b1d1d]/40 scale-[1.02]'
                  : 'border-[#26110a]/15 opacity-75 hover:opacity-100'
              }`}
            >
              <img
                src={step.src}
                alt={step.alt}
                loading="lazy"
                className="w-full aspect-[4/3] object-cover block"
              />
            </button>
          );
        })}
      </div>
    </section>
  );
}