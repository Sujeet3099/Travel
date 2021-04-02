const express = require('express');
const userController = require('./../controllers/userController');

// const users = JSON.parse(
//   fs.readFileSync(`${__dirname}/../../dev-data/data/users.json`),
// );

const router = express.Router();



router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:id')
  .get(userController.getUser)
  .delete(userController.deleteUser)
  .patch(userController.updateUser);

module.exports = router;
