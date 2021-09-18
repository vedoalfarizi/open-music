exports.up = (pgm) => {
  pgm.createTable('song_playlists', {
    song_id: {
      type: 'varchar(24)',
      primaryKey: true,
    },
    playlist_id: {
      type: 'varchar(32)',
      primaryKey: true,
    },
    inserted_at: {
      type: 'varchar(30)',
      notNull: true,
    },
    updated_at: {
      type: 'varchar(30)',
      notNull: true,
    },
  });

  pgm.addConstraint('song_playlists', 'fk_song_playlists.song_id_songs.id', 'FOREIGN KEY(song_id) REFERENCES songs(id) ON DELETE CASCADE');
  pgm.addConstraint('song_playlists', 'fk_song_playlists.playlist_id_playlists.id', 'FOREIGN KEY(playlist_id) REFERENCES playlists(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropTable('song_playlists');
};
