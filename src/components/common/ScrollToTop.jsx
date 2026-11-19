import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;

    const scrollTopNow = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    scrollTopNow();
    const rafId = requestAnimationFrame(() => {
      scrollTopNow();
    });

    return () => cancelAnimationFrame(rafId);
  }, [pathname, hash]);

  return null;
}