const joi = require('joi');

const { ONE_HOUR } = require('../../utils/constans');

const songPayloadSchema = joi.object({
  title: joi.string().max(255).required(),
  year: joi.number().min(1000).required(),
  performer: joi.string().max(64).required(),
  genre: joi.string().max(16).required(),
  duration: joi.number().min(10).max(13 * ONE_HOUR).required(),
});

module.exports = {
  songPayloadSchema,
};
