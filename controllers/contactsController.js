const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateContactField,
} = require('../service/contacts');

const getContacts = async (req, res, next) => {
  let { page = 1, limit = 10 } = req.query;
  limit = parseInt(limit) > 10 ? 10 : limit;
  page = parseInt(page);
  const { _id } = req.user;
  const result = await listContacts(_id, page, limit);
  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
};

const getContact = async (req, res, next) => {
  const id = req.params.contactId;
  const contactById = await getContactById(id);
  if (!contactById) {
    return res.status(404).json({
      message: `Contact with id=${id} not found`,
    });
  }
  res.status(200).json(contactById);
};

const addNewContact = async (req, res, next) => {
  const { _id } = req.user;
  const body = req.body;
  const result = await addContact({ ...body, owner: _id });
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result,
    },
  });
};

const changeContact = async (req, res, next) => {
  const body = req.body;
  const id = req.params.contactId;
  const changedContact = await updateContact(id, body);
  if (!changedContact) {
    return res.status(404).json({
      message: `Contact with id=${id} not found`,
    });
  }
  res.status(200).json(changedContact);
};

const patchContact = async (req, res, next) => {
  const body = req.body;
  const id = req.params.contactId;
  const changedContactField = await updateContactField(id, body);
  if (!changedContactField) {
    return res.status(404).json({
      message: `Contact with id=${id} not found`,
    });
  }
  res.status(200).json(changedContactField);
};

const deleteContact = async (req, res, next) => {
  const id = req.params.contactId;
  const deletedContact = await removeContact(id);
  if (!deletedContact) {
    res.status(404).json({
      message: `Contact with id=${id} not found`,
    });
  }
  res.status(200).json(deletedContact);
};

module.exports = {
  getContacts,
  getContact,
  addNewContact,
  changeContact,
  patchContact,
  deleteContact,
};
