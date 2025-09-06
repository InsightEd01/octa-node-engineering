import { OrganizationData, ProductData, LocalBusinessData } from '../types';

// Organization structured data
export const organizationStructuredData: OrganizationData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Octa Node Engineering',
  alternateName: 'Octa Node',
  description: 'Leading AI solutions provider offering innovative artificial intelligence products for business automation, education, and banking sectors.',
  url: 'https://octanode.online',
  logo: 'https://octanode.online/assets/logo.png',
  image: 'https://octanode.online/assets/logo.png',
  foundingDate: '2020',
  industry: 'Artificial Intelligence',
  knowsAbout: [
    'Artificial Intelligence',
    'Machine Learning',
    'Business Automation',
    'Educational Technology',
    'Banking Technology',
    'AI Solutions'
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+234-XXX-XXX-XXXX',
      contactType: 'customer service',
      availableLanguage: ['English'],
      areaServed: 'Nigeria'
    },
    {
      '@type': 'ContactPoint',
      contactType: 'technical support',
      availableLanguage: ['English'],
      areaServed: 'Nigeria'
    }
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: '[Address]',
    addressLocality: 'Ondo',
    addressRegion: 'Ondo State',
    addressCountry: 'Nigeria',
    postalCode: '[Postal Code]'
  },
  sameAs: [
    'https://linkedin.com/company/octa-node-engineering',
    'https://twitter.com/octanodeeng',
    'https://facebook.com/octanodeengineering',
    'https://instagram.com/octanodeeng'
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'AI Solutions',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'AI Consulting Services',
          description: 'Professional AI consulting and implementation services'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: 'Stylus AI',
          description: 'AI-powered educational technology solution'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: 'TI-BOT',
          description: 'Intelligent banking automation solution'
        }
      }
    ]
  }
};

// Product structured data templates
export const stylusAIStructuredData: ProductData = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Stylus AI',
  description: 'Revolutionizing assessments, Stylus AI is an advanced system that accurately marks theory questions and all kinds of handwritten tests, saving educators countless hours and providing instant, consistent feedback.',
  image: [
    'https://octanode.online/assets/stylus1.png', 
    'https://octanode.online/assets/stylus2.png'
  ],
  brand: {
    '@type': 'Brand',
    name: 'Octa Node Engineering',
  },
  category: 'Educational Technology',
  applicationCategory: 'Education',
  operatingSystem: 'Web-based, iOS, Android',
  releaseNotes: 'Advanced handwriting recognition technology with multi-language support',
  featureList: [
    'Advanced handwriting recognition technology',
    'Multi-language support for global accessibility',
    'Customizable grading rubrics and criteria',
    'Real-time feedback generation',
    'Integration with popular LMS platforms',
    'Detailed analytics and progress tracking'
  ],
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    url: 'https://stylusaipro.netlify.app',
    seller: {
      '@type': 'Organization',
      name: 'Octa Node Engineering'
    }
  },
  manufacturer: {
    '@type': 'Organization',
    name: 'Octa Node Engineering'
  },
  audience: {
    '@type': 'Audience',
    audienceType: 'Educators, Schools, Educational Institutions'
  }
};

export const tibotStructuredData: ProductData = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'TI-BOT',
  description: 'An AI-enabled time management system that replaces traditional bells in schools and enhances announcements and student engagement over a large school.',
  image: ['https://octanode.online/assets/Tibot.png'],
  brand: {
    '@type': 'Brand',
    name: 'Octa Node Engineering',
  },
  category: 'School Management Technology',
  applicationCategory: 'Education',
  operatingSystem: 'IoT-enabled hardware with cloud management',
  releaseNotes: 'Smart scheduling with AI optimization and multi-zone audio management',
  featureList: [
    'Smart scheduling with AI optimization',
    'Multi-zone audio management',
    'Emergency broadcast capabilities',
    'Weather-responsive schedule adjustments',
    'Integration with school management systems',
    'Real-time system monitoring'
  ],
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    url: 'https://tibot-ai.netlify.app',
    seller: {
      '@type': 'Organization',
      name: 'Octa Node Engineering'
    }
  },
  manufacturer: {
    '@type': 'Organization',
    name: 'Octa Node Engineering'
  },
  audience: {
    '@type': 'Audience',
    audienceType: 'Schools, Educational Institutions, School Administrators'
  }
};

// Local business structured data
export const localBusinessStructuredData: LocalBusinessData = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://octanode.online/#organization',
  name: 'Octa Node Engineering',
  alternateName: 'Octa Node',
  description: 'Leading AI solutions provider specializing in artificial intelligence products for business automation, education technology, and digital transformation in Nigeria.',
  url: 'https://octanode.online',
  telephone: '+234-XXX-XXX-XXXX',
  email: 'info@octanodeengineering.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '[Address]',
    addressLocality: 'Ondo',
    addressRegion: 'Ondo State',
    addressCountry: 'Nigeria',
    postalCode: '[Postal Code]'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 7.0906, // Approximate coordinates for Ondo, Nigeria
    longitude: 4.8354,
  },
  openingHours: [
    'Mo-Fr 09:00-17:00'
  ],
  priceRange: '$$',
  currenciesAccepted: 'NGN, USD',
  paymentAccepted: 'Cash, Credit Card, Bank Transfer',
  areaServed: [
    {
      '@type': 'Country',
      name: 'Nigeria'
    },
    {
      '@type': 'State',
      name: 'Ondo State'
    }
  ],
  serviceArea: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: 7.0906,
      longitude: 4.8354
    },
    geoRadius: '500000' // 500km radius
  },
  knowsAbout: [
    'Artificial Intelligence',
    'Machine Learning',
    'Educational Technology',
    'Business Automation',
    'AI Consulting',
    'Software Development'
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'AI Solutions and Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'AI Consulting',
          description: 'Professional artificial intelligence consulting services',
          serviceType: 'Technology Consulting'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: 'Stylus AI',
          description: 'AI-powered educational assessment tool'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: 'TI-BOT',
          description: 'AI-enabled school time management system'
        }
      }
    ]
  },
  sameAs: [
    'https://linkedin.com/company/octa-node-engineering',
    'https://twitter.com/octanodeeng',
    'https://facebook.com/octanodeengineering'
  ]
};