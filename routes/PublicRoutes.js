const express = require("express");
const router =express.Router();
const PublicController = require('../controllers/PublicController')

//controllers

router.get('/', PublicController.showHome)



module.exports = router