import { seoConfig } from '../data/seoConfig';

export interface SocialImageOptions {
  title: string;
  subtitle?: string;
  type?: 'default' | 'product' | 'article';
  backgroundColor?: string;
  textColor?: string;
}

/**
 * Generates a social media image URL based on content
 * Uses existing product images and creates appropriate social media previews
 */
export const generateSocialImage = (options: SocialImageOptions): string => {
  const { title, type = 'default' } = options;
  
  // Check if we have product-specific images
  if (type === 'product') {
    if (title.toLowerCase().includes('stylus')) {
      return '/assets/stylus1.png';
    }
    if (title.toLowerCase().includes('ti-bot') || title.toLowerCase().includes('tibot')) {
      return '/assets/Tibot.png';
    }
  }

  // For articles and general content, use the company logo or background
  if (type === 'article') {
    return '/assets/background.jpg';
  }

  // Default to company logo for general pages
  return seoConfig.defaultImage;
};

/**
 * Generates social media image alt text
 */
export const generateSocialImageAlt = (title: string, description?: string): string => {
  const baseAlt = `${title} - Octa Node Engineering`;
  return description ? `${baseAlt}: ${description.substring(0, 100)}...` : baseAlt;
};

/**
 * Validates social media image dimensions and format
 */
export const validateSocialImage = (imageUrl: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      // Check if image meets social media requirements
      const isValidSize = img.width >= 1200 && img.height >= 630;
      const aspectRatio = img.width / img.height;
      const isValidRatio = aspectRatio >= 1.91 && aspectRatio <= 1.91; // 1.91:1 for optimal sharing
      
      resolve(isValidSize && isValidRatio);
    };
    img.onerror = () => resolve(false);
    img.src = imageUrl;
  });
};

/**
 * Gets the optimal social image for different platforms
 */
export const getPlatformOptimizedImage = (
  baseImage: string, 
  platform: 'facebook' | 'twitter' | 'linkedin'
): string => {
  // In a real implementation, this would return platform-specific optimized images
  // For now, we return the base image with platform-specific fallbacks
  
  const platformImages = {
    facebook: baseImage.replace('.png', '-fb.png'),
    twitter: baseImage.replace('.png', '-tw.png'),
    linkedin: baseImage.replace('.png', '-li.png')
  };

  // Check if platform-specific image exists, otherwise return base image
  return platformImages[platform] || baseImage;
};

/**
 * Generates social media sharing URLs
 */
export const generateSharingUrls = (url: string, title: string, description: string) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&via=OctaNodeEng`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`
  };
};

export default {
  generateSocialImage,
  generateSocialImageAlt,
  validateSocialImage,
  getPlatformOptimizedImage,
  generateSharingUrls
};