const express = require('express');
const {
  getContacts,
  getContact,
  addNewContact,
  changeContact,
  patchContact,
  deleteContact,
} = require('../../controllers/contactsController');

const {
  addContactValidation,
  patchContactValidation,
} = require('../../middelwares/validationMiddelware');

const router = express.Router();

router.get('/', getContacts);
router.get('/:contactId', getContact);
router.post('/', addContactValidation, addNewContact);
router.put('/:contactId', addContactValidation, changeContact);
router.patch('/:contactId', patchContactValidation, patchContact);
router.delete('/:contactId', deleteContact);

module.exports = router;
