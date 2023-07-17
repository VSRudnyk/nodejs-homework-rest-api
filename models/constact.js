const { Schema, model, SchemaTypes } = require('mongoose');

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    number: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
      required: true,
    },
  },

  { versionKey: false, timestamps: true }
);

const Contact = model('contact', contactSchema);

module.exports = {
  Contact,
};
