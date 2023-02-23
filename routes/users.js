const routerUsers = require('express').Router();

const { validateUpdateUserInfo } = require('../middlewares/validators');

const {
  getUserInfo,
  updateUserInfo,
} = require('../controllers/users');

routerUsers.get('/users/me', getUserInfo);

routerUsers.patch('/users/me', validateUpdateUserInfo, updateUserInfo);

module.exports = routerUsers;
