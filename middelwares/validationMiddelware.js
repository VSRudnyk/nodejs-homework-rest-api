const Joi = require('joi');

module.exports = {
  addContactValidation: (req, res, next) => {
    const body = req.body;
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net'] },
        })
        .required(),
      phone: Joi.string()
        .pattern(
          /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/
        )
        .required(),
      favorite: Joi.bool().required(),
    });

    const validationResult = schema.validate(body);

    if (validationResult.error) {
      return res.status(400).json({
        // message: validationResult.error,
        message: 'missing required name field',
      });
    }
    next();
  },
  patchContactValidation: (req, res, next) => {
    const body = req.body;
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).optional(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net'] },
        })
        .optional(),
      phone: Joi.string()
        .pattern(
          /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/
        )
        .optional(),
    });

    const validationResult = schema.validate(body);

    if (validationResult.error) {
      return res.status(400).json({
        // message: validationResult.error,
        message: 'missing required name field',
      });
    }
    next();
  },

  favoriteValidation: (req, res, next) => {
    const body = req.body;
    const schema = Joi.object({
      favorite: Joi.bool().required(),
    });

    const validationResult = schema.validate(body);

    if (validationResult.error) {
      return res.status(400).json({
        // message: validationResult.error,
        message: 'missing field favorite',
      });
    }
    next();
  },
};
