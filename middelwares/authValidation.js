const Joi = require('joi');

module.exports = {
  registerValidation: (req, res, next) => {
    const body = req.body;
    const schema = Joi.object({
      name: Joi.string().required(),
      password: Joi.string().required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net', 'ua'] },
        })
        .required(),
    });

    const validationResult = schema.validate(body);

    if (validationResult.error) {
      return res.status(400).json({
        message: 'missing required field',
      });
    }
    next();
  },

  loginValidation: (req, res, next) => {
    const body = req.body;
    const schema = Joi.object({
      password: Joi.string().required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net', 'ua'] },
        })
        .required(),
    });

    const validationResult = schema.validate(body);

    if (validationResult.error) {
      return res.status(400).json({
        message: 'missing required field',
      });
    }
    next();
  },
  subscriptionValidation: (req, res, next) => {
    const body = req.body;
    const schema = Joi.object({
      subscription: Joi.string().valid('starter', 'pro', 'business').required(),
    });

    const validationResult = schema.validate(body);

    if (validationResult.error) {
      return res.status(400).json({
        message: 'invalid subscription',
      });
    }
    next();
  },
  varifyValidation: (req, res, next) => {
    const body = req.body;
    const schema = Joi.object({
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net', 'ua'] },
        })
        .required(),
    });

    const validationResult = schema.validate(body);

    if (validationResult.error) {
      return res.status(400).json({
        message: 'missing required field email',
      });
    }
    next();
  },
};
