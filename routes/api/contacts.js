const express = require('express');
const auth = require('../../middelwares/auth');
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
  favoriteValidation,
} = require('../../middelwares/validationMiddelware');

const router = express.Router();

router.get('/', auth, getContacts);
router.get('/:contactId', getContact);
router.post('/', auth, addContactValidation, addNewContact);
router.put('/:contactId', addContactValidation, changeContact);
router.patch('/:contactId', patchContactValidation, patchContact);
router.patch('/:contactId/favorite', favoriteValidation, patchContact);
router.delete('/:contactId', deleteContact);

module.exports = router;
