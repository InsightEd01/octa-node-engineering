import { seoConfig, pageSEOConfig } from '../data/seoConfig';

/**
 * Generate a properly formatted title using the title template
 */
export const generateTitle = (title?: string): string => {
  if (!title) {
    return seoConfig.defaultTitle;
  }
  
  // If title already contains the site name, return as is
  if (title.includes('Octa Node Engineering')) {
    return title;
  }
  
  return seoConfig.titleTemplate.replace('%s', title);
};

/**
 * Generate a meta description with proper length and fallback
 */
export const generateDescription = (description?: string): string => {
  const finalDescription = description || seoConfig.defaultDescription;
  
  // Ensure description is within optimal length (150-160 characters)
  if (finalDescription.length > 160) {
    return finalDescription.substring(0, 157) + '...';
  }
  
  return finalDescription;
};

/**
 * Generate keywords array with defaults and deduplication
 */
export const generateKeywords = (keywords: string[] = []): string[] => {
  const combinedKeywords = [...keywords, ...seoConfig.defaultKeywords];
  
  // Remove duplicates and convert to lowercase for comparison
  const uniqueKeywords = combinedKeywords.filter((keyword, index, array) => 
    array.findIndex(k => k.toLowerCase() === keyword.toLowerCase()) === index
  );
  
  return uniqueKeywords;
};

/**
 * Get SEO configuration for a specific page
 */
export const getPageSEO = (pageName: keyof typeof pageSEOConfig) => {
  return pageSEOConfig[pageName] || {
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
    keywords: seoConfig.defaultKeywords
  };
};

/**
 * Generate product-specific SEO data
 */
export const generateProductSEO = (productName: string, productDescription: string) => {
  const title = `${productName} - AI Solution by Octa Node Engineering`;
  const description = `${productDescription} Discover how ${productName} can transform your business with advanced AI technology.`;
  const keywords = [productName, 'AI solution', 'artificial intelligence', 'business automation'];
  
  return {
    title: generateTitle(title),
    description: generateDescription(description),
    keywords: generateKeywords(keywords)
  };
};

/**
 * Create canonical URL
 */
export const createCanonicalUrl = (path: string): string => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${seoConfig.siteUrl}${cleanPath}`;
};

/**
 * Generate structured data for organization
 */
export const generateOrganizationStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Octa Node Engineering",
    "description": "Leading AI solutions provider offering innovative artificial intelligence products and services for business transformation.",
    "url": seoConfig.siteUrl,
    "logo": `${seoConfig.siteUrl}${seoConfig.defaultImage}`,
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": "English"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Nigeria",
      "addressRegion": "Ondo State"
    },
    "sameAs": [
      "https://twitter.com/OctaNodeEng",
      "https://linkedin.com/company/octa-node-engineering"
    ]
  };
};

/**
 * Validate and clean meta description
 */
export const cleanMetaDescription = (description: string): string => {
  // Remove HTML tags
  const cleanDescription = description.replace(/<[^>]*>/g, '');
  
  // Remove extra whitespace
  const trimmedDescription = cleanDescription.replace(/\s+/g, ' ').trim();
  
  return generateDescription(trimmedDescription);
};

/**
 * Generate breadcrumb structured data
 */
export const generateBreadcrumbStructuredData = (breadcrumbs: Array<{name: string, url: string}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  };
};