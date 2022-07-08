const express = require('express');
const { register, login, logout } = require('../../controllers/auth');
const {
  getCurrent,
  subscriptionChange,
  updateAvatar,
  verifyEmail,
} = require('../../controllers/user');
const auth = require('../../middelwares/auth');
const upload = require('../../middelwares/upload');
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
router.get('/verify/:verificationToken', ctrlWrapper(verifyEmail));

module.exports = router;
