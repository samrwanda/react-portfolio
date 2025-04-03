import { useState } from 'react';
import '../styles/animations.css';
import '../styles/projects.css';
const Projects = ({ id }) => {
  const [activeProject, setActiveProject] = useState(0);

  const projects = [
    {
      title: "Music Festival Management",
      description: "A comprehensive platform for managing music festivals, including artist lineups, scheduling, ticketing, and attendee management. Built with React, Node.js, and PostgreSQL.",
      tags: ["React", "Node.js", "PostgreSQL"],
      image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Scientific Calculator",
      description: "A feature-rich scientific calculator application with advanced mathematical functions, graphing capabilities, and unit conversions. Developed with pure JavaScript and CSS.",
      tags: ["JavaScript", "CSS", "HTML5"],
      image: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Amzone E-commerce",
      description: "A full-stack e-commerce platform inspired by major online retailers. Includes product listings, shopping cart, user authentication, and payment processing.",
      tags: ["React", "Express.js", "MongoDB"],
      image: "https://images.unsplash.com/photo-1557899563-1940fc95709c?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  return (
    <section id={id} className="projects">
      <div className="section-header section-header-one">
        <h2>Projects</h2>
        <div className="project-nav">
          {projects.map((_, index) => (
            <button
              key={index}
              className={`project-nav-item ${activeProject === index ? 'active' : ''}`}
              onClick={() => setActiveProject(index)}
            >
              {String(index + 1).padStart(2, '0')}
            </button>
          ))}
        </div>
      </div>
      
      <div className="project-content">
        <div className="project-info">
          <h3>{projects[activeProject].title}</h3>
          <p>{projects[activeProject].description}</p>
          <div className="project-tags">
            {projects[activeProject].tags.map((tag, index) => (
              <span key={index} className="project-tag">{tag}</span>
            ))}
          </div>
        </div>
        <div className="project-visual">
          {projects[activeProject].image ? (
            <img 
              src={projects[activeProject].image} 
              alt={projects[activeProject].title} 
              className="project-image"
            />
          ) : (
            <div className="project-image-placeholder">
              <span>Project Preview</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;