exports.up = function (knex) {
  return knex.schema.hasTable('movies').then(exists => {
    if (!exists) {
      return knex.schema.createTable('movies', table => {
        table.increments('movie_id');
        table.string('title', 255);
        table.integer('runtime_in_minutes');
        table.string('rating', 255);
        table.string('description', 1000);
        table.string('image_url', 255);
      });
    }
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('movies');
};
