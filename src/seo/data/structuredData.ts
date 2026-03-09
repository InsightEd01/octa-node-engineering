import { OrganizationData, ProductData, LocalBusinessData } from '../types';

// Organization structured data
export const organizationStructuredData: OrganizationData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Octa Node Engineering',
  alternateName: 'OctaNode',
  description: 'Octa Node Engineering (OctaNode) builds practical software for education, workforce operations, timed operations, fashion commerce, and cooperative banking workflows. We build Stylus AI, TI-BOT, DressCode, WorkSpot, and other business software solutions.',
  url: 'https://octanode.co',
  logo: 'https://octanode.co/assets/logo.png',
  image: 'https://octanode.co/assets/logo.png',
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
    'Workforce Operations',
    'Attendance Management',
    'Fashion Commerce',
    'Social Commerce',
    'Virtual Try-On',
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
    name: 'Software Products and Solutions',
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
          description: 'Examination grading software that reads captured handwritten exam scripts and grades them in seconds with consistent scoring'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: 'TI-BOT',
          description: 'Smart school bell, time management, and announcement system with multi-zone audio, emergency broadcasts, and support for schools and other organized environments'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: 'DressCode',
          description: 'Fashion social commerce platform for shopping, bespoke tailoring, creator monetization, and AI virtual try-on'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: 'WorkSpot',
          description: 'Workforce attendance and operations platform with geo-fencing, biometric check-ins, live monitoring, and payroll-ready exports'
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
  description: 'Stylus AI is an examination grading software by Octa Node Engineering that lets educators snap handwritten exam scripts and receive grading in seconds instead of minutes. It reduces human error, limits bias, and delivers highly consistent scoring for theory questions, essays, and handwritten assessments.',
  image: [
    'https://octanode.co/assets/stylus1.png',
    'https://octanode.co/assets/stylus2.png'
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
    'Snap handwritten exam scripts and grade them in seconds',
    'High-accuracy handwriting recognition',
    'Automated exam grading and marking',
    'Customizable grading rubrics and criteria',
    'Reduced human error and grading bias',
    'Consistent scoring across large script batches',
    'Detailed analytics and progress tracking',
    'Bulk exam processing and batch grading',
    'Theory question and essay marking',
    'Secure cloud-based processing'
  ],
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    url: 'https://stylus.octanode.online',
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
  description: 'TI-BOT is a smart school bell, time management, and announcement system by Octa Node Engineering. It automates schedules, bells, and public updates for schools and other organized environments, and can also support banks with timing and crowd updates when deployed for that use case.',
  image: ['https://octanode.co/assets/Tibot.png'],
  brand: {
    '@type': 'Brand',
    name: 'Octa Node Engineering',
  },
  category: 'Smart School Bell and Time Management System',
  applicationCategory: 'Operations',
  operatingSystem: 'IoT-enabled hardware with cloud management',
  releaseNotes: 'Smart scheduling with AI optimization and multi-zone audio management',
  featureList: [
    'Smart scheduling and timed announcements',
    'Multi-zone audio management',
    'Emergency broadcast capabilities',
    'Weather-responsive schedule adjustments',
    'Integration with school management systems',
    'Customizable announcement templates',
    'Real-time system monitoring',
    'Timed crowd and service updates',
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
    audienceType: 'Schools, Universities, Educational Institutions, Administrators, Banks, Service Centers'
  }
};

export const dresscodeStructuredData: ProductData = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'DressCode',
  description: 'DressCode is a Nigerian fashion social commerce platform by Octa Node Engineering. It brings together fashion shopping, bespoke tailoring, creator monetization, direct messaging, secure payments, and AI virtual try-on in one app.',
  image: [
    'https://octanode.co/assets/dresscode-hero.png',
    'https://octanode.co/assets/dresscode-features.png',
    'https://octanode.co/assets/dresscode-ai-tryon.png'
  ],
  brand: {
    '@type': 'Brand',
    name: 'Octa Node Engineering',
  },
  category: 'Fashion Commerce',
  applicationCategory: 'LifestyleApplication',
  operatingSystem: 'iOS, Android, Web',
  releaseNotes: 'Social commerce, creator monetization, bespoke tailoring, and AI virtual try-on in one platform',
  featureList: [
    'Fashion marketplace for local designers and boutiques',
    'Bespoke order workflow for verified tailors',
    'Built-in social feed and fashion reels',
    'Direct messaging between buyers and sellers',
    'AI virtual try-on for outfit previews',
    'Secure payments and order tracking',
    'Seller dashboard for measurements and orders',
    'Creator monetization through tagged outfit posts'
  ],
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    url: 'https://dresscode-ten.vercel.app/',
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
    audienceType: 'Fashion Shoppers, Designers, Tailors, Boutiques, Creators, Fashion Businesses'
  }
};

export const workspotStructuredData: ProductData = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'WorkSpot',
  description: 'WorkSpot is a workforce attendance and operations platform by Octa Node Engineering. It uses geo-fencing, biometric verification, live operations monitoring, and payroll-ready exports to automate attendance management and compliance for modern teams.',
  image: [
    'https://octanode.co/assets/workspot-hero-dashboard.png',
    'https://octanode.co/assets/workspot-feature-checkins.png',
    'https://octanode.co/assets/workspot-feature-ops.png'
  ],
  brand: {
    '@type': 'Brand',
    name: 'Octa Node Engineering',
  },
  category: 'Workforce Operations',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'iOS, Android, Web',
  releaseNotes: 'Geo-fenced check-ins, biometric verification, live operations visibility, and payroll-ready exports',
  featureList: [
    'Geo-fenced attendance check-ins',
    'Biometric verification with Face ID and Touch ID',
    'Live operations dashboard',
    'Payroll-ready CSV and PDF exports',
    'Offline check-in support',
    'Audit-ready compliance logs',
    'Location-based zone setup',
    'Mobile-first workforce management'
  ],
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    url: 'https://play.google.com/store/search?q=workspot&c=apps',
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
    audienceType: 'Operations Managers, HR Teams, Supervisors, Field Organizations, Employers'
  }
};

// Local business structured data
export const localBusinessStructuredData: LocalBusinessData = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://octanode.co/#organization',
  name: 'Octa Node Engineering',
  alternateName: 'OctaNode',
  description: 'Octa Node Engineering (OctaNode) is Ondo State\'s AI and software company for automated exam grading, workforce operations, time management systems, fashion commerce platforms, cooperative banking workflows, AI consulting, and digital transformation for institutions and businesses in Nigeria and Africa.',
  url: 'https://octanode.co',
  telephone: '+2349028267223',
  email: 'info@octanode.co',
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
    'Fashion Commerce',
    'Attendance Management',
    'Workforce Operations',
    'IoT Solutions',
    'Digital Transformation'
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Software Products and Services',
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
          description: 'Examination grading software for educational institutions that grades captured handwritten scripts in seconds'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: 'TI-BOT',
          description: 'Smart school bell, time management, and announcement system with IoT capabilities for schools and other organized environments'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: 'DressCode',
          description: 'Fashion social commerce platform with AI try-on, bespoke tailoring, and creator monetization tools'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: 'WorkSpot',
          description: 'Workforce attendance and operations platform with geo-fencing, biometrics, live ops visibility, and payroll exports'
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
