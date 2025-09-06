import React from 'react';
import Slider from 'react-slick';
import LazyImage from './LazyImage';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Import hero carousel images
import heroImg1 from '../../assets/hero-carousol/1.jpg';
import heroImg2 from '../../assets/hero-carousol/2.jpg';
import heroImg3 from '../../assets/hero-carousol/3.jpg';
import heroImg4 from '../../assets/hero-carousol/4.jpg';
import heroImg5 from '../../assets/hero-carousol/5.jpg';
import heroImg6 from '../../assets/hero-carousol/6.jpg';
import heroImg7 from '../../assets/hero-carousol/7.jpg';


const Carousel: React.FC = () => {
  const images = [
    { src: heroImg1, alt: 'AI-powered educational technology solutions showcasing modern learning environments' },
    { src: heroImg2, alt: 'Advanced artificial intelligence systems transforming business operations' },
    { src: heroImg3, alt: 'Innovative AI solutions for banking and financial services automation' },
    { src: heroImg4, alt: 'Smart educational tools powered by machine learning technology' },
    { src: heroImg5, alt: 'Digital transformation through AI-driven business intelligence' },
    { src: heroImg6, alt: 'Cutting-edge AI applications in educational assessment and grading' },
    { src: heroImg7, alt: 'Automated banking solutions using artificial intelligence' },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    fade: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: 'ease',
    arrows: false,
    pauseOnHover: false,
    pauseOnFocus: false,
    pauseOnDotsHover: false,
    swipe: true,
    touchMove: true,
    draggable: true,
  };

  return (
    <div className="hero-carousel">
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index}>
            <LazyImage 
              src={img.src} 
              alt={img.alt}
              loading="eager"
              className="hero-carousel-image"
              priority={true}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
