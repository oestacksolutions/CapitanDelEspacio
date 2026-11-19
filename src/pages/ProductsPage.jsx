import { useState } from 'react';
import { PRODUCTS } from '../data/products';
import AlfajorCarousel3D from '../components/products/AlfajorCarousel3D';
import ProductNutritionModal from '../components/products/ProductNutritionModal';

export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <section className="py-14 px-4 max-w-6xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h1 className="font-display text-4xl font-bold text-white">Alfajores</h1>
        <p className="text-gray-300 mt-2">
          Variedades de 40g y presentación Triple x3 de 80g. Tocá un producto para ver su ficha completa.
        </p>
      </div>

      <AlfajorCarousel3D products={PRODUCTS} onSelectProduct={setSelectedProduct} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-10">
        {PRODUCTS.map((item) => (
          <div
            key={item.id}
            className="bg-Capitán-surface border border-white/10 rounded-2xl p-4 flex flex-col justify-between"
          >
            <div>
              <span className="text-xs font-semibold text-Capitán-gold">{item.weight}</span>
              <h2 className="font-display font-bold text-white text-base mt-1">{item.name}</h2>
              <p className="text-xs text-gray-300 mt-2">{item.summary}</p>
            </div>
            <button
              type="button"
              onClick={() => setSelectedProduct(item)}
              className="mt-4 py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition cursor-pointer"
            >
              Ver ficha técnica
            </button>
          </div>
        ))}
      </div>

      <ProductNutritionModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}
