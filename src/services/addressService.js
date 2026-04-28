// Address Book Service for future API integration

class AddressService {
  // LocalStorage key
  STORAGE_KEY = 'addressBookContacts';

  // Get all contacts from localStorage
  getAllContacts() {
    const contacts = localStorage.getItem(this.STORAGE_KEY);
    return contacts ? JSON.parse(contacts) : [];
  }

  // Get contact by ID
  getContactById(id) {
    const contacts = this.getAllContacts();
    return contacts.find(contact => contact.id === id);
  }

  // Save contact (create or update)
  saveContact(contact) {
    const contacts = this.getAllContacts();
    
    if (contact.id) {
      // Update existing
      const index = contacts.findIndex(c => c.id === contact.id);
      if (index !== -1) {
        contacts[index] = contact;
      }
    } else {
      // Create new
      contact.id = Date.now();
      contacts.push(contact);
    }
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(contacts));
    return contact;
  }

  // Delete contact
  deleteContact(id) {
    const contacts = this.getAllContacts();
    const filtered = contacts.filter(c => c.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
    return true;
  }

  // Clear all contacts
  clearAll() {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}

export default new AddressService();
