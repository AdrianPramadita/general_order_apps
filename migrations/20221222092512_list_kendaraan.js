exports.up = async function(knex) {
    if (! (await knex.schema.hasTable('list_kendaraan')) ) {
        await knex.schema
          .createTableIfNotExists("list_kendaraan", function (table) {
            table.increments("id");
            table.string("nama_kendaraan", 255).notNullable();
            table.string("nama_pemilik", 255)
            table.string("nomor_polisi", 255).notNullable();
            table.string("warna", 255)
            table.string("tipe");
            table.string("status");
            table.integer("jmh_pelanggaran");
            table.string("keterangan");
            table.timestamp("created_at");
            table.integer("created_by");
            table.timestamp("updated_at");
            table.integer("updated_by");
            table.timestamp("deleted_at");
            table.integer("deleted_by");
        })
    }    
};
  
  exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists("list_kendaraan");
  };
  