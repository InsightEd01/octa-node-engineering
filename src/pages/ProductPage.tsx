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
import { stylusAIStructuredData, tibotStructuredData } from '../seo/data/structuredData';

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

  const productTitle = `${product.name} - Advanced AI Solution | Octa Node Engineering`;
  const productDescription = `${product.name} is an industry-leading artificial intelligence solution that ${product.description.toLowerCase()}. Discover how our AI technology can automate workflows, enhance productivity, and deliver measurable results for ${product.targetAudience.toLowerCase()}.`;
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
        { question: 'What is Stylus AI?', answer: 'Stylus AI is an AI-powered assessment system that marks handwritten and theory-based exams with high accuracy, providing instant, consistent feedback for educators.' },
        { question: 'How accurate is Stylus AI for handwriting recognition?', answer: 'Stylus AI uses advanced handwriting recognition with multi-language support and customizable rubrics, delivering consistent accuracy that improves with usage.' },
        { question: 'Does Stylus AI integrate with LMS platforms?', answer: 'Yes. Stylus AI integrates with popular LMS platforms and supports exports for common formats, enabling streamlined grading workflows.' },
        { question: 'Can I customize grading criteria?', answer: 'Absolutely. Educators can define custom rubrics and criteria per subject or assessment type to match institutional standards.' },
        { question: 'Is my data secure?', answer: 'We follow industry best practices for data security and privacy, including encrypted storage and role-based access controls.' }
      ];
    }
    if (product.id === 'ti-bot') {
      return [
        { question: 'What is TI-BOT?', answer: 'TI-BOT is an AI-enabled school time management and announcement system that replaces traditional bells with smart scheduling and multi-zone audio.' },
        { question: 'Can TI-BOT manage multiple zones?', answer: 'Yes. TI-BOT supports multi-zone audio management for different blocks or departments, including emergency broadcast overrides.' },
        { question: 'Is TI-BOT cloud managed?', answer: 'TI-BOT provides cloud-based management for scheduling, monitoring, and updates, accessible from web and mobile.' },
        { question: 'How reliable is TI-BOT during network issues?', answer: 'Schedules are cached on-device for offline continuity, and the system syncs automatically once connectivity is restored.' },
        { question: 'Does TI-BOT integrate with school systems?', answer: 'TI-BOT integrates with common school management systems and calendars to automate bell schedules and announcements.' }
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
                {product.name} is an advanced artificial intelligence platform that helps{' '}
                {product.targetAudience.toLowerCase()} streamline operations and boost efficiency
                through intelligent automation.
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
                  url={typeof window !== 'undefined' ? window.location.href : `https://octanodeengineering.com/product/${product.id}`}
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