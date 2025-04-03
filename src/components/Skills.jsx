import React, { useEffect, useRef } from 'react';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs } from 'react-icons/fa';
import { SiPostgresql, SiFigma } from 'react-icons/si';  // Removed SiExpress import
import '../styles/skills.css';

const Skills = ({ id }) => {
  const skillsRef = useRef(null);
  const skills = [
    { name: "HTML5", icon: <FaHtml5 size={40} color="#E34F26" />, size: "large"},
    { name: "CSS", icon: <FaCss3Alt size={32} color="#1572B6" />, size: "medium-one" },
    { name: "JavaScript", icon: <FaJs size={32} color="#F7DF1E" />, size: "medium" },
    { name: "React", icon: <FaReact size={32} color="#61DAFB" />, size: "medium" },
    { name: "Node.js", icon: <FaNodeJs size={32} color="#339933" />, size: "small-one" },
    { name: "PostgreSQL", icon: <SiPostgresql size={32} color="#336791" />, size: "medium postgresql" },
    { name: "Figma", icon: <SiFigma size={32} color="#F24E1E" />, size: "medium figma" }
  ];
  
  useEffect(() => {
    // Need to check if skillsRef.current exists
    if (!skillsRef.current) return;
    
    // Create intersection observer once the component mounts
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, { threshold: 0.1 });
    
    // Select all skill cards within this component
    const skillCards = skillsRef.current.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
      observer.observe(card);
    });
    
    // Cleanup observer on component unmount
    return () => {
      if (observer) {
        // Explicit check if skillCards are still available
        if (skillsRef.current) {
          const skillCards = skillsRef.current.querySelectorAll('.skill-card');
          skillCards.forEach(card => {
            observer.unobserve(card);
          });
        } else {
          observer.disconnect();
        }
      }
    };
  }, []); // Empty dependency array means this runs once on mount

  return (
    <section id={id} className="skills-masonry" ref={skillsRef}>
      <div className="section-header">
        <h2>Skills & Expertise</h2>
      </div>
      
      <div className="skills-grid">
        {skills.map((skill, index) => (
          <div 
            key={index}
            className={`skill-card ${skill.size}`}
          >
            <div className="skill-icon">{skill.icon}</div>
            <h3>{skill.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
