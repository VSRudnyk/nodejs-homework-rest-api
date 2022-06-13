const express = require('express');

const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateContactField,
} = require('../../models/contacts');
const {
  addContactValidation,
  patchContactValidation,
} = require('./middelwares/validationMiddelware');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
});

router.get('/:contactId', async (req, res, next) => {
  const id = req.params.contactId;
  const contactById = await getContactById(id);
  if (!contactById) {
    res.status(404).json({
      message: `Contact with id=${id} not found`,
    });
  }
  res.status(200).json(contactById);
});

router.post('/', addContactValidation, async (req, res, next) => {
  const body = req.body;
  const newContact = await addContact(body);
  res.status(201).json(newContact);
});

router.put('/:contactId', addContactValidation, async (req, res, next) => {
  const body = req.body;
  const id = req.params.contactId;
  const changedContact = await updateContact(id, body);
  if (!changedContact) {
    return res.status(404).json({
      message: `Contact with id=${id} not found`,
    });
  }
  res.status(200).json(changedContact);
});

router.patch('/:contactId', patchContactValidation, async (req, res, next) => {
  const body = req.body;
  const id = req.params.contactId;
  const changedContactField = await updateContactField(id, body);
  console.log(changedContactField);
  if (!changedContactField) {
    return res.status(404).json({
      message: `Contact with id=${id} not found`,
    });
  }
  res.status(200).json(changedContactField);
});

router.delete('/:contactId', async (req, res, next) => {
  const id = req.params.contactId;
  const deletedContact = await removeContact(id);
  if (!deletedContact) {
    res.status(404).json({
      message: `Contact with id=${id} not found`,
    });
  }
  res.status(200).json(deletedContact);
});

module.exports = router;
