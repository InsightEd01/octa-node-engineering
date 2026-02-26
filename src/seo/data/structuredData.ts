import { OrganizationData, ProductData, LocalBusinessData } from '../types';

// Organization structured data
export const organizationStructuredData: OrganizationData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Octa Node Engineering',
  alternateName: 'OctaNode',
  description: 'Octa Node Engineering (OctaNode) is Nigeria\'s leading AI solutions provider. We build Stylus AI for automated exam grading and handwriting recognition, and TI-BOT for smart school bell and time management systems. Transforming education and business through artificial intelligence.',
  url: 'https://octanode.online',
  logo: 'https://octanode.online/assets/logo.png',
  image: 'https://octanode.online/assets/logo.png',
  foundingDate: '2020',
  industry: 'Artificial Intelligence',
  knowsAbout: [
    'Artificial Intelligence',
    'Machine Learning',
    'Deep Learning',
    'Natural Language Processing',
    'Computer Vision',
    'Handwriting Recognition',
    'Educational Technology',
    'EdTech',
    'Business Automation',
    'IoT (Internet of Things)',
    'AI Consulting',
    'School Management Systems',
    'Smart Bell Systems',
    'Automated Exam Grading',
    'AI Assessment Tools',
    'Digital Transformation',
    'Software Development'
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+2349028267223',
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
    streetAddress: 'No 14 Oluwatoyin Off Gani, By Ademulegun Road',
    addressLocality: 'Ondo',
    addressRegion: 'Ondo State',
    addressCountry: 'Nigeria',
    postalCode: '351101'
  },
  sameAs: [
    'https://octanode.co',
    'https://octanode.online',
    'https://linkedin.com/company/octa-node-engineering',
    'https://twitter.com/OctaNodeEng',
    'https://facebook.com/octanodeengineering',
    'https://instagram.com/octanodeeng'
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'AI Solutions & Products',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'AI Consulting Services',
          description: 'Professional AI consulting, implementation, and strategy services for businesses and educational institutions in Nigeria and Africa'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: 'Stylus AI',
          description: 'AI-powered automated exam grading and handwriting recognition system for educators, schools, and educational institutions'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: 'TI-BOT',
          description: 'AI-enabled smart school bell and time management system with multi-zone audio, emergency broadcasts, and IoT integration'
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
  description: 'Stylus AI is an advanced AI-powered exam grading and handwriting marking system by Octa Node Engineering. It accurately marks theory questions, essays, and all kinds of handwritten tests using artificial intelligence, saving educators countless hours and providing instant, consistent feedback. Used by schools and educational institutions across Nigeria.',
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
    'Automated exam grading and marking',
    'Multi-language support for global accessibility',
    'Customizable grading rubrics and criteria',
    'Real-time feedback generation for students',
    'Integration with popular LMS platforms',
    'Detailed analytics and progress tracking',
    'Bulk exam processing and batch grading',
    'Theory question and essay marking',
    'Secure cloud-based processing'
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
    audienceType: 'Educators, Teachers, Schools, Universities, Educational Institutions, Exam Bodies'
  }
};

export const tibotStructuredData: ProductData = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'TI-BOT',
  description: 'TI-BOT is an AI-enabled smart school bell and time management system by Octa Node Engineering. It replaces traditional bells in schools with intelligent scheduling, multi-zone announcements, emergency broadcasts, and IoT-powered automation. Perfect for modern schools and educational institutions in Nigeria.',
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
    'Customizable announcement templates',
    'Real-time system monitoring',
    'Mobile app for administrators',
    'Offline continuity with auto-sync',
    'Calendar and event integration'
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
    audienceType: 'Schools, Universities, Educational Institutions, School Administrators, Principals'
  }
};

// Local business structured data
export const localBusinessStructuredData: LocalBusinessData = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://octanode.online/#organization',
  name: 'Octa Node Engineering',
  alternateName: 'OctaNode',
  description: 'Octa Node Engineering (OctaNode) is Ondo State\'s premier AI solutions company, specializing in artificial intelligence products for automated exam grading (Stylus AI), smart school bell systems (TI-BOT), AI consulting, and digital transformation for businesses and educational institutions in Nigeria and Africa.',
  url: 'https://octanode.online',
  telephone: '+2349028267223',
  email: 'info@octanode.online',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'No 14 Oluwatoyin Off Gani, By Ademulegun Road',
    addressLocality: 'Ondo',
    addressRegion: 'Ondo State',
    addressCountry: 'Nigeria',
    postalCode: '351101'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 7.0906,
    longitude: 4.8354,
  },
  openingHours: [
    'Mo-Fr 09:00-18:00'
  ],
  priceRange: '$$',
  currenciesAccepted: 'NGN, USD',
  paymentAccepted: 'Cash, Credit Card, Bank Transfer, Mobile Money',
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
    'EdTech',
    'Business Automation',
    'AI Consulting',
    'Software Development',
    'Handwriting Recognition',
    'Automated Grading',
    'Smart School Systems',
    'IoT Solutions',
    'Digital Transformation'
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
          description: 'Professional artificial intelligence consulting, strategy, and implementation services for businesses and schools',
          serviceType: 'Technology Consulting'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: 'Stylus AI',
          description: 'AI-powered automated exam grading and handwriting recognition system for educational institutions'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: 'TI-BOT',
          description: 'AI-enabled smart school bell and time management system with IoT capabilities'
        }
      }
    ]
  },
  sameAs: [
    'https://octanode.co',
    'https://octanode.online',
    'https://linkedin.com/company/octa-node-engineering',
    'https://twitter.com/OctaNodeEng',
    'https://facebook.com/octanodeengineering',
    'https://instagram.com/octanodeeng'
  ]
};