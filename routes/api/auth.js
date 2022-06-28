const express = require('express');

const {
  register,
  login,
  getCurrent,
  logout,
  subscriptionChange,
  updateAvatar,
} = require('../../controllers/user');
const auth = require('../../middelwares/auth');
const upload = require('../../middelwares/upload.js');
const ctrlWrapper = require('../../middelwares/ctrlWrapper');
const {
  registerValidation,
  loginValidation,
  subscriptionValidation,
} = require('../../middelwares/authValidation');

const router = express.Router();

router.post('/signup', registerValidation, ctrlWrapper(register));
router.post('/signin', loginValidation, ctrlWrapper(login));
router.get('/current', auth, ctrlWrapper(getCurrent));
router.get('/logout', auth, ctrlWrapper(logout));
router.patch(
  '/',
  auth,
  subscriptionValidation,
  ctrlWrapper(subscriptionChange)
);
router.patch(
  '/avatars',
  auth,
  upload.single('avatar'),
  ctrlWrapper(updateAvatar)
);

module.exports = router;
