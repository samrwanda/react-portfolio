import { useEffect, useRef, useCallback } from 'react';
import '../styles/animations.css';
import '../styles/navbar.css';

const Navbar = ({ activeSection, isMenuOpen, setIsMenuOpen }) => {
  const isMounted = useRef(false);
  const lastWindowWidth = useRef(window.innerWidth);
  const scrollTimeoutRef = useRef(null);

  // Memoize scroll function to prevent unnecessary recreations
  const scrollToSection = useCallback((sectionId, isInitial = false) => {
    console.log(`Attempting to scroll to ${sectionId}`);

    const isMobileView = window.innerWidth <= 768;

    if (isMenuOpen && !isMobileView) {
      setIsMenuOpen(false);
      setTimeout(() => executeScroll(sectionId, isInitial), 300);
    } else {
      executeScroll(sectionId, isInitial);
    }
  }, [isMenuOpen, setIsMenuOpen]); // Add dependencies here

  const executeScroll = useCallback((sectionId, isInitial) => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      if (!isMounted.current) return;

      try {
        const section = document.getElementById(sectionId);
        if (!section) {
          console.error(`Section #${sectionId} not found!`);
          return;
        }

        const navbar = document.querySelector('.navbar');
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        const sectionPosition = section.offsetTop;
        const scrollPosition = sectionPosition - navbarHeight - 20;

        window.scrollTo({
          top: scrollPosition,
          behavior: isInitial ? 'auto' : 'smooth',
        });

        if (!isInitial) {
          setTimeout(() => {
            window.history.pushState(null, null, `#${sectionId}`);
          }, 500);
        }
      } catch (error) {
        console.error('Error during scroll:', error);
      }
    }, 100);
  }, []);

  useEffect(() => {
    isMounted.current = true;
    
    const initialHash = window.location.hash.replace('#', '');
    if (initialHash) {
      setTimeout(() => {
        scrollToSection(initialHash, true);
      }, 500);
    }

    const handleResize = () => {
      if (window.innerWidth > 768 && lastWindowWidth.current <= 768) {
        if (isMenuOpen) {
          setIsMenuOpen(false);
        }
      }
      lastWindowWidth.current = window.innerWidth;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      isMounted.current = false;
      window.removeEventListener('resize', handleResize);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [isMenuOpen, setIsMenuOpen, scrollToSection]); // Add scrollToSection to dependencies

  // ... (rest of your JSX remains exactly the same)
  return (
    <nav className="navbar">
      {/* Your existing JSX */}
    </nav>
  );
};

export default Navbar;