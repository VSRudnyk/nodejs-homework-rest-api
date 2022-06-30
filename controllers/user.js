const { Conflict, Unauthorized } = require('http-errors');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const path = require('path');
const Jimp = require('jimp');
const { User } = require('../models');
const fs = require('fs/promises');

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict(`${email} in use`);
  }

  const avatarURL = gravatar.url(email);
  const newUser = new User({ email, avatarURL });
  newUser.setPassword(password);
  newUser.save();

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      email,
      subscription: 'starter',
      avatarURL,
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

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const avatarDir = path.join(__dirname, '../', 'public', 'avatars');
  const imageName = `${id}_${originalname}`;
  const resizeImage = `resize_${imageName}`;

  try {
    const avatarURL = path.join('public', 'avatars', resizeImage);
    Jimp.read(tempUpload, (err, image) => {
      if (err) throw err;
      image.resize(250, 250).write(avatarURL);
    });
    const resultUpload = path.join(avatarDir, resizeImage);

    await fs.rename(tempUpload, resultUpload);
    await User.findByIdAndUpdate(id, { avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  subscriptionChange,
  updateAvatar,
};
