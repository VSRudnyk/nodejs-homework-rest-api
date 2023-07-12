const userService = require('../service/userService');

const getCurrent = async (req, res) => {
  const { email, subscription, name, avatarURL } = req.user;
  res.json({
    user: {
      name,
      email,
      subscription,
      avatarURL,
    },
  });
};

const subscriptionChange = async (req, res) => {
  const result = await userService.subscription(req.user, req.body);
  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
};

const updateAvatar = async (req, res) => {
  const result = await userService.avatar(req.file, req.user);
  const { avatarURL } = result;
  res.json({ avatarURL });
};

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  await userService.verify(verificationToken);
  res.json({
    message: 'Verification successful',
  });
};

const reVerification = async (req, res) => {
  await userService.reVerify(req.body);
  res.json({
    message: 'Verification successful',
  });
};

module.exports = {
  getCurrent,
  subscriptionChange,
  updateAvatar,
  verifyEmail,
  reVerification,
};
