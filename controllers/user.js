const { Conflict, Unauthorized } = require('http-errors');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict(`${email} in use`);
  }

  const newUser = new User({ email });
  newUser.setPassword(password);
  newUser.save();

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      email,
      subscription: 'starter',
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.comparePassword(password)) {
    throw new Unauthorized('Email or password is wrong');
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
  await User.findByIdAndUpdate(user._id, { token });
  const { subscription } = user;
  res.json({
    status: 'success',
    code: 200,
    data: {
      token,
      user: {
        email,
        subscription,
      },
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    status: 'success',
    code: 200,
    data: {
      user: {
        email,
        subscription,
      },
    },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).json();
};

const subscriptionChange = async (req, res) => {
  const { _id } = req.user;
  const body = req.body;
  const result = await User.findByIdAndUpdate(_id, body, { new: true });
  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  subscriptionChange,
};
