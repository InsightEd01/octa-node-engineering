import React, { useState } from 'react';
import { ContactInfo, contactService } from '../services/contactService';

interface ContactListProps {
  contactInfo: ContactInfo[];
  onEdit: (contactInfo: ContactInfo) => void;
  onDelete: (id: string) => void;
  onReorder: (contactInfoList: { id: string; order: number }[]) => void;
}

const ContactList: React.FC<ContactListProps> = ({ contactInfo, onEdit, onDelete, onReorder }) => {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedItem(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem === targetId) {
      setDraggedItem(null);
      return;
    }

    const draggedIndex = contactInfo.findIndex(item => item.id === draggedItem);
    const targetIndex = contactInfo.findIndex(item => item.id === targetId);

    if (draggedIndex === -1 || targetIndex === -1) {
      setDraggedItem(null);
      return;
    }

    // Create new order
    const newContactInfo = [...contactInfo];
    const [draggedContact] = newContactInfo.splice(draggedIndex, 1);
    newContactInfo.splice(targetIndex, 0, draggedContact);

    // Update order values
    const reorderedList = newContactInfo.map((item, index) => ({
      id: item.id,
      order: index
    }));

    onReorder(reorderedList);
    setDraggedItem(null);
  };

  const handleDelete = async (id: string) => {
    if (deleteConfirm === id) {
      onDelete(id);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(id);
    }
  };

  const getContactIcon = (type: string) => {
    switch (type) {
      case 'email':
        return '📧';
      case 'phone':
        return '📞';
      case 'address':
        return '📍';
      case 'hours':
        return '🕒';
      default:
        return '📋';
    }
  };

  const getContactTypeLabel = (type: string) => {
    switch (type) {
      case 'email':
        return 'Email';
      case 'phone':
        return 'Phone';
      case 'address':
        return 'Address';
      case 'hours':
        return 'Business Hours';
      default:
        return type;
    }
  };

  const formatContactValue = (contact: ContactInfo) => {
    if (contact.type === 'phone') {
      return contactService.formatPhone(contact.value);
    }
    return contact.value;
  };

  if (contactInfo.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📞</div>
        <h3>No Contact Information</h3>
        <p>Add your first contact method to get started.</p>
      </div>
    );
  }

  return (
    <div className="contact-list">
      {contactInfo.map((contact) => (
        <div
          key={contact.id}
          className={`contact-item ${!contact.is_active ? 'inactive' : ''} ${draggedItem === contact.id ? 'dragging' : ''}`}
          draggable
          onDragStart={(e) => handleDragStart(e, contact.id)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, contact.id)}
        >
          <div className="contact-drag-handle">
            <span className="drag-icon">⋮⋮</span>
          </div>

          <div className="contact-icon">
            {getContactIcon(contact.type)}
          </div>

          <div className="contact-details">
            <div className="contact-header">
              <h4 className="contact-label">
                {contact.label}
                {contact.is_primary && <span className="primary-badge">Primary</span>}
                {!contact.is_active && <span className="inactive-badge">Hidden</span>}
              </h4>
              <span className="contact-type">{getContactTypeLabel(contact.type)}</span>
            </div>
            
            <div className="contact-value">
              {contact.type === 'email' ? (
                <div>
                  <a href={`mailto:${contact.value}`}>{contact.value}</a>
                  {contact.secondary_value && (
                    <div>
                      <a href={`mailto:${contact.secondary_value}`}>{contact.secondary_value}</a>
                    </div>
                  )}
                </div>
              ) : contact.type === 'phone' ? (
                <a href={`tel:${contact.value}`}>{formatContactValue(contact)}</a>
              ) : contact.type === 'address' ? (
                <div>
                  <div>{contact.value}</div>
                  {contact.secondary_value && <div>{contact.secondary_value}</div>}
                </div>
              ) : (
                <div>{contact.value}</div>
              )}
            </div>
          </div>

          <div className="contact-actions">
            <button
              className="btn-icon edit-btn"
              onClick={() => onEdit(contact)}
              title="Edit contact information"
            >
              ✏️
            </button>
            
            <button
              className={`btn-icon delete-btn ${deleteConfirm === contact.id ? 'confirm' : ''}`}
              onClick={() => handleDelete(contact.id)}
              title={deleteConfirm === contact.id ? 'Click again to confirm deletion' : 'Delete contact information'}
            >
              {deleteConfirm === contact.id ? '⚠️' : '🗑️'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;