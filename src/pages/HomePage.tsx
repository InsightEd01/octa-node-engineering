import React from 'react';
import HeroSection from './home/HeroSection';
import FeatureSections from './home/FeatureSections';
import ProductStack from './home/ProductStack';
import FinalCta from './home/FinalCta';

type HomePageProps = {
  onImageClick: (imageUrl: string, productName: string) => void;
};

const HomePage: React.FC<HomePageProps> = ({ onImageClick }) => {
  return (
    <div className="octa-home">
      <HeroSection />
      <div className="octa-section-divider" aria-hidden="true" />
      <FeatureSections onImageClick={onImageClick} />
      <ProductStack />
      <FinalCta />
    </div>
  );
};

export default HomePage;
