const fs = require('fs/promises');
const { v4 } = require('uuid');
const path = require('path');

const contactsPath = path.join(__dirname, './contacts.json');

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (id) => {
  const contacts = await listContacts();
  const contact = contacts.find((item) => item.id === id);
  return contact;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const { name, email, phone } = body;

  const newContact = {
    id: v4(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === id);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { id, ...body };
  await updateContacts(contacts);
  return contacts[idx];
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
  await updateContacts(contacts);
  return contacts[idx];
};

const removeContact = async (id) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === id);
  if (idx === -1) {
    return null;
  }
  const newContact = contacts.filter((_, index) => index !== idx);
  await updateContacts(newContact);
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
