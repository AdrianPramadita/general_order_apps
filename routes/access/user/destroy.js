const fastValidator = require("fastest-validator");
const validator = new fastValidator();
const knex = require("../../../config/knex");

module.exports = async function (req, res) {
  try {
    const id = req.params.id;

    // condition
    const existUsers = await knex("users").where("id", id).select("id");
    // console.log(existUsers)

    if (existUsers.length <= 0) throw "user doesn't exist";

    // timestamp
    // var actv = new Date();
    // var actv_dte =
    //   actv.getFullYear() +
    //   "-" +
    //   (actv.getMonth() + 1) +
    //   "-" +
    //   actv.getDate() +
    //   " " +
    //   actv.getHours() +
    //   ":" +
    //   actv.getMinutes() +
    //   ":" +
    //   actv.getSeconds();

    const data = await knex("users")
    .where("id", id)
    .update({
      deleted_at: new Date(),
      // deleted_by: request.id,
    });
     

      

    return res.status(200).json({
      status: "success",
      data: data,
      message: "data successfully deleted",
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ status: "error", message: error });
  }
};
