require('dotenv').config();
const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');

const logger = require('./utils/logger');
const wrapper = require('./utils/wrapper');

const auths = require('./api/auths');
const AuthService = require('./services/postgres/AuthService');
const tokenManager = require('./utils/tokenManager');
const authValidator = require('./validator/auths');

const SongService = require('./services/postgres/SongService');
const songs = require('./api/songs');
const songValidator = require('./validator/songs');

const SongPlaylistService = require('./services/postgres/SongPlaylistService');
const songPlaylists = require('./api/songPlaylists');
const songPlaylistValidator = require('./validator/songPlaylist');

const UserService = require('./services/postgres/UserService');
const users = require('./api/users');
const userValidator = require('./validator/users');

const CollaborationService = require('./services/postgres/CollaborationService');
const collaborations = require('./api/collaborations');
const collaborationValidator = require('./validator/collaborations');

const PlaylistService = require('./services/postgres/PlaylistService');
const playlists = require('./api/playlists');
const playlistValidator = require('./validator/playlists');

const _exports = require('./api/exports');
const ProducerService = require('./services/rabbitmq/ProducerService');
const ExportValidator = require('./validator/exports');

const uploads = require('./api/uploads');
const StorageService = require('./services/s3/StorageService');
const UploadValidator = require('./validator/uploads');

const CacheService = require('./services/redis/CacheService');

const ctx = 'server';

const init = async () => {
  const cacheService = new CacheService();
  const authService = new AuthService();
  const songService = new SongService();
  const songPlaylistService = new SongPlaylistService(songService, cacheService);
  const userService = new UserService();
  const collaborationService = new CollaborationService(userService);
  const playlistService = new PlaylistService(collaborationService);
  const storageService = new StorageService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: Jwt,
    },
  ]);

  server.auth.strategy('openMucicApp', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.userId,
      },
    }),
  });

  await server.register([
    {
      plugin: auths,
      options: {
        authService,
        userService,
        tokenManager,
        validator: authValidator,
      },
    },
    {
      plugin: songs,
      options: {
        service: songService,
        validator: songValidator,
      },
    },
    {
      plugin: songPlaylists,
      options: {
        service: songPlaylistService,
        validator: songPlaylistValidator,
        songService,
        playlistService,
      },
    },
    {
      plugin: users,
      options: {
        service: userService,
        validator: userValidator,
      },
    },
    {
      plugin: collaborations,
      options: {
        service: collaborationService,
        validator: collaborationValidator,
        playlistService,
      },
    },
    {
      plugin: playlists,
      options: {
        service: playlistService,
        validator: playlistValidator,
        collaborationService,
      },
    },
    {
      plugin: _exports,
      options: {
        service: ProducerService,
        playlistService,
        validator: ExportValidator,
      },
    },
    {
      plugin: uploads,
      options: {
        service: storageService,
        validator: UploadValidator,
      },
    },
  ]);

  server.ext('onPreResponse', wrapper.preResponse);

  await server.start();
  logger(`${ctx}-init`, `Server berjalan pada ${server.info.uri}`, 'info');
};

process.on('unhandledRejection', (err) => {
  logger(`${ctx}-error-handler`, err, 'error');
  process.exit(1);
});

init();
