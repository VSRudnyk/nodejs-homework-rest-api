const { Unauthorized, Conflict } = require('http-errors');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const { v4 } = require('uuid');
const { User } = require('../models');
// const { sendEmail } = require('../helpers');

const { SECRET_KEY } = process.env;

const registerUser = async (body) => {
  const { email, password, name } = body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict(`${email} in use`);
  }

  const avatarURL = gravatar.url(email);
  const verificationToken = v4();
  const newUser = new User({ name, email, avatarURL, verificationToken });
  newUser.setPassword(password);
  newUser.save();

  return newUser;
};

const loginUser = async (body) => {
  const { email, password } = body;
  const user = await User.findOne({ email });

  if (!user || !user.comparePassword(password)) {
    throw new Unauthorized('Email is wron, or password is wrong');
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
  await User.findByIdAndUpdate(user._id, { token });
  return {
    token,
    user,
  };
};

const logoutUser = async (user) => {
  const { _id } = user;
  await User.findByIdAndUpdate(_id, { token: null });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
