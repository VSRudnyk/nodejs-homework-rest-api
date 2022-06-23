const Joi = require('joi');

module.exports = {
  registerValidation: (req, res, next) => {
    const body = req.body;
    const schema = Joi.object({
      password: Joi.string().required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net'] },
        })
        .required(),
    });

    const validationResult = schema.validate(body);

    if (validationResult.error) {
      return res.status(400).json({
        message: 'missing required name field',
      });
    }
    next();
  },
};
