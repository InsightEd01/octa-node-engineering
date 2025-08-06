import React, { useEffect } from 'react';
import LazyImage from './LazyImage';

interface ImageModalProps {
  isOpen: boolean;
  imageUrl: string;
  productName: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, imageUrl, productName, onClose }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="image-modal-overlay" onClick={onClose}>
      <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className="modal-image-container">
          <LazyImage 
            src={imageUrl} 
            alt={`${productName} full-size interface view - detailed screenshot showing all features and functionality`} 
            className="modal-image"
            loading="eager"
          />
        </div>
        <div className="modal-caption">
          <h3>{productName}</h3>
          <p>Click outside or press ESC to close</p>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;