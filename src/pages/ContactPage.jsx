import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import iconCap from '../assets/iconcap.webp';
import { COMPANY_INFO } from '../data/history';

const QUILMES_COORDS = [-34.717222, -58.266982];
const GOOGLE_MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=-34.717222,-58.266982';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: QUILMES_COORDS,
      zoom: 16,
      scrollWheelZoom: false,
      attributionControl: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    const captainPinIcon = L.divIcon({
      className: 'Capitán-custom-pin',
      html: `
        <div style="
          width: 48px;
          height: 48px;
          border-radius: 9999px;
          background: #14171f;
          border: 2px solid #eab308;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.65), 0 0 14px rgba(234, 179, 8, 0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          cursor: pointer;
        ">
          <img
            src="${iconCap}"
            alt="Capitán del Espacio"
            style="width: 100%; height: 100%; object-fit: contain; transform: scale(1.55); mix-blend-mode: lighten;"
          />
        </div>
      `,
      iconSize: [48, 48],
      iconAnchor: [24, 24],
    });

    const marker = L.marker(QUILMES_COORDS, { icon: captainPinIcon }).addTo(map);
    marker.on('click', () => {
      window.open(GOOGLE_MAPS_URL, '_blank', 'noopener,noreferrer');
    });

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section className="py-14 px-4 max-w-5xl mx-auto bg-transparent">
      <span className="text-xs uppercase tracking-[0.2em] text-[#8b1d1d] font-bold">
        Atención Directa — Quilmes, Buenos Aires
      </span>
      <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#26110a] mt-1.5 leading-tight drop-shadow-[0_1px_0_rgba(255,248,231,0.65)]">
        Contacto
      </h1>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6">
          {sent ? (
            <div className="bg-[#fbf3e1]/90 backdrop-blur-md border border-[#8b1d1d]/30 rounded-2xl p-6 text-[#3b1c12] shadow-md">
              <p className="font-bold text-[#26110a]">Consulta registrada en la vista.</p>
              <p className="text-sm text-[#47291c] mt-1">
                Cuando conectemos backend o servicio de correo, este formulario enviará los mensajes automáticamente.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSent(false);
                  setFormData({ name: '', email: '', message: '' });
                }}
                className="mt-4 px-4 py-2 rounded-lg bg-[#8b1d1d] hover:bg-[#6e1414] text-[#fcf2dc] text-xs font-semibold border border-Capitán-gold/50 transition cursor-pointer"
              >
                Enviar otra consulta
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-4 bg-[#fbf3e1]/90 backdrop-blur-md border border-[#8b1d1d]/25 rounded-2xl p-6 shadow-md"
            >
              <div>
                <label className="block text-sm font-semibold text-[#26110a] mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg bg-[#fffaf0] border border-[#9c6b21]/35 px-3.5 py-2 text-[#26110a] text-sm focus:outline-none focus:border-[#8b1d1d]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#26110a] mb-1">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-lg bg-[#fffaf0] border border-[#9c6b21]/35 px-3.5 py-2 text-[#26110a] text-sm focus:outline-none focus:border-[#8b1d1d]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#26110a] mb-1">
                  Mensaje
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-lg bg-[#fffaf0] border border-[#9c6b21]/35 px-3.5 py-2 text-[#26110a] text-sm focus:outline-none focus:border-[#8b1d1d]"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-[#8b1d1d] hover:bg-[#6e1414] text-[#fcf2dc] font-bold text-sm border border-Capitán-gold/60 shadow-sm transition cursor-pointer"
              >
                Enviar mensaje
              </button>
            </form>
          )}
        </div>

        <div className="lg:col-span-6 space-y-6">
          <div className="bg-[#fbf3e1]/90 backdrop-blur-md border border-[#8b1d1d]/25 rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-[#3b1c12] shadow-md">
            <div className="space-y-1.5">
              <p className="text-xs uppercase tracking-wider font-bold text-[#8b1d1d]">
                Horario de atención
              </p>
              <p>Lunes a viernes de 8 a 17 hs.</p>
              <p>Sábado de 8 a 12 hs</p>
              <p className="pt-1 font-medium">Tel 4253.5224</p>
              <p className="font-medium">TelFax. 4224.0904</p>
              <p className="pt-1 text-xs uppercase tracking-wider font-bold text-[#8b1d1d]">
                INDUSTRIA ARGENTINA
              </p>
            </div>

            <div className="space-y-1.5">
              <p className="text-xs uppercase tracking-wider font-bold text-[#8b1d1d]">
                Elaborado por:
              </p>
              <p className="font-bold text-[#26110a]">Capitán del Espacio S.A</p>
              <p>Gran Canaria 350 - Quilmes</p>
              <p>Pcia de Buenos Aires.</p>
              <a
                href="mailto:info@Capitándelespaciomr.com.ar"
                className="inline-block pt-1 font-semibold text-[#8b1d1d] hover:underline break-all"
              >
                info@capitandelespaciomr.com.ar
              </a>
            </div>
          </div>

          <div className="bg-[#fbf3e1]/90 border border-[#8b1d1d]/25 rounded-2xl overflow-hidden shadow-md">
            <div ref={mapContainerRef} className="w-full h-72 z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}