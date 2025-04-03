import React from 'react';
import '../styles/services.css'; // Create this CSS file for service-specific styles

const Services = ({ id }) => {
  const services = [
    {
      title: "Crafting Digital Experiences",
      subtitle: "End-to-End Web Solutions: Strategy, Design, and Development.",
      description: "From concept to launch, I specialize in creating modern, responsive, and user-friendly websites tailored to your business needs. Whether you're starting fresh or enhancing an existing platform, I deliver solutions that drive results.",
      icon: "🛠️",
      linkText: "View projects →",
      link: "#projects"
    },
    {
      title: "Frontend Engineering",
      subtitle: "Transform designs into flawless interactive experiences",
      description: "Specializing in React ecosystem with TypeScript. Performance-optimized, accessible, and responsive implementations tailored to your needs.",
      icon: "💻",
      linkText: "See technologies +",
      link: "#skills",
      expandable: true
    },
    {
      title: "Technical Consulting",
      subtitle: "Architecture review and team leadership guidance",
      description: "Leverage my experience as a tech lead to solve complex challenges, optimize workflows, and elevate your team's output quality.",
      icon: "📈",
      linkText: "Get consultation ↗",
      link: "#contact",
      external: true
    }
  ];

  return (
    <section id={id} className="services-section">
      <div className="services-pattern-overlay"></div>
      
      <div className="services-content-wrapper">
        <div className="section-header-container">
          <h2 className="section-title">Services</h2>
          <p className="section-subtitle">What I can do for you</p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card" 
                 data-aos="fade-up" 
                 data-aos-delay={index * 100}>
              <div className="card-icon">{service.icon}</div>
              <h3 className="card-title">{service.title}</h3>
              <p className="card-subtitle">{service.subtitle}</p>
              <p className="card-description">{service.description}</p>
              
              <a 
                href={service.link} 
                className={`card-link ${service.expandable ? 'expandable' : ''} ${service.external ? 'external' : ''}`}
                target={service.external ? "_blank" : "_self"}
                rel="noopener noreferrer"
              >
                {service.linkText}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;