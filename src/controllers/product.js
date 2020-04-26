const productModel = require('../models/product');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const nodemailer = require('nodemailer');
const jwtDecode = require('jwt-decode');

module.exports = {
    getProduct: (req,res)=>{
        productModel.getProduct()
        .then((result)=>{
            res.json(result)
          })
          .catch(err=>console.log(err));
    },

    insertProduct: (req,res)=>{
        req.body['image'] = `http://localhost:4000/upload/${req.file.filename}`;
        // console.log(req.body)
        productModel.insertProduct(req.body)
        .then(result=>{
            req.body['id_product'] = result.insertId
            res.json(req.body)
        }).catch(err=>console.log(err))
    },

    deleteProduct: (req,res)=>{
        const id_product = req.params.id_product;
        productModel.getDetileProduct(id_product)
        .then((result)=>{
            // res.json(result)
            productModel.deleteProduct(id_product, result[0].image)
            .then((result)=>{
                res.json(result)
            })
            .catch(err=>console.log(err))
          })
          .catch(err=>console.log(err));
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
            // step 2
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

    verifyEmail:(req,res)=>{
        const token = req.params.token

        var decoded = jwtDecode(token);
        const email = {email:decoded.email}
        // console.log(email)
        const verify = {verify:1}
        productModel.verifyEmail(verify,email)
        .then(result=>{
            res.redirect('http://192.168.1.12:8000/verify')
        }).catch(err=> console.log(err))
    },

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
                    const verify = results[0].verify
                    const token = jwt.sign({email}, process.env.PRIVATE_KEY, {expiresIn: '2h'})
                    const data = {email,level,verify,token}
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
        productModel.updateUser(req.body, req.body.email)
        .then(result=>{
        //     // req.body['id_user'] = req.params.id_user
            res.json(result)
        }).catch(err=>console.log(err))
    },

    insertFavorite: (req,res)=>{
        productModel.insertFavorite(req.body)
        .then((result)=>{
            res.json(req.body)
        })
        .catch(err=>console.log(err))
    },

    getFavorite: (req,res)=>{
        productModel.getFavorite(req.body.email)
        .then((result)=>{
            res.json(result)
        })
        .catch(err=>console.log(err))
    },
    
    deleteFavorite: (req,res)=>{
        productModel.deleteFavorite(req.params.id)
        .then((result)=>{
            res.json(result)
        })
        .catch(err=>console.log(err))
    },

    forgetPassword: (req,res)=>{
        const email = req.body.email
        const token = jwt.sign({email}, process.env.PRIVATE_KEY, {expiresIn: '2h'});
        let code = Math.floor(Math.random() * 9999 * 2);

        const data = {email,code,token}
        // console.log(data)
        productModel.insertCode(data)
        .then((result)=>{
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
            // step 2
            let transporter = nodemailer.createTransport(smtpConfig);
            
            let mailOptions = {
                from: process.env.EMAIL,
                to: req.body.email,
                subject: 'Verify email address',
                text: `Please click this link to  http://192.168.1.12:8000/Forgote 
                Enter youre code : ${code}`
            };
            
            // step 3
            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                  console.log(error);
                } else {
                  console.log("Email sent: " + info.response);
                }
              });
        })
        .catch(err=>console.log(err))
    },

    cekCode: (req,res)=>{
        const data = req.body.code
        productModel.getCode(data)
        .then((result)=>{
            res.json(result)
        })
        .catch(err=>console.log(err))
    },

    updatePassword:(req,res)=>{
        const pass = req.body.password
        const email = req.body.email
        let salt = bcrypt.genSaltSync(10);
        const passwordhash = bcrypt.hashSync(pass, salt)
        const password = {password:passwordhash}
        productModel.updateUser(password,email)
        .then((result)=>{
            res.json(result)
        })
        .catch(err=>console.log(err))
    },

    deleteCode:(req,res)=>{
        const email = req.params.email
        productModel.deletCode(email)
        .then((result)=>{
            res.json(result)
        })
        .catch(err=>console.log(err))
    },
}
