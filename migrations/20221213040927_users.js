exports.up = async function(knex) {
    if (! (await knex.schema.hasTable('users')) ) {
        await knex.schema
          .createTableIfNotExists("users", function (table) {
            table.increments("id");
            table.string("nama", 255).notNullable();
            table.string("email", 255).notNullable();
            table.string("password", 255).notNullable();
            table.string("image");
            table.string("status");
            table.integer("role_access");
            table.string("job_title");
            table.string("department");
            table.string("organization");
            table.string("address");
            table.timestamp("created_at");
            table.integer("created_by");
            table.timestamp("updated_at");
            table.timestamp("deleted_at");
            table.integer("updated_by");
        })
    }    
};
  
  exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists("users");
  };
  