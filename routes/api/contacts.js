const express = require('express');
const ctrlWrapper = require('../../middelwares/ctrlWrapper');
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

router.get('/', auth, ctrlWrapper(getContacts));
router.get('/:contactId', ctrlWrapper(getContact));
router.post('/', auth, addContactValidation, ctrlWrapper(addNewContact));
router.put('/:contactId', addContactValidation, ctrlWrapper(changeContact));
router.patch('/:contactId', patchContactValidation, ctrlWrapper(patchContact));
router.patch(
  '/:contactId/favorite',
  favoriteValidation,
  ctrlWrapper(patchContact)
);
router.delete('/:contactId', deleteContact);

module.exports = router;
