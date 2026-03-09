import { SEOConfig } from '../types';

export const seoConfig: SEOConfig = {
  defaultTitle: 'Octa Node Engineering - AI Solutions for Business, Education & Automation',
  titleTemplate: '%s | Octa Node Engineering',
  defaultDescription: 'Octa Node Engineering (OctaNode) builds practical software including Stylus AI for exam grading, TI-BOT for time management, DressCode for fashion commerce, WorkSpot for workforce attendance, and cooperative banking software.',
  defaultKeywords: [
    // ── Brand keywords ──
    'Octa Node Engineering',
    'OctaNode',
    'Octa Node',
    'OctaNode Engineering',
    'Octa-Node Engineering',
    'Octa-Node',
    'octanode',
    'octanode',
    'octa node',
    'oct node',
    'octanode.online',
    'octanode.co',
    'octanodeengineering',
    'octa node eng',

    // ── Common misspellings & typos ──
    'octa nod engineering',
    'octa node enginering',
    'octa node enginerring',
    'octanode enginering',
    'octa nod',
    'octanod',
    'octanode eng',
    'octa note engineering',
    'octa mode engineering',
    'octa node enginneering',

    // ── Core AI keywords ──
    'AI solutions',
    'artificial intelligence',
    'AI company',
    'AI consulting',
    'machine learning',
    'AI technology',
    'AI platform',
    'AI software',
    'AI services',
    'AI provider',
    'AI vendor',
    'AI startup',
    'AI innovation',

    // ── Product keywords – Stylus AI ──
    'Stylus AI',
    'StylusAI',
    'stylus ai',
    'stylus artificial intelligence',
    'AI exam marking',
    'AI grading system',
    'automated grading',
    'handwriting recognition AI',
    'AI handwriting marking',
    'AI test grading',
    'AI assessment tool',
    'AI marking system',
    'automated exam grading',
    'AI essay grading',
    'AI exam checker',
    'AI answer marking',
    'handwriting grading software',
    'AI theory marking',
    'AI homework grading',
    'smart grading system',
    'digital exam marking',

    // ── Product keywords – DressCode ──
    'DressCode',
    'dresscode',
    'DressCode app',
    'fashion social commerce',
    'fashion marketplace Nigeria',
    'AI virtual try on',
    'virtual fitting room Nigeria',
    'bespoke tailoring app',
    'fashion creators platform',
    'tailor marketplace Nigeria',

    // ── Product keywords – WorkSpot ──
    'WorkSpot',
    'workspot',
    'smart attendance app',
    'attendance management software',
    'geo fencing attendance',
    'biometric attendance app',
    'workforce operations platform',
    'payroll export attendance app',
    'team attendance tracking',
    'employee check in app',

    // ── Product keywords – TI-BOT ──
    'TI-BOT',
    'TIBOT',
    'ti-bot',
    'tibot',
    'AI school bell',
    'smart school bell',
    'automated school bell',
    'school time management',
    'AI bell system',
    'school announcement system',
    'IoT school system',
    'smart bell for schools',
    'AI time management school',
    'digital school bell',
    'automatic school bell system',
    'school PA system AI',
    'school scheduling system',

    // ── Industry & sector keywords ──
    'education technology',
    'edtech',
    'EdTech AI',
    'school technology',
    'school management technology',
    'educational AI',
    'business automation',
    'digital transformation',
    'AI for schools',
    'AI for education',
    'AI for business',

    // ── Location-based SEO ──
    'AI company Nigeria',
    'AI solutions Nigeria',
    'AI consulting Nigeria',
    'Nigeria AI company',
    'AI startup Nigeria',
    'AI company Lagos',
    'AI company Ondo',
    'AI company Africa',
    'AI solutions Africa',
    'technology company Nigeria',
    'tech company Ondo State',
    'Nigerian AI startup',
    'best AI company Nigeria',
    'top AI company Nigeria',
    'AI company West Africa',
    'African AI solutions',

    // ── Long-tail & intent-based keywords ──
    'best AI solution for schools',
    'how to automate exam grading',
    'AI for marking handwritten exams',
    'automatic bell system for schools',
    'best AI grading software',
    'AI solutions for schools in Nigeria',
    'automated grading system Nigeria',
    'smart school solutions Nigeria',
    'AI consulting services Nigeria',
    'hire AI company Nigeria',
    'AI software development Nigeria'
  ],
  siteUrl: import.meta.env.VITE_SITE_URL || 'https://octanode.co',
  defaultImage: '/assets/logo.png',
  twitterHandle: '@OctaNodeEng',
  gaTrackingId: import.meta.env.VITE_GA_TRACKING_ID || 'G-XXXXXXXXXX',
  googleSiteVerification: import.meta.env.VITE_GOOGLE_SITE_VERIFICATION || '',
  // facebookAppId: 'your-facebook-app-id' // Uncomment and add if available
};

