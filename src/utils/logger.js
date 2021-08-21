const winston = require('winston');

const logger = winston.createLogger({
  transports: [new winston.transports.Console({
    level: 'info',
    handleExceptions: true,
    json: false,
  })],
  exitOnError: false,
});

const log = (context, message, scope) => {
  const content = {
    context,
    message: message.toString(),
  };

  if (scope === 'error') {
    return logger.error(content);
  }

  return logger.info(content);
};

module.exports = log;
