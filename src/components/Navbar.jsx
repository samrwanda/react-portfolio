import { useEffect, useRef, useCallback } from 'react';
import '../styles/animations.css';
import '../styles/navbar.css';

const Navbar = ({ activeSection, isMenuOpen, setIsMenuOpen }) => {
  const isMounted = useRef(false);
  const lastWindowWidth = useRef(window.innerWidth);
  const scrollTimeoutRef = useRef(null);

  // Memoized scroll function with proper dependencies
  const executeScroll = useCallback((sectionId, isInitial = false) => {
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
        const navbarHeight = navbar?.offsetHeight || 0;
        const scrollPosition = section.offsetTop - navbarHeight - 20;

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
        console.error('Scroll error:', error);
      }
    }, 100);
  }, []);

  // Memoized main scroll handler
  const scrollToSection = useCallback((sectionId, isInitial = false) => {
    const isMobileView = window.innerWidth <= 768;

    if (isMenuOpen && !isMobileView) {
      setIsMenuOpen(false);
      setTimeout(() => executeScroll(sectionId, isInitial), 300);
    } else {
      executeScroll(sectionId, isInitial);
    }
  }, [isMenuOpen, setIsMenuOpen, executeScroll]);

  // Setup and cleanup effects
  useEffect(() => {
    isMounted.current = true;

    // Handle initial hash routing
    const initialHash = window.location.hash.replace('#', '');
    if (initialHash) {
      setTimeout(() => scrollToSection(initialHash, true), 500);
    }

    // Responsive menu handler
    const handleResize = () => {
      if (window.innerWidth > 768 && lastWindowWidth.current <= 768 && isMenuOpen) {
        setIsMenuOpen(false);
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
  }, [isMenuOpen, setIsMenuOpen, scrollToSection]);

  // Navbar links data
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'services', label: 'Services' },
    { id: 'skills', label: 'Skills' },
    { id: 'work', label: 'Work' },
    { 
      id: 'contact', 
      label: 'Hire me',
      icon: '/image/profile.png',
      className: 'contact-button'
    }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <span>SAM</span>
          <span>RWANDA</span>
        </div>
        
        <button 
          className={`hamburger ${isMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
        
        <ul className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <li 
              key={item.id}
              className={activeSection === item.id ? 'active' : ''}
            >
              <a 
                href={`#${item.id}`} 
                className={item.className}
                onClick={() => setIsMenuOpen(false)} // Close the menu on click
              >
                {item.icon && (
                  <img 
                    src={item.icon} 
                    alt="Profile" 
                    className="contact-image" 
                  />
                )}
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;