const path = require('path');
const Jimp = require('jimp');
const { User } = require('../models');
const fs = require('fs/promises');

const subscription = async (user, reqBody) => {
  const { _id } = user;
  const body = reqBody;
  return await User.findByIdAndUpdate(_id, body, { new: true });
};

const avatar = async (reqFile, reqUser) => {
  const { path: tempUpload, originalname } = reqFile;
  const { _id: id } = reqUser;
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
    return await User.findByIdAndUpdate(id, { avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = {
  subscription,
  avatar,
};
