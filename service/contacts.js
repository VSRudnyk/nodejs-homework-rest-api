const { Contact } = require("../models");

const listContacts = async () => {
  return await Contact.find({});
};

const getContactById = async (id) => {
  const contact = Contact.findById(id);
  if (contact === "undefind") {
    return null;
  }

  return contact;
};

const addContact = async (body) => {
  return await Contact.create(body);
};

const updateContact = async (id, body) => {
  return await Contact.findByIdAndUpdate(id, body, { new: true });
};

const updateContactField = async (id, body) => {
  const { name, email, phone } = body;
  const contacts = await listContacts();

  const idx = contacts.findIndex((item) => item.id === id);
  if (idx === -1) {
    return null;
  }
  if (name) {
    contacts[idx].name = name;
  }
  if (email) {
    contacts[idx].email = email;
  }
  if (phone) {
    contacts[idx].phone = phone;
  }

  return contacts[idx];
};

const removeContact = async (id) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === id);
  if (idx === -1) {
    return null;
  }
  contacts.filter((_, index) => index !== idx);

  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateContactField,
};
