import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Truck } from 'lucide-react';
import { COMPANY_INFO } from '../data/history';
import camion1Img from '../assets/distribution/camion1.webp';
import camion2Img from '../assets/distribution/camion2.webp';

const FLEET_IMAGES = [
  {
    src: camion1Img,
    alt: 'Unidad de transporte de distribución — Capitán del Espacio (1)',
    label: 'Unidad 01',
  },
  {
    src: camion2Img,
    alt: 'Unidad de transporte de distribución — Capitán del Espacio (2)',
    label: 'Unidad 02',
  },
];

export default function DistributionPage() {
  return (
    <section className="py-14 px-4 max-w-5xl mx-auto bg-transparent">
      <div className="mb-4">
        <span className="text-xs uppercase tracking-[0.2em] text-[#8b1d1d] font-bold">
          Logística y Abastecimiento — Quilmes, Buenos Aires
        </span>
        <div className="flex items-center gap-3 mt-1.5">
          <Truck className="w-7 h-7 sm:w-8 sm:h-8 text-[#8b1d1d] shrink-0" />
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#26110a] leading-tight drop-shadow-[0_1px_0_rgba(255,248,231,0.65)]">
            Distribución
          </h1>
        </div>
      </div>

      <p className="text-[#3b1c12] font-medium leading-relaxed max-w-3xl text-sm sm:text-base">
        Transporte de productos alimenticios operado por {COMPANY_INFO.companyName}, acercando cada tanda con el lema “{COMPANY_INFO.slogan}”.
      </p>

      {/* Aviso mayorista + enlace a contacto */}
      <div className="mt-6 rounded-2xl bg-[#fbf3e1]/90 backdrop-blur-md border border-[#8b1d1d]/25 shadow-md p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-sm sm:text-base text-[#26110a] font-medium leading-relaxed">
          La forma de distribución es pura y exclusivamente a distribuidores mayoristas de golosinas.
        </p>
        <Link
          to="/contacto"
          className="inline-flex items-center justify-center shrink-0 px-5 py-2.5 rounded-xl bg-[#8b1d1d] hover:bg-[#6e1414] text-[#fcf2dc] font-bold text-sm border border-Capitán-gold/60 shadow-sm transition"
        >
          Consúltenos aquí →
        </Link>
      </div>

      {/* Imágenes de la flota */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {FLEET_IMAGES.map((truck, idx) => (
          <motion.figure
            key={truck.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 0.45, delay: idx * 0.1 }}
            className="group overflow-hidden rounded-2xl bg-[#fbf3e1]/90 border border-[#8b1d1d]/25 hover:border-[#8b1d1d]/55 shadow-lg transition-colors"
          >
            <div className="aspect-[16/10] overflow-hidden bg-[#26110a]/10">
              <img
                src={truck.src}
                alt={truck.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}