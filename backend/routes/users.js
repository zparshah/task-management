const express = require('express');

const router = express.Router({ mergeParams: true });

const userController = require('../controllers/users');
const taskRouter = require('./tasks');

router
  .route('/register')
  .post(
    userController.registerUser,
  );
router
  .route('/login')
  .post(
    userController.loginUser,
  );
router.use('/:user_id/tasks', taskRouter);

module.exports = router;
