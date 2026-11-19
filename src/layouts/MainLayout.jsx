import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import MobileBottomNav from '../components/common/MobileBottomNav';

export default function MainLayout() {
  return (
    <div className="relative min-h-screen flex flex-col text-[#1f140d] font-sans overflow-x-clip">
      {/* Capa de fondo con difuminación suave */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="capitan-heritage-bg absolute inset-0 scale-105 blur-[3px]" />
        <div className="absolute inset-0 bg-[#fbf3e1]/25" />
      </div>

      <Navbar />
      <main className="flex-1 pb-24 md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}