import { Link, useLocation, useNavigate } from 'react-router-dom';
import iconCap from '../../assets/iconcap.webp';
import { COMPANY_INFO } from '../../data/history';

const QUICK_LINKS = [
  { label: 'Inicio', to: '/', sectionId: 'inicio', type: 'section' },
  { label: 'Alfajores', to: '/#alfajores', sectionId: 'alfajores', type: 'section' },
  { label: 'Historia', to: '/#historia', sectionId: 'historia', type: 'section' },
  { label: 'Elaboración', to: '/elaboracion', type: 'route' },
  { label: 'Distribución', to: '/distribucion', type: 'route' },
  { label: 'Contacto', to: '/contacto', type: 'route' },
];

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const handleSectionClick = (e, sectionId) => {
    if (!sectionId) return;
    e.preventDefault();

    if (location.pathname === '/') {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.replaceState(null, '', `#${sectionId}`);
      }
    } else {
      navigate('/', { state: { scrollTo: sectionId } });
    }
  };

  return (
    <footer className="bg-[#fbf3e1]/95 backdrop-blur-md border-t border-[#8b1d1d]/25 text-[#3b1c12] shadow-[0_-6px_24px_rgba(38,17,10,0.08)] pb-24 md:pb-0">
      <div className="max-w-6xl mx-auto px-4 py-7">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Identidad de marca + ícono */}
          <div className="md:col-span-5 space-y-2">
            <Link
              to="/"
              onClick={(e) => handleSectionClick(e, 'inicio')}
              className="inline-flex items-center gap-3 text-[#26110a] font-display font-bold tracking-wide group"
            >
              <div className="w-11 h-11 rounded-xl bg-[#26110a] border border-[#8b1d1d]/40 flex items-center justify-center overflow-hidden shrink-0 shadow-sm group-hover:border-[#8b1d1d] transition-colors">
                <img
                  src={iconCap}
                  alt="Logo Capitán del Espacio"
                  style={{ mixBlendMode: 'lighten' }}
                  className="w-full h-full object-contain scale-[1.6]"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-base sm:text-lg leading-tight text-[#26110a]">
                  {COMPANY_INFO.companyName}
                </span>
                <span className="text-[11px] uppercase tracking-[0.18em] text-[#8b1d1d] font-bold">
                  Desde 1962 • Quilmes
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-[#8b1d1d] font-semibold italic">
              “{COMPANY_INFO.slogan}”
            </p>
            <p className="text-xs text-[#3b1c12] font-medium leading-snug max-w-sm">
              Elaboración tradicional argentina cuidando la receta, el sabor y la identidad de siempre en cada alfajor.
            </p>
          </div>

          {/* Navegación */}
          <div className="md:col-span-4">
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#8b1d1d] font-bold mb-2.5">
              Navegación
            </h3>
            <ul className="grid grid-cols-2 gap-x-5 gap-y-1.5 text-sm">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  {link.type === 'section' ? (
                    <a
                      href={link.to}
                      onClick={(e) => handleSectionClick(e, link.sectionId)}
                      className="text-[#26110a] font-medium hover:text-[#8b1d1d] transition-colors cursor-pointer"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.to}
                      className="text-[#26110a] font-medium hover:text-[#8b1d1d] transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Origen y contacto */}
          <div className="md:col-span-3 space-y-1.5">
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#8b1d1d] font-bold mb-2.5">
              Planta y Origen
            </h3>
            <p className="text-sm text-[#26110a] font-bold leading-snug">
              Quilmes, Buenos Aires
            </p>
            <p className="text-xs text-[#3b1c12] font-medium leading-snug">
              De Ezpeleta y Bernal Oeste a la fábrica de Gran Canaria en Quilmes.
            </p>
            <div className="pt-0.5">
              <Link
                to="/contacto"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#8b1d1d] hover:text-[#26110a] transition-colors"
              >
                Ir a contacto →
              </Link>
            </div>
          </div>
        </div>

        {/* Línea inferior: copyright — cinta Oestack — tradición */}
        <div className="mt-6 pt-4 border-t border-[#8b1d1d]/15 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4 text-xs text-[#4a2618] font-medium">
          <p className="order-1 text-center md:text-left">
            © {currentYear} {COMPANY_INFO.companyName}. Todos los derechos reservados.
          </p>

          {/* Cinta miniatura con borde negro clickeable hacia Oestack */}
          <a
            href="https://oestack.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Diseñado y desarrollado por Oestack"
            className="order-3 md:order-2 group relative inline-flex items-center justify-center px-2.5 py-0.5 drop-shadow-[0_0_1px_rgba(38,17,10,0.95)] transition-transform duration-200 hover:-translate-y-0.5 focus:outline-none"
          >
            {/* Cola izquierda */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -left-1.5 top-[1.5px] h-[calc(100%-1.5px)] w-2 bg-[#e6dac0] border-y border-l border-[#26110a]"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 38% 50%)',
              }}
            />
            {/* Pliegue triangular izquierdo */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-0 -bottom-[1.5px] h-[1.5px] w-1.5 bg-[#26110a]"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 100% 100%)',
              }}
            />

            {/* Cola derecha */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-1.5 top-[1.5px] h-[calc(100%-1.5px)] w-2 bg-[#e6dac0] border-y border-r border-[#26110a]"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 62% 50%, 100% 100%, 0 100%)',
              }}
            />
            {/* Pliegue triangular derecho */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-0 -bottom-[1.5px] h-[1.5px] w-1.5 bg-[#26110a]"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 0 100%)',
              }}
            />

            {/* Cuerpo miniatura de la cinta */}
            <span className="relative z-10 flex flex-col justify-center bg-[#f7edd6] border border-[#26110a] shadow-2xs px-2 py-[2px] group-hover:bg-[#fbf3e1] transition-colors">
              <span
                aria-hidden="true"
                className="w-full h-[1px] bg-[#eab308] mb-[1px]"
              />
              <span
                aria-hidden="true"
                className="w-full h-[1px] bg-[#2f6f64] mb-[1.5px]"
              />
              <span className="font-display text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.11em] text-[#8b1d1d] group-hover:text-[#6e1414] text-center leading-none whitespace-nowrap">
                Diseñado y desarrollado por Oestack
              </span>
              <span
                aria-hidden="true"
                className="w-full h-[1px] bg-[#2f6f64] mt-[1.5px]"
              />
              <span
                aria-hidden="true"
                className="w-full h-[1px] bg-[#eab308] mt-[1px]"
              />
            </span>
          </a>

          <p className="order-2 md:order-3 text-center md:text-right">
            Tradición alfajorera argentina desde 1962.
          </p>
        </div>
      </div>
    </footer>
  );
}