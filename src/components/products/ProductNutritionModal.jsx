import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export default function ProductNutritionModal({ product, onClose }) {
  useEffect(() => {
    if (!product) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="nutrition-modal-title"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start sm:items-center justify-center p-3 sm:p-6 py-6 sm:py-10 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[88dvh] overflow-y-auto rounded-2xl sm:rounded-3xl border border-[#fbf3e1]/20 bg-[#26110a]/95 backdrop-blur-xl p-4 sm:p-8 text-left text-[#fbf3e1] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar modal"
          className="sticky top-0 float-right z-20 p-2 rounded-full bg-[#fbf3e1]/10 hover:bg-[#fbf3e1]/20 text-[#fbf3e1] transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid gap-6 md:gap-8 md:grid-cols-[240px_1fr] items-center clear-both">
          {/* Alfajor levitando */}
          <div className="flex flex-col items-center justify-center pt-1 sm:pt-0">
            <motion.img
              src={product.image}
              alt={product.name}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-36 h-36 sm:w-52 sm:h-52 object-contain"
            />
            <motion.div
              animate={{ scale: [1, 0.84, 1], opacity: [0.6, 0.25, 0.6] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-24 sm:w-32 h-3 rounded-full bg-black/80 blur-md -mt-1"
            />
          </div>

          {/* Ingredientes y tabla nutricional */}
          <div className="space-y-4 sm:space-y-5 min-w-0">
            <div className="pr-8 sm:pr-0">
              <span className="text-[11px] sm:text-xs uppercase tracking-widest text-[#f3c669] font-semibold">
                {product.portion}
              </span>
              <h3
                id="nutrition-modal-title"
                className="text-xl sm:text-2xl font-display font-bold text-[#fbf3e1] mt-1 leading-snug"
              >
                {product.name}
              </h3>
              <p className="text-xs text-[#fbf3e1]/70 mt-1 break-words">
                {product.registration} — {product.fatContent}
              </p>
            </div>

            <div>
              <h4 className="text-[11px] sm:text-xs uppercase tracking-widest text-[#f3c669] font-bold mb-1">
                Ingredientes
              </h4>
              <p className="text-xs sm:text-sm text-[#fbf3e1]/90 leading-relaxed">
                {product.ingredients}
              </p>
            </div>

            <div>
              <h4 className="text-[11px] sm:text-xs uppercase tracking-widest text-[#f3c669] font-bold mb-2">
                Información Nutricional
              </h4>
              <div className="overflow-x-auto border-t border-b border-[#fbf3e1]/15 -mx-1 px-1 sm:mx-0 sm:px-0">
                <table className="w-full text-xs sm:text-sm">
                  <thead>
                    <tr className="text-[#fbf3e1]/70 border-b border-[#fbf3e1]/15 text-[10px] sm:text-xs uppercase">
                      <th className="py-2 pr-2 sm:pr-3 text-left font-semibold">
                        Nutriente / Determinación
                      </th>
                      <th className="py-2 px-2 sm:px-3 text-left font-semibold whitespace-nowrap">
                        Resultado
                      </th>
                      <th className="py-2 pl-2 sm:pl-3 text-left font-semibold">
                        Metodología
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#fbf3e1]/10">
                    {product.nutrition.map((row) => (
                      <tr key={row.label}>
                        <td className="py-2 pr-2 sm:pr-3 text-[#fbf3e1]/90">
                          {row.label}
                        </td>
                        <td className="py-2 px-2 sm:px-3 font-semibold text-[#f3c669] whitespace-nowrap">
                          {row.value}
                        </td>
                        <td className="py-2 pl-2 sm:pl-3 text-[#fbf3e1]/70">
                          {row.method}
                        </td>
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