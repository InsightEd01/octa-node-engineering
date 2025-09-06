import React from 'react';
import { SEOHead } from '../seo/components/SEOHead';

const Privacy = () => {
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
        'information-collect',
        'how-we-use',
        'information-sharing',
        'data-security',
        'data-retention',
        'your-rights',
        'cookies',
        'third-party',
        'children-privacy',
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
      {/* Privacy Page SEO */}
      <SEOHead
        title="Privacy Policy - Octa Node Engineering"
        description="Privacy policy for Octa Node Engineering. Learn how we protect your data and privacy when using our AI solutions and services."
        keywords={['privacy policy', 'data protection', 'AI privacy', 'Octa Node Engineering']}
        type="article"
        noindex={true}
      />

      <div className="privacy-policy-page">
        {/* Hero Section */}
        <section className="privacy-hero">
          <div className="container">
            <div className="privacy-hero-content">
              <h1>Privacy Policy</h1>
              <p className="privacy-subtitle">
                Your privacy is important to us. This policy explains how we collect, use, and protect your information.
              </p>
              <div className="privacy-meta">
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
          <div className="privacy-content-wrapper">
            {/* Table of Contents */}
            <aside className="privacy-toc">
              <div className="toc-sticky">
                <h3>Table of Contents</h3>
                <nav>
                  <ul>
                    <li><a href="#information-collect" className={activeSection === 'information-collect' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('information-collect'); }}>Information We Collect</a></li>
                    <li><a href="#how-we-use" className={activeSection === 'how-we-use' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('how-we-use'); }}>How We Use Your Information</a></li>
                    <li><a href="#information-sharing" className={activeSection === 'information-sharing' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('information-sharing'); }}>Information Sharing</a></li>
                    <li><a href="#data-security" className={activeSection === 'data-security' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('data-security'); }}>Data Security</a></li>
                    <li><a href="#data-retention" className={activeSection === 'data-retention' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('data-retention'); }}>Data Retention</a></li>
                    <li><a href="#your-rights" className={activeSection === 'your-rights' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('your-rights'); }}>Your Data Protection Rights</a></li>
                    <li><a href="#cookies" className={activeSection === 'cookies' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('cookies'); }}>Cookies</a></li>
                    <li><a href="#third-party" className={activeSection === 'third-party' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('third-party'); }}>Third-Party Websites</a></li>
                    <li><a href="#children-privacy" className={activeSection === 'children-privacy' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('children-privacy'); }}>Children's Privacy</a></li>
                    <li><a href="#changes" className={activeSection === 'changes' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('changes'); }}>Changes to This Policy</a></li>
                    <li><a href="#contact" className={activeSection === 'contact' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact Us</a></li>
                  </ul>
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <main className="privacy-main">
              <div className="privacy-intro">
                <div className="intro-card">
                  <h2>Our Commitment to Privacy</h2>
                  <p>
                    At Octa Node Engineering, we are committed to protecting your privacy. This Privacy Policy explains how we collect,
                    use, disclose, and safeguard your information when you visit our website or use our services. Please read this
                    policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site or use our services.
                  </p>
                </div>
              </div>

              <section id="information-collect" className="privacy-section">
                <h2>1. Information We Collect</h2>
                <div className="section-content">
                  <p>
                    We may collect personal information that you voluntarily provide to us when you register on the site, express an
                    interest in obtaining information about us or our products and services, participate in activities on the site, or otherwise contact us.
                  </p>
                  <div className="info-collect-grid">
                    <div className="info-card">
                      <h4>Personal Information</h4>
                      <ul>
                        <li>Name</li>
                        <li>Email address</li>
                        <li>Phone number</li>
                        <li>Company name</li>
                        <li>Job title</li>
                        <li>Any other information you choose to provide</li>
                      </ul>
                    </div>
                    <div className="info-card">
                      <h4>Usage Data</h4>
                      <ul>
                        <li>IP address</li>
                        <li>Browser type and version</li>
                        <li>Pages visited</li>
                        <li>Time spent on pages</li>
                        <li>Device information</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section id="how-we-use" className="privacy-section">
                <h2>2. How We Use Your Information</h2>
                <div className="section-content">
                  <p>We may use the information we collect from you for various purposes, including:</p>
                  <div className="usage-grid">
                    <div className="usage-item">
                      <div className="usage-icon">🔧</div>
                      <h4>Service Delivery</h4>
                      <p>To provide, maintain, and improve our services</p>
                    </div>
                    <div className="usage-item">
                      <div className="usage-icon">💳</div>
                      <h4>Transactions</h4>
                      <p>To process transactions and send related information</p>
                    </div>
                    <div className="usage-item">
                      <div className="usage-icon">🔔</div>
                      <h4>Communications</h4>
                      <p>To send updates, alerts, and support messages</p>
                    </div>
                    <div className="usage-item">
                      <div className="usage-icon">📊</div>
                      <h4>Analytics</h4>
                      <p>To monitor usage and improve your experience</p>
                    </div>
                    <div className="usage-item">
                      <div className="usage-icon">⚖️</div>
                      <h4>Legal Compliance</h4>
                      <p>To comply with legal obligations</p>
                    </div>
                    <div className="usage-item">
                      <div className="usage-icon">🎯</div>
                      <h4>Marketing</h4>
                      <p>To communicate about products and promotions</p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="information-sharing" className="privacy-section">
                <h2>3. Information Sharing and Disclosure</h2>
                <div className="section-content">
                  <p>We may share information we collect about you in the following situations:</p>
                  <div className="sharing-grid">
                    <div className="sharing-card">
                      <h4>🔗 Service Providers</h4>
                      <p>We may share your information with third-party service providers who perform services on our behalf.</p>
                    </div>
                    <div className="sharing-card">
                      <h4>🏢 Business Transfers</h4>
                      <p>We may share or transfer your information in connection with business transactions.</p>
                    </div>
                    <div className="sharing-card">
                      <h4>🤝 Affiliates</h4>
                      <p>We may share your information with our affiliates who honor this Privacy Policy.</p>
                    </div>
                    <div className="sharing-card">
                      <h4>📈 Business Partners</h4>
                      <p>We may share your information with partners to offer products or promotions.</p>
                    </div>
                    <div className="sharing-card">
                      <h4>✅ With Your Consent</h4>
                      <p>We may disclose your information for any other purpose with your consent.</p>
                    </div>
                    <div className="sharing-card">
                      <h4>⚖️ Legal Requirements</h4>
                      <p>We may disclose your information to comply with applicable law or governmental request.</p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="data-security" className="privacy-section">
                <h2>4. Data Security</h2>
                <div className="section-content">
                  <div className="security-highlight">
                    <div className="security-icon">🔒</div>
                    <div className="security-content">
                      <h3>Your Data Security Matters</h3>
                      <p>
                        We use administrative, technical, and physical security measures to help protect your personal information.
                        While we have taken reasonable steps to secure the personal information you provide to us, please be aware that
                        despite our efforts, no security measures are perfect or impenetrable.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="data-retention" className="privacy-section">
                <h2>5. Data Retention</h2>
                <div className="section-content">
                  <p>
                    We will retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy,
                    unless a longer retention period is required or permitted by law.
                  </p>
                </div>
              </section>

              <section id="your-rights" className="privacy-section">
                <h2>6. Your Data Protection Rights</h2>
                <div className="section-content">
                  <p>Depending on your location, you may have the following rights regarding your personal information:</p>
                  <div className="rights-grid">
                    <div className="rights-card">
                      <h4>👁️ Right to Access</h4>
                      <p>You have the right to request copies of your personal data.</p>
                    </div>
                    <div className="rights-card">
                      <h4>✏️ Right to Rectification</h4>
                      <p>You have the right to request that we correct inaccurate information.</p>
                    </div>
                    <div className="rights-card">
                      <h4>🗑️ Right to Erasure</h4>
                      <p>You have the right to request that we erase your personal data under certain conditions.</p>
                    </div>
                    <div className="rights-card">
                      <h4>⏸️ Right to Restrict Processing</h4>
                      <p>You have the right to request that we restrict the processing of your personal data.</p>
                    </div>
                    <div className="rights-card">
                      <h4>🚫 Right to Object</h4>
                      <p>You have the right to object to our processing of your personal data under certain conditions.</p>
                    </div>
                    <div className="rights-card">
                      <h4>📤 Right to Data Portability</h4>
                      <p>You have the right to request that we transfer your data to another organization.</p>
                    </div>
                  </div>
                  <div className="contact-note">
                    <p>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p>
                  </div>
                </div>
              </section>

              <section id="cookies" className="privacy-section">
                <h2>7. Cookies</h2>
                <div className="section-content">
                  <p>
                    We may use cookies and similar tracking technologies to track activity on our service and hold certain information.
                    You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                  </p>
                </div>
              </section>

              <section id="third-party" className="privacy-section">
                <h2>8. Third-Party Websites</h2>
                <div className="section-content">
                  <p>
                    Our website may contain links to third-party websites. We are not responsible for the privacy practices or the content of these third-party sites.
                  </p>
                </div>
              </section>

              <section id="children-privacy" className="privacy-section">
                <h2>9. Children's Privacy</h2>
                <div className="section-content">
                  <div className="children-notice">
                    <div className="notice-icon">👶</div>
                    <div className="notice-content">
                      <p>
                        Our services are not intended for use by children under the age of 13. We do not knowingly collect personal
                        information from children under 13. If we become aware that we have collected personal information from a
                        child under 13, we will take steps to delete such information.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="changes" className="privacy-section">
                <h2>10. Changes to This Privacy Policy</h2>
                <div className="section-content">
                  <p>
                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy
                    on this page and updating the "Effective Date" at the top.
                  </p>
                </div>
              </section>

              <section id="contact" className="privacy-section">
                <h2>11. Contact Us</h2>
                <div className="section-content">
                  <div className="contact-card">
                    <h3>Questions About Our Privacy Policy?</h3>
                    <p>If you have any questions about this Privacy Policy, please contact us:</p>
                    <div className="contact-info">
                      <div className="contact-item">
                        <span className="contact-label">Email:</span>
                        <a href="mailto:privacy@octanode.online">privacy@octanode.online</a>
                      </div>
                      <div className="contact-item">
                        <span className="contact-label">Phone:</span>
                        <a href="tel:+2349028267223">+234 902 826 7223</a>
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

export default Privacy;
