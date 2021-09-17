const joi = require('joi');

const postAuthPayloadSchema = joi.object({
  username: joi.string().required(),
  password: joi.string().required(),
});

const putAuthPayloadSchema = joi.object({
  refreshToken: joi.string().required(),
});

const deleteAuthPayloadSchema = joi.object({
  refreshToken: joi.string().required(),
});

module.exports = {
  postAuthPayloadSchema,
  putAuthPayloadSchema,
  deleteAuthPayloadSchema,
};
