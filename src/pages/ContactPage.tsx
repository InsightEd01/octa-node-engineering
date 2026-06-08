import React, { FormEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SEOHead } from '../seo/components/SEOHead';
import { contactEmail } from './home/homeData';

const productOptions = [
  'Stylus AI',
  'TI-BOT',
  'DressCode',
  'WorkSpot',
  'Education AI',
  'Fashion commerce',
  'Workforce operations',
  'Timed automation',
  'Cooperative banking',
  'Custom software',
];

const ContactPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialEmail = searchParams.get('email') || '';
  const initialProduct = searchParams.get('product') || productOptions[0];
  const [formData, setFormData] = useState({
    name: '',
    email: initialEmail,
    company: '',
    product: productOptions.includes(initialProduct) ? initialProduct : productOptions[0],
    message: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = `Project enquiry from ${formData.name || formData.email || 'Octa Node website'}`;
    const body = [
      'Hello Octa Node Engineering,',
      '',
      `Name: ${formData.name || 'Not provided'}`,
      `Email: ${formData.email || 'Not provided'}`,
      `Company: ${formData.company || 'Not provided'}`,
      `Product interest: ${formData.product}`,
      '',
      'Project notes:',
      formData.message || 'Not provided',
    ].join('\n');

    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      <SEOHead
        title="Contact Octa Node Engineering"
        description="Contact Octa Node Engineering to discuss software, hardware, artificial intelligence, education, fashion commerce, workforce operations, timing automation, and cooperative banking systems."
        keywords={['contact Octa Node', 'software project enquiry', 'AI product development Nigeria', 'business automation contact']}
        type="website"
      />
      <section className="octa-contact-page">
        <div className="octa-contact-shell">
          <div className="octa-contact-copy">
            <span className="octa-kicker">CONTACT OCTA NODE</span>
            <h1>Tell us what needs to be built.</h1>
            <p>
              Share the workflow, audience, and product direction. We will review the right route
              across software, hardware, AI, and operations systems.
            </p>

            <form className="octa-contact-form" onSubmit={submitContact}>
              <div className="octa-contact-grid">
                <label>
                  <span>Name</span>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(event) => updateField('name', event.target.value)}
                    placeholder="Your name"
                    autoComplete="name"
                  />
                </label>
                <label>
                  <span>Business email</span>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(event) => updateField('email', event.target.value)}
                    placeholder="name@company.com"
                    autoComplete="email"
                    required
                  />
                </label>
              </div>

              <div className="octa-contact-grid">
                <label>
                  <span>Company</span>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(event) => updateField('company', event.target.value)}
                    placeholder="Organization name"
                    autoComplete="organization"
                  />
                </label>
                <label>
                  <span>Product interest</span>
                  <select
                    value={formData.product}
                    onChange={(event) => updateField('product', event.target.value)}
                  >
                    {productOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </label>
              </div>

              <label>
                <span>Project notes</span>
                <textarea
                  value={formData.message}
                  onChange={(event) => updateField('message', event.target.value)}
                  placeholder="What are you trying to automate, sell, verify, grade, schedule, or manage?"
                  rows={5}
                />
              </label>

              <button type="submit">Send project request</button>
            </form>

            <div className="octa-contact-direct">
              <a href="tel:+2349028267223">+234 902 826 7223</a>
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
              <span>Ondo State, Nigeria</span>
            </div>
          </div>

          <aside className="octa-contact-visual" aria-label="Octa Node customer support">
            <div className="octa-contact-orbit" aria-hidden="true">
              <span className="octa-orbit-dot is-top">AI</span>
              <span className="octa-orbit-dot is-right">UX</span>
              <span className="octa-orbit-dot is-bottom">OPS</span>
              <span className="octa-orbit-dot is-left">SW</span>
              <img
                src="/assets/contact%20surpport.jpg"
                alt=""
                loading="eager"
                decoding="async"
              />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
