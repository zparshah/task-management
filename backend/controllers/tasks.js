const { Op } = require('sequelize');
const Sequelize = require('sequelize');
const { Tasks } = require('../models');

module.exports = {
  getTasks: async (req, res) => {
    try {
      const { user_id: userId } = req.params;
        let { search = null, project, priority, deadline } = req.query;

        const whereCondition = {
            user_id: userId,
            archived: false,
        };

        // Handle search condition
        if (search) {
            search = search.trim().replace(',', ' ');
            whereCondition[Op.or] = {
                title: { [Op.like]: `%${search}%` },
                project: { [Op.like]: `%${search}%` },
            };
        }

        // Handle project and priority filters
        if (project) {
            whereCondition.project = { [Op.like]: `%${project}%` };
        }

        if (priority) {
            whereCondition.priority = { [Op.like]: `%${priority}%` };
        }

        // Handle date range filter
        if (deadline) {
          const [startDate, endDate] = deadline.includes(' to ') ? deadline.split(' to ') : [deadline, deadline];
          const startTimestamp = new Date(startDate).getTime() / 1000;
          const endTimestamp = new Date(endDate).getTime() / 1000;

          whereCondition.deadline = {
              [Op.between]: [startTimestamp, endTimestamp],
          };
      }

        const tasks = await Tasks.findAll({
            where: whereCondition,
            order: [
                ['createdAt', 'DESC'],
                ['id', 'DESC'],
            ],
        });

        return res.status(200).send({
            tasks,
        });
    } catch (error) {
      req.log.error(error);
      const status = error.status || 500;
      const message = error.message || 'Something went wrong!';

      return res.status(status).send({ success: false, message });
    }
  },
  getTask: async (req, res) => {
    try {
      const { task_id: taskId } = req.params;

      const task = await Tasks.findOne({
        where: { id: taskId },
      });

      return res.status(200).send({
        task,
      });
    } catch (error) {
      req.log.error(error);
      const status = error.status || 500;
      const message = error.message || 'Something went wrong!';

      return res.status(status).send({ success: false, message });
    }
  },
  addTask: async (req, res) => {
    try {
      const { user_id: userId } = req.params;
      const {
        title,
        description,
        project,
        priority,
        deadline
      } = req.body;

      const task = await Tasks.create({
       user_id: userId,
       title,
       description,
       project,
       priority,
       deadline
      });

      return res.status(200).send({
        message: 'Task created successfully',
        task,
      });
    } catch (error) {
      req.log.error(error);
      const status = error.status || 500;
      const message = error.message || 'Something went wrong!';

      return res.status(status).send({ success: false, message });
    }
  },
  updateTask: async (req, res) => {
    try {
      const { task_id: taskId } = req.params;
      const {  
        title,
        description,
        project,
        priority,
        deadline
        } = req.body; 

      let task = await Tasks.findByPk(taskId);

      if (!task) {
        res.status(404).send('Task not Found.');
      }

      task = await task.update({
        title,
        description,
        project,
        priority,
        deadline
      });

      return res.status(200).send({
        message: 'Task updated successfuly',
      });
    } catch (error) {
      req.log.error(error);
      const status = error.status || 500;
      const message = error.message || 'Something went wrong!';

      return res.status(status).send({ success: false, message });
    }
  },
  archive: async (req, res) => {
    try {
      const { task_id: taskId } = req.params;

      const task = await Tasks.findByPk(taskId);

      if (!task) {
        return res.status(400).send({
          message: "Task doesn't exist",
        });
      }

      await task.update({
        archived: true,
      });

      return res.status(200).send({
        message: 'Task archived successfuly',
      });
    } catch (error) {
      req.log.error(error);
      const status = error.status || 500;
      const message = error.message || 'Something went wrong!';

      return res.status(status).send({ success: false, message });
    }
  },
  getProjects: async (req, res) => {
    try {
      const { user_id: userId } = req.params;

     // Fetch distinct project names from the tasks table
     const projects = await Tasks.findAll({
      where: {user_id: userId},
      attributes: [
          [Sequelize.fn('DISTINCT', Sequelize.col('project')), 'project']
      ],
      raw: true,
  });

  // Extract the project names into an array
  const projectNames = projects.map(project => project.project);

  // Send the project names as a JSON response
  res.status(200).json({
      success: true,
      projects: projectNames
  });
    } catch (error) {
      req.log.error(error);
      const status = error.status || 500;
      const message = error.message || 'Something went wrong!';

      return res.status(status).send({ success: false, message });
    }
  },
};
