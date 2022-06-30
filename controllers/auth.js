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

  return res.json({
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

const logout = async (req, res) => {
  await authService.logoutUser(req.user);
  res.status(204).json();
};

module.exports = {
  register,
  login,
  logout,
};
