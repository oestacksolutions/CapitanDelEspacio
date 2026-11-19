import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/HomePage';
import ProductsPage from '../pages/ProductsPage';
import HistoryPage from '../pages/HistoryPage';
import ElaborationPage from '../pages/ElaborationPage';
import DistributionPage from '../pages/DistributionPage';
import ContactPage from '../pages/ContactPage';

export default function AppRouter() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/productos" element={<ProductsPage />} />
          <Route path="/historia" element={<HistoryPage />} />
          <Route path="/elaboracion" element={<ElaborationPage />} />
          <Route path="/distribucion" element={<DistributionPage />} />
          <Route path="/contacto" element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}