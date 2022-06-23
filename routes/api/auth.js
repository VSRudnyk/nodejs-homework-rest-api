const express = require('express');

const { register, login, getCurrent } = require('../../controllers/user');
const auth = require('../../middelwares/auth');
const {
  registerValidation,
  loginValidation,
} = require('../../middelwares/authValidation');

const router = express.Router();

router.post('/signup', registerValidation, register);
router.post('/signin', loginValidation, login);
router.get('/current', auth, getCurrent);

module.exports = router;
