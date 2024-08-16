
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Users } = require('../models');

module.exports = {
  registerUser: async (req, res) => {
    try {
       const { username, email, password } = req.body;
       const hashedPassword = await bcrypt.hash(password, 10);

      let existingUser = await Users.findOne({
        where: {
          email,
        },
      });

      if (existingUser) {
        return res.status(400).send({
          success: false,
          message: 'User with same email already exist, go ahead and login!',
        });
      }

       const user = await Users.create({
        username,
        email,
        password: hashedPassword,
      });

      res.status(201).json(user);
    } catch (error) {
      const status = error.status || error.statusCode || 500;
      const message = error.message || 'Something went wrong!';

      return res.status(status).send({ success: false, message });
    }
  },
  loginUser: async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ where: { email } });
        if (user && await bcrypt.compare(password, user.password)) {
          res.status(200).json({
            user: user,
            message: "User Login Successfully!"
        });
        
        } else {
            res.status(400).json({ error: 'Invalid email or password' });
        }
      
    } catch (error) {
      const status = error.status || error.statusCode || 500;
      const message = error.message || 'Something went wrong!';
      return res.status(status).send({ success: false, message });
    }
  },
};
