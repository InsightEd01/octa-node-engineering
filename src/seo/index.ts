// Components
export { SEOHead } from './components/SEOHead';
export { SocialMeta } from './components/SocialMeta';
export { SocialPreview } from './components/SocialPreview';
export { SocialSharingButtons } from './components/SocialSharingButtons';
export { SocialSharingPreview } from './components/SocialSharingPreview';

// Hooks
export { useSEO, useProductSEO } from './hooks/useSEO';
export { useSocialSharing } from './hooks/useSocialSharing';

// Types
export type { 
  SEOProps, 
  SEOConfig, 
  PageSEO, 
  SocialMetaProps, 
  SocialSharingProps, 
  SocialImageOptions 
} from './types';

// Configuration
export { seoConfig, pageSEOConfig } from './data/seoConfig';

// Utilities
export {
  generateTitle,
  generateDescription,
  generateKeywords,
  getPageSEO,
  generateProductSEO,
  createCanonicalUrl,
  generateOrganizationStructuredData,
  cleanMetaDescription,
  generateBreadcrumbStructuredData
} from './utils/seoUtils';

export {
  generateSocialImage,
  generateSocialImageAlt,
  validateSocialImage,
  getPlatformOptimizedImage,
  generateSharingUrls
} from './utils/socialImageGenerator';