const productModel = require('../models/product');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const nodemailer = require('nodemailer');

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
            const email = req.body.email
            const token = jwt.sign({email}, process.env.PRIVATE_KEY, {expiresIn: '2h'})
            const data = {email, token}
            res.json(data)
            // OTP
            var smtpConfig = {
                host: 'smtp.gmail.com',
                port: 465,
                secure: true, // use SSL
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
                }
            };
            // step 1
            let transporter = nodemailer.createTransport(smtpConfig);
            
            let mailOptions = {
                from: process.env.EMAIL,
                to: req.body.email,
                subject: 'Verify email address',
                text: `Please click this link to  http://192.168.1.12:4000/verify/${token}`
            };
            
            // step 3
            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                  console.log(error);
                } else {
                  console.log("Email sent: " + info.response);
                }
              });
        }).catch(err => console.log(err))
    },


    // registerAdmin: (req,res)=>{
    //     let salt = bcrypt.genSaltSync(10);
    //     const password = bcrypt.hashSync(req.body.password, salt)
    //     req.body['password'] = password
    //     // console.log(req.body);
    //     productModel.registerAdmin(req.body)
    //     .then(result => {
    //         res.json(req.body.email)
            
    //     }).catch(err => console.log(err))
    // },
    
    login: (req,res)=>{
        // email only
        productModel.login(req.body.email)
        .then(results => {
            // console.log(results)
            if(results != 0){
                // console.log('ada')
                const password = bcrypt.compareSync(req.body.password,results[0].password)
                if(password === true){
                    // res.json('Login Success')
                    const email = req.body.email
                    const level = results[0].level
                    const token = jwt.sign({email,level}, process.env.PRIVATE_KEY, {expiresIn: '2h'})
                    const data = {email,level,token}
                    res.json(data)
                }else{
                    res.json(1)
                }
            }else{
                // console.log('kosong')
                res.json(0)
            }
            
        }).catch(err => console.log(err))
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

    logOut:(req,res)=>{
        productModel.logOut(req.body.email)
        .then(result=>{
            res.json(result)
        }).catch(err=> console.log(err))
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
    getUsersDetile: (req,res)=>{
        // console.log(req.body)
        productModel.getUserDetile(req.body.email)
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
        // let salt = bcrypt.genSaltSync(10);
        // const password = bcrypt.hashSync(req.body.password, salt)
        // const {username, email, level} = req.body
        // const data = {username, email, password, level}
        // console.log(req.body)
        productModel.updateUser(req.body, req.body.email)
        .then(result=>{
        //     // req.body['id_user'] = req.params.id_user
            res.json(result)
        }).catch(err=>console.log(err))
    },
    // updateUsers: (req,res)=>{
    //     let salt = bcrypt.genSaltSync(10);
    //     const newpassword = bcrypt.hashSync(req.body.newpassword, salt)
    //     const password = newpassword
    //     const {username, email, level} = req.body
    //     const data = {username, email, password, level}
    //     // console.log(data)
    //     productModel.updateUser(data, req.body.email)
    //     .then(result=>{
    //         // req.body['id_user'] = req.params.id_user
    //         res.json(data)
    //     }).catch(err=>console.log(err))
    // },

    insertFavorite: (req,res)=>{
        productModel.insertFavorite(req.body)
        .then((result)=>{
            res.json(req.body)
        })
        .catch(err=>console.log(err))
    },

    getFavorite: (req,res)=>{
        console.log(req.body)
        // const {email} = req.body
        productModel.getFavorite(req.body.email)
        .then((result)=>{
            res.json(result)
        })
        .catch(err=>console.log(err))
    },
}
