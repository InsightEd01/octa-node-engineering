import React from 'react';
import { ContactInfo, contactService } from '../services/contactService';

interface ContactPreviewProps {
  contactInfo: ContactInfo[];
}

const ContactPreview: React.FC<ContactPreviewProps> = ({ contactInfo }) => {
  const activeContacts = contactInfo.filter(contact => contact.is_active);
  
  const getContactsByType = (type: string) => {
    return activeContacts.filter(contact => contact.type === type);
  };

  const formatContactValue = (contact: ContactInfo) => {
    if (contact.type === 'phone') {
      return contactService.formatPhone(contact.value);
    }
    return contact.value;
  };

  const renderContactCard = (contacts: ContactInfo[], type: string) => {
    if (contacts.length === 0) return null;

    const getIcon = () => {
      switch (type) {
        case 'address':
          return (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
          );
        case 'phone':
          return (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
          );
        case 'email':
          return (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
          );
        case 'hours':
          return (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
              <path d="m12.5 7-1 0 0 6 5.25 3.15.75-1.23-4.5-2.67z"/>
            </svg>
          );
        default:
          return null;
      }
    };

    const primaryContact = contacts.find(c => c.is_primary) || contacts[0];

    return (
      <div className="preview-info-card" key={type}>
        <div className="preview-info-icon">
          {getIcon()}
        </div>
        <div className="preview-info-content">
          <h3>{primaryContact.label}</h3>
          <div className="preview-contact-values">
            {type === 'email' ? (
              <div>
                <p><a href={`mailto:${primaryContact.value}`}>{primaryContact.value}</a></p>
                {primaryContact.secondary_value && (
                  <p><a href={`mailto:${primaryContact.secondary_value}`}>{primaryContact.secondary_value}</a></p>
                )}
                {contacts.slice(1).map(contact => (
                  <div key={contact.id}>
                    <p><a href={`mailto:${contact.value}`}>{contact.value}</a></p>
                    {contact.secondary_value && (
                      <p><a href={`mailto:${contact.secondary_value}`}>{contact.secondary_value}</a></p>
                    )}
                  </div>
                ))}
              </div>
            ) : type === 'phone' ? (
              <div>
                <p><a href={`tel:${primaryContact.value}`}>{formatContactValue(primaryContact)}</a></p>
                {contacts.slice(1).map(contact => (
                  <p key={contact.id}>
                    <a href={`tel:${contact.value}`}>{formatContactValue(contact)}</a>
                  </p>
                ))}
                {primaryContact.secondary_value && (
                  <p className="availability">{primaryContact.secondary_value}</p>
                )}
              </div>
            ) : type === 'address' ? (
              <div>
                <p>{primaryContact.value}</p>
                {primaryContact.secondary_value && <p>{primaryContact.secondary_value}</p>}
                {contacts.slice(1).map(contact => (
                  <div key={contact.id}>
                    <p>{contact.value}</p>
                    {contact.secondary_value && <p>{contact.secondary_value}</p>}
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <p>{primaryContact.value}</p>
                {contacts.slice(1).map(contact => (
                  <p key={contact.id}>{contact.value}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (activeContacts.length === 0) {
    return (
      <div className="contact-preview">
        <div className="preview-header">
          <h3>Website Preview</h3>
          <p>This is how your contact information will appear on the website</p>
        </div>
        <div className="preview-empty">
          <p>No active contact information to display</p>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-preview">
      <div className="preview-header">
        <h3>Website Preview</h3>
        <p>This is how your contact information will appear on the website</p>
      </div>

      <div className="preview-section">
        <h4>Contact Section</h4>
        <div className="preview-contact-header">
          <h2>Get in Touch</h2>
          <p>Ready to transform your business with AI? Let's discuss how our solutions can help you achieve your goals.</p>
        </div>

        <div className="preview-contact-content">
          <div className="preview-contact-info-cards">
            {renderContactCard(getContactsByType('address'), 'address')}
            {renderContactCard(getContactsByType('phone'), 'phone')}
            {renderContactCard(getContactsByType('email'), 'email')}
            {renderContactCard(getContactsByType('hours'), 'hours')}
          </div>
        </div>
      </div>

      <div className="preview-section">
        <h4>Footer Section</h4>
        <div className="preview-footer-contact">
          <h3>Get in Touch</h3>
          {getContactsByType('address').map(contact => (
            <div key={contact.id} className="preview-contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <div>
                <p>{contact.value}</p>
                {contact.secondary_value && <p>{contact.secondary_value}</p>}
              </div>
            </div>
          ))}

          {getContactsByType('phone').map(contact => (
            <div key={contact.id} className="preview-contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              <a href={`tel:${contact.value}`}>{formatContactValue(contact)}</a>
            </div>
          ))}

          {getContactsByType('email').map(contact => (
            <div key={contact.id} className="preview-contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              <div>
                <a href={`mailto:${contact.value}`}>{contact.value}</a>
                {contact.secondary_value && (
                  <a href={`mailto:${contact.secondary_value}`}>{contact.secondary_value}</a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactPreview;