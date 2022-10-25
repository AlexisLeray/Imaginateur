 const host = "http://alexisleray.sites.3wa.io"
 const port = 9300
 const BASE_URL = `${host}:${port}`
 import {pool} from '../config/dataBase.js'
 import fs from 'fs'
 
 const payment = (req, res) => {
    let buyArticles = 'SELECT * FROM shop WHERE user_id=?'
    let buyProducts = 'SELECT shop.*, products.title, products.price, images.url FROM shop JOIN products ON products.id = shop.product_id JOIN images ON products.image_id = images.id WHERE user_id = ?'
        pool.query(buyProducts, [req.params.id], (err, toBuy) => {
           
            if (err) throw err
            if (toBuy){
                res.json({response:true, toBuy})
            }else{
                res.json({response:false})
            }
        })
 }
 const sold  = (req, res) => {
     console.log("PRODUCTS LENGTH", req.body.product_id.length)
    console.log("PRODUCTS", req.body.product_id)
    // let soldProducts = 'DELETE FROM products WHERE id = ?'
    // let soldProducts = 'SELECT * FROM products WHERE id =? '
    //celle d'après est la requête initiale 
    // let soldProducts = 'DELETE FROM images WHERE images.id = (SELECT products.image_id FROM products WHERE products.id = ?)'
    let soldProducts = 'UPDATE products SET products.approved= 0 WHERE products.id = ?'
    for(let i = 0; i<=req.body.product_id.length; i++){
        if(i===req.body.product_id.length){
            res.json({response: true, msg:"Vos produits ne vont certainement pas arriver, c'est une démo                       "})
        }
        pool.query(soldProducts, [req.body.product_id[i]], (err, result) => {
            if (err) throw err
        })   
    }
}
 export {payment, sold }