import React from 'react';
import { FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon } from '../FontAwesomeIcons';


import 'bootstrap/dist/css/bootstrap.min.css';

function Footer() {
  const initiateChat = () => {

    console.log("Chat initiated");
  };

  return (
    <div >
    <div className="footer">
          <div className="contact-support">
            <h2>Contact Customer Support</h2>
            <p>Please choose your preferred method of contact:</p>
            <ul>
              <li>
                <strong>Chat:</strong> Click the chat icon below to start a conversation with our support team.
                <button onClick={initiateChat}>Start Chat</button>
              </li>
              <li>
                <strong>Email:</strong> Send an email to <a href="mailto:support@shopmate.com">support@shopmate.com</a>.
              </li>
              <li>
                <strong>Phone:</strong> Call our support hotline at <a href="tel:+1234567890">+(254) 07 000 000</a>.
              </li>
            </ul>
          </div>
    
          <div className="social-icons">
                <a href="Facebook" ><FacebookIcon/> Facebook</a>
                <a href="Twitter" ><TwitterIcon/> Twitter</a>
                <a href="Instagram" ><InstagramIcon/> Instagram</a>
                <a href="Linkedin" ><LinkedinIcon /> Linkedin</a>
              </div>
        
          </div>
        </div>
    
  );
}

export default Footer;