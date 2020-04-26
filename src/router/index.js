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
  .get('/verify/:token',productController.verifyEmail)
  .post('/forgote',productController.forgetPassword)
  .post('/getcode',productController.cekCode)
  .get('/users',productController.getUsers)
  .post('/users/detile',productController.getUsersDetile)
  .post('/register',productController.register)
  .delete('/delete/users/:id_user',productController.deleteUsers)
  .get('/gettoken',productController.getToket)
  .delete('/logout',productController.logOut)
  .post('/insert/favorite',productController.insertFavorite)
  .post('/favorite',productController.getFavorite)
  .delete('/delete/favorite/:id',productController.deleteFavorite)
  .patch('/update/users',productController.updateUsers)
  .delete('/delete/code/:email',productController.deleteCode)
  .patch('/update/password',productController.updatePassword);

module.exports = Router;