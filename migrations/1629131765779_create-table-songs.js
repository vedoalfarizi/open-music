exports.up = (pgm) => {
  pgm.createTable('songs', {
    id: {
      type: 'varchar(24)',
      primaryKey: true,
    },
    title: {
      type: 'varchar(255)',
      notNull: true,
    },
    year: {
      type: 'integer',
      notNull: true,
    },
    performer: {
      type: 'varchar(64)',
      notNull: true,
    },
    genre: {
      type: 'varchar(16)',
      notNull: false,
    },
    duration: {
      type: 'integer',
      notNull: false,
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
};

exports.down = (pgm) => {
  pgm.dropTable('songs');
};
