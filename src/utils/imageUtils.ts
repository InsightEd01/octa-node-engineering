// Image optimization utilities

export interface ResponsiveImageSizes {
  mobile: string;
  tablet: string;
  desktop: string;
}

export const generateSrcSet = (imageSrc: string, sizes?: ResponsiveImageSizes): string => {
  if (!sizes) {
    return imageSrc;
  }
  
  return `${sizes.mobile} 480w, ${sizes.tablet} 768w, ${sizes.desktop} 1200w`;
};

export const generateSizes = (): string => {
  return '(max-width: 480px) 480px, (max-width: 768px) 768px, 1200px';
};

// Preload critical images
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

// Preload multiple images
export const preloadImages = async (sources: string[]): Promise<void[]> => {
  const promises = sources.map(src => preloadImage(src));
  return Promise.all(promises);
};

// Get optimized image dimensions
export const getOptimizedDimensions = (
  originalWidth: number, 
  originalHeight: number, 
  maxWidth: number = 1200
): { width: number; height: number } => {
  if (originalWidth <= maxWidth) {
    return { width: originalWidth, height: originalHeight };
  }
  
  const ratio = originalHeight / originalWidth;
  return {
    width: maxWidth,
    height: Math.round(maxWidth * ratio)
  };
};

// Check if image format is supported
export const isWebPSupported = (): boolean => {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
};

// Generate alt text based on context
export const generateAltText = (
  productName: string, 
  imageType: 'screenshot' | 'logo' | 'hero' | 'thumbnail',
  index?: number
): string => {
  const baseTexts = {
    'Stylus AI': {
      screenshot: 'Stylus AI handwriting recognition and automated grading interface',
      logo: 'Stylus AI - Advanced Educational Assessment Technology',
      hero: 'Stylus AI revolutionizing educational assessment with AI technology',
      thumbnail: 'Stylus AI product preview showing key features'
    },
    'TI-BOT': {
      screenshot: 'TI-BOT intelligent school management and communication system interface',
      logo: 'TI-BOT - Smart School Time Management System',
      hero: 'TI-BOT transforming school communication and scheduling',
      thumbnail: 'TI-BOT product preview showing smart scheduling features'
    },
    'Octa Node Engineering': {
      screenshot: 'Octa Node Engineering AI solutions dashboard',
      logo: 'Octa Node Engineering - Leading AI Solutions Provider in Nigeria',
      hero: 'Octa Node Engineering developing cutting-edge AI solutions',
      thumbnail: 'Octa Node Engineering company overview'
    }
  };

  const productTexts = baseTexts[productName as keyof typeof baseTexts];
  if (!productTexts) {
    return `${productName} ${imageType}${index ? ` ${index + 1}` : ''}`;
  }

  const baseText = productTexts[imageType];
  return index !== undefined ? `${baseText} - View ${index + 1}` : baseText;
};