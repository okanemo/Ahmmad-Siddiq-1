const express = require('express');
const cors = require('cors');
const auth = require('../helpers/auth')

const Router = express.Router();
const productController = require('../controllers/product');

Router
  .get('/dasbord', cors(), auth.verify,productController.getProduct)
  .post('/insert', productController.insertProduct)
  .delete('/delete/:id_product', productController.deleteProduct)
  .post('/login',productController.login)
  // .post('/login/admin',productController.loginAdmin)
  // .post('/register/admin',productController.registerAdmin)
  .get('/users',productController.getUsers)
  .post('/users/detile',productController.getUsersDetile)
  .post('/register',productController.register)
  .delete('/delete/users/:id_user',productController.deleteUsers)
  .get('/gettoken',productController.getToket)
  .delete('/logout',productController.logOut)
  .post('/insert/favorite',productController.insertFavorite)
  .post('/favorite',productController.getFavorite)
  .patch('/update/users',productController.updateUsers);

module.exports = Router;