import { SEOConfig } from '../types';

export const seoConfig: SEOConfig = {
  defaultTitle: 'Octa Node Engineering - AI Solutions for Business',
  titleTemplate: '%s | Octa Node Engineering',
  defaultDescription: 'Leading AI solutions provider offering Stylus AI and TI-BOT for business automation, education, and banking. Transform your business with cutting-edge artificial intelligence technology.',
  defaultKeywords: [
    'AI solutions',
    'artificial intelligence',
    'business automation',
    'Stylus AI',
    'TI-BOT',
    'machine learning',
    'AI consulting',
    'educational AI',
    'banking AI',
    'Nigeria AI company',
    'AI company Nigeria',
    'AI solutions Nigeria',
    'AI consulting Nigeria',
    'Octa Node Engineering'
  ],
  siteUrl: 'https://octanode.online',
  defaultImage: '/assets/logo.png',
  twitterHandle: '@OctaNodeEng',
  gaTrackingId: 'G-XXXXXXXXXX', // Replace with actual GA4 measurement ID
  googleSiteVerification: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', // Add verification code here
  // facebookAppId: 'your-facebook-app-id' // Uncomment and add if available
};

// Page-specific SEO configurations
export const pageSEOConfig = {
  home: {
    title: 'AI Solutions for Business - Octa Node Engineering',
    description: 'Transform your business with cutting-edge AI solutions including Stylus AI for education and TI-BOT for banking. Leading AI company in Nigeria.',
    keywords: [
      'AI solutions for business',
      'AI solutions Nigeria',
      'AI company Nigeria',
      'artificial intelligence consulting',
      'business automation AI',
      'artificial intelligence education',
      'AI banking solutions',
      'Stylus AI',
      'TI-BOT',
      'Octa Node Engineering'
    ]
  },
  
  products: {
    title: 'Our AI Products - Stylus AI & TI-BOT',
    description: 'Discover our innovative AI products: Stylus AI for educational enhancement and TI-BOT for school automation. Advanced AI solutions for modern businesses.',
    keywords: [
      'Stylus AI',
      'TI-BOT',
      'AI products',
      'educational AI',
      'banking AI',
      'AI handwriting marking system',
      'automated exam grading',
      'AI school bell',
      'IoT school automation'
    ]
  },
  
  about: {
    title: 'About Octa Node Engineering - AI Innovation Leaders',
    description: 'Learn about Octa Node Engineering, Nigeria\'s leading AI solutions provider. Our mission is to transform businesses through innovative artificial intelligence technology.',
    keywords: ['Octa Node Engineering', 'AI company Nigeria', 'artificial intelligence consulting', 'AI innovation']
  },
  
  contact: {
    title: 'Contact Us - Get AI Solutions for Your Business',
    description: 'Contact Octa Node Engineering for AI solutions consultation. Located in Nigeria, we provide AI services globally. Get in touch for your AI transformation.',
    keywords: ['contact AI company', 'AI consultation', 'AI services Nigeria', 'business AI solutions', 'AI partner Nigeria']
  },
  
  privacy: {
    title: 'Privacy Policy - Octa Node Engineering',
    description: 'Privacy policy for Octa Node Engineering. Learn how we protect your data and privacy when using our AI solutions and services.',
    keywords: ['privacy policy', 'data protection', 'AI privacy']
  },
  
  terms: {
    title: 'Terms of Service - Octa Node Engineering',
    description: 'Terms of service for Octa Node Engineering AI solutions. Read our terms and conditions for using our AI products and services.',
    keywords: ['terms of service', 'AI terms', 'service agreement']
  }
};

export default seoConfig;