// Page-specific SEO configurations
export const pageSEOConfig = {
  home: {
    title: 'Octa Node Engineering - AI Solutions for Business, Education & Automation in Nigeria',
    description: 'Octa Node Engineering (OctaNode) builds practical software for education, workforce operations, timed operations, fashion commerce, and cooperative banking workflows. Stylus AI grades captured handwritten exam scripts in seconds, TI-BOT manages time, DressCode powers fashion commerce, and WorkSpot automates attendance.',
    keywords: [
      'AI solutions for business',
      'AI solutions Nigeria',
      'AI company Nigeria',
      'artificial intelligence consulting',
      'business automation AI',
      'artificial intelligence education',
      'AI for schools Nigeria',
      'Stylus AI',
      'TI-BOT',
      'DressCode',
      'WorkSpot',
      'Octa Node Engineering',
      'OctaNode',
      'octanode',
      'octanode.online',
      'octanode.co',
      'stylus.octanode.online',
      'stylus.octanode.co',
      'best AI company Nigeria',
      'top AI solutions Africa',
      'edtech Nigeria',
      'school automation AI',
      'AI exam grading',
      'smart school bell'
    ]
  },

  products: {
    title: 'Products by Octa Node Engineering - Stylus AI, TI-BOT, DressCode & WorkSpot',
    description: 'Explore Octa Node Engineering products: Stylus AI for exam grading, TI-BOT for time management, DressCode for fashion social commerce, and WorkSpot for smart attendance and workforce operations.',
    keywords: [
      'Stylus AI',
      'TI-BOT',
      'DressCode',
      'WorkSpot',
      'AI products',
      'AI products Nigeria',
      'educational AI',
      'school management AI',
      'fashion commerce platform',
      'virtual try on app',
      'attendance management software',
      'workforce operations platform',
      'AI handwriting marking system',
      'AI exam marking tool',
      'automated exam grading',
      'AI school bell',
      'IoT school automation',
      'AI grading software',
      'handwriting recognition AI',
      'smart school bell system',
      'OctaNode products',
      'Octa Node Engineering products',
      'EdTech products Nigeria'
    ]
  },

  about: {
    title: 'About Octa Node Engineering (OctaNode) - AI Innovation Leaders in Nigeria',
    description: 'Octa Node Engineering (OctaNode) is Nigeria\'s software and AI company based in Ondo State. We build Stylus AI, TI-BOT, DressCode, WorkSpot, and other products that transform education, commerce, and business operations.',
    keywords: [
      'Octa Node Engineering',
      'OctaNode',
      'Octa Node',
      'about OctaNode',
      'AI company Nigeria',
      'AI company Ondo',
      'artificial intelligence consulting',
      'AI innovation',
      'AI startup Nigeria',
      'Nigerian AI company',
      'octanode.online',
      'octanode.co',
      'AI team Nigeria',
      'AI founders Nigeria'
    ]
  },

  contact: {
    title: 'Contact Octa Node Engineering - Get AI Solutions for Your Business',
    description: 'Contact Octa Node Engineering (OctaNode) for AI solutions consultation. Located in Ondo State, Nigeria. Call +234 902 826 7223 or email info@octanode.co for AI products and services.',
    keywords: [
      'contact Octa Node Engineering',
      'contact OctaNode',
      'AI consultation Nigeria',
      'AI services Nigeria',
      'business AI solutions',
      'AI partner Nigeria',
      'Stylus AI demo',
      'TI-BOT demo',
      'AI consultation',
      'hire AI company',
      'AI company phone number',
      'AI company email',
      'octanode contact',
      'octanode contact'
    ]
  },

  privacy: {
    title: 'Privacy Policy - Octa Node Engineering (OctaNode)',
    description: 'Privacy policy for Octa Node Engineering (OctaNode). Learn how we protect your data and privacy when using Stylus AI, TI-BOT, and our other AI solutions and services.',
    keywords: ['privacy policy', 'data protection', 'AI privacy', 'OctaNode privacy', 'Octa Node Engineering privacy policy']
  },

  terms: {
    title: 'Terms of Service - Octa Node Engineering (OctaNode)',
    description: 'Terms of service for Octa Node Engineering (OctaNode) AI solutions. Read our terms and conditions for using Stylus AI, TI-BOT, and our other AI products and services.',
    keywords: ['terms of service', 'AI terms', 'service agreement', 'OctaNode terms', 'Octa Node Engineering terms of service']
  },

  blog: {
    title: 'Blog - AI Insights & News from Octa Node Engineering',
    description: 'Read the latest AI insights, EdTech news, and product updates from Octa Node Engineering. Learn about Stylus AI, TI-BOT, and artificial intelligence trends in Nigeria and Africa.',
    keywords: [
      'AI blog',
      'AI news Nigeria',
      'EdTech blog',
      'Octa Node Engineering blog',
      'OctaNode blog',
      'artificial intelligence articles',
      'Stylus AI updates',
      'TI-BOT updates',
      'AI trends Africa',
      'education technology blog'
    ]
  }
};

export default seoConfig;
