import { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Carousel from './components/Carousel';
import ProductCarousel from './components/ProductCarousel';
import ImageModal from './components/ImageModal';

import LazyImage from './components/LazyImage';
import { generateAltText } from './utils/imageUtils';
import { preloadCriticalImages } from './utils/preloader';
import { 
  addResourceHints, 
  preloadCriticalResources, 
  loadThirdPartyScripts, 
  measurePerformance,
  registerServiceWorker,
  monitorMemoryUsage 
} from './utils/performance';
import { products } from './data/products';
import logoImg from '../assets/logo.png';

import { 
  LazyProductPage, 
  LazyPrivacy, 
  LazyTerms, 
  LazyAdminRouter,
  LazyChatWidget,
  preloadCriticalComponents 
} from './components/LazyComponents';
import AdminGuard from './admin/components/AdminGuard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';
import './admin/admin.css';

// SEO Components
import { SEOHead } from './seo/components/SEOHead';
import { useSEO } from './seo/hooks/useSEO';
import OrganizationStructuredData from './seo/components/OrganizationStructuredData';
import LocalBusinessStructuredData from './seo/components/LocalBusinessStructuredData';
import WebSiteStructuredData from './seo/components/WebSiteStructuredData';
import { generateBreadcrumbStructuredData } from './seo/utils/seoUtils';
import StructuredData from './seo/components/StructuredData';

// Function to handle smooth scrolling to sections
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

// Navigation component to handle location-based active states
const Navigation: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { setPageSEO } = useSEO();

  // Prevent auto-scroll when navigating with hash fragments
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      // Remove hash and prevent scrolling
      window.history.replaceState(null, '', location.pathname);
      window.scrollTo(0, 0);
    }
  }, [location]);

  // Determine active section based on route and scroll position
  useEffect(() => {
    // Update SEO based on current route
    if (location.pathname === '/') {
      setPageSEO('home');
    } else if (location.pathname.startsWith('/product/')) {
      setActiveSection('products');
      setPageSEO('products');
    } else if (location.pathname === '/privacy') {
      setPageSEO('privacy');
    } else if (location.pathname === '/terms') {
      setPageSEO('terms');
    } else if (location.pathname === '/contact') {
      setPageSEO('contact');
    }

    if (location.pathname.startsWith('/product/')) {
      setActiveSection('products');
    } else if (location.pathname === '/') {
      // For home page, use scroll detection
      const handleScroll = () => {
        const scrollTop = window.scrollY;
        setIsScrolled(scrollTop > 50);

        // Section detection
        const sections = ['home', 'products', 'contact'];
        const sectionElements = sections.map(id => document.getElementById(id));

        let currentSection = 'home';

        sectionElements.forEach((element, index) => {
          if (element) {
            const rect = element.getBoundingClientRect();
            const sectionTop = rect.top + scrollTop;
            const sectionHeight = rect.height;

            // Check if section is in viewport (with some offset for header)
            if (scrollTop >= sectionTop - 100 && scrollTop < sectionTop + sectionHeight - 100) {
              currentSection = sections[index];
            }
          }
        });

        setActiveSection(currentSection);
      };

      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Call once to set initial state

      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [location.pathname, setPageSEO]);

  return (
    <header className={isScrolled ? 'scrolled' : ''}>
      <nav className="container">
        <Link to="/" className="logo">
          <LazyImage 
            src={logoImg} 
            alt={generateAltText('Octa Node Engineering', 'logo')} 
            loading="eager"
            className="logo-image"
            priority={true}
          />
        </Link>
        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <Link
              to="/"
              className={activeSection === 'home' ? 'active' : ''}
              onClick={() => setActiveSection('home')}
            >
              Home
            </Link>
          </li>
          <li>
            <a
              href="#products"
              className={activeSection === 'products' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                setActiveSection('products');
                scrollToSection('products');
              }}
            >
              Products
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className={activeSection === 'contact' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                setActiveSection('contact');
                scrollToSection('contact');
              }}
            >
              Contact
            </a>
          </li>

        </ul>
        <a 
          href="#contact" 
          className="btn btn-header"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('contact');
          }}
        >
          Get in Touch
        </a>
        <div className={`menu-icon ${isMenuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!isMenuOpen)}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </nav>
    </header>
  );
};

function App() {
  // State for image modal
  const [modalImage, setModalImage] = useState<string>('');
  const [modalProductName, setModalProductName] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Rotating hero terms
  const rotatingTerms = [
    'Business',
    'Education',
    'Banking',
    'Automation',
    'Analytics',
    'Security'
  ];
  const [termIndex, setTermIndex] = useState<number>(0);
  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTermIndex((prev) => (prev + 1) % rotatingTerms.length);
    }, 2200);
    return () => window.clearInterval(intervalId);
  }, []);

  // Initialize Google Analytics
  useEffect(() => {
    if (import.meta.env.PROD) {
      // Load Google Analytics script
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${seoConfig.gaTrackingId}`;
      script.async = true;
      document.head.appendChild(script);

      // Initialize GA
      window.dataLayer = window.dataLayer || [];
      function gtag(){window.dataLayer.push(arguments);}
      window.gtag = gtag;
      window.gtag('js', new Date());
      window.gtag('config', seoConfig.gaTrackingId);
    }
  }, []);

  // Prevent automatic scrolling on page load and preload critical images
  useEffect(() => {
    // Disable browser's scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    // Prevent default hash scrolling behavior
    const preventHashScroll = () => {
      window.scrollTo(0, 0);
    };
    
    // Force scroll to top immediately
    preventHashScroll();
    
    // Remove any hash from URL without triggering navigation
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
      // Force scroll to top again after hash removal
      setTimeout(preventHashScroll, 0);
    }
    
    // Add a small delay to ensure React has finished rendering
    const timeoutId = setTimeout(preventHashScroll, 100);
    
    // Performance optimizations
    addResourceHints();
    preloadCriticalResources();
    loadThirdPartyScripts();
    measurePerformance();
    registerServiceWorker();
    monitorMemoryUsage();
    
    // Preload critical images and components for better performance
    preloadCriticalImages();
    preloadCriticalComponents();
    
    return () => clearTimeout(timeoutId);
  }, []);

  // Handle image modal
  const handleImageClick = (imageUrl: string, productName: string) => {
    setModalImage(imageUrl);
    setModalProductName(productName);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage('');
    setModalProductName('');
  };

  return (
    <HelmetProvider>
      <Router>
        {/* Default SEO fallback for all routes */}
        <SEOHead />
        {/* Global WebSite + SearchAction structured data */}
        <WebSiteStructuredData />
        
        <ErrorBoundary>
          <Routes>
            {/* Admin Routes - No header/footer */}
            <Route path="/admin/*" element={
              <Suspense fallback={<LoadingSpinner message="Loading admin panel..." fullScreen />}>
                <LazyAdminRouter />
              </Suspense>
            } />

            {/* Public Routes - With header/footer */}
            <Route path="/*" element={
            <div>
              <Navigation />
              <main>
                <Suspense fallback={<LoadingSpinner message="Loading page..." />}>
                  <Routes>
                    <Route path="/" element={
                  <>
                    {/* Home Page SEO */}
                    <SEOHead
                      title="AI Solutions for Business - Transform Your Future"
                      description="Leading AI solutions provider in Nigeria. Discover Stylus AI for education and TI-BOT for banking. Transform your business with cutting-edge artificial intelligence technology."
                      keywords={['AI solutions for business', 'artificial intelligence education', 'AI banking solutions', 'Stylus AI', 'TI-BOT', 'Nigeria AI company', 'business automation']}
                      type="website"
                    />
                    
                    {/* Structured Data for Organization and Local Business */}
                    <OrganizationStructuredData />
                    <LocalBusinessStructuredData />
                    {/* Breadcrumbs for Home */}
                    <StructuredData data={generateBreadcrumbStructuredData([
                      { name: 'Home', url: 'https://octanode.online/' }
                    ])} />
                    
                    <section id="home" className="hero">
                      <div className="hero-container">
                        <div className="hero-content">
                          <div className="hero-badge">
                            OCTA NODE ENGINEERING (ONE INTELLIGENCE)
                          </div>
                          <h3>
                            Leading AI Solutions for{' '}
                            <span key={termIndex} className="rotating-term">
                              {rotatingTerms[termIndex]}
                            </span>
                          </h3>
                          <h1>
                            <span className="highlight">Redefining The Future!</span>
                          </h1>
                          <p>We infuse the world with intelligence by developing bespoke AI solutions that drive growth, efficiency, and innovation in education, business, and banking. Discover our flagship products: Stylus AI for educational excellence and TI-BOT for smart banking automation.</p>
                          <div className="hero-actions">
                            <a 
                              href="#products" 
                              className="btn btn-primary"
                              onClick={(e) => {
                                e.preventDefault();
                                scrollToSection('products');
                              }}
                            >
                              Explore Our Products
                            </a>
                            <a 
                              href="#contact" 
                              className="btn btn-secondary"
                              onClick={(e) => {
                                e.preventDefault();
                                scrollToSection('contact');
                              }}
                            >
                              Get in Touch
                            </a>
                          </div>
                        </div>
                        <div className="hero-visual">
                          <Carousel />
                        </div>
                      </div>
                    </section>

                    <section id="products" className="products-section">
                      <div className="container">
                        <h2>Our AI Solutions: Stylus AI & TI-BOT</h2>
                        <div className="products-grid">
                          {products.map(product => (
                            <div className="product-card" key={product.name}>
                              <ProductCarousel
                                images={product.images}
                                productName={product.name}
                                onImageClick={handleImageClick}
                              />
                              <div className="product-details">
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                                <Link to={`/product/${product.id}`} className="btn btn-primary">
                                  Learn More
                                </Link>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="products-footer">
                          <a 
                            href="#contact" 
                            className="btn"
                            onClick={(e) => {
                              e.preventDefault();
                              scrollToSection('contact');
                            }}
                          >
                            Get in Touch for More Products
                          </a>
                        </div>
                      </div>
                    </section>

                    <section id="contact" className="contact-us">
                      <div className="container">
                        <div className="contact-header">
                          <h2>Get in Touch</h2>
                          <p>Ready to transform your business with AI? Let's discuss how our solutions can help you achieve your goals.</p>
                        </div>

                        <div className="contact-content">
                          <div className="contact-info-cards">
                            <div className="info-card">
                              <div className="info-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                </svg>
                              </div>
                              <div className="info-content">
                                <h3>Visit Our Office</h3>
                                <p>No 14 Oluwatoyin Off Gani<br />By Ademulegun Road<br />Ondo State, Nigeria</p>
                              </div>
                            </div>

                            <div className="info-card">
                              <div className="info-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                                </svg>
                              </div>
                              <div className="info-content">
                                <h3>Call Us</h3>
                                <p><a href="tel:+2349028267223">+234 902 826 7223</a></p>
                                <p className="availability">Mon - Fri, 9AM - 6PM WAT</p>
                              </div>
                            </div>

                            <div className="info-card">
                              <div className="info-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                </svg>
                              </div>
                              <div className="info-content">
                                <h3>Email Us</h3>
                                <p><a href="mailto:info@octanode.online">info@octanode.online</a></p>
                                <p><a href="mailto:support@octanode.online">support@octanode.online</a></p>
                              </div>
                            </div>
                          </div>

                          <div className="contact-form-wrapper">
                            <div className="contact-form-container">
                              <h3>Send us a Message</h3>
                              <form className="contact-form">
                                <div className="form-row">
                                  <div className="form-group">
                                    <label htmlFor="name">Full Name *</label>
                                    <input type="text" id="name" name="name" required />
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="email">Email Address *</label>
                                    <input type="email" id="email" name="email" required />
                                  </div>
                                </div>

                                <div className="form-row">
                                  <div className="form-group">
                                    <label htmlFor="phone">Phone Number</label>
                                    <input type="tel" id="phone" name="phone" />
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="company">Company</label>
                                    <input type="text" id="company" name="company" />
                                  </div>
                                </div>

                                <div className="form-group">
                                  <label htmlFor="subject">Subject *</label>
                                  <select id="subject" name="subject" required>
                                    <option value="">Select a subject</option>
                                    <option value="general">General Inquiry</option>
                                    <option value="stylus-ai">Stylus AI - Product Demo</option>
                                    <option value="ti-bot">TI-BOT - Product Demo</option>
                                    <option value="partnership">Partnership Opportunity</option>
                                    <option value="support">Technical Support</option>
                                    <option value="other">Other</option>
                                  </select>
                                </div>

                                <div className="form-group">
                                  <label htmlFor="message">Message *</label>
                                  <textarea id="message" name="message" rows={6} placeholder="Tell us about your project or how we can help you..." required></textarea>
                                </div>

                                <div className="form-group-checkbox">
                                  <input type="checkbox" id="privacy-policy" name="privacy-policy" required />
                                  <label htmlFor="privacy-policy">
                                    I agree to the <Link to="/privacy">Privacy Policy</Link> and <Link to="/terms">Terms & Conditions</Link>
                                  </label>
                                </div>

                                <div className="form-group-checkbox">
                                  <input type="checkbox" id="newsletter" name="newsletter" />
                                  <label htmlFor="newsletter">
                                    Subscribe to our newsletter for updates and insights
                                  </label>
                                </div>

                                <button type="submit" className="btn btn-primary btn-large">
                                  <span>Send Message</span>
                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                                  </svg>
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </>
                } />
                <Route path="/product/:productId" element={
                  <>
                    <StructuredData data={generateBreadcrumbStructuredData([
                      { name: 'Home', url: 'https://octanode.online/' },
                      { name: 'Products', url: 'https://octanode.online/#products' }
                    ])} />
                    <LazyProductPage />
                  </>
                } />
                <Route path="/privacy" element={
                  <>
                    <StructuredData data={generateBreadcrumbStructuredData([
                      { name: 'Home', url: 'https://octanode.online/' },
                      { name: 'Privacy Policy', url: 'https://octanode.online/privacy' }
                    ])} />
                    <LazyPrivacy />
                  </>
                } />
                <Route path="/terms" element={
                  <>
                    <StructuredData data={generateBreadcrumbStructuredData([
                      { name: 'Home', url: 'https://octanode.online/' },
                      { name: 'Terms & Conditions', url: 'https://octanode.online/terms' }
                    ])} />
                    <LazyTerms />
                  </>
                } />
              </Routes>
                </Suspense>
              </main>

            <footer className="enhanced-footer">
              <div className="container">
                <div className="footer-content">
                  <div className="footer-column about">
                    <LazyImage 
                      src={logoImg} 
                      alt={generateAltText('Octa Node Engineering', 'logo')} 
                      className="footer-logo"
                      loading="eager"
                      priority={true}
                    />
                    <p>Infusing the world with intelligence through cutting-edge AI solutions for education, business, and banking.</p>
                    <div className="social-links">
                      <a href="#" aria-label="Facebook">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      </a>
                      <a href="#" aria-label="Twitter">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                      </a>
                      <a href="#" aria-label="LinkedIn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      </a>
                      <a href="#" aria-label="Instagram">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                      </a>
                    </div>
                  </div>

                  <div className="footer-column products">
                    <h3>Our Products</h3>
                    <ul>
                      <li><Link to="/product/stylus-ai">Stylus AI</Link></li>
                      <li><Link to="/product/ti-bot">TI-BOT</Link></li>
                      <li>
                        <a 
                          href="#products"
                          onClick={(e) => {
                            e.preventDefault();
                            scrollToSection('products');
                          }}
                        >
                          All Products
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="footer-column links">
                    <h3>Quick Links</h3>
                    <ul>
                      <li><Link to="/">Home</Link></li>
                      <li>
                        <a 
                          href="#products"
                          onClick={(e) => {
                            e.preventDefault();
                            scrollToSection('products');
                          }}
                        >
                          Products
                        </a>
                      </li>
                      <li>
                        <a 
                          href="#contact"
                          onClick={(e) => {
                            e.preventDefault();
                            scrollToSection('contact');
                          }}
                        >
                          Contact
                        </a>
                      </li>
                      <li><Link to="/privacy">Privacy Policy</Link></li>
                      <li><Link to="/terms">Terms & Conditions</Link></li>
                    </ul>
                  </div>

                  <div className="footer-column contact-info">
                    <h3>Get in Touch</h3>
                    <div className="contact-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                      <div>
                        <p>No 14 Oluwatoyin Off Gani</p>
                        <p>By Ademulegun Road</p>
                        <p>Ondo State, Nigeria</p>
                      </div>
                    </div>

                    <div className="contact-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                      </svg>
                      <a href="tel:+2349028267223">+234 902 826 7223</a>
                    </div>

                    <div className="contact-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                      <div>
                        <a href="mailto:info@octanode.online">info@octanode.online</a>
                        <a href="mailto:support@octanode.online">support@octanode.online</a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="footer-bottom">
                  <div className="footer-bottom-content">
                    <p>&copy; 2025 Octa Node Engineering. All rights reserved.</p>
                    <div className="footer-bottom-links">
                      <Link to="/privacy">Privacy Policy</Link>
                      <Link to="/terms">Terms of Service</Link>
                      <a href="mailto:support@octanode.online">Support</a>
                    </div>
                  </div>
                </div>
              </div>
            </footer>

            <ImageModal
              isOpen={isModalOpen}
              imageUrl={modalImage}
              productName={modalProductName}
              onClose={closeModal}
            />

            {/* Chat Widget - only show on public pages */}
            <Suspense fallback={null}>
              <LazyChatWidget />
            </Suspense>
          </div>
        } />
        <Route element={<AdminGuard />}>
          <Route path="/admin/*" element={
            <Suspense fallback={<LoadingSpinner message="Loading admin panel..." fullScreen />}>
              <LazyAdminRouter />
            </Suspense>
          } />
        </Route>
      </Routes>
        </ErrorBoundary>
      </Router>
    </HelmetProvider>
  );
}

import { seoConfig } from './seo/data/seoConfig';

declare global {
  interface Window {
    dataLayer: Record<string, any>[];
    gtag: (...args: any[]) => void;
  }
}

export default App;
