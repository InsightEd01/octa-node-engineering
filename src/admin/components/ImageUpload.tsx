import React, { useState, useRef } from 'react';
import { productService } from '../services/productService';

interface ImageUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  productId?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ images, onImagesChange, productId }) => {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const validFiles = Array.from(files).filter(file => {
      const isImage = file.type.startsWith('image/');
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB limit
      
      if (!isImage) {
        alert(`${file.name} is not a valid image file`);
        return false;
      }
      
      if (!isValidSize) {
        alert(`${file.name} is too large. Maximum size is 5MB`);
        return false;
      }
      
      return true;
    });

    if (validFiles.length === 0) return;

    try {
      setUploading(true);
      const uploadPromises = validFiles.map(file => {
        if (productId) {
          return productService.uploadProductImage(file);
        } else {
          // For new products, create object URLs for preview
          return Promise.resolve(URL.createObjectURL(file));
        }
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      const newImages = [...images, ...uploadedUrls];
      onImagesChange(newImages);
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Failed to upload one or more images. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  const moveImage = (fromIndex: number, toIndex: number) => {
    const newImages = [...images];
    const [movedImage] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, movedImage);
    onImagesChange(newImages);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="image-upload">
      <div className="image-grid">
        {images.map((image, index) => (
          <div key={index} className="image-item">
            <img src={image} alt={`Product image ${index + 1}`} />
            <div className="image-overlay">
              <div className="image-actions">
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => moveImage(index, index - 1)}
                    className="btn btn-sm btn-secondary"
                    title="Move left"
                  >
                    ←
                  </button>
                )}
                {index < images.length - 1 && (
                  <button
                    type="button"
                    onClick={() => moveImage(index, index + 1)}
                    className="btn btn-sm btn-secondary"
                    title="Move right"
                  >
                    →
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="btn btn-sm btn-danger"
                  title="Remove image"
                >
                  ×
                </button>
              </div>
            </div>
            {index === 0 && (
              <div className="primary-badge">Primary</div>
            )}
          </div>
        ))}
      </div>

      <div
        className={`upload-area ${dragOver ? 'drag-over' : ''} ${uploading ? 'uploading' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={openFileDialog}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInputChange}
          style={{ display: 'none' }}
        />
        
        {uploading ? (
          <div className="upload-progress">
            <div className="loading-spinner"></div>
            <p>Uploading images...</p>
          </div>
        ) : (
          <div className="upload-content">
            <div className="upload-icon">📷</div>
            <p>
              <strong>Click to upload</strong> or drag and drop images here
            </p>
            <p className="upload-hint">
              Supports: JPG, PNG, GIF, WebP (max 5MB each)
            </p>
          </div>
        )}
      </div>

      {images.length > 0 && (
        <div className="image-info">
          <p>{images.length} image{images.length !== 1 ? 's' : ''} uploaded</p>
          <p className="hint">The first image will be used as the primary image. Drag to reorder.</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;