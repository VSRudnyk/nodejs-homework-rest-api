const Joi = require('joi');

module.exports = {
  addContactValidation: (req, res, next) => {
    const body = req.body;
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
        })
        .required(),
      phone: Joi.string()
        .pattern(
          /^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/
        )
        .required(),
    });

    const validationResult = schema.validate(body);

    if (validationResult.error) {
      return res.status(400).json({
        message: validationResult.error,
        // message: 'missing required name field',
      });
    }
    next();
  },
  patchContactValidation: (req, res, next) => {
    const body = req.body;
    const schema = Joi.object({
      name: Joi.string().optional(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
        })
        .optional(),
      phone: Joi.string()
        .pattern(
          /^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/
        )
        .optional(),
    });

    const validationResult = schema.validate(body);

    if (validationResult.error) {
      return res.status(400).json({
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
        message: 'missing field favorite',
      });
    }
    next();
  },
};
