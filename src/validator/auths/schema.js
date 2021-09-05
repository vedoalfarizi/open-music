const Joi = require('joi');

const postAuthPayloadSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = {
  postAuthPayloadSchema,
};
