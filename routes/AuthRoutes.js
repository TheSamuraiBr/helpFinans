const express = require("express");
const router =express.Router();
const AuthControllers = require('../controllers/AuthControllers')

//controllers

router.get('/register', AuthControllers.register);
router.post('/register', AuthControllers.registerPost)
router.get('/login', AuthControllers.login)


module.exports = router