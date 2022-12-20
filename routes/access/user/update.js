const validator = require('fastest-validator');
const v = new validator();
const knex = require("../../../config/knex");
const bcrypt = require("bcryptjs");
var imageBase64 = require("base64-img");

module.exports = async function (req, res) {
  try {
    const request = req.body;
    const id = req.params.id;
    /** data authentikasi user */
    const dataToken = req.user;


    /** validate users input */
    const schema = {
      nama: { type: "string", empty: false },
      email: { type: "email", empty: false },
      password: { type: "string", optional: true },
      image: { type: "string", optional: true },
      role_id: { type: "number", optional: true },
      status: { type: "enum", values: ["Active", "In-Active", "Blocked"] },
    };
    const validate = v.validate(req.body, schema);
    if(validate.length){
        return res.status(400).json({
            status: "error",
            message: validate
        });
    }

    /** check is email sudah terdaftar atau belum */
    var iExist = await knex("users").where("email", request.email).first();
    if(iExist && iExist.id != id){
      return res.status(404).json({
        status: "error",
        message: `User with email ${request.email} already exists`,
      });
    }

    /** Check data ada atau tidak */
    iExist = await knex("users").where("id", id).first();
    if(!iExist){
      return res.status(404).json({
        status: "error",
        message: "data not found",
      });
    }

    /** Saved image to local storage */
    // var images = iExist.image;
    // if(request.image){
      /** Saved Image to Local storage */
    //   images = imageBase64.imgSync( request.image, "./public/images/users", Date.now() );
    // }

    /** Saved new password is exist */
    var password = iExist.password;
    if(request.password){
      /** Encrypt password */
      password = await bcrypt.hash(request.password, 10);
    }

    /** Saved Image to Local storage */
    var images = "";
    if (request.image != null && request.image != "") {
      var img = imageBase64.imgSync(
        request.image,
        "./public/images/users",
        Date.now()
      );

      images = `images/users/${img
        .split("\\")
        .pop()
        .split("/")
        .pop()}`;
    } else {
      images = request.image;
    }

    const data = {
      nama: request.nama,
      email: request.email,
      password: password,
      image: images,
      // `images/users/${images.split("\\").pop().split("/").pop()}`,
      role_access: request.role_id,
      status: request.status,
      job_title: request.job_title,
      department: request.department,
      organization: request.organization,
      address: request.address,
      updated_at: new Date(),
      // updated_by: dataToken.user_id,
    };

    /** Query data user */
    await knex("users").where("id", id).update(data);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
    return res.status(200).json({
      status: "success",
      data: {
        id: id
      },
      message: "data successfully saved",
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ status: "error", message: error });
  }
};
