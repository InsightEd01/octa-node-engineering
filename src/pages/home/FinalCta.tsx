import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { contactEmail } from './homeData';

const FinalCta: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const goToContact = () => {
    const value = email.trim();
    navigate(value ? `/contact?email=${encodeURIComponent(value)}` : '/contact');
  };

  return (
    <section id="contact" className="octa-final-cta">
      <div className="octa-final-content">
        <span>Engineering stack ready</span>
        <h2>Bring the next product workflow into production.</h2>
        <p>
          Share the business problem, the audience, and the operational flow. We can map the
          right product path or custom engineering route from there.
        </p>
        <div className="octa-final-form">
          <label htmlFor="cta-email" className="sr-only">Business email address</label>
          <input
            id="cta-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                goToContact();
              }
            }}
            placeholder="Business email address"
            autoComplete="email"
          />
          <button type="button" onClick={goToContact}>Contact Octa Node</button>
        </div>
        <div className="octa-contact-strip">
          <a href="tel:+2349028267223">+234 902 826 7223</a>
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          <span>Ondo State, Nigeria</span>
        </div>
      </div>
    </section>
  );
};

export default FinalCta;
