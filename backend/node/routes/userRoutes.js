const express = require('express');
const userController = require(`./../controllers/userController`);

const router = express.Router();

router.route('/getUser/:email').get(userController.getUser);
router.route('/updateUser/:email').patch(userController.updateUser);
router.route('/createUser').post(userController.createUser);

module.exports = router
