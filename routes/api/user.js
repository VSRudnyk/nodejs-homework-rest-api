const express = require('express');

const { register } = require('../../controllers/user');

const { registerValidation } = require('../../middelwares/authValidation');

const router = express.Router();

router.post('/signup', registerValidation, register);

module.exports = router;
