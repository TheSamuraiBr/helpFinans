const express = require("express");
const router =express.Router();
const AuthControllers = require('../controllers/AuthControllers')

//controllers

router.get('/register', AuthControllers.register);
router.post('/register', AuthControllers.registerPost);
router.get('/logout', AuthControllers.logout);
router.get('/login', AuthControllers.login)
router.post('/login', AuthControllers.loginPost)

module.exports = router