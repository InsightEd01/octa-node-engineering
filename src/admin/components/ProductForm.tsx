import React, { useState, useEffect } from 'react';
import { AdminProduct, ProductFormData } from '../types/product';
import { productService } from '../services/productService';
import ImageUpload from './ImageUpload';

interface ProductFormProps {
  product?: AdminProduct;
  onSave: (product: AdminProduct) => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    fullDescription: '',
    features: [''],
    benefits: [''],
    techSpecs: {
      platform: '',
      compatibility: '',
      requirements: ''
    },
    appUrl: '',
    demoUrl: '',
    category: '',
    launchDate: '',
    status: 'draft'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        fullDescription: product.fullDescription,
        features: product.features.length > 0 ? product.features : [''],
        benefits: product.benefits.length > 0 ? product.benefits : [''],
        techSpecs: product.techSpecs,
        appUrl: product.appUrl,
        demoUrl: product.demoUrl || '',
        category: product.category,
        launchDate: product.launchDate,
        status: product.status
      });
      setImages(product.images.map(img => img.url));
    }
  }, [product]);

  const handleInputChange = (field: keyof ProductFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTechSpecChange = (field: keyof ProductFormData['techSpecs'], value: string) => {
    setFormData(prev => ({
      ...prev,
      techSpecs: {
        ...prev.techSpecs,
        [field]: value
      }
    }));
  };

  const handleArrayFieldChange = (field: 'features' | 'benefits', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayField = (field: 'features' | 'benefits') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayField = (field: 'features' | 'benefits', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setError('Product name is required');
      return false;
    }
    if (!formData.description.trim()) {
      setError('Product description is required');
      return false;
    }
    if (!formData.category.trim()) {
      setError('Product category is required');
      return false;
    }
    if (!formData.appUrl.trim()) {
      setError('App URL is required');
      return false;
    }
    
    // Validate URL format
    try {
      new URL(formData.appUrl);
      if (formData.demoUrl) {
        new URL(formData.demoUrl);
      }
    } catch {
      setError('Please enter valid URLs');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Filter out empty features and benefits
      const cleanedData = {
        ...formData,
        features: formData.features.filter(f => f.trim()),
        benefits: formData.benefits.filter(b => b.trim())
      };

      let savedProduct: AdminProduct;
      
      if (product) {
        savedProduct = await productService.updateProduct(product.id, cleanedData);
      } else {
        savedProduct = await productService.createProduct(cleanedData);
      }

      onSave(savedProduct);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save product');
      console.error('Error saving product:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (newImages: string[]) => {
    setImages(newImages);
  };

  return (
    <div className="product-form">
      <div className="form-header">
        <h2>{product ? 'Edit Product' : 'Add New Product'}</h2>
        <div className="form-actions">
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            form="product-form"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Product'}
          </button>
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form id="product-form" onSubmit={handleSubmit} className="form-content">
        <div className="form-section">
          <h3>Basic Information</h3>
          
          <div className="form-group">
            <label htmlFor="name">Product Name *</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <input
              type="text"
              id="category"
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => handleInputChange('status', e.target.value as ProductFormData['status'])}
              className="form-select"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="launchDate">Launch Date</label>
            <input
              type="text"
              id="launchDate"
              value={formData.launchDate}
              onChange={(e) => handleInputChange('launchDate', e.target.value)}
              placeholder="e.g., 2024"
              className="form-input"
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Product Images</h3>
          <ImageUpload
            images={images}
            onImagesChange={handleImageUpload}
            productId={product?.id}
          />
        </div>

        <div className="form-section">
          <h3>Description</h3>
          
          <div className="form-group">
            <label htmlFor="description">Short Description *</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              required
              rows={3}
              className="form-textarea"
              placeholder="Brief description for product cards and listings"
            />
          </div>

          <div className="form-group">
            <label htmlFor="fullDescription">Full Description</label>
            <textarea
              id="fullDescription"
              value={formData.fullDescription}
              onChange={(e) => handleInputChange('fullDescription', e.target.value)}
              rows={8}
              className="form-textarea"
              placeholder="Detailed product description for product pages"
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Features</h3>
          {formData.features.map((feature, index) => (
            <div key={index} className="array-field">
              <input
                type="text"
                value={feature}
                onChange={(e) => handleArrayFieldChange('features', index, e.target.value)}
                placeholder="Enter a product feature"
                className="form-input"
              />
              {formData.features.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayField('features', index)}
                  className="btn btn-sm btn-danger"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayField('features')}
            className="btn btn-sm btn-secondary"
          >
            Add Feature
          </button>
        </div>

        <div className="form-section">
          <h3>Benefits</h3>
          {formData.benefits.map((benefit, index) => (
            <div key={index} className="array-field">
              <input
                type="text"
                value={benefit}
                onChange={(e) => handleArrayFieldChange('benefits', index, e.target.value)}
                placeholder="Enter a product benefit"
                className="form-input"
              />
              {formData.benefits.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayField('benefits', index)}
                  className="btn btn-sm btn-danger"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayField('benefits')}
            className="btn btn-sm btn-secondary"
          >
            Add Benefit
          </button>
        </div>

        <div className="form-section">
          <h3>Technical Specifications</h3>
          
          <div className="form-group">
            <label htmlFor="platform">Platform</label>
            <input
              type="text"
              id="platform"
              value={formData.techSpecs.platform}
              onChange={(e) => handleTechSpecChange('platform', e.target.value)}
              className="form-input"
              placeholder="e.g., Web-based application with mobile support"
            />
          </div>

          <div className="form-group">
            <label htmlFor="compatibility">Compatibility</label>
            <input
              type="text"
              id="compatibility"
              value={formData.techSpecs.compatibility}
              onChange={(e) => handleTechSpecChange('compatibility', e.target.value)}
              className="form-input"
              placeholder="e.g., All modern browsers, iOS, Android"
            />
          </div>

          <div className="form-group">
            <label htmlFor="requirements">Requirements</label>
            <input
              type="text"
              id="requirements"
              value={formData.techSpecs.requirements}
              onChange={(e) => handleTechSpecChange('requirements', e.target.value)}
              className="form-input"
              placeholder="e.g., Internet connection, camera/scanner for document input"
            />
          </div>
        </div>

        <div className="form-section">
          <h3>URLs</h3>
          
          <div className="form-group">
            <label htmlFor="appUrl">App URL *</label>
            <input
              type="url"
              id="appUrl"
              value={formData.appUrl}
              onChange={(e) => handleInputChange('appUrl', e.target.value)}
              required
              className="form-input"
              placeholder="https://example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="demoUrl">Demo URL</label>
            <input
              type="url"
              id="demoUrl"
              value={formData.demoUrl}
              onChange={(e) => handleInputChange('demoUrl', e.target.value)}
              className="form-input"
              placeholder="https://demo.example.com"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;