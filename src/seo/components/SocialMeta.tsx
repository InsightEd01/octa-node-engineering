import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SocialMetaProps } from '../types';

export const SocialMeta: React.FC<SocialMetaProps> = ({
  title,
  description,
  image,
  url,
  type = 'website',
  twitterHandle,
  facebookAppId
}) => {
  return (
    <Helmet>
      {/* Open Graph Meta Tags for Facebook */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={`${title} - Social media preview`} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Octa Node Engineering" />
      <meta property="og:locale" content="en_US" />
      
      {/* Additional Open Graph properties for better sharing */}
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/png" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={`${title} - Social media preview`} />
      
      {/* Twitter handle if provided */}
      {twitterHandle && (
        <>
          <meta name="twitter:site" content={twitterHandle} />
          <meta name="twitter:creator" content={twitterHandle} />
        </>
      )}
      
      {/* Facebook App ID if provided */}
      {facebookAppId && (
        <meta property="fb:app_id" content={facebookAppId} />
      )}
      
      {/* LinkedIn specific meta tags */}
      <meta property="linkedin:owner" content="Octa Node Engineering" />
      
      {/* Additional social media meta tags for better sharing */}
      <meta name="theme-color" content="#1a365d" />
      <meta name="msapplication-TileColor" content="#1a365d" />
    </Helmet>
  );
};

export default SocialMeta;