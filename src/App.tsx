import { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ImageModal from './components/ImageModal';

import LazyImage from './components/LazyImage';
import { generateAltText } from './utils/imageUtils';
import {
  addResourceHints,
  preloadCriticalResources,
  loadThirdPartyScripts,
  measurePerformance,
  registerServiceWorker,
  monitorMemoryUsage
} from './utils/performance';
import logoImg from '../assets/logo.png';
import HomePage from './pages/HomePage';

import {
  LazyProductPage,
  LazyPrivacy,
  LazyTerms,
  LazyBlog,
  LazyContact,
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

type IdleRenderHandle = number;
type IdleRenderWindow = Window & {
  requestIdleCallback?: (cb: () => void, options?: { timeout: number }) => IdleRenderHandle;
  cancelIdleCallback?: (handle: IdleRenderHandle) => void;
};

const scheduleNonCriticalRender = (callback: () => void, timeout: number) => {
  const idleWindow = window as IdleRenderWindow;

  if (typeof idleWindow.requestIdleCallback === 'function') {
    const handle = idleWindow.requestIdleCallback(() => callback(), { timeout });
    return () => {
      if (typeof idleWindow.cancelIdleCallback === 'function') {
        idleWindow.cancelIdleCallback(handle);
      }
    };
  }

  const handle = window.setTimeout(callback, timeout);
  return () => window.clearTimeout(handle);
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
    } else if (location.pathname === '/blog') {
      setPageSEO('blog');
    } else if (location.pathname === '/privacy') {
      setPageSEO('privacy');
    } else if (location.pathname === '/terms') {
      setPageSEO('terms');
    } else if (location.pathname === '/contact') {
      setActiveSection('contact');
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
              onClick={() => {
                setActiveSection('home');
                setMenuOpen(false);
              }}
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
                setMenuOpen(false);
              }}
            >
              Products
            </a>
          </li>
          <li>
            <Link
              to="/contact"
              className={activeSection === 'contact' ? 'active' : ''}
              onClick={() => {
                setActiveSection('contact');
                setMenuOpen(false);
              }}
            >
              Contact
            </Link>
          </li>

          <li>
            <Link to="/blog" onClick={() => setMenuOpen(false)}>
              Blog
            </Link>
          </li>
        </ul>
        <Link
          to="/contact"
          className="btn btn-header"
          onClick={() => {
            setActiveSection('contact');
            setMenuOpen(false);
          }}
        >
          Get in Touch
        </Link>
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
  const [showChatWidget, setShowChatWidget] = useState(false);

  useEffect(() => {
    const cleanups = [
      scheduleNonCriticalRender(() => setShowChatWidget(true), 2200)
    ];

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  // Initialize Google Analytics
  useEffect(() => {
    // Only initialize if we have a real tracking ID
    if (import.meta.env.PROD && seoConfig.gaTrackingId && !seoConfig.gaTrackingId.includes('XXXXX')) {
      // Load Google Analytics script
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${seoConfig.gaTrackingId}`;
      script.async = true;
      document.head.appendChild(script);

      // Initialize GA
      window.dataLayer = window.dataLayer || [];
      function gtag() { window.dataLayer.push(arguments); }
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

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const cleanup = scheduleNonCriticalRender(() => {
      preloadCriticalComponents();
    }, 3000);

    return () => cleanup();
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
                          <SEOHead
                            title="AI Solutions for Business - Transform Your Future"
                            description="Leading software and AI solutions provider in Nigeria. Discover Stylus AI for exam grading, TI-BOT for time management, DressCode for fashion commerce, WorkSpot for smart attendance, and Octa Node's cooperative banking software."
                            keywords={['AI solutions for business', 'artificial intelligence education', 'cooperative banking software', 'Stylus AI', 'TI-BOT', 'DressCode', 'WorkSpot', 'Nigeria AI company', 'business automation']}
                            type="website"
                          />
                          <OrganizationStructuredData />
                          <LocalBusinessStructuredData />
                          <StructuredData data={generateBreadcrumbStructuredData([
                            { name: 'Home', url: 'https://octanode.co/' }
                          ])} />
                          <HomePage onImageClick={handleImageClick} />
                        </>
                      } />
                      <Route path="/product/:productId" element={
                        <>
                          <StructuredData data={generateBreadcrumbStructuredData([
                            { name: 'Home', url: 'https://octanode.co/' },
                            { name: 'Products', url: 'https://octanode.co/#products' }
                          ])} />
                          <LazyProductPage />
                        </>
                      } />
                      <Route path="/privacy" element={
                        <>
                          <StructuredData data={generateBreadcrumbStructuredData([
                            { name: 'Home', url: 'https://octanode.co/' },
                            { name: 'Privacy Policy', url: 'https://octanode.co/privacy' }
                          ])} />
                          <LazyPrivacy />
                        </>
                      } />
                      <Route path="/terms" element={
                        <>
                          <StructuredData data={generateBreadcrumbStructuredData([
                            { name: 'Home', url: 'https://octanode.co/' },
                            { name: 'Terms & Conditions', url: 'https://octanode.co/terms' }
                          ])} />
                          <LazyTerms />
                        </>
                      } />
                      <Route path="/blog" element={
                        <>
                          <StructuredData data={generateBreadcrumbStructuredData([
                            { name: 'Home', url: 'https://octanode.co/' },
                            { name: 'Blog', url: 'https://octanode.co/blog' }
                          ])} />
                          <LazyBlog />
                        </>
                      } />
                      <Route path="/contact" element={
                        <>
                          <StructuredData data={generateBreadcrumbStructuredData([
                            { name: 'Home', url: 'https://octanode.co/' },
                            { name: 'Contact', url: 'https://octanode.co/contact' }
                          ])} />
                          <LazyContact />
                        </>
                      } />
                    </Routes>
                  </Suspense>
                </main>

                <footer className="octa-footer">
                  <div className="octa-footer-inner">
                    <LazyImage
                      src={logoImg}
                      alt={generateAltText('Octa Node Engineering', 'logo')}
                      className="octa-footer-logo"
                      loading="eager"
                      priority={true}
                    />
                    <nav className="octa-footer-links" aria-label="Footer navigation">
                      <Link to="/">Home</Link>
                      <Link to="/product/stylus-ai">Stylus AI</Link>
                      <Link to="/product/ti-bot">TI-BOT</Link>
                      <Link to="/product/dresscode">DressCode</Link>
                      <Link to="/product/workspot">WorkSpot</Link>
                      <Link to="/privacy">Privacy</Link>
                      <Link to="/terms">Terms</Link>
                      <Link to="/contact">Contact</Link>
                    </nav>
                    <p className="octa-footer-copy">&copy; 2025 Octa Node Engineering</p>
                  </div>
                </footer>

                <ImageModal
                  isOpen={isModalOpen}
                  imageUrl={modalImage}
                  productName={modalProductName}
                  onClose={closeModal}
                />

                {/* Chat Widget - only show on public pages */}
                {showChatWidget && (
                  <Suspense fallback={null}>
                    <LazyChatWidget />
                  </Suspense>
                )}
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
