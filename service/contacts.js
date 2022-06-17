const { Contact } = require("../models");

const listContacts = async () => {
  return await Contact.find({});
};

const getContactById = async (id) => {
  const contacts = await listContacts();
  const contact = contacts.find((item) => item.id === id);
  return contact;
};

const addContact = async (body) => {
  return await Contact.create(body);
  // const contacts = await listContacts();
  // const { name, email, phone } = body;

  // const newContact = {
  //   id: v4(),
  //   name,
  //   email,
  //   phone,
  // };
  // contacts.push(newContact);
  // await updateContacts(contacts);
  // return newContact;
};

const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === id);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { id, ...body };

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

  return contacts[idx];
};

const removeContact = async (id) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === id);
  if (idx === -1) {
    return null;
  }
  const newContact = contacts.filter((_, index) => index !== idx);

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
