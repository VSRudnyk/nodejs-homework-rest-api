const express = require('express');
const { register, login, logout } = require('../../controllers/auth');
const {
  getCurrent,
  // subscriptionChange,
  // updateAvatar,
  // verifyEmail,
  // reVerification,
} = require('../../controllers/user');
const auth = require('../../middelwares/auth');
// const upload = require('../../middelwares/upload');
const ctrlWrapper = require('../../middelwares/ctrlWrapper');
const {
  registerValidation,
  loginValidation,
  // subscriptionValidation,
  // varifyValidation,
} = require('../../middelwares/authValidation');

const router = express.Router();

router.post('/signup', registerValidation, ctrlWrapper(register));
router.post('/login', loginValidation, ctrlWrapper(login));
router.get('/current', auth, ctrlWrapper(getCurrent));
router.get('/logout', auth, ctrlWrapper(logout));
// router.patch(
//   '/',
//   auth,
//   subscriptionValidation,
//   ctrlWrapper(subscriptionChange)
// );
// router.patch(
//   '/avatars',
//   auth,
//   upload.single('avatar'),
//   ctrlWrapper(updateAvatar)
// );
// router.get('/verify/:verificationToken', ctrlWrapper(verifyEmail));
// router.post('/verify', varifyValidation, ctrlWrapper(reVerification));

module.exports = router;
