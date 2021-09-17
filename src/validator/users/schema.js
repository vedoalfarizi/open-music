const joi = require('joi');

const userPayloadSchema = joi.object({
  username: joi.string().min(4).max(24).required(),
  password: joi.string().min(4).max(255).required(),
  fullname: joi.string().max(124).required(),
});

module.exports = {
  userPayloadSchema,
};
