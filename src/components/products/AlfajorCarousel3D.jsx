import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Pagination, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const FLOAT_MASK_STYLE = {
  WebkitMaskImage:
    'radial-gradient(ellipse 80% 82% at 50% 48%, #000 65%, rgba(0, 0, 0, 0.7) 85%, transparent 100%)',
  maskImage:
    'radial-gradient(ellipse 80% 82% at 50% 48%, #000 65%, rgba(0, 0, 0, 0.7) 85%, transparent 100%)',
};

export default function AlfajorCarousel3D({ products = [], onSelectProduct }) {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeProduct = products[activeIndex] ?? products[0] ?? null;

  const handleKeyDown = (e) => {
    const tag = e.target?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || e.target?.isContentEditable) {
      return;
    }

    const swiper = swiperRef.current;
    if (!swiper) return;

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      swiper.slidePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      swiper.slideNext();
    } else if (e.key === 'Enter' && onSelectProduct && activeProduct) {
      e.preventDefault();
      onSelectProduct(activeProduct);
    }
  };

  return (
    <div
      tabIndex={0}
      role="region"
      aria-roledescription="carrusel"
      aria-label="Variedades de alfajores Capitán del Espacio"
      onKeyDown={handleKeyDown}
      className="w-full py-6 relative z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8b1d1d]/50 rounded-2xl flex flex-col items-center"
      style={{
        '--swiper-theme-color': '#8b1d1d',
        '--swiper-navigation-size': '28px',
      }}
    >
      <p className="sr-only">
        Usá las flechas izquierda y derecha para cambiar de alfajor y Enter para ver ingredientes y nutrientes.
      </p>

      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        initialSlide={0}
        watchSlidesProgress={true}
        loop={products.length > 2}
        keyboard={{ enabled: true, onlyInViewport: true }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          requestAnimationFrame(() => {
            swiper.slideToLoop(0, 0, false);
            setActiveIndex(0);
          });
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex ?? swiper.activeIndex ?? 0);
        }}
        coverflowEffect={{
          rotate: 26,
          stretch: 0,
          depth: 190,
          modifier: 1.4,
          slideShadows: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[EffectCoverflow, Pagination, Navigation, Keyboard]}
        className="w-full max-w-5xl !pb-10"
      >
        {products.map((item, idx) => (
          <SwiperSlide
            key={item.id}
            className="!w-72 sm:!w-80 bg-transparent flex flex-col items-center text-center px-3 select-none"
          >
            <div className="relative w-60 h-60 sm:w-64 sm:h-64 flex flex-col items-center justify-center">
              <div
                aria-hidden="true"
                className="absolute inset-4 rounded-full pointer-events-none blur-2xl opacity-45"
                style={{
                  background:
                    'radial-gradient(circle, rgba(251,243,225,0.75) 0%, rgba(234,179,8,0.22) 55%, transparent 78%)',
                }}
              />

              <motion.img
                src={item.image}
                alt={item.name}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3.4 + idx * 0.35,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={FLOAT_MASK_STYLE}
                className="relative z-10 w-full h-full object-contain pointer-events-none drop-shadow-[0_10px_14px_rgba(38,17,10,0.28)]"
              />

              <motion.div
                animate={{ scale: [1, 0.85, 1], opacity: [0.45, 0.22, 0.45] }}
                transition={{
                  duration: 3.4 + idx * 0.35,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-36 h-4 rounded-full bg-[#3b1c12]/50 blur-md -mt-2"
              />
            </div>

            <h3 className="text-lg font-display font-bold text-[#26110a] mt-0.5 drop-shadow-[0_1px_0_rgba(251,243,225,0.6)]">
              {item.shortName}
            </h3>
            <p className="text-xs text-[#3b1c12] font-medium mt-1 line-clamp-2 max-w-[260px]">
              {item.summary}
            </p>
          </SwiperSlide>
        ))}
      </Swiper>

      {onSelectProduct && activeProduct && (
        <button
          type="button"
          onClick={() => onSelectProduct(activeProduct)}
          className="Capitán-ribbon-btn mt-3 text-xs sm:text-sm font-display font-bold uppercase tracking-wider cursor-pointer"
        >
          <span aria-hidden="true" className="Capitán-ribbon-tail-left" />
          Ver ingredientes y nutrientes
          <span aria-hidden="true" className="Capitán-ribbon-tail-right" />
        </button>
      )}
    </div>
  );
}