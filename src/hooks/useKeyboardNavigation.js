import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function isTypingTarget(target) {
  if (!target) return false;
  const tag = target.tagName;
  return (
    tag === 'INPUT' ||
    tag === 'TEXTAREA' ||
    tag === 'SELECT' ||
    target.isContentEditable
  );
}

export default function useKeyboardNavigation({
  isModalOpen = false,
  onCloseModal,
  onCarouselPrev,
  onCarouselNext,
  isCarouselActive = false,
}) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const goToSection = (sectionId) => {
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

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isModalOpen && onCloseModal) {
        e.preventDefault();
        onCloseModal();
        return;
      }

      if (isTypingTarget(e.target) || isModalOpen) {
        return;
      }

      if (!e.ctrlKey && !e.metaKey && !e.altKey) {
        if (e.key === '1') {
          e.preventDefault();
          goToSection('inicio');
          return;
        }
        if (e.key === '2') {
          e.preventDefault();
          goToSection('alfajores');
          return;
        }
        if (e.key === '3') {
          e.preventDefault();
          goToSection('historia');
          return;
        }
      }

      if (isCarouselActive) {
        if (e.key === 'ArrowLeft' && onCarouselPrev) {
          e.preventDefault();
          onCarouselPrev();
        } else if (e.key === 'ArrowRight' && onCarouselNext) {
          e.preventDefault();
          onCarouselNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    location.pathname,
    navigate,
    isModalOpen,
    onCloseModal,
    onCarouselPrev,
    onCarouselNext,
    isCarouselActive,
  ]);
}