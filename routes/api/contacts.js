const express = require('express');
const Joi = require('joi');

const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
} = require('../../models/contacts');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
});

router.get('/:contactId', async (req, res, next) => {
  const id = req.params.contactId;
  const contactById = await getContactById(id);
  if (!contactById) {
    res.status(404).json({
      message: `Contact with id=${id} not found`,
    });
  }
  res.status(200).json(contactById);
});

router.post('/', async (req, res, next) => {
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
  });

  const validationResult = schema.validate(body);

  if (validationResult.error) {
    return res.status(400).json({
      message: 'missing required name field',
    });
  }
  const newContact = await addContact(body);
  res.status(201).json(newContact);
});

router.put('/:contactId', async (req, res, next) => {
  const body = req.body;
  const id = req.params.contactId;
  const changedContact = await updateContact(id, body);
  res.json(changedContact);
});

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

module.exports = router;
