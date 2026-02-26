import React from 'react';
import { seoConfig } from '../data/seoConfig';

const WebSiteStructuredData: React.FC = () => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${seoConfig.siteUrl}/#website`,
    url: seoConfig.siteUrl,
    name: 'Octa Node Engineering',
    alternateName: ['OctaNode', 'Octa Node', 'Octa-Node Engineering', 'octanode', 'octanode', 'octanode.co', 'octanode.online'],
    description: 'Octa Node Engineering (OctaNode) - Nigeria\'s leading AI solutions provider. Creators of Stylus AI and TI-BOT.',
    publisher: {
      '@type': 'Organization',
      name: 'Octa Node Engineering',
      logo: {
        '@type': 'ImageObject',
        url: `${seoConfig.siteUrl}/assets/logo.png`
      }
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${seoConfig.siteUrl}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    },
    inLanguage: 'en'
  } as const;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data, null, 2) }}
    />
  );
};

export default WebSiteStructuredData;
