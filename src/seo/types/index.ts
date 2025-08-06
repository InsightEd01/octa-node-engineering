export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  noindex?: boolean;
  canonical?: string;
}

export interface SEOConfig {
  siteUrl: string;
  defaultTitle: string;
  titleTemplate: string;
  defaultDescription: string;
  defaultKeywords: string[];
  defaultImage: string;
  twitterHandle: string;
  facebookAppId?: string;
  gaTrackingId: string;
  googleSiteVerification?: string;
}

export interface PageSEO {
  title: string;
  description: string;
  keywords: string[];
  image?: string;
  canonical?: string;
  noindex?: boolean;
}

export interface SocialMetaProps {
  title: string;
  description: string;
  image: string;
  url: string;
  type: 'website' | 'article' | 'product';
  twitterHandle?: string;
  facebookAppId?: string;
}

export interface SocialSharingProps {
  url: string;
  title: string;
  description: string;
  image?: string;
  showLabels?: boolean;
  platforms?: ('facebook' | 'twitter' | 'linkedin' | 'whatsapp' | 'telegram' | 'email')[];
}

export interface SocialImageOptions {
  title: string;
  subtitle?: string;
  type?: 'default' | 'product' | 'article';
  backgroundColor?: string;
  textColor?: string;
}

export interface StructuredDataProps {
  data: any; // JSON-LD structured data object
}

export interface ContactPoint {
  '@type': 'ContactPoint';
  telephone?: string;
  contactType: string;
  availableLanguage: string[];
  areaServed?: string;
}

export interface Address {
  '@type': 'PostalAddress';
  streetAddress?: string;
  addressLocality?: string;
  addressRegion?: string;
  addressCountry: string;
  postalCode?: string;
}

export interface GeoCoordinates {
  '@type': 'GeoCoordinates';
  latitude: number;
  longitude: number;
}

export interface Brand {
  '@type': 'Brand';
  name: string;
}

export interface Offer {
  '@type': 'Offer';
  availability: string;
  url?: string;
  seller?: {
    '@type': 'Organization';
    name: string;
  };
}

export interface OrganizationData {
  '@context': string;
  '@type': 'Organization';
  name: string;
  alternateName?: string;
  description: string;
  url: string;
  logo: string;
  image?: string;
  foundingDate?: string;
  industry?: string;
  knowsAbout?: string[];
  contactPoint: ContactPoint[];
  address: Address;
  sameAs: string[];
  hasOfferCatalog?: {
    '@type': 'OfferCatalog';
    name: string;
    itemListElement: Array<{
      '@type': 'Offer';
      itemOffered: {
        '@type': 'Service' | 'Product';
        name: string;
        description: string;
      };
    }>;
  };
}

export interface ProductData {
  '@context': string;
  '@type': 'Product';
  name: string;
  description: string;
  image: string[];
  brand: Brand;
  category: string;
  applicationCategory?: string;
  operatingSystem?: string;
  releaseNotes?: string;
  featureList?: string[];
  offers: Offer;
  manufacturer?: {
    '@type': 'Organization';
    name: string;
  };
  audience?: {
    '@type': 'Audience';
    audienceType: string;
  };
}

export interface LocalBusinessData {
  '@context': string;
  '@type': 'LocalBusiness';
  '@id'?: string;
  name: string;
  alternateName?: string;
  description: string;
  url: string;
  telephone: string;
  email?: string;
  address: Address;
  geo: GeoCoordinates;
  openingHours: string[];
  priceRange: string;
  currenciesAccepted?: string;
  paymentAccepted?: string;
  areaServed?: Array<{
    '@type': 'Country' | 'State';
    name: string;
  }>;
  serviceArea?: {
    '@type': 'GeoCircle';
    geoMidpoint: GeoCoordinates;
    geoRadius: string;
  };
  knowsAbout?: string[];
  hasOfferCatalog?: {
    '@type': 'OfferCatalog';
    name: string;
    itemListElement: Array<{
      '@type': 'Offer';
      itemOffered: {
        '@type': 'Service' | 'Product';
        name: string;
        description: string;
        serviceType?: string;
      };
    }>;
  };
  sameAs?: string[];
}