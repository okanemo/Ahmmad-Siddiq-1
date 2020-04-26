const express = require('express');
const cors = require('cors');
const auth = require('../helpers/auth')

const Router = express.Router();
const productController = require('../controllers/product');

Router
  .get('/dasbord', cors(), auth.verify,productController.getProduct)
  .post('/insert',auth.verify, productController.insertProduct)
  .delete('/delete/:id_product',auth.verify, productController.deleteProduct)
  .post('/login',productController.login)
  .get('/verify/:token',productController.verifyEmail)
  .post('/forgote',productController.forgetPassword)
  .post('/getcode',productController.cekCode)
  .get('/users',productController.getUsers)
  .post('/users/detile',auth.verify,productController.getUsersDetile)
  .post('/register',productController.register)
  .delete('/delete/users/:id_user',auth.verify,productController.deleteUsers)
  .get('/gettoken',auth.verify,productController.getToket)
  .delete('/logout',auth.verify,productController.logOut)
  .post('/insert/favorite',auth.verify,productController.insertFavorite)
  .post('/favorite',auth.verify,productController.getFavorite)
  .delete('/delete/favorite/:id',auth.verify,productController.deleteFavorite)
  .patch('/update/users',auth.verify,productController.updateUsers)
  .delete('/delete/code/:email',productController.deleteCode)
  .patch('/update/password',productController.updatePassword);

module.exports = Router;