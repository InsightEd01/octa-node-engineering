import { preloadImages } from './imageUtils';
import logoImg from '../../assets/logo.png';

// Critical images that should be preloaded
const criticalImages = [
  logoImg
];

// Preload critical images on app initialization
export const preloadCriticalImages = async (): Promise<void> => {
  try {
    await preloadImages(criticalImages);
    console.log('Critical images preloaded successfully');
  } catch (error) {
    console.warn('Some critical images failed to preload:', error);
  }
};

// Preload images for a specific section
export const preloadSectionImages = async (section: 'hero' | 'products'): Promise<void> => {
  const sectionImages: Record<string, string[]> = {
    hero: [],
    products: []
  };

  try {
    await preloadImages(sectionImages[section] || []);
    console.log(`${section} images preloaded successfully`);
  } catch (error) {
    console.warn(`Some ${section} images failed to preload:`, error);
  }
};
