const routes = (handler) => [
  {
    method: 'POST',
    path: '/playlists/{playlistId}/songs',
    handler: handler.postSongPlaylistHandler,
    options: {
      auth: 'openMucicApp',
    },
  },
  {
    method: 'GET',
    path: '/playlists/{playlistId}/songs',
    handler: handler.getSongPlaylistHandler,
    options: {
      auth: 'openMucicApp',
    },
  },
  {
    method: 'DELETE',
    path: '/playlists/{playlistId}/songs',
    handler: handler.deleteSongPlaylistByIdHandler,
    options: {
      auth: 'openMucicApp',
    },
  },
];

module.exports = routes;
