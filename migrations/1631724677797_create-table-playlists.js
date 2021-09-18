exports.up = (pgm) => {
  pgm.createTable('playlists', {
    id: {
      type: 'varchar(32)',
      primaryKey: true,
    },
    name: {
      type: 'varchar(255)',
      notNull: true,
    },
    owner: {
      type: 'VARCHAR(24)',
      notNull: true,
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

  pgm.addConstraint('playlists', 'fk_playlists.owner_users.id', 'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropTable('playlists');
};
