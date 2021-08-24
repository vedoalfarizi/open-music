const joi = require('joi');

const { ONE_HOUR } = require('../../utils/constans');

const songPayloadSchema = joi.object({
  title: joi.string().max(255).required(),
  year: joi.number().min(1000).max(new Date().getFullYear()).required(),
  performer: joi.string().max(64).required(),
  genre: joi.string().max(16).default(null),
  duration: joi.number().min(0).max(13 * ONE_HOUR).default(null),
});

module.exports = {
  songPayloadSchema,
};
