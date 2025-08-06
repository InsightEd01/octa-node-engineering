import React, { useState, useEffect } from 'react';
import { ContactInfo, ContactInfoInput, contactService } from '../services/contactService';

interface ContactFormProps {
  contactInfo?: ContactInfo;
  onSave: (contactInfo: ContactInfo) => void;
  onCancel: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ contactInfo, onSave, onCancel }) => {
  const [formData, setFormData] = useState<ContactInfoInput>({
    type: 'email',
    label: '',
    value: '',
    secondary_value: '',
    is_primary: false,
    is_active: true,
    order: 0
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (contactInfo) {
      setFormData({
        type: contactInfo.type,
        label: contactInfo.label,
        value: contactInfo.value,
        secondary_value: contactInfo.secondary_value || '',
        is_primary: contactInfo.is_primary,
        is_active: contactInfo.is_active,
        order: contactInfo.order
      });
    }
  }, [contactInfo]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validate required fields
    if (!contactService.validateRequired(formData.label)) {
      newErrors.label = 'Label is required';
    }

    if (!contactService.validateRequired(formData.value)) {
      newErrors.value = 'Value is required';
    }

    // Type-specific validation
    if (formData.type === 'email' && formData.value) {
      if (!contactService.validateEmail(formData.value)) {
        newErrors.value = 'Please enter a valid email address';
      }
      if (formData.secondary_value && !contactService.validateEmail(formData.secondary_value)) {
        newErrors.secondary_value = 'Please enter a valid email address';
      }
    }

    if (formData.type === 'phone' && formData.value) {
      if (!contactService.validatePhone(formData.value)) {
        newErrors.value = 'Please enter a valid phone number';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      let result: ContactInfo;
      
      if (contactInfo) {
        result = await contactService.updateContactInfo(contactInfo.id, formData);
      } else {
        result = await contactService.createContactInfo(formData);
      }
      
      onSave(result);
    } catch (error) {
      console.error('Error saving contact info:', error);
      setErrors({ submit: 'Failed to save contact information. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof ContactInfoInput, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const getPlaceholderText = () => {
    switch (formData.type) {
      case 'email':
        return 'info@example.com';
      case 'phone':
        return '+234 902 826 7223';
      case 'address':
        return 'Street address, City, State';
      case 'hours':
        return 'Mon - Fri, 9AM - 6PM';
      default:
        return '';
    }
  };

  const getSecondaryPlaceholderText = () => {
    switch (formData.type) {
      case 'email':
        return 'support@example.com (optional)';
      case 'address':
        return 'Additional address line (optional)';
      default:
        return '';
    }
  };

  const showSecondaryField = formData.type === 'email' || formData.type === 'address';

  return (
    <div className="contact-form-modal">
      <div className="modal-overlay" onClick={onCancel}></div>
      <div className="modal-content">
        <div className="modal-header">
          <h3>{contactInfo ? 'Edit Contact Information' : 'Add Contact Information'}</h3>
          <button className="modal-close" onClick={onCancel}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="type">Contact Type *</label>
            <select
              id="type"
              value={formData.type}
              onChange={(e) => handleInputChange('type', e.target.value as ContactInfoInput['type'])}
              className={errors.type ? 'error' : ''}
            >
              <option value="email">Email</option>
              <option value="phone">Phone</option>
              <option value="address">Address</option>
              <option value="hours">Business Hours</option>
            </select>
            {errors.type && <span className="error-message">{errors.type}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="label">Label *</label>
            <input
              type="text"
              id="label"
              value={formData.label}
              onChange={(e) => handleInputChange('label', e.target.value)}
              placeholder="e.g., Main Office, Customer Support"
              className={errors.label ? 'error' : ''}
            />
            {errors.label && <span className="error-message">{errors.label}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="value">
              {formData.type === 'email' ? 'Email Address' : 
               formData.type === 'phone' ? 'Phone Number' :
               formData.type === 'address' ? 'Address' : 'Hours'} *
            </label>
            <input
              type={formData.type === 'email' ? 'email' : 'text'}
              id="value"
              value={formData.value}
              onChange={(e) => handleInputChange('value', e.target.value)}
              placeholder={getPlaceholderText()}
              className={errors.value ? 'error' : ''}
            />
            {errors.value && <span className="error-message">{errors.value}</span>}
          </div>

          {showSecondaryField && (
            <div className="form-group">
              <label htmlFor="secondary_value">
                {formData.type === 'email' ? 'Secondary Email' : 'Address Line 2'}
              </label>
              <input
                type={formData.type === 'email' ? 'email' : 'text'}
                id="secondary_value"
                value={formData.secondary_value}
                onChange={(e) => handleInputChange('secondary_value', e.target.value)}
                placeholder={getSecondaryPlaceholderText()}
                className={errors.secondary_value ? 'error' : ''}
              />
              {errors.secondary_value && <span className="error-message">{errors.secondary_value}</span>}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="order">Display Order</label>
            <input
              type="number"
              id="order"
              value={formData.order}
              onChange={(e) => handleInputChange('order', parseInt(e.target.value) || 0)}
              min="0"
              placeholder="0"
            />
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.is_primary}
                onChange={(e) => handleInputChange('is_primary', e.target.checked)}
              />
              <span className="checkbox-text">Mark as primary contact method</span>
            </label>
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) => handleInputChange('is_active', e.target.checked)}
              />
              <span className="checkbox-text">Display on website</span>
            </label>
          </div>

          {errors.submit && (
            <div className="error-message submit-error">{errors.submit}</div>
          )}

          <div className="form-actions">
            <button type="button" onClick={onCancel} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="btn-primary">
              {isSubmitting ? 'Saving...' : (contactInfo ? 'Update' : 'Add')} Contact Info
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;