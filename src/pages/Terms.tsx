import React from 'react';
import { SEOHead } from '../seo/components/SEOHead';

const Terms = () => {
  const [activeSection, setActiveSection] = React.useState('');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 120; // Account for fixed header
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'acceptance',
        'intellectual-property',
        'license',
        'user-responsibilities',
        'services',
        'limitation-liability',
        'disclaimer',
        'termination',
        'governing-law',
        'changes',
        'contact'
      ];

      const scrollPosition = window.scrollY + 200; // Offset for better detection

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const elementTop = element.offsetTop;
          const elementBottom = elementTop + element.offsetHeight;

          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Terms Page SEO */}
      <SEOHead
        title="Terms of Service - Octa Node Engineering"
        description="Terms of service for Octa Node Engineering AI solutions. Read our terms and conditions for using our AI products and services."
        keywords={['terms of service', 'AI terms', 'service agreement', 'Octa Node Engineering']}
        type="article"
        noindex={true}
      />

      <div className="terms-page">
        {/* Hero Section */}
        <section className="terms-hero">
          <div className="container">
            <div className="terms-hero-content">
              <h1>Terms & Conditions</h1>
              <p className="terms-subtitle">
                Please read these terms carefully before using our services. By using our services, you agree to be bound by these terms.
              </p>
              <div className="terms-meta">
                <span className="effective-date">
                  <strong>Effective Date:</strong> September 6, 2025
                </span>
                <span className="last-updated">
                  <strong>Last Updated:</strong> September 6, 2025
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="container">
          <div className="terms-content-wrapper">
            {/* Table of Contents */}
            <aside className="terms-toc">
              <div className="toc-sticky">
                <h3>Table of Contents</h3>
                <nav>
                  <ul>
                    <li><a href="#acceptance" className={activeSection === 'acceptance' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('acceptance'); }}>Acceptance of Terms</a></li>
                    <li><a href="#intellectual-property" className={activeSection === 'intellectual-property' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('intellectual-property'); }}>Intellectual Property</a></li>
                    <li><a href="#license" className={activeSection === 'license' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('license'); }}>License</a></li>
                    <li><a href="#user-responsibilities" className={activeSection === 'user-responsibilities' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('user-responsibilities'); }}>User Responsibilities</a></li>
                    <li><a href="#services" className={activeSection === 'services' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>Services</a></li>
                    <li><a href="#limitation-liability" className={activeSection === 'limitation-liability' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('limitation-liability'); }}>Limitation of Liability</a></li>
                    <li><a href="#disclaimer" className={activeSection === 'disclaimer' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('disclaimer'); }}>Disclaimer</a></li>
                    <li><a href="#termination" className={activeSection === 'termination' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('termination'); }}>Termination</a></li>
                    <li><a href="#governing-law" className={activeSection === 'governing-law' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('governing-law'); }}>Governing Law</a></li>
                    <li><a href="#changes" className={activeSection === 'changes' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('changes'); }}>Changes to Terms</a></li>
                    <li><a href="#contact" className={activeSection === 'contact' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact Us</a></li>
                  </ul>
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <main className="terms-main">
              <div className="terms-intro">
                <div className="intro-card">
                  <h2>Welcome to Octa Node Engineering</h2>
                  <p>
                    These Terms and Conditions outline the rules and regulations for the use of Octa Node Engineering's website and services.
                    By accessing this website, we assume you accept these terms and conditions. Do not continue to use Octa Node Engineering's
                    services if you do not agree to all of the terms and conditions stated on this page.
                  </p>
                </div>
              </div>

              <section id="acceptance" className="terms-section">
                <h2>1. Acceptance of Terms</h2>
                <div className="section-content">
                  <div className="acceptance-highlight">
                    <div className="acceptance-icon">📋</div>
                    <div className="acceptance-content">
                      <p>
                        By accessing and using Octa Node Engineering's services, you accept and agree to be bound by the terms and
                        provision of this agreement. These Terms apply to all users of the site, including without limitation users
                        who are browsers, vendors, customers, merchants, and/or contributors of content.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="intellectual-property" className="terms-section">
                <h2>2. Intellectual Property Rights</h2>
                <div className="section-content">
                  <div className="ip-grid">
                    <div className="ip-card">
                      <div className="ip-icon">©️</div>
                      <h4>Copyright</h4>
                      <p>Unless otherwise stated, Octa Node Engineering and/or its licensors own the intellectual property rights for all material on this website.</p>
                    </div>
                    <div className="ip-card">
                      <div className="ip-icon">™️</div>
                      <h4>Trademarks</h4>
                      <p>All intellectual property rights are reserved. You may access this from Octa Node Engineering for your own personal use.</p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="license" className="terms-section">
                <h2>3. License</h2>
                <div className="section-content">
                  <div className="license-card">
                    <h4>🔓 Limited License</h4>
                    <p>
                      Octa Node Engineering grants you a limited, non-exclusive, non-transferable license to access and use our website
                      and services for your personal or business use, subject to these Terms. You must not:
                    </p>
                    <ul>
                      <li>Republish material from this website</li>
                      <li>Sell, rent, or sub-license material from this website</li>
                      <li>Reproduce, duplicate, or copy material from this website</li>
                      <li>Redistribute content from Octa Node Engineering</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section id="user-responsibilities" className="terms-section">
                <h2>4. User Responsibilities</h2>
                <div className="section-content">
                  <p>As a user of our services, you agree not to:</p>
                  <div className="responsibilities-grid">
                    <div className="responsibility-item">
                      <div className="resp-icon">🚫</div>
                      <h4>Unlawful Use</h4>
                      <p>Use our services for any unlawful purpose or prohibited activity</p>
                    </div>
                    <div className="responsibility-item">
                      <div className="resp-icon">🔧</div>
                      <h4>System Interference</h4>
                      <p>Interfere with or disrupt the operation of our services</p>
                    </div>
                    <div className="responsibility-item">
                      <div className="resp-icon">🔓</div>
                      <h4>Unauthorized Access</h4>
                      <p>Attempt to gain unauthorized access to our systems or networks</p>
                    </div>
                    <div className="responsibility-item">
                      <div className="resp-icon">🦠</div>
                      <h4>Malicious Content</h4>
                      <p>Use our services to transmit any harmful or malicious content</p>
                    </div>
                    <div className="responsibility-item">
                      <div className="resp-icon">⚖️</div>
                      <h4>Legal Compliance</h4>
                      <p>Violate any applicable laws or regulations</p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="services" className="terms-section">
                <h2>5. Services</h2>
                <div className="section-content">
                  <div className="services-highlight">
                    <div className="services-icon">🤖</div>
                    <div className="services-content">
                      <h3>AI-Powered Solutions</h3>
                      <p>
                        Octa Node Engineering provides AI-powered solutions for various industries including education, business, and banking.
                        Our services are subject to change, and we reserve the right to modify, suspend, or discontinue any aspect of our
                        services at any time without notice.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="limitation-liability" className="terms-section">
                <h2>6. Limitation of Liability</h2>
                <div className="section-content">
                  <div className="liability-warning">
                    <div className="warning-icon">⚠️</div>
                    <div className="warning-content">
                      <h3>Important Liability Notice</h3>
                      <p>
                        In no event shall Octa Node Engineering, nor its directors, employees, partners, agents, suppliers, or affiliates,
                        be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation,
                        loss of profits, data, use, goodwill, or other intangible losses.
                      </p>
                      <div className="liability-cases">
                        <h4>This includes but is not limited to:</h4>
                        <ul>
                          <li>Your access to or use of or inability to access or use the services</li>
                          <li>Any conduct or content of any third party on the services</li>
                          <li>Any content obtained from the services</li>
                          <li>Unauthorized access, use or alteration of your transmissions or content</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section id="disclaimer" className="terms-section">
                <h2>7. "AS IS" and "AS AVAILABLE" Disclaimer</h2>
                <div className="section-content">
                  <div className="disclaimer-card">
                    <h4>🚨 Service Disclaimer</h4>
                    <p>
                      The services are provided on an "AS IS" and "AS AVAILABLE" basis. Octa Node Engineering makes no representations or
                      warranties of any kind, express or implied, as to the operation of the services or the information, content,
                      materials, or products included on this website.
                    </p>
                    <p>
                      Octa Node Engineering does not warrant that the service will be uninterrupted or error-free, that defects will be
                      corrected, or that the service or the server that makes it available are free of viruses or other harmful components.
                    </p>
                  </div>
                </div>
              </section>

              <section id="termination" className="terms-section">
                <h2>8. Termination</h2>
                <div className="section-content">
                  <p>
                    We may terminate or suspend your access to our services immediately, without prior notice or liability, for any reason
                    whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the services
                    will cease immediately.
                  </p>
                </div>
              </section>

              <section id="governing-law" className="terms-section">
                <h2>9. Governing Law</h2>
                <div className="section-content">
                  <div className="governing-law-card">
                    <div className="law-icon">⚖️</div>
                    <div className="law-content">
                      <p>
                        These Terms shall be governed and construed in accordance with the laws of Nigeria, without regard to its
                        conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered
                        a waiver of those rights.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="changes" className="terms-section">
                <h2>10. Changes to These Terms</h2>
                <div className="section-content">
                  <p>
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material,
                    we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change
                    will be determined at our sole discretion.
                  </p>
                </div>
              </section>

              <section id="contact" className="terms-section">
                <h2>11. Contact Us</h2>
                <div className="section-content">
                  <div className="contact-card">
                    <h3>Questions About Our Terms?</h3>
                    <p>If you have any questions about these Terms and Conditions, please contact us:</p>
                    <div className="contact-info">
                      <div className="contact-item">
                        <span className="contact-label">Email:</span>
                        <a href="mailto:terms@octanode.online">terms@octanode.online</a>
                      </div>
                      <div className="contact-item">
                        <span className="contact-label">Phone:</span>
                        <a href="tel:+2349028267223">+234 902 826 7223</a>
                      </div>
                      <div className="contact-item">
                        <span className="contact-label">Address:</span>
                        <span>No 14 Oluwatoyin Off Gani<br />By Ademulegun Road<br />Ondo State, Nigeria</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Terms;
