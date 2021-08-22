const InvariantError = require('../exceptions/InvariantError');

const validateYear = async (year) => {
  if (year > new Date().getFullYear()) throw new InvariantError(`Tahun ${year} tidak valid`);
};

module.exports = {
  validateYear,
};
