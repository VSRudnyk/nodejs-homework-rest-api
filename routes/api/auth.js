const express = require('express');

const {
  register,
  login,
  getCurrent,
  logout,
} = require('../../controllers/user');
const auth = require('../../middelwares/auth');
const ctrlWrapper = require('../../middelwares/ctrlWrapper');
const {
  registerValidation,
  loginValidation,
} = require('../../middelwares/authValidation');

const router = express.Router();

router.post('/signup', registerValidation, ctrlWrapper(register));
router.post('/signin', loginValidation, ctrlWrapper(login));
router.get('/current', auth, ctrlWrapper(getCurrent));
router.post('/logout', auth, ctrlWrapper(logout));

module.exports = router;
