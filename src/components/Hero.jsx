import { useEffect, useState } from 'react';
import '../styles/animations.css';
import '../styles/hero.css';

const Hero = ({ id }) => {
  const [currentWord, setCurrentWord] = useState(0);
  const words = ['website', 'design', 'brand'];
  
  useEffect(() => {
    const letters = document.querySelectorAll('.hero-title span');
    letters.forEach((letter, index) => {
      letter.style.animationDelay = `${index * 0.1}s`;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <section id={id} className="hero fade-in-slide-up">
      <div className="hero-content">
        <div className="rotating-header">
          <h1 className="static-text">Looking for a</h1>
          <div className="rotating-words">
            {words.map((word, index) => (
              <h1 
                key={word}
                className={`rotating-word ${index === currentWord ? 'active' : ''}`}
              >
                {word}
              </h1>
            ))}
          </div>
        </div>
        <span className="line-break"></span>
        <h1 className="static-text-two">for your business?</h1>
        <div className="hero-subtitle slide-in">
          <p>
            Are you looking for a skilled full-stack developer to bring your ideas to life? I specialize in creating custom, user-friendly web applications that not only meet but exceed your business goals.
          </p>
        </div>
      </div>
      <div className="hero-background animated-overlay">
        <div className="background-overlay"></div>
      </div>
    </section>
  );
};

export default Hero;