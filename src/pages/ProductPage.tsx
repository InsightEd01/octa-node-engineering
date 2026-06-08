import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, products } from '../data/products';
import LazyImage from '../components/LazyImage';
import ImageModal from '../components/ImageModal';
import { generateAltText } from '../utils/imageUtils';

// SEO Components
import { SEOHead } from '../seo/components/SEOHead';
import ProductStructuredData from '../seo/components/ProductStructuredData';
import StructuredData from '../seo/components/StructuredData';
import { generateFAQStructuredData } from '../seo/utils/seoUtils';
import { SocialSharingPreview } from '../seo/components/SocialSharingPreview';
import { stylusAIStructuredData, tibotStructuredData, dresscodeStructuredData, workspotStructuredData } from '../seo/data/structuredData';

type TabId = 'overview' | 'features' | 'benefits' | 'specs' | 'faq';

const tabs: { id: TabId; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'features', label: 'Features' },
  { id: 'benefits', label: 'Benefits' },
  { id: 'specs', label: 'Specifications' },
  { id: 'faq', label: 'FAQ' },
];

const trustPoints = [
  { icon: '☁️', title: 'Cloud-delivered', body: 'Always up to date — nothing to install or maintain.' },
  { icon: '🔒', title: 'Secure by design', body: 'Encrypted storage and role-based access controls.' },
  { icon: '🤝', title: 'Hands-on support', body: 'Our team helps you set up and stay on track.' },
];

