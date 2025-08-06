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
  const finalUrl = url || (typeof window !== 'undefined' ? window.location.href : seoConfig.siteUrl);
  const finalCanonical = canonical || finalUrl;
  
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
        <meta name="description" content={finalDescription} />
        <meta name="keywords" content={finalKeywords.join(', ')} />
        
        {/* Google Search Console Verification */}
        {seoConfig.googleSiteVerification && (
          <meta name="google-site-verification" content={seoConfig.googleSiteVerification} />
        )}
        
        {/* Canonical URL */}
        <link rel="canonical" href={finalCanonical} />
        
        {/* Robots Meta */}
        {noindex && <meta name="robots" content="noindex, nofollow" />}
        
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