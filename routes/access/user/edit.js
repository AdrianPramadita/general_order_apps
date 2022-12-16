const knex = require("../../../config/knex");
const { IMAGE_HOST } = process.env;

module.exports = async function (req, res) {
  try {
    /** data authentikasi user */
    const dataToken = req.user;
    const id = req.params.id;

    /** Query get data role include pagination and filter */
    const data = await knex
    .select("users.*", "role_management.role_name", knex.raw(`'${IMAGE_HOST}' || \'/\' || users.image as image`))
    .from("users")
    .leftJoin("role_management", "users.role_access", "=", "role_management.id")
    .whereNull("users.deleted_at")
    .where("users.id", id)
    .first();

    return res.status(200).json({
      status: "success",
      data: data,
      message: "data successfully loaded",
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error });
  }
};
