const validator = require('fastest-validator');
const v = new validator();
const knex = require("../../../config/knex");
const { IMAGE_HOST } = process.env;
const { attachPaginate } = require('knex-paginate');
attachPaginate();

module.exports = async function (req, res) {
  try {
    /** data authentikasi user */
    // const dataToken = req.user;
    const request = req.body;

    /** validate users input */
    const schema = {
      perPage: { type: "number", empty: false },
      currentPage: { type: "number", empty: false },
      nama: { type: "string", optional: true },
      // status: { type: "string", optional: true },
      // role_id: { type: "number", optional: true }
    };
    const validate = v.validate(request, schema);
    if(validate.length){
        return res.status(400).json({
            status: "error",
            message: validate
        });
    }

    /** Filter */
    const data = await knex("users").modify( async (query) => {
      if (request.nama !== undefined && request.nama != null) {
        query.whereRaw(`(LOWER(users.nama) like '%${(request.nama).toString().toLowerCase()}%' OR LOWER(users.email) like '%${(request.nama).toString().toLowerCase()}%')`)
      }

      if (request.role_id !== undefined && request.role_id != null) {
        query.where("role_access", request.role_id);
      }

      if (request.status !== undefined && request.status != "null") {
        query.whereRaw(`LOWER(users.status) like '%${(request.status).toString().toLowerCase()}%'`)
      }
      
      if(request.orderBy !== undefined){
        if(request.orderBy == "latest"){
          query.orderBy('users.created_at', 'DESC')
        }
        if(request.orderBy == "longest"){
          query.orderBy('users.created_at', 'ASC')
        }
        if(request.orderBy == "name"){
          query.orderBy('users.nama', 'ASC')
        }
        if(request.orderBy == "status"){
          query.orderBy('users.status', 'ASC')
        }
      }
    })
    .paginate({
      perPage: request.perPage,
      currentPage: request.currentPage,
    });

    return res.json({
      status: "success",
      data: data.data,
      pagination: data.pagination,
      message: "data successfully loaded",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "error", message: error });
  }
};
