const authService = require('../service/authService');

const register = async (req, res) => {
  const result = await authService.registerUser(req.body);
  const { email, subscription, avatarURL, name } = result;

  return res.json({
    user: {
      name,
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
    user: { _id, email, subscription, avatarURL, name },
  } = result;

  return res.json({
    token,
    user: {
      _id,
      name,
      email,
      subscription,
      avatarURL,
    },
  });
};

const logout = async (req, res) => {
  await authService.logoutUser(req.user);
  res.status(204).json();
};

module.exports = {
  register,
  login,
  logout,
};
