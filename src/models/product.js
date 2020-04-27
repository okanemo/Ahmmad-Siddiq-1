require('dotenv').config();
const connecting = require('../config/db');
const fs = require('fs');

module.exports = {
    getProduct: ()=>{
        return new Promise((resolve, reject)=>{
            connecting.query("SELECT * FROM product", (err, result)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(err)
                }
            })
        })
    },
    getDetileProduct: (data)=>{
        return new Promise((resolve, reject)=>{
            connecting.query("SELECT * FROM product WHERE id_product = ?",data, (err, result)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(err)
                }
            })
        })
    },

    insertProduct: (data)=>{
        return new Promise((resolve, reject)=>{
            connecting.query("INSERT INTO product SET ?",data, (err, result)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(err)
                }
            })
        })
    },

    deleteProduct: (id_product,image)=>{
        return new Promise((resolve, reject)=>{
            connecting.query("DELETE FROM `product` WHERE `product`.`id_product` = ?", id_product, (err, result)=>{
                if(!err){
                    resolve(result)
                    const path = image.replace('http://localhost:4000', '.')
                    fs.unlink(path, function (err) {
                        if (err) throw err;
                        return
                      });
                }else{
                    reject(err)
                }
            })
        })
    },

    register: (data)=>{
        return new Promise((resolve, reject)=>{
            connecting.query(`INSERT users SET ?`,data, (err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(err);
                }
            })
        })
    },
    registerAdmin: (data)=>{
        return new Promise((resolve, reject)=>{
            connecting.query(`INSERT admin SET ?`,data, (err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(err);
                }
            })
        })
    },
    login: (email)=>{
        return new Promise((resolve, reject)=>{
            connecting.query(`SELECT * FROM users WHERE email = ?`,email, (err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(err);
                }
            })
        })
    },
    loginAdmin: (email)=>{
        return new Promise((resolve, reject)=>{
            connecting.query(`SELECT * FROM admin WHERE email = ?`,email, (err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(err);
                }
            })
        })
    },
    logOut: (email)=>{
        return new Promise((resolve, reject)=>{
            connecting.query(`DELETE FROM authorization WHERE email = ?`,email, (err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(err);
                }
            })
        })
    },

    getUser: ()=>{
        return new Promise((resolve, reject)=>{
            connecting.query("SELECT * FROM users", (err, result)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(err)
                }
            })
        })
    },
    getUserDetile: (email)=>{
        return new Promise((resolve, reject)=>{
            connecting.query("SELECT * FROM users WHERE email =?",email, (err, result)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(err)
                }
            })
        })
    },

    deleteUser: (id_user)=>{
        return new Promise((resolve, reject)=>{
            connecting.query("DELETE FROM users WHERE id_user = ?",id_user, (err, result)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(err)
                }
            })
        })
    },
    updateUser: (data,email)=>{
        return new Promise((resolve, reject)=>{
            connecting.query("UPDATE users SET ? WHERE email = ?",[data,email], (err, result)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(err)
                }
            })
        })
    },
    getToken: (email)=>{
        return new Promise((resolve, reject)=>{
            connecting.query("SELECT * FROM `authorization` WHERE email = ?",email, (err, result)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(err)
                }
            })
        })
    },
    insertToken: (data)=>{
        return new Promise((resolve, reject)=>{
            connecting.query("INSERT INTO authorization SET ?",data, (err, result)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(err)
                }
            })
        })
    },
    updateToken: (data,email)=>{
        return new Promise((resolve, reject)=>{
            connecting.query("UPDATE authorization SET ? WHERE email = ?",[data,email], (err, result)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(err)
                }
            })
        })
    },

    insertFavorite: (data)=>{
        return new Promise((resolve, reject)=>{
            connecting.query("INSERT INTO favorite SET ?",data, (err, result)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(err)
                }
            })
        })
    },

    getFavorite: (data)=>{
        return new Promise((resolve, reject)=>{
            connecting.query("SELECT * FROM favorite WHERE email = ?",data, (err, result)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(err)
                }
            })
        })
    },

    deleteFavorite: (id_favorite)=>{
        return new Promise((resolve, reject)=>{
            connecting.query("DELETE FROM favorite  WHERE id_favorite = ?",id_favorite, (err, result)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(err)
                }
            })
        })
    },

    verifyEmail: (verify,email)=>{
        return new Promise((resolve, reject)=>{
            connecting.query("UPDATE users SET ? WHERE ?",[verify,email], (err, result)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(err)
                }
            })
        })
    },

    insertCode: (data)=>{
        return new Promise((resolve, reject)=>{
            connecting.query("INSERT INTO authorization SET ?",data, (err, result)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(err)
                }
            })
        })
    },

    getCode: (data)=>{
        return new Promise((resolve, reject)=>{
            connecting.query("SELECT * FROM authorization WHERE code = ?",data, (err, result)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(err)
                }
            })
        })
    },

    deletCode: (data)=>{
        return new Promise((resolve, reject)=>{
            connecting.query("DELETE FROM authorization WHERE email = ?",data, (err, result)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(err)
                }
            })
        })
    },
}