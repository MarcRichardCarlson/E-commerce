import React from 'react';
import './Footer.css'

const Footer: React.FC = () => {
  return (
    <footer className=" text-white text-center py-3 footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Cinematography Studio</p>
      </div>
    </footer>
  );
};

export default Footer;
