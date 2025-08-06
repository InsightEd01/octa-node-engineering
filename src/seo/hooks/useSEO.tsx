import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { SEOProps } from '../types';
import { seoConfig, pageSEOConfig } from '../data/seoConfig';
import { 
  generateTitle, 
  generateDescription, 
  generateKeywords, 
  getPageSEO,
  createCanonicalUrl 
} from '../utils/seoUtils';

interface UseSEOReturn {
  seoData: SEOProps;
  updateSEO: (newSEOData: Partial<SEOProps>) => void;
  resetSEO: () => void;
  setPageSEO: (pageName: keyof typeof pageSEOConfig) => void;
}

export const useSEO = (initialSEO?: Partial<SEOProps>): UseSEOReturn => {
  const location = useLocation();
  
  // Initialize SEO state with defaults
  const [seoData, setSeoData] = useState<SEOProps>(() => {
    const defaultSEO: SEOProps = {
      title: seoConfig.defaultTitle,
      description: seoConfig.defaultDescription,
      keywords: seoConfig.defaultKeywords,
      image: seoConfig.defaultImage,
      type: 'website',
      noindex: false,
      canonical: createCanonicalUrl(location.pathname)
    };

    return { ...defaultSEO, ...initialSEO };
  });

  // Update SEO data based on route changes
  useEffect(() => {
    const pathname = location.pathname;
    let pageName: keyof typeof pageSEOConfig | null = null;

    // Map routes to page configurations
    if (pathname === '/' || pathname === '/home') {
      pageName = 'home';
    } else if (pathname.startsWith('/products')) {
      pageName = 'products';
    } else if (pathname === '/about') {
      pageName = 'about';
    } else if (pathname === '/contact') {
      pageName = 'contact';
    } else if (pathname === '/privacy') {
      pageName = 'privacy';
    } else if (pathname === '/terms') {
      pageName = 'terms';
    }

    // Update SEO data for the current route
    if (pageName) {
      const pageConfig = getPageSEO(pageName);
      setSeoData(prevData => ({
        ...prevData,
        title: generateTitle(pageConfig.title),
        description: generateDescription(pageConfig.description),
        keywords: generateKeywords(pageConfig.keywords),
        canonical: createCanonicalUrl(pathname)
      }));
    } else {
      // For unknown routes, update canonical URL only
      setSeoData(prevData => ({
        ...prevData,
        canonical: createCanonicalUrl(pathname)
      }));
    }
  }, [location.pathname]);

  // Function to update SEO data
  const updateSEO = useCallback((newSEOData: Partial<SEOProps>) => {
    setSeoData(prevData => {
      const updatedData = { ...prevData, ...newSEOData };
      
      // Process the updated data through utility functions
      if (newSEOData.title !== undefined) {
        updatedData.title = generateTitle(newSEOData.title);
      }
      
      if (newSEOData.description !== undefined) {
        updatedData.description = generateDescription(newSEOData.description);
      }
      
      if (newSEOData.keywords !== undefined) {
        updatedData.keywords = generateKeywords(newSEOData.keywords);
      }
      
      return updatedData;
    });
  }, []);

  // Function to reset SEO to defaults
  const resetSEO = useCallback(() => {
    setSeoData({
      title: seoConfig.defaultTitle,
      description: seoConfig.defaultDescription,
      keywords: seoConfig.defaultKeywords,
      image: seoConfig.defaultImage,
      type: 'website',
      noindex: false,
      canonical: createCanonicalUrl(location.pathname)
    });
  }, [location.pathname]);

  // Function to set SEO for a specific page
  const setPageSEO = useCallback((pageName: keyof typeof pageSEOConfig) => {
    const pageConfig = getPageSEO(pageName);
    updateSEO({
      title: pageConfig.title,
      description: pageConfig.description,
      keywords: pageConfig.keywords
    });
  }, [updateSEO]);

  return {
    seoData,
    updateSEO,
    resetSEO,
    setPageSEO
  };
};

// Hook for dynamic product SEO
export const useProductSEO = (productName?: string, productDescription?: string) => {
  const { seoData, updateSEO, resetSEO } = useSEO();

  useEffect(() => {
    if (productName && productDescription) {
      const productTitle = `${productName} - AI Solution by Octa Node Engineering`;
      const productDesc = `${productDescription} Discover how ${productName} can transform your business with advanced AI technology.`;
      const productKeywords = [productName, 'AI solution', 'artificial intelligence', 'business automation'];

      updateSEO({
        title: productTitle,
        description: productDesc,
        keywords: productKeywords,
        type: 'product'
      });
    }
  }, [productName, productDescription, updateSEO]);

  return {
    seoData,
    updateSEO,
    resetSEO
  };
};

export default useSEO;