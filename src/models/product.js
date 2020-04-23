require('dotenv').config();
const connecting = require('../config/db');

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

    deleteProduct: (id_product)=>{
        return new Promise((resolve, reject)=>{
            connecting.query("DELETE FROM `product` WHERE `product`.`id_product` = ?", id_product, (err, result)=>{
                if(!err){
                    resolve(result)
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
    updateUser: (data,id_user)=>{
        return new Promise((resolve, reject)=>{
            connecting.query("UPDATE users SET ? WHERE id_user = ?",[data,id_user], (err, result)=>{
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
}