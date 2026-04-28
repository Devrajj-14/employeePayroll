import React, { useState, useEffect } from 'react';
import './address-book.scss';
import AddressList from './address-list';
import AddressForm from './address-form';

const AddressBook = () => {
  const [contacts, setContacts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState(null);

  // Load contacts from localStorage on mount
  useEffect(() => {
    const savedContacts = localStorage.getItem('addressBookContacts');
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []);

  // Save contacts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('addressBookContacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = () => {
    setEditingContact(null);
    setShowForm(true);
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact);
    setShowForm(true);
  };

  const handleSaveContact = (contactData) => {
    if (editingContact) {
      // Update existing contact
      setContacts(contacts.map(c => 
        c.id === editingContact.id ? { ...contactData, id: editingContact.id } : c
      ));
    } else {
      // Add new contact
      const newContact = {
        ...contactData,
        id: Date.now()
      };
      setContacts([...contacts, newContact]);
    }
    setShowForm(false);
    setEditingContact(null);
  };

  const handleDeleteContact = (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      setContacts(contacts.filter(c => c.id !== id));
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingContact(null);
  };

  return (
    <div className="address-book-container">
      <div className="header">
        <h1>Address Book</h1>
        <button className="add-btn" onClick={handleAddContact}>
          + Add Contact
        </button>
      </div>

      <AddressList 
        contacts={contacts}
        onEdit={handleEditContact}
        onDelete={handleDeleteContact}
      />

      {showForm && (
        <AddressForm
          contact={editingContact}
          onSave={handleSaveContact}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default AddressBook;
