const express = require('express');
const cors = require('cors');
const auth = require('../helpers/auth')

const Router = express.Router();
const productController = require('../controllers/product');

Router
  .get('/dasbord', cors(), auth.verify,productController.getProduct)
  .post('/insert', productController.insertProduct)
  .delete('/delete/:id_product', productController.deleteProduct)
  .get('/login',productController.login)
  .get('/login/admin',productController.loginAdmin)
  .post('/register/admin',productController.registerAdmin)
  .get('/users',productController.getUsers)
  .post('/register',productController.register)
  .delete('/delete/users/:id_user',productController.deleteUsers)
  .get('/gettoken',productController.getToket)
  .patch('/update/users/:id_user',productController.updateUsers);

module.exports = Router;