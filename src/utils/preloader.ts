import { preloadImages } from './imageUtils';
import logoImg from '../../assets/logo.png';
import heroImg1 from '../../assets/hero-carousol/1.jpg';
import { stylus1Img, tibotImg } from '../data/products';

// Critical images that should be preloaded
const criticalImages = [
  logoImg,
  heroImg1, // First hero image
  stylus1Img, // First product image
  tibotImg // TI-BOT image
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
    hero: [
      heroImg1,
      // Add more hero images if needed for immediate preloading
    ],
    products: [
      stylus1Img,
      tibotImg
    ]
  };

  try {
    await preloadImages(sectionImages[section] || []);
    console.log(`${section} images preloaded successfully`);
  } catch (error) {
    console.warn(`Some ${section} images failed to preload:`, error);
  }
};