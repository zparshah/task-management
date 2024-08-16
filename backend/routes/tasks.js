const express = require('express');

const router = express.Router({ mergeParams: true });

const controller = require('../controllers/tasks');

router
  .route('/')
  .get(controller.getTasks)
  .post(controller.addTask);
  router
  .route('/projects/names')
  .get(controller.getProjects)
router
  .route('/:task_id')
  .get(controller.getTask)
  .put(controller.updateTask)
  .delete(controller.archive);

module.exports = router;
