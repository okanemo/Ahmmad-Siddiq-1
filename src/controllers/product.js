const productModel = require('../models/product');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');

module.exports = {
    getProduct: (req,res)=>{
        productModel.getProduct()
        .then((result)=>{
            res.json(result)
          })
          .catch(err=>console.log(err));
    },

    insertProduct: (req,res)=>{
        productModel.insertProduct(req.body)
        .then(result=>{
            req.body['id_product'] = result.insertId
            res.json(req.body)
        }).catch(err=>console.log(err))
    },

    deleteProduct: (req,res)=>{
        const id_product = req.params.id_product;
        productModel.deleteProduct(id_product)
        .then((result)=>{
            res.json(result)
        })
        .catch(err=>console.log(err))
    },

    register: (req,res)=>{
        let salt = bcrypt.genSaltSync(10);
        const password = bcrypt.hashSync(req.body.password, salt)
        req.body['password'] = password
        productModel.register(req.body)
        .then(result => {
            res.json(result)
        }).catch(err => console.log(err))
    },
    registerAdmin: (req,res)=>{
        let salt = bcrypt.genSaltSync(10);
        const password = bcrypt.hashSync(req.body.password, salt)
        req.body['password'] = password
        productModel.registerAdmin(req.body)
        .then(result => {
            res.json(result)
        }).catch(err => console.log(err))
    },
    login: (req,res)=>{
        // email only
        productModel.login(req.body.email)
        .then(result => {
            const password = bcrypt.compareSync(req.body.password,result[0].password)
            if(password === true){
                // res.json('Login Success')
                const email = req.body.email
                const token = jwt.sign({email}, process.env.PRIVATE_KEY, {expiresIn: '2h'})
                productModel.getToken(email)
                .then(result=>{
                    if(result[0] !== undefined){
                        if(result[0].email === email){
                            const authorization = token
                            const data = {email,authorization}
                            productModel.updateToken(data, email)
                            .then(result=>{
                                res.json({Authorization : token})
                            })
                            // res.json('ada')
                        }else{
                            const authorization = token
                            const data = {email,authorization}
                            // console.log(data)
                            productModel.insertToken(data)
                            .then(result=>{
                                res.json({Authorization : token})         
                            }).catch(err=> console.log(err))
                            // res.json('kosong')
                        }
                    }else{
                        const authorization = token
                        const data = {email,authorization}
                        // console.log(data)
                        productModel.insertToken(data)
                        .then(result=>{
                            res.json({Authorization : token})         
                        }).catch(err=> console.log(err))
                        // res.json('kosong')
                    }
                    // res.json(result)
                }).catch(err=> console.log(err))
            }else{
                res.json('Password Wrong')
            }
        }).catch(err => res.json('email wrong'))
    },

    loginAdmin: (req,res)=>{
        // email only
        productModel.loginAdmin(req.body.email)
        .then(result => {
            const password = bcrypt.compareSync(req.body.password,result[0].password)
            if(password === true){
                const email = req.body.email
                const token = jwt.sign({email}, process.env.PRIVATE_KEY, {expiresIn: '2h'})
                productModel.getToken(email)
                .then(result=>{
                    if(result[0] !== undefined){
                        if(result[0].email === email){
                            const authorization = token
                            const data = {email,authorization}
                            productModel.updateToken(data, email)
                            .then(result=>{
                                res.json({Authorization : token})
                            })
                            // res.json('ada')
                        }else{
                            const authorization = token
                            const data = {email,authorization}
                            // console.log(data)
                            productModel.insertToken(data)
                            .then(result=>{
                                res.json({Authorization : token})         
                            }).catch(err=> console.log(err))
                            // res.json('kosong')
                        }
                    }else{
                        const authorization = token
                        const data = {email,authorization}
                        // console.log(data)
                        productModel.insertToken(data)
                        .then(result=>{
                            res.json({Authorization : token})         
                        }).catch(err=> console.log(err))
                        // res.json('kosong')
                    }
                    // res.json(result)
                }).catch(err=> console.log(err))
                // res.json({Authorization : token})
            }else{
                res.json('Password Wrong')
            }
        }).catch(err => console.log(err))
    },

    getToket: (req,res)=>{
        productModel.getToken(req.body.email)
        .then(result=>{
            // console.log(result[0] !== undefined)
            res.json(result)
        }).catch(err=> console.log(err))
    },

    getUsers: (req,res)=>{
        productModel.getUser()
        .then((result)=>{
            res.json(result)
          })
          .catch(err=>console.log(err));
    },

    deleteUsers: (req,res)=>{
        const id_user = req.params.id_user;
        productModel.deleteUser(id_user)
        .then((result)=>{
            res.json(result)
        })
        .catch(err=>console.log(err))
    },

    updateUsers: (req,res)=>{
        let salt = bcrypt.genSaltSync(10);
        const password = bcrypt.hashSync(req.body.password, salt)
        req.body['password'] = password
        productModel.updateUser(req.body, req.params.id_user)
        .then(result=>{
            req.body['id_user'] = req.params.id_user
            res.json(req.body)
        }).catch(err=>console.log(err))
    },
}
