import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import iconCap from '../../assets/iconcap.webp';

const NAV_ITEMS = [
  { id: 'inicio', to: '/', hash: '#inicio', label: 'Inicio', type: 'section' },
  { id: 'alfajores', to: '/#alfajores', hash: '#alfajores', label: 'Alfajores', type: 'section' },
  { id: 'historia', to: '/#historia', hash: '#historia', label: 'Historia', type: 'section' },
  { id: 'elaboracion', to: '/elaboracion', hash: '', label: 'Elaboración', type: 'route' },
  { id: 'distribucion', to: '/distribucion', hash: '', label: 'Distribución', type: 'route' },
  { id: 'contacto', to: '/contacto', hash: '', label: 'Contacto', type: 'route' },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSectionClick = (e, item) => {
    if (item.type !== 'section') return;
    e.preventDefault();

    const targetId = item.hash.replace('#', '');

    if (location.pathname === '/') {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.replaceState(null, '', item.hash);
      }
    } else {
      navigate('/', { state: { scrollTo: targetId } });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-Capitán-dark/95 backdrop-blur border-b border-Capitán-gold/25">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link
          to="/"
          onClick={(e) => handleSectionClick(e, NAV_ITEMS[0])}
          className="flex items-center gap-3 text-white font-display font-bold tracking-wide"
        >
          <div className="w-11 h-11 flex items-center justify-center overflow-hidden shrink-0">
            <img
              src={iconCap}
              alt="Logo Capitán del Espacio"
              style={{ mixBlendMode: 'lighten' }}
              className="w-full h-full object-contain scale-[1.65]"
            />
          </div>
          <span className="text-base sm:text-lg">Capitán del Espacio</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          {NAV_ITEMS.map((item) => {
            if (item.type === 'section') {
              const isHomeSectionActive =
                location.pathname === '/' &&
                ((item.id === 'inicio' && (!location.hash || location.hash === '#inicio')) ||
                  location.hash === item.hash);

              return (
                <a
                  key={item.id}
                  href={item.to}
                  onClick={(e) => handleSectionClick(e, item)}
                  className={`transition font-medium cursor-pointer ${
                    isHomeSectionActive
                      ? 'text-Capitán-gold border-b-2 border-Capitán-gold pb-1'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              );
            }

            return (
              <NavLink
                key={item.id}
                to={item.to}
                className={({ isActive }) =>
                  `transition font-medium ${
                    isActive
                      ? 'text-Capitán-gold border-b-2 border-Capitán-gold pb-1'
                      : 'text-gray-300 hover:text-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </header>
  );
}