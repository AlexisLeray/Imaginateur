 const host = "http://alexisleray.sites.3wa.io"
 const port = 9300
 const BASE_URL = `${host}:${port}`
 import pool from '../config/dataBase.js'
 import fs from 'fs'
 
 const payment = (req, res) => {
    let buyArticles = 'SELECT * FROM shop WHERE user_id=?'
    let buyProducts = 'SELECT shop.*, products.title, products.price, images.url FROM shop JOIN products ON products.id = shop.product_id JOIN images ON products.image_id = images.id WHERE user_id = ?'
        pool.query(buyProducts, [req.params.id], (err, toBuy) => {
           console.log(1)
            console.log("ACHAT", toBuy)
            if (err) throw err
            if (toBuy){
                console.log(2)
                console.log("TOBUY", toBuy)
                res.json({response:true, toBuy})
            }else{
                console.log(3)
                res.json({response:false})
            }
        })
const validate = (req, res) => {
    // let soldProducts = 'DELETE FROM products WHERE id = ?'
     let soldProducts = 'SELECT * FROM products WHERE id = ?'
     pool.query(soldProducts, [req.body.product_id], (err, result) => {
         if (err) throw err
         console.log(result)
         
     })
}
    
 }
 export default payment