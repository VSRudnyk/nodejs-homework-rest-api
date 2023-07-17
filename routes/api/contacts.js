const express = require('express');
const ctrlWrapper = require('../../middelwares/ctrlWrapper');
const auth = require('../../middelwares/auth');
const ctrl = require('../../controllers/contacts');

const {
  addContactValidation,
  patchContactValidation,
} = require('../../middelwares/validationMiddelware');

const router = express.Router();

router.get('/', auth, ctrlWrapper(ctrl.getContacts));
router.get('/:contactId', ctrlWrapper(ctrl.getContact));
router.post('/', auth, addContactValidation, ctrlWrapper(ctrl.addNewContact));
router.put(
  '/:contactId',
  addContactValidation,
  ctrlWrapper(ctrl.changeContact)
);
router.patch(
  '/:contactId',
  patchContactValidation,
  ctrlWrapper(ctrl.patchContact)
);
router.delete('/:contactId', ctrl.deleteContact);

module.exports = router;
