const validator = require('fastest-validator');
const v = new validator();
const knex = require("../../../config/knex");
const bcrypt = require("bcryptjs");
var imageBase64 = require("base64-img");
const { request } = require('express');

module.exports = async function (req, res) {
  try {
    const request = req.body;
    /** data authentikasi user */
    const dataToken = req.user;

    /** validate users input */
    const schema = {
      nama: { type: "string", empty: false },
      email: { type: "email", empty: false },
      password: { type: "string", min: 6 },
      image: { type: "string", optional: true },
      role_id: { type: "number", optional: true },
      status: { type: "enum", values: ["Active", "In-Active", "Blocked"] },
    };
    const validate = v.validate(request, schema);
    if(validate.length){
        return res.status(400).json({
            status: "error",
            message: validate
        });
    }

    /** user email already exist */
    const iExist = await knex("users").where({email: request.email}).first();
    if(iExist){
      return res.status(409).json({
        status: "error",
        message: `user with email ${request.email} already exist`,
      });
    }

    /** Encrypt password */
    const encrypt_password = await bcrypt.hash(request.password, 10);

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
      password: encrypt_password,
      image: images,
      role_access: request.role_id,
      status: request.status,
      job_title: request.job_title,
      department: request.department,
      organization: request.organization,
      address: request.address,
      created_at: new Date(),
      // created_by: dataToken.id,
    };
    
    /** Query insert user */
    const createUser = await knex("users").insert(data).returning("*");

    return res.status(200).json({
      status: "success",
      data: {
        id: createUser.id,
      },
      message: "data successfully saved",
    });
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "error", message: error });
  }
};
