const routerUsers = require('express').Router();

const {
  getUserInfo,
  updateUserInfo,
  createUser,
} = require('../controllers/users');

routerUsers.get('/users/me', getUserInfo);

routerUsers.patch('/users/me', updateUserInfo);

routerUsers.post('/users', createUser);

module.exports = routerUsers;
