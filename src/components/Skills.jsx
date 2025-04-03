import React, { useEffect, useRef } from 'react';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs } from 'react-icons/fa';
import { SiPostgresql, SiFigma } from 'react-icons/si';
import '../styles/skills.css';

const Skills = ({ id }) => {
  const skillsRef = useRef(null);
  const observerRef = useRef(null);
  
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
    const currentRef = skillsRef.current;
    if (!currentRef) return;
    
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, { threshold: 0.1 });
    
    const skillCards = currentRef.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
      observerRef.current.observe(card);
    });
    
    return () => {
      if (observerRef.current) {
        // Check if the ref still exists before trying to unobserve
        if (currentRef) {
          const skillCards = currentRef.querySelectorAll('.skill-card');
          skillCards.forEach(card => {
            observerRef.current.unobserve(card);
          });
        }
        observerRef.current.disconnect();
      }
    };
  }, []); // Empty dependency array is correct here

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