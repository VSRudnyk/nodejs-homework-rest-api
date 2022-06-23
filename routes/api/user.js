const express = require('express');

const { register, login } = require('../../controllers/user');

const {
  registerValidation,
  loginValidation,
} = require('../../middelwares/authValidation');

const router = express.Router();

router.post('/signup', registerValidation, register);
router.post('/signin', loginValidation, login);

module.exports = router;
