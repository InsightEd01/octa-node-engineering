import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../data/products';
import ProductCarousel from '../components/ProductCarousel';
import ImageModal from '../components/ImageModal';

// SEO Components
import { SEOHead } from '../seo/components/SEOHead';
import ProductStructuredData from '../seo/components/ProductStructuredData';
import StructuredData from '../seo/components/StructuredData';
import { generateFAQStructuredData } from '../seo/utils/seoUtils';
import { SocialSharingPreview } from '../seo/components/SocialSharingPreview';
import { stylusAIStructuredData, tibotStructuredData, dresscodeStructuredData, workspotStructuredData } from '../seo/data/structuredData';

const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = productId ? getProductById(productId) : null;

  const [modalImage, setModalImage] = useState<string>('');
  const [modalProductName, setModalProductName] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = (imageUrl: string, productName: string) => {
    setModalImage(imageUrl);
    setModalProductName(productName);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalImage('');
    setModalProductName('');
    setIsModalOpen(false);
  };

  if (!product) {
    return (
      <div className="product-not-found">
        <div className="container">
          <h1>Product Not Found</h1>
          <p>The product you're looking for doesn't exist.</p>
          <Link to="/" className="btn btn-primary">Back to Home</Link>
        </div>
      </div>
    );
  }

  const productTitle = `${product.name} | Octa Node Engineering`;
  const productDescription = `${product.description} Built by Octa Node Engineering for ${product.targetAudience.toLowerCase()}.`;
  const productKeywords = [
    product.name,
    'AI solution',
    'artificial intelligence',
    'machine learning',
    'automation tool',
    product.category.toLowerCase(),
    'Octa Node Engineering',
    ...product.features.slice(0, 5).map(f => f.toLowerCase())
  ];

  const getProductStructuredData = () => {
    if (product.id === 'stylus-ai') return stylusAIStructuredData;
    if (product.id === 'ti-bot') return tibotStructuredData;
    if (product.id === 'dresscode') return dresscodeStructuredData;
    if (product.id === 'workspot') return workspotStructuredData;
    return {
      '@context': 'https://schema.org',
      '@type': 'Product' as const,
      name: product.name,
      description: product.description,
      image: product.images,
      brand: { '@type': 'Brand' as const, name: 'Octa Node Engineering' },
      category: product.category,
      offers: {
        '@type': 'Offer' as const,
        availability: 'https://schema.org/InStock',
        url: product.appUrl,
        seller: { '@type': 'Organization' as const, name: 'Octa Node Engineering' }
      },
      manufacturer: { '@type': 'Organization' as const, name: 'Octa Node Engineering' }
    };
  };

  const faqItems: Array<{ question: string; answer: string }> = (() => {
    if (product.id === 'stylus-ai') {
      return [
        { question: 'What is Stylus AI?', answer: 'Stylus AI is an examination grading software that grades handwritten exam scripts in seconds after they are captured with a phone camera or scanner.' },
        { question: 'How does Stylus AI work?', answer: 'Educators snap or upload handwritten exam scripts, and Stylus AI reads the content, applies the grading logic, and returns results far faster than manual marking.' },
        { question: 'Why use Stylus AI instead of manual grading?', answer: 'Stylus AI reduces marking time, limits human error, minimizes bias, and keeps grading consistent across large batches of handwritten scripts.' },
        { question: 'Can I customize grading criteria?', answer: 'Yes. Educators can define custom rubrics and criteria per subject or assessment type to match institutional standards.' },
        { question: 'Is my data secure?', answer: 'We follow industry best practices for data security and privacy, including encrypted storage and role-based access controls.' }
      ];
    }
    if (product.id === 'ti-bot') {
      return [
        { question: 'What is TI-BOT?', answer: 'TI-BOT is a smart school bell, time management, and announcement system that automates schedules, bells, and public updates for schools and other organized environments.' },
        { question: 'Can TI-BOT manage multiple zones?', answer: 'Yes. TI-BOT supports multi-zone audio management for different blocks or departments, including emergency broadcast overrides.' },
        { question: 'Is TI-BOT cloud managed?', answer: 'TI-BOT provides cloud-based management for scheduling, monitoring, and updates, accessible from web and mobile.' },
        { question: 'How reliable is TI-BOT during network issues?', answer: 'Schedules are cached on-device for offline continuity, and the system syncs automatically once connectivity is restored.' },
        { question: 'Can TI-BOT be used in banks?', answer: 'Yes. TI-BOT is not Octa Node Engineering’s banking software, but it can be used in banks to manage timing, coordinate crowd updates, and deliver timely announcements.' }
      ];
    }
    if (product.id === 'dresscode') {
      return [
        { question: 'What is DressCode?', answer: 'DressCode is a Nigerian fashion social commerce platform that combines shopping, bespoke tailoring, creator monetization, and AI virtual try-on in one app.' },
        { question: 'Who is DressCode for?', answer: 'DressCode serves fashion shoppers, designers, tailors, boutiques, and creators who want to buy, sell, showcase, or monetize fashion online.' },
        { question: 'Does DressCode support custom tailoring?', answer: 'Yes. Users can place bespoke orders with verified tailors and dressmakers, share references, and manage the order journey digitally.' },
        { question: 'What makes DressCode different from a normal marketplace?', answer: 'DressCode combines commerce with social discovery, direct messaging, creator earnings, and AI try-on, so the full fashion journey happens in one place.' },
        { question: 'Does DressCode include AI try-on?', answer: 'Yes. DressCode includes an AI virtual try-on experience that helps users preview outfits on themselves before buying.' }
      ];
    }
    if (product.id === 'workspot') {
      return [
        { question: 'What is WorkSpot?', answer: 'WorkSpot is a workforce attendance and operations platform that automates verified check-ins, live team monitoring, and payroll-ready attendance records.' },
        { question: 'How does WorkSpot verify attendance?', answer: 'WorkSpot combines geo-fencing with mobile biometric verification so employees can only check in from approved locations and with their own device-based identity checks.' },
        { question: 'Can WorkSpot work without internet?', answer: 'Yes. WorkSpot supports offline check-ins and syncs the records once a connection is restored.' },
        { question: 'Does WorkSpot support payroll exports?', answer: 'Yes. WorkSpot supports payroll-ready exports in standard formats such as CSV and PDF, and is designed to integrate with existing payroll workflows.' },
        { question: 'Who should use WorkSpot?', answer: 'WorkSpot is suited for operations teams, HR departments, supervisors, and organizations that manage attendance across offices, job sites, or distributed teams.' }
      ];
    }
    return [
      { question: `What is ${product.name}?`, answer: `${product.name} is an AI-powered solution designed to help ${product.targetAudience.toLowerCase()} improve efficiency through intelligent automation.` },
      { question: 'How does pricing work?', answer: 'Pricing depends on deployment size and feature needs. Contact our team for a tailored quote.' },
      { question: 'Can it integrate with our existing tools?', answer: 'Yes. We support integrations via APIs and common connectors. Our team assists with implementation.' }
    ];
  })();

  return (
    <div className="product-page">
      {/* SEO */}
      <SEOHead title={productTitle} description={productDescription} keywords={productKeywords} image={product.images[0]} type="product" />
      <ProductStructuredData product={getProductStructuredData()} />
      <StructuredData data={generateFAQStructuredData(faqItems)} />

      {/* ── HERO ── */}
      <section className="pp-hero">
        <div className="container">
          <nav className="pp-breadcrumb" aria-label="breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">›</span>
            <Link to="/#products">Products</Link>
            <span aria-hidden="true">›</span>
            <span>{product.name}</span>
          </nav>

          <div className="pp-hero-grid">
            {/* Left: info */}
            <div className="pp-hero-info">
              <div className="pp-badge">{product.category} Solution</div>
              <h1 className="pp-hero-title">{product.name}</h1>
              <p className="pp-hero-desc">
                {product.id === 'stylus-ai'
                  ? 'Snap handwritten exam scripts and let Stylus AI grade them in seconds with reduced human error, lower bias, and consistent scoring.'
                  : product.id === 'ti-bot'
                    ? 'Coordinate bells, schedules, announcements, and public updates with a smart time management system built for organized environments.'
                  : product.id === 'dresscode'
                    ? 'Shop local fashion, place bespoke tailoring orders, monetize style content, and preview outfits with AI virtual try-on in one platform.'
                  : product.id === 'workspot'
                    ? 'Verify attendance with geo-fencing and biometrics, monitor teams live, and produce payroll-ready records from one operations platform.'
                  : `${product.name} is an advanced artificial intelligence platform that helps ${product.targetAudience.toLowerCase()} streamline operations and boost efficiency through intelligent automation.`}
              </p>
              <div className="pp-hero-actions">
                <a href={product.appUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  Launch App
                </a>
                {product.demoUrl && (
                  <a href={product.demoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                    Try Demo
                  </a>
                )}
              </div>
            </div>

            {/* Right: images */}
            <div className="pp-hero-carousel">
              <ProductCarousel
                images={product.images}
                productName={product.name}
                onImageClick={handleImageClick}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── DETAILS ── */}
      <section className="pp-details">
        <div className="container">
          <div className="pp-details-grid">

            {/* Main content */}
            <div className="pp-main">
              <h2>Why Choose {product.name}?</h2>
              <div className="pp-description">
                {product.fullDescription.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              <h2>Core Features</h2>
              <ul className="pp-features">
                {product.features.map((feature, i) => (
                  <li key={i}>
                    <span className="pp-feature-icon">✦</span>
                    <div>
                      <strong>{feature.split(':')[0]}</strong>
                      {feature.includes(':') && <span>: {feature.split(':').slice(1).join(':')}</span>}
                    </div>
                  </li>
                ))}
              </ul>

              <h2>Key Benefits</h2>
              <ul className="pp-benefits">
                {product.benefits.map((benefit, i) => (
                  <li key={i}>
                    <span className="pp-check">✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            {/* Sidebar */}
            <aside className="pp-sidebar">
              {/* Tech Specs */}
              <div className="pp-card pp-specs">
                <h3>Technical Specifications</h3>
                <div className="pp-spec-row">
                  <span className="pp-spec-label">Platform</span>
                  <span className="pp-spec-value">{product.techSpecs.platform}</span>
                </div>
                <div className="pp-spec-row">
                  <span className="pp-spec-label">Compatibility</span>
                  <span className="pp-spec-value">{product.techSpecs.compatibility}</span>
                </div>
                <div className="pp-spec-row">
                  <span className="pp-spec-label">Requirements</span>
                  <span className="pp-spec-value">{product.techSpecs.requirements}</span>
                </div>
              </div>

              {/* CTA card */}
              <div className="pp-card pp-cta-card">
                <h3>Ready to Get Started?</h3>
                <p>Experience the power of {product.name} today.</p>
                <a href={product.appUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary pp-cta-btn">
                  Launch {product.name}
                </a>
              </div>

              {/* Social share */}
              <div className="pp-card pp-share">
                <h4>Share this product</h4>
                <SocialSharingPreview
                  url={typeof window !== 'undefined' ? window.location.href : `https://octanode.co/product/${product.id}`}
                  title={productTitle}
                  description={productDescription}
                  image={product.images[0]}
                  platforms={['facebook', 'twitter', 'linkedin', 'whatsapp']}
                  showPreview={false}
                />
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="pp-bottom-cta">
        <div className="container">
          <h2>Transform Your Workflow with {product.name}</h2>
          <p>Join thousands of users who have already revolutionised their processes.</p>
          <div className="pp-bottom-actions">
            <a href={product.appUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-large">
              Get Started Now
            </a>
            <Link
              to="/"
              className="btn btn-secondary btn-large"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/';
                setTimeout(() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      <ImageModal isOpen={isModalOpen} imageUrl={modalImage} productName={modalProductName} onClose={closeModal} />
    </div>
  );
};

export default ProductPage;
