import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export default function ProductNutritionModal({ product, onClose }) {
  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl my-auto rounded-3xl border border-white/15 bg-black/65 backdrop-blur-xl p-6 sm:p-8 text-left text-Capitán-cream shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid gap-8 md:grid-cols-[240px_1fr] items-center">
          {/* Alfajor levitando */}
          <div className="flex flex-col items-center justify-center">
            <motion.img
              src={product.image}
              alt={product.name}
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-48 h-48 sm:w-56 sm:h-56 object-contain"
            />
            <motion.div
              animate={{ scale: [1, 0.84, 1], opacity: [0.6, 0.25, 0.6] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-32 h-3.5 rounded-full bg-black blur-md -mt-1"
            />
          </div>

          {/* Ingredientes y tabla nutricional */}
          <div className="space-y-5">
            <div>
              <span className="text-xs uppercase tracking-widest text-Capitán-gold font-semibold">
                {product.portion}
              </span>
              <h3 className="text-2xl font-display font-bold text-white mt-1">
                {product.name}
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                {product.registration} — {product.fatContent}
              </p>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest text-Capitán-gold font-bold mb-1.5">
                Ingredientes
              </h4>
              <p className="text-sm text-gray-200 leading-relaxed">
                {product.ingredients}
              </p>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest text-Capitán-gold font-bold mb-2">
                Información Nutricional
              </h4>
              <div className="overflow-x-auto border-t border-b border-white/15">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-gray-400 border-b border-white/15 text-xs uppercase">
                      <th className="py-2 pr-3 text-left">Nutriente / Determinación</th>
                      <th className="py-2 px-3 text-left">Resultado</th>
                      <th className="py-2 pl-3 text-left">Metodología</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {product.nutrition.map((row) => (
                      <tr key={row.label}>
                        <td className="py-2 pr-3 text-gray-200">{row.label}</td>
                        <td className="py-2 px-3 font-semibold text-Capitán-gold">
                          {row.value}
                        </td>
                        <td className="py-2 pl-3 text-gray-400">{row.method}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}