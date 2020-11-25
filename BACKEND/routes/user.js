const express = require('express');
const controllerUser = require("../controller/user")

const router = express.Router();

router.route('/signin')
    .post(controllerUser.signin)



router.route('/signup')
    .post(controllerUser.signup)


module.exports = router