const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = productId ? getProductById(productId) : null;

  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<TabId>('overview');
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

  const heroDescription = product.id === 'stylus-ai'
    ? 'Snap handwritten exam scripts and let Stylus AI grade them in seconds with reduced human error, lower bias, and consistent scoring.'
    : product.id === 'ti-bot'
      ? 'Coordinate bells, schedules, announcements, and public updates with a smart time management system built for organized environments.'
    : product.id === 'dresscode'
      ? 'Shop local fashion, place bespoke tailoring orders, monetize style content, and preview outfits with AI virtual try-on in one platform.'
    : product.id === 'workspot'
      ? 'Verify attendance with geo-fencing and biometrics, monitor teams live, and produce payroll-ready records from one operations platform.'
    : `${product.name} helps ${product.targetAudience.toLowerCase()} streamline operations and boost efficiency through intelligent automation.`;

  const heroFacts = [
    { label: 'Category', value: product.category },
    { label: 'Launched', value: product.launchDate },
    { label: 'Built for', value: product.targetAudience },
  ];

  const relatedProducts = products.filter((item) => item.id !== product.id).slice(0, 3);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : `https://octanode.co/product/${product.id}`;

  return (
    <div className="product-page">
      {/* SEO */}
      <SEOHead title={productTitle} description={productDescription} keywords={productKeywords} image={product.images[0]} type="product" />
      <ProductStructuredData product={getProductStructuredData()} />
      <StructuredData data={generateFAQStructuredData(faqItems)} />

      {/* ── HERO: gallery + info ── */}
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
            {/* Gallery */}
            <div className="pp-gallery">
              <button
                type="button"
                className="pp-gallery-main"
                onClick={() => handleImageClick(product.images[activeImage], product.name)}
                aria-label={`Open ${product.name} screenshot ${activeImage + 1} in full view`}
              >
                <LazyImage
                  src={product.images[activeImage]}
                  alt={generateAltText(product.name, 'screenshot', activeImage)}
                  className="pp-gallery-image"
                  loading="eager"
                  priority
                />
              </button>

              {product.images.length > 1 && (
                <div className="pp-gallery-thumbs" role="tablist" aria-label={`${product.name} screenshots`}>
                  {product.images.map((img, index) => (
                    <button
                      key={img}
                      type="button"
                      role="tab"
                      aria-selected={index === activeImage}
                      aria-label={`View screenshot ${index + 1}`}
                      className={`pp-gallery-thumb ${index === activeImage ? 'is-active' : ''}`}
                      onClick={() => setActiveImage(index)}
                    >
                      <LazyImage src={img} alt="" loading="lazy" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="pp-hero-info">
              <div className="pp-badge">{product.category} Solution</div>
              <h1 className="pp-hero-title"><span className="octa-heading-glow">{product.name}</span></h1>
              <p className="pp-hero-desc">{heroDescription}</p>

              <div className="pp-fact-row" aria-label={`${product.name} details`}>
                {heroFacts.map((fact) => (
                  <div key={fact.label} className="pp-fact">
                    <span>{fact.label}</span>
                    <strong>{fact.value}</strong>
                  </div>
                ))}
              </div>

              <div className="pp-hero-actions">
                <a href={product.appUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  Launch App
                </a>
                {product.demoUrl && (
                  <a href={product.demoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                    Try Demo
                  </a>
                )}
                <Link to={`/contact?product=${encodeURIComponent(product.name)}`} className="btn btn-secondary">
                  Talk to Sales
                </Link>
              </div>

              <ul className="pp-trust-row">
                {trustPoints.map((point) => (
                  <li key={point.title}>
                    <span aria-hidden="true">{point.icon}</span>
                    <div>
                      <strong>{point.title}</strong>
                      <small>{point.body}</small>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── TABBED INFORMATION ── */}
      <section className="pp-tabbed">
        <div className="container">
          <div className="pp-tab-bar" role="tablist" aria-label={`${product.name} information`}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                className={activeTab === tab.id ? 'active' : ''}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="pp-tab-panel" role="tabpanel">
            {activeTab === 'overview' && (
              <div className="pp-description">
                <h2>Why choose {product.name}?</h2>
                {product.fullDescription.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            )}

            {activeTab === 'features' && (
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
            )}

            {activeTab === 'benefits' && (
              <ul className="pp-benefits">
                {product.benefits.map((benefit, i) => (
                  <li key={i}>
                    <span className="pp-check">✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            )}

            {activeTab === 'specs' && (
              <div className="pp-specs-table">
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
                <div className="pp-spec-row">
                  <span className="pp-spec-label">Category</span>
                  <span className="pp-spec-value">{product.category}</span>
                </div>
                <div className="pp-spec-row">
                  <span className="pp-spec-label">Launched</span>
                  <span className="pp-spec-value">{product.launchDate}</span>
                </div>
              </div>
            )}

            {activeTab === 'faq' && (
              <div className="pp-faq-list">
                {faqItems.map((item) => (
                  <details key={item.question} className="pp-faq-item">
                    <summary>{item.question}</summary>
                    <p>{item.answer}</p>
                  </details>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── RELATED PRODUCTS ── */}
      {relatedProducts.length > 0 && (
        <section className="pp-related">
          <div className="container">
            <div className="octa-section-heading">
              <span>Explore more</span>
              <h2>Other <span className="octa-heading-glow">products</span> from Octa Node</h2>
            </div>
            <div className="pp-related-grid">
              {relatedProducts.map((item) => (
                <Link key={item.id} to={`/product/${item.id}`} className="pp-related-card">
                  <div className="pp-related-image">
                    <LazyImage src={item.images[0]} alt={generateAltText(item.name, 'thumbnail', 0)} loading="lazy" />
                  </div>
                  <div className="pp-related-body">
                    <span>{item.category}</span>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── BOTTOM CTA + SHARE ── */}
      <section className="pp-bottom-cta">
        <div className="container">
          <div className="pp-bottom-grid">
            <div className="pp-bottom-copy">
              <h2>Transform your workflow with <span className="octa-heading-glow">{product.name}</span></h2>
              <p>Join the teams already using {product.name} to get more done with less friction.</p>
              <div className="pp-bottom-actions">
                <a href={product.appUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-large">
                  Get Started Now
                </a>
                <Link to="/contact" className="btn btn-secondary btn-large">
                  Contact Sales
                </Link>
              </div>
            </div>

            <div className="pp-share-card">
              <h4>Share {product.name}</h4>
              <SocialSharingPreview
                url={shareUrl}
                title={productTitle}
                description={productDescription}
                image={product.images[0]}
                platforms={['facebook', 'twitter', 'linkedin', 'whatsapp']}
                showPreview={false}
              />
            </div>
          </div>
        </div>
      </section>

      <ImageModal isOpen={isModalOpen} imageUrl={modalImage} productName={modalProductName} onClose={closeModal} />
    </div>
  );
};

export default ProductPage;
