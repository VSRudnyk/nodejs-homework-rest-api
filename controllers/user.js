const { Conflict, Unauthorized } = require('http-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`${email} in use`);
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const result = await User.create({ email, password: hashPassword });
  //   const newUser = new User({ email });
  //   newUser.setPassword(password);
  //   newUser.save();

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const passCompaire = await bcrypt.compare(password, user.password);
  if (!user || !passCompaire) {
    throw new Unauthorized('Email or password is wrong');
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY);
  res.json({
    status: 'success',
    code: 200,
    data: {
      token,
    },
  });
};

module.exports = {
  register,
  login,
};
