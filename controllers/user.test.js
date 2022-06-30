const authController = require('./user');
const authService = require('../service/authService');

describe('Auth Controller', () => {
  describe('Register', () => {
    test('Test register user', async () => {
      const req = {
        body: {
          email: 'email@gmail.com',
          password: '123456',
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn((data) => data),
      };

      authService.registerUser = jest.fn((data) => data);

      const result = await authController.register(req, res);
      expect(result.code).toBe(201);
      expect(result.data.email).toBe('email@gmail.com');
      expect(result.data.password).toBeUndefined();
    });
  });

  describe('Login', () => {
    test('User should login with correct data', async () => {
      const req = {
        body: {
          email: 'email@gmail.com',
          password: '123456',
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn((data) => data),
      };

      authService.loginUser = jest.fn(() => {
        return {
          token: 'test JWT-token',
          user: {
            email: 'email@gmail.com',
            subscription: 'starter',
          },
        };
      });

      const result = await authController.login(req, res);

      expect(result.code).toBe(200);
      expect(result.data.token).toBe('test JWT-token');
    });
  });
});

// https://www.youtube.com/watch?v=oGCBpSOIzG8
// 1:58
