const userService = require('../service/userService');

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

module.exports = {
  getCurrent,
  subscriptionChange,
  updateAvatar,
  verifyEmail,
};
