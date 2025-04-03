import { useState } from 'react';
import '../styles/contact.css';

const Contact = ({ id }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://formspree.io/f/mrbpbjzo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowPopup(true); // Show popup on success
        setFormData({ name: '', email: '', message: '' });

        // Hide popup after 3 seconds
        setTimeout(() => setShowPopup(false), 3000);
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      alert('Error submitting form. Please check your connection.');
    }
  };

  return (
    <section id={id} className="contact">
      <div className="contact-content">
        <div className="contact-info">
          <h3 style={{ color: "rgb(207, 204, 204)" }}>Get in Touch</h3>
          <p style={{ color: "rgb(207, 204, 204)" }}>
            Have a project in mind or want to discuss potential opportunities? Feel free to reach out.
          </p>
          <div className="contact-details">
            
            <span style={{ color: "rgb(207, 204, 204)" }}>Kigali, Rwanda</span>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              style={{ resize: "none" }}
            ></textarea>
          </div>
          <button type="submit" className="submit-button">
            Send Message
          </button>
        </form>
      </div>

      {/* Popup Confirmation */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <p>Message Sent Successfully!</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;
