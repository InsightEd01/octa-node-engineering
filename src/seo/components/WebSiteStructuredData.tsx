import React from 'react';
import { seoConfig } from '../data/seoConfig';

const WebSiteStructuredData: React.FC = () => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: seoConfig.siteUrl,
    name: 'Octa Node Engineering',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${seoConfig.siteUrl}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  } as const;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data, null, 2) }}
    />
  );
};

export default WebSiteStructuredData;



