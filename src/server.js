require('dotenv').config();
const Hapi = require('@hapi/hapi');

const logger = require('./utils/logger');
const wrapper = require('./utils/wrapper');

const SongService = require('./services/postgres/SongService');
const songs = require('./api/songs');
const songValidator = require('./validator/songs');

const ctx = 'server';

const init = async () => {
  const songService = new SongService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register({
    plugin: songs,
    options: {
      service: songService,
      validator: songValidator,
    },
  });

  server.ext('onPreResponse', wrapper.preResponse);

  await server.start();
  logger(`${ctx}-init`, `Server berjalan pada ${server.info.uri}`, 'info');
};

process.on('unhandledRejection', (err) => {
  logger(`${ctx}-error-handler`, err, 'error');
  process.exit(1);
});

init();
