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
  priority = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(priority || loading === 'eager');
  const [isInView, setIsInView] = useState(priority || loading === 'eager');
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (priority || loading === 'eager') {
      setIsInView(true);
      setIsLoaded(true);
      return;
    }

    setIsLoaded(false);
    setHasError(false);

    // Cleanup previous observer if it exists
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observerRef.current?.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [src, priority, loading]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  const shouldLoad = isInView || loading === 'eager' || priority;

  return (
    <div className={`lazy-image-container ${className}`} ref={imgRef}>
      {shouldLoad && (
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