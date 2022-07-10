const path = require('path');
const Jimp = require('jimp');
const { NotFound, BadRequest } = require('http-errors');
const fs = require('fs/promises');
const { User } = require('../models');
const { sendEmail } = require('../helpers');

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

const verify = async (verificationToken) => {
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw NotFound();
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });
};

const reVerify = async (reqBody) => {
  const { email } = reqBody;
  const user = await User.findOne({ email });
  const { verify, verificationToken } = user;
  if (!verify) {
    throw BadRequest('Verification has already been passed');
  }
  const mail = {
    to: email,
    subject: 'Подтверждение email',
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Подтвердить email</a>`,
  };
  await sendEmail(mail);
};

module.exports = {
  subscription,
  avatar,
  verify,
  reVerify,
};
