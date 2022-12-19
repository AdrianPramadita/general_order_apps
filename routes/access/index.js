const express = require('express')
const router = express.Router()
// const verifyToken = require('../../middlewares/verifyToken')

const userMenu = require('./user')
// const menuMaster = require('./master_menu')
// const menuAccess = require('./access')
// const roleMenu = require('../security/role-management')

//USER MENU
// router.post('/user/all', userMenu.all)
router.post('/user', userMenu.register);
// router.get('/user/:id', userMenu.edit)
// router.put('/user/:id', userMenu.update)
// router.delete('/user/:id', userMenu.deleted)
    
//MASTER MENU
// router.get('/master-menu',verifyToken, menuMaster.all)
// router.get('/master-menu/listmenu',verifyToken, menuMaster.listallmenu)
// router.post('/master-menu',verifyToken, menuMaster.create)
// router.get('/master-menu/:id',verifyToken, menuMaster.detail)
// router.put('/master-menu/:id',verifyToken, menuMaster.update)
// router.delete('/master-menu/:id',verifyToken, menuMaster.deleted)
// router.get('/my-access', verifyToken, menuMaster.userMenu)
// router.post('/master-menu/level', verifyToken, menuMaster.udpateLevel)

// ACCESS ROLE
// router.get('/access', verifyToken, menuAccess.all)
// router.get('/access/listrole', verifyToken, menuAccess.list)
// router.post('/access', verifyToken, menuAccess.create)
// router.get('/access/:id', verifyToken, menuAccess.edit)
// router.put('/access/:id', verifyToken, menuAccess.update)
// router.delete('/access/:id', verifyToken, menuAccess.deleted)

// ROLE MANAGEMENT
// router.post('/role-management/list', verifyToken, roleMenu.all)
// router.post('/role-management', verifyToken, roleMenu.create)
// router.get('/role-management/:id', verifyToken, roleMenu.edit)
// router.put('/role-management/:id', verifyToken, roleMenu.update)
// router.delete('/role-management/:id', verifyToken, roleMenu.deleted)
// router.get("/all-role", verifyToken, roleMenu.allRole)
// router.get('/roleStatus', verifyToken, roleMenu.roleStatus)

module.exports = router;
