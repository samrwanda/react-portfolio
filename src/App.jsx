import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Services from './components/Services';
import Skills from './components/Skills';
import WorkArrangements from './components/WorkArrangements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const sections = ['home', 'projects', 'services', 'skills', 'work', 'contact'];
    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
    const scrollOffset = navbarHeight + 20; // Small additional offset

    const handleScroll = () => {
      const scrollPosition = window.scrollY + scrollOffset;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    // Add event listener
    window.addEventListener('scroll', handleScroll);
    
    // Run once on mount to set initial state
    handleScroll();

    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`app ${isMenuOpen ? 'menu-open' : ''}`}>
      <Navbar 
        activeSection={activeSection} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
      />
      <main>
        <Hero id="home" />
        <Projects id="projects" />
        <Services id="services" />
        <Skills id="skills" />
        <WorkArrangements id="work" />
        <Contact id="contact" />
      </main>
      <Footer />
    </div>
  );
}

export default App;