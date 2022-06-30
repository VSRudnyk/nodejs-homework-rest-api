const path = require('path');
const Jimp = require('jimp');
const { User } = require('../models');
const fs = require('fs/promises');
const authService = require('../service/authService');

const register = async (req, res) => {
  const result = await authService.registerUser(req.body);
  const { email, subscription, avatarURL } = result;

  return res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      email,
      subscription,
      avatarURL,
    },
  });
};

const login = async (req, res) => {
  const result = await authService.loginUser(req.body);
  const {
    token,
    user: { email, subscription },
  } = result;

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
  await authService.logoutUser(req.user);
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
