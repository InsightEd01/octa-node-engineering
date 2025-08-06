import React from 'react';
import Slider from 'react-slick';
import LazyImage from './LazyImage';
import { generateAltText } from '../utils/imageUtils';

interface ProductCarouselProps {
  images: string[];
  productName: string;
  onImageClick: (imageUrl: string, productName: string) => void;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ images, productName, onImageClick }) => {
  const settings = {
    dots: true,
    infinite: images.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: images.length > 1,
    autoplaySpeed: 4000,
    pauseOnHover: false,
    pauseOnFocus: false,
    pauseOnDotsHover: false,
    arrows: images.length > 1,
    dotsClass: 'slick-dots product-dots',
    swipe: false,
    touchMove: false,
    draggable: false,
  };

  // Generate descriptive alt text based on product name and image index
  const getImageAltText = (index: number) => {
    return generateAltText(productName, 'screenshot', index);
  };

  return (
    <div className="product-carousel">
      {images.length > 1 ? (
        <Slider {...settings}>
          {images.map((img, index) => (
            <div key={index}>
              <LazyImage 
                src={img} 
                alt={getImageAltText(index)}
                onClick={() => onImageClick(img, productName)}
                className="product-image"
                loading={index === 0 ? 'eager' : 'lazy'}
                priority={index === 0}
              />
            </div>
          ))}
        </Slider>
      ) : (
        <LazyImage 
          src={images[0]} 
          alt={getImageAltText(0)}
          onClick={() => onImageClick(images[0], productName)}
          className="product-image single-image"
          loading="eager"
          priority={true}
        />
      )}
    </div>
  );
};

export default ProductCarousel;