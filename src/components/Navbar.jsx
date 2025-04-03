import { useEffect, useRef } from 'react';
import '../styles/animations.css';
import '../styles/navbar.css';

const Navbar = ({ activeSection, isMenuOpen, setIsMenuOpen }) => {
  // Use a ref to track if component is mounted
  const isMounted = useRef(false);
  let scrollTimeout;

  useEffect(() => {
    isMounted.current = true;
    
    // Handle initial hash routing if URL has a hash on load
    const initialHash = window.location.hash.replace('#', '');
    if (initialHash) {
      setTimeout(() => {
        scrollToSection(initialHash, true);
      }, 500); // Longer delay on initial load
    }
    
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      isMounted.current = false;
      window.removeEventListener('resize', handleResize);
    };
  }, [isMenuOpen, setIsMenuOpen]);

  // More reliable scroll function
  const scrollToSection = (sectionId, isInitial = false) => {
    console.log(`Attempting to scroll to ${sectionId}`);
    
    // Close mobile menu first
    if (isMenuOpen) {
      setIsMenuOpen(false);
      
      // Give a moment for the menu closing animation to complete
      setTimeout(() => executeScroll(sectionId, isInitial), 300);
    } else {
      executeScroll(sectionId, isInitial);
    }
  };
  
  const executeScroll = (sectionId, isInitial) => {
    if (scrollTimeout) clearTimeout(scrollTimeout);

    scrollTimeout = setTimeout(() => {
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
    }, 100); // Debounce delay
  };

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
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <ul className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
          <li className={activeSection === 'home' ? 'active' : ''}>
            <button onClick={() => scrollToSection('home')}>Home</button>
          </li>
          <li className={activeSection === 'projects' ? 'active' : ''}>
            <button onClick={() => scrollToSection('projects')}>Projects</button>
          </li>
          <li className={activeSection === 'services' ? 'active' : ''}>
            <button onClick={() => scrollToSection('services')}>Services</button>
          </li>
          <li className={activeSection === 'skills' ? 'active' : ''}>
            <button onClick={() => scrollToSection('skills')}>Skills</button>
          </li>
          <li className={activeSection === 'work' ? 'active' : ''}>
            <button onClick={() => scrollToSection('work')}>Work</button>
          </li>
          <li className={activeSection === 'contact' ? 'active' : ''}>
            <button 
              id='contact-button' 
              onClick={() => scrollToSection('contact')}
              className="contact-button"
            >
              <img src="/image/profile.png" alt="Profile" className="contact-image" />
              Hire me
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;