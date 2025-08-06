import React from 'react';
import CarouselManager from '../components/CarouselManager';

const CarouselPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Carousel Management</h1>
      <CarouselManager />
    </div>
  );
};

export default CarouselPage;
