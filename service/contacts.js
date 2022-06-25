const { default: mongoose } = require('mongoose');
const { Contact } = require('../models');

const listContacts = async (id, page, limit, favorite) => {
  const skip = (page - 1) * limit;
  if (favorite) {
    console.log(favorite);
  }
  return await Contact.find({ owner: id })
    .skip(skip)
    .limit(limit)
    .populate('owner', '_id email');
};

const getContactById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  return Contact.findById(id);
};

const addContact = async (body) => {
  return await Contact.create(body);
};

const updateContact = async (id, body) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  return await Contact.findByIdAndUpdate(id, body, { new: true });
};

const removeContact = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  return Contact.findByIdAndDelete(id);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
