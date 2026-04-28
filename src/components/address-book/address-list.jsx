import React from 'react';
import './address-list.scss';

const AddressList = ({ contacts, onEdit, onDelete }) => {
  return (
    <div className="address-list-container">
      {contacts.length === 0 ? (
        <div className="no-contacts">
          <p>No contacts found. Add your first contact!</p>
        </div>
      ) : (
        <div className="contacts-grid">
          {contacts.map((contact) => (
            <div key={contact.id} className="contact-card">
              <div className="contact-avatar">
                {contact.profileImage ? (
                  <img src={contact.profileImage} alt={contact.name} />
                ) : (
                  <div className="avatar-placeholder">
                    {contact.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="contact-info">
                <h3>{contact.name}</h3>
                <p className="contact-detail">
                  <span className="icon">📞</span> {contact.phone}
                </p>
                <p className="contact-detail">
                  <span className="icon">✉️</span> {contact.email}
                </p>
                <p className="contact-detail">
                  <span className="icon">📍</span> {contact.address}
                </p>
              </div>
              <div className="contact-actions">
                <button 
                  className="edit-btn"
                  onClick={() => onEdit(contact)}
                >
                  Edit
                </button>
                <button 
                  className="delete-btn"
                  onClick={() => onDelete(contact.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressList;
