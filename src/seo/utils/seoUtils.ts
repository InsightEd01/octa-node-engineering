import { seoConfig, pageSEOConfig } from '../data/seoConfig';

/**
 * Generate a properly formatted title using the title template
 */
export const generateTitle = (title?: string): string => {
  if (!title) {
    return seoConfig.defaultTitle;
  }

  // If title already contains the site name, return as is
  if (title.includes('Octa Node Engineering') || title.includes('OctaNode')) {
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
  const title = `${productName} - AI Solution by Octa Node Engineering (OctaNode)`;
  const description = `${productDescription} Discover how ${productName} by Octa Node Engineering can transform your business with advanced AI technology. Available at octanode.online and octanode.co.`;
  const keywords = [
    productName,
    `${productName} AI`,
    `${productName} by Octa Node Engineering`,
    'AI solution',
    'artificial intelligence',
    'business automation',
    'Octa Node Engineering',
    'OctaNode',
    'octanode.online',
    'octanode.co'
  ];

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
 * Create alternate URL for the secondary domain
 */
export const createAlternateUrl = (path: string): string => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `https://octanode.co${cleanPath}`;
};

/**
 * Generate structured data for organization
 */
export const generateOrganizationStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${seoConfig.siteUrl}/#organization`,
    "name": "Octa Node Engineering",
    "alternateName": ["OctaNode", "Octa Node", "Octa-Node Engineering", "octanode"],
    "description": "Octa Node Engineering (OctaNode) is Nigeria's leading AI solutions provider. We build Stylus AI for automated exam grading and TI-BOT for smart school bell systems. Transforming education and business through AI.",
    "url": seoConfig.siteUrl,
    "logo": `${seoConfig.siteUrl}${seoConfig.defaultImage}`,
    "image": `${seoConfig.siteUrl}${seoConfig.defaultImage}`,
    "telephone": "+2349028267223",
    "email": "info@octanode.online",
    "foundingDate": "2020",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+2349028267223",
      "contactType": "customer service",
      "availableLanguage": "English",
      "areaServed": "NG"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "No 14 Oluwatoyin Off Gani, By Ademulegun Road",
      "addressLocality": "Ondo",
      "addressRegion": "Ondo State",
      "addressCountry": "Nigeria",
      "postalCode": "351101"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 7.0906,
      "longitude": 4.8354
    },
    "sameAs": [
      "https://octanode.co",
      "https://octanode.online",
      "https://twitter.com/OctaNodeEng",
      "https://linkedin.com/company/octa-node-engineering",
      "https://facebook.com/octanodeengineering",
      "https://instagram.com/octanodeeng"
    ],
    "knowsAbout": [
      "Artificial Intelligence",
      "Machine Learning",
      "Educational Technology",
      "Business Automation",
      "Handwriting Recognition",
      "Automated Exam Grading",
      "Smart School Systems",
      "IoT"
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
export const generateBreadcrumbStructuredData = (breadcrumbs: Array<{ name: string, url: string }>) => {
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

/**
 * Generate FAQPage structured data from Q&A pairs
 */
export const generateFAQStructuredData = (faqs: Array<{ question: string; answer: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
};

/**
 * Generate HowTo structured data for instructional content
 */
export const generateHowToStructuredData = (name: string, description: string, steps: Array<{ name: string; text: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
};

/**
 * Generate SoftwareApplication structured data
 */
export const generateSoftwareApplicationStructuredData = (
  name: string,
  description: string,
  appUrl: string,
  category: string = 'EducationalApplication'
) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url: appUrl,
    applicationCategory: category,
    operatingSystem: 'Web, iOS, Android',
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      url: appUrl,
    },
    creator: {
      '@type': 'Organization',
      name: 'Octa Node Engineering',
      url: 'https://octanode.online',
    },
  };
};