import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const heroTerms = [
  'Software',
  'Hardware',
  'Artificial Intelligence',
  'Automation',
  'Education',
  'Fashion',
  'E-Comerce',
  'Employee Workforce',
  'Banking Systems',
];

const heroImages = [
  { src: '/assets/hero-stylus-ai.png', alt: 'Stylus AI exam grading product preview' },
  { src: '/assets/hero-stylus-ai-2.png', alt: 'Octa Node product preview on a laptop' },
];

const heroHighlights = [
  { label: 'Stylus AI · Grading', value: 'Seconds, not minutes', position: 0 },
  { label: 'WorkSpot · Attendance', value: 'Geo-verified logs', position: 1 },
  { label: 'TI-BOT · Scheduling', value: 'Zero missed bells', position: 2 },
  { label: 'DressCode · Try-on', value: 'AI virtual fitting', position: 0 },
  { label: 'Octa Banking · Records', value: 'Audit-ready reports', position: 1 },
  { label: 'WorkSpot · Payroll', value: 'Compliance, simplified', position: 2 },
];

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [termIndex, setTermIndex] = useState(0);
  const [typedTerm, setTypedTerm] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [highlightStep, setHighlightStep] = useState(0);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setHighlightStep((current) => current + 1);
    }, 4200);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % heroImages.length);
    }, 6000);

    return () => window.clearInterval(intervalId);
  }, []);

  const topHighlight = heroHighlights[highlightStep % heroHighlights.length];
  const bottomHighlight = heroHighlights[(highlightStep + 3) % heroHighlights.length];

  useEffect(() => {
    const currentTerm = heroTerms[termIndex];
    const isComplete = typedTerm === currentTerm;
    const isCleared = typedTerm.length === 0;

    const delay = isComplete && !isDeleting ? 1300 : isDeleting ? 45 : 82;

    const timeoutId = window.setTimeout(() => {
      if (!isDeleting && isComplete) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && isCleared) {
        setIsDeleting(false);
        setTermIndex((current) => (current + 1) % heroTerms.length);
        return;
      }

      setTypedTerm((current) => (
        isDeleting
          ? currentTerm.slice(0, Math.max(0, current.length - 1))
          : currentTerm.slice(0, current.length + 1)
      ));
    }, delay);

    return () => window.clearTimeout(timeoutId);
  }, [isDeleting, termIndex, typedTerm]);

  const goToContact = () => {
    const value = email.trim();
    navigate(value ? `/contact?email=${encodeURIComponent(value)}` : '/contact');
  };

  const isLongTerm = ['Artificial Intelligence', 'Employee Workforce', 'Banking Systems'].includes(heroTerms[termIndex]);

  return (
    <section id="home" className="octa-hero">
      <div className="octa-hero-grid">
        <div className="octa-hero-copy">
          <span className="octa-kicker">OCTA NODE ENGINEERING</span>
          <h1 className={`octa-typewriter-heading ${isLongTerm ? 'is-long' : ''}`} aria-live="polite">
            <span className="octa-typewriter-word">{typedTerm || '\u00a0'}</span>
            <span className="octa-typewriter-cursor" aria-hidden="true" />
          </h1>
          <p>
            We design practical products for schools, retail teams, fashion commerce,
            workforce operations, timed environments, and cooperative finance workflows.
          </p>

          <div className="octa-email-panel">
            <label htmlFor="hero-email" className="sr-only">Business email address</label>
            <input
              id="hero-email"
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
            <button type="button" onClick={goToContact}>Start a Project</button>
          </div>

          <div className="octa-proof-row" aria-label="Product coverage">
            {['Education AI', 'Fashion commerce', 'Workforce ops', 'Timed automation'].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>

        <div className="octa-hero-visual" aria-label="Octa Node products">
          <div className="octa-hero-photo">
            {heroImages.map((image, index) => (
              <img
                key={image.src}
                src={image.src}
                alt={image.alt}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                className={index === activeImage ? 'is-active' : ''}
              />
            ))}
          </div>
          <div
            key={`top-${highlightStep}`}
            className={`octa-floating-card octa-card-top octa-card-pos-${topHighlight.position}`}
          >
            <span>{topHighlight.label}</span>
            <strong>{topHighlight.value}</strong>
          </div>
          <div
            key={`bottom-${highlightStep}`}
            className={`octa-floating-card octa-card-bottom octa-card-pos-${bottomHighlight.position}`}
          >
            <span>{bottomHighlight.label}</span>
            <strong>{bottomHighlight.value}</strong>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
