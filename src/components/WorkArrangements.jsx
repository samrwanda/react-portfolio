import '../styles/work.css';

const WorkArrangements = ({ id }) => {
    const arrangements = [
      {
        type: "Remote",
        description: "Fully remote collaboration with flexible working hours across time zones."
      },
      {
        type: "Onsite",
        description: "Available for onsite work in Kigali, Rwanda with flexible arrangements."
      },
      {
        type: "Freelance",
        description: "Project-based contracts with clear deliverables and timelines."
      }
    ];
  
    return (
      <section id={id} className="work-arrangements">
        <div className="section-header">
          <h2 style={{ color: "rgb(226, 218, 218)" }}>Work Arrangements</h2>
        </div>
        
        <div className="arrangements-grid">
          {arrangements.map((arrangement, index) => (
            <div key={index} className="arrangement-card">
              <h3>{arrangement.type}</h3>
              <p>{arrangement.description}</p>
              <span className="arrangement-number">{String(index + 1).padStart(2, '0')}</span>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default WorkArrangements;