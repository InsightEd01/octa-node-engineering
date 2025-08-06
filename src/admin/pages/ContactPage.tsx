import React, { useState, useEffect } from 'react';
import { ContactInfo, contactService } from '../services/contactService';
import ContactList from '../components/ContactList';
import ContactForm from '../components/ContactForm';
import ContactPreview from '../components/ContactPreview';

const ContactPage: React.FC = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState<ContactInfo | undefined>();
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    loadContactInfo();
  }, []);

  const loadContactInfo = async () => {
    try {
      setLoading(true);
      const data = await contactService.getContactInfo();
      setContactInfo(data);
      setError(null);
    } catch (err) {
      console.error('Error loading contact info:', err);
      setError('Failed to load contact information. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddContact = () => {
    setEditingContact(undefined);
    setShowForm(true);
  };

  const handleEditContact = (contact: ContactInfo) => {
    setEditingContact(contact);
    setShowForm(true);
  };

  const handleSaveContact = (savedContact: ContactInfo) => {
    if (editingContact) {
      // Update existing contact
      setContactInfo(prev => 
        prev.map(contact => 
          contact.id === savedContact.id ? savedContact : contact
        )
      );
    } else {
      // Add new contact
      setContactInfo(prev => [...prev, savedContact]);
    }
    
    setShowForm(false);
    setEditingContact(undefined);
  };

  const handleDeleteContact = async (id: string) => {
    try {
      await contactService.deleteContactInfo(id);
      setContactInfo(prev => prev.filter(contact => contact.id !== id));
    } catch (err) {
      console.error('Error deleting contact info:', err);
      setError('Failed to delete contact information. Please try again.');
    }
  };

  const handleReorderContacts = async (reorderedList: { id: string; order: number }[]) => {
    try {
      await contactService.reorderContactInfo(reorderedList);
      
      // Update local state with new order
      const updatedContacts = contactInfo.map(contact => {
        const reorderedItem = reorderedList.find(item => item.id === contact.id);
        return reorderedItem ? { ...contact, order: reorderedItem.order } : contact;
      });
      
      // Sort by new order
      updatedContacts.sort((a, b) => a.order - b.order);
      setContactInfo(updatedContacts);
    } catch (err) {
      console.error('Error reordering contact info:', err);
      setError('Failed to reorder contact information. Please try again.');
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingContact(undefined);
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  if (loading) {
    return (
      <div className="admin-page">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading contact information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page contact-page">
      <div className="page-header">
        <div className="header-content">
          <h1>Contact Information Management</h1>
          <p>Manage your business contact details that appear throughout the website</p>
        </div>
        <div className="header-actions">
          <button 
            className={`btn-secondary ${showPreview ? 'active' : ''}`}
            onClick={togglePreview}
          >
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </button>
          <button className="btn-primary" onClick={handleAddContact}>
            Add Contact Info
          </button>
        </div>
      </div>

      {error && (
        <div className="error-banner">
          <span className="error-icon">⚠️</span>
          <span>{error}</span>
          <button className="error-close" onClick={() => setError(null)}>×</button>
        </div>
      )}

      <div className={`contact-content ${showPreview ? 'with-preview' : ''}`}>
        <div className="contact-management">
          <div className="section-header">
            <h2>Contact Information</h2>
            <p>Drag and drop to reorder how contact information appears on your website</p>
          </div>

          <ContactList
            contactInfo={contactInfo}
            onEdit={handleEditContact}
            onDelete={handleDeleteContact}
            onReorder={handleReorderContacts}
          />

          {contactInfo.length === 0 && !loading && (
            <div className="empty-state">
              <div className="empty-icon">📞</div>
              <h3>No Contact Information</h3>
              <p>Add your first contact method to help visitors get in touch with you.</p>
              <button className="btn-primary" onClick={handleAddContact}>
                Add Contact Info
              </button>
            </div>
          )}
        </div>

        {showPreview && (
          <div className="contact-preview-panel">
            <ContactPreview contactInfo={contactInfo} />
          </div>
        )}
      </div>

      {showForm && (
        <ContactForm
          contactInfo={editingContact}
          onSave={handleSaveContact}
          onCancel={handleCancelForm}
        />
      )}
    </div>
  );
};

export default ContactPage;