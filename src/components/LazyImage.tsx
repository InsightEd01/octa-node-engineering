import React, { useState, useRef, useEffect } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
  placeholder?: string;
  loading?: 'lazy' | 'eager';
  srcSet?: string;
  sizes?: string;
  priority?: boolean;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  onClick,
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PC9zdmc+',
  loading = 'lazy',
  srcSet,
  sizes,
  priority = false
}) => {
  const [isLoaded, setIsLoaded] = useState(priority || loading === 'eager');
  const [isInView, setIsInView] = useState(priority || loading === 'eager');
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (priority || loading === 'eager') {
      setIsInView(true);
      setIsLoaded(true);
      return;
    }

    setIsLoaded(false);
    setHasError(false);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [src, priority, loading]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  const shouldLoad = loading === 'eager' || isInView;

  return (
    <div className={`lazy-image-container ${className}`} ref={imgRef}>
      {shouldLoad && (
        <>
          <img
            src={hasError ? placeholder : src}
            srcSet={srcSet}
            sizes={sizes}
            alt={alt}
            className={`lazy-image ${isLoaded ? 'loaded' : 'loading'} ${className}`}
            onLoad={handleLoad}
            onError={handleError}
            onClick={onClick}
            loading={loading}
            decoding="async"
          />
          {!isLoaded && (
            <div className="lazy-image-loading-indicator">
              <div className="lazy-image-spinner"></div>
            </div>
          )}
        </>
      )}
      {!shouldLoad && (
        <img
          src={placeholder}
          alt={alt}
          className={`lazy-image placeholder ${className}`}
          onClick={onClick}
        />
      )}
    </div>
  );
};

export default LazyImage;