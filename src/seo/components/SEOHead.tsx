import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SEOProps } from '../types';
import { seoConfig } from '../data/seoConfig';
import { generateTitle, generateDescription, generateKeywords } from '../utils/seoUtils';
import { SocialMeta } from './SocialMeta';
import { generateSocialImage } from '../utils/socialImageGenerator';

interface SEOHeadProps extends SEOProps {
  children?: React.ReactNode;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
  noindex = false,
  canonical,
  children
}) => {
  // Generate final values using utility functions and config
  const finalTitle = generateTitle(title);
  const finalDescription = generateDescription(description);
  const finalKeywords = generateKeywords(keywords);
  const currentPath = typeof window !== 'undefined' ? window.location.pathname + window.location.search : '';
  const defaultCanonical = `${seoConfig.siteUrl.replace(/\/$/, '')}${currentPath}`;

  const finalUrl = url || (typeof window !== 'undefined' ? window.location.href : seoConfig.siteUrl);
  const finalCanonical = canonical || defaultCanonical;

  // Generate alternate URL for the other domain
  const alternateUrl = finalCanonical.replace('octanode.co', 'octanode.online');

  // Generate social media optimized image
  const socialImage = image || generateSocialImage({
    title: finalTitle,
    type: type === 'product' ? 'product' : 'default'
  });

  return (
    <>
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{finalTitle}</title>
        <meta name="title" content={finalTitle} />
        <meta name="description" content={finalDescription} />
        <meta name="keywords" content={finalKeywords.join(', ')} />
        <meta name="author" content="Octa Node Engineering" />

        {/* Google Search Console Verification */}
        {seoConfig.googleSiteVerification && (
          <meta name="google-site-verification" content={seoConfig.googleSiteVerification} />
        )}

        {/* Canonical URL */}
        <link rel="canonical" href={finalCanonical} />

        {/* Alternate domain hreflang */}
        <link rel="alternate" hrefLang="en" href={finalCanonical} />
        <link rel="alternate" hrefLang="en" href={alternateUrl} />
        <link rel="alternate" hrefLang="x-default" href={finalCanonical} />

        {/* Robots Meta */}
        {noindex ? (
          <meta name="robots" content="noindex, nofollow" />
        ) : (
          <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        )}

        {/* Additional SEO meta tags */}
        <meta name="language" content="English" />
        <meta name="revisit-after" content="3 days" />
        <meta name="rating" content="general" />
        <meta name="distribution" content="global" />
        <meta name="copyright" content="Octa Node Engineering" />

        {/* Geo-targeting meta tags */}
        <meta name="geo.region" content="NG-ON" />
        <meta name="geo.placename" content="Ondo, Nigeria" />
        <meta name="geo.position" content="7.0906;4.8354" />
        <meta name="ICBM" content="7.0906, 4.8354" />

        {/* Mobile optimization */}
        <meta name="format-detection" content="telephone=yes" />
        <meta name="apple-mobile-web-app-title" content="OctaNode" />
        <meta name="application-name" content="Octa Node Engineering" />

        {/* Additional custom meta tags */}
        {children}
      </Helmet>

      {/* Social Media Meta Tags */}
      <SocialMeta
        title={finalTitle}
        description={finalDescription}
        image={socialImage}
        url={finalUrl}
        type={type}
        twitterHandle={seoConfig.twitterHandle}
        facebookAppId={seoConfig.facebookAppId}
      />
    </>
  );
};

export default SEOHead;