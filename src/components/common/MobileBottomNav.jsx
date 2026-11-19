import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Home, Cookie, History, Factory, Phone } from 'lucide-react';

const NAV_ITEMS = [
  {
    key: 'inicio',
    label: 'Inicio',
    to: '/',
    hashTarget: 'inicio',
    icon: Home,
  },
  {
    key: 'alfajores',
    label: 'Alfajores',
    to: '/',
    hashTarget: 'alfajores',
    icon: Cookie,
  },
  {
    key: 'historia',
    label: 'Historia',
    to: '/',
    hashTarget: 'historia',
    icon: History,
  },
  {
    key: 'elaboracion',
    label: 'Proceso',
    to: '/elaboracion',
    icon: Factory,
  },
  {
    key: 'contacto',
    label: 'Contacto',
    to: '/contacto',
    icon: Phone,
  },
];

export default function MobileBottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleHomeSectionClick = (e, item) => {
    if (!item.hashTarget) return;
    e.preventDefault();

    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: item.hashTarget } });
      return;
    }

    const el = document.getElementById(item.hashTarget);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', `#${item.hashTarget}`);
    } else if (item.hashTarget === 'inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isItemActive = (item) => {
    if (item.hashTarget) {
      if (location.pathname !== '/') return false;
      const currentHash = location.hash.replace('#', '') || 'inicio';
      return currentHash === item.hashTarget;
    }
    return location.pathname === item.to;
  };

  return (
    <nav
      aria-label="Navegación inferior móvil"
      className="md:hidden fixed bottom-3 inset-x-3 z-40 pointer-events-none"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="pointer-events-auto mx-auto max-w-md rounded-2xl bg-[#fbf3e1]/95 backdrop-blur-md border border-[#8b1d1d]/30 shadow-[0_10px_28px_rgba(38,17,10,0.28)] px-2 py-1.5">
        <ul className="grid grid-cols-5 items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isItemActive(item);

            if (item.hashTarget) {
              return (
                <li key={item.key} className="flex justify-center">
                  <a
                    href={`#${item.hashTarget}`}
                    onClick={(e) => handleHomeSectionClick(e, item)}
                    aria-current={active ? 'page' : undefined}
                    className={`w-full flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all cursor-pointer ${
                      active
                        ? 'bg-[#8b1d1d] text-[#fbf3e1] shadow-sm'
                        : 'text-[#3b1c12] hover:bg-[#f3e1b8]/70'
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 transition-transform ${
                        active ? 'scale-105 stroke-[2.4]' : 'stroke-[1.9]'
                      }`}
                    />
                    <span className="mt-0.5 text-[10px] font-semibold leading-none tracking-tight truncate max-w-full">
                      {item.label}
                    </span>
                  </a>
                </li>
              );
            }

            return (
              <li key={item.key} className="flex justify-center">
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `w-full flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all ${
                      isActive
                        ? 'bg-[#8b1d1d] text-[#fbf3e1] shadow-sm'
                        : 'text-[#3b1c12] hover:bg-[#f3e1b8]/70'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        className={`w-4 h-4 transition-transform ${
                          isActive ? 'scale-105 stroke-[2.4]' : 'stroke-[1.9]'
                        }`}
                      />
                      <span className="mt-0.5 text-[10px] font-semibold leading-none tracking-tight truncate max-w-full">
                        {item.label}
                      </span>
                    </>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}