const express = require('express')
const router = express.Router()
const verifyToken = require('../../middlewares/verifyToken')

const login = require('./login')
// const register = require('./register')
// const getGeneralInformation = require('./profile/general-information')
// const updateGeneralInformation = require("./update-profile/general-information")
// const updateImageUser = require("./update-profile/update-images")
// const updateEmail = require("./update-profile/change-email")
// const updatePassword = require("./update-profile/change-password")

//USER MENU

router.post('/login', login);
// router.post('/secure/register', register);
// router.get("/profile/general", verifyToken, getGeneralInformation)
// router.put("/profile/general", verifyToken, updateGeneralInformation)
// router.put("/profile/avatar", verifyToken, updateImageUser)
// router.put("/profile/email", verifyToken, updateEmail)
// router.put("/profile/password", verifyToken, updatePassword)

module.exports = router;
