const authController = require('./user');
const authService = require('../service/authService');

describe('Auth Controller', () => {
  describe('Register', () => {
    test('test register user', async () => {
      let req;
      let res;

      req = {
        body: {
          name: 'UserName',
          email: 'email@gmail.com',
          password: 'qwerty123',
        },
      };

      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn((data) => data),
      };

      authService.registerUser = jest.fn((data) => data);

      const result = await authController.register(req, res);

      expect(result.code).toBe(201);
    });
  });
});
