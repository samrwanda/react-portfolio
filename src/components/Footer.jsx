import '../styles/footer.css';

const Footer = () => {
    return (
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span>SAM</span>
            <span>RWANDA</span>
          </div>
          
          <div className="footer-links">
            <a href="https://github.com/samrwanda" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/sam-rwanda-b526b2348?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://twitter.com/intahanabatatu9" target="_blank" rel="noopener noreferrer">Twitter</a>
          </div>
          
          <div className="footer-copyright">
            <span>© {new Date().getFullYear()} Sam Rwanda. All rights reserved.</span>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;