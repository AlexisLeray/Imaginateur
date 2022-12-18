 const host = "http://alexisleray.sites.3wa.io"
 const port = 9300
 const BASE_URL = `${host}:${port}`
 import { pool } from '../config/dataBase.js'
 import fs from 'fs'

 // ===========================================
 //      AFFICHAGE ARTICLES DANS LE PANIER  
 // ==========================================

 const payment = (req, res) => {

     let buyArticles = 'SELECT * FROM shop WHERE user_id=?'
     let buyProducts = 'SELECT shop.*, products.title, products.price, images.url FROM shop JOIN products ON products.id = shop.product_id JOIN images ON products.image_id = images.id WHERE user_id = ? AND products.approved = 1'
     // On sélectionne tous les produits de la table shop qui ont l'id de l'utilisateur 
     pool.query(buyProducts, [req.params.id], (err, toBuy) => {
         if (err) throw err
         if (toBuy) {
             // Si le résultat contient quelque chose 
             res.json({ response: true, toBuy })
         }
         else {
             res.json({ response: false, msg: "Votre panier est vide" })
         }
     })
 }

 // ===========================================
 //      VALIDATION DU PANIER  
 // ==========================================

 const sold = (req, res) => {

     let deleteShop = 'DELETE FROM shop WHERE shop.product_id = ?'
     let soldProducts = 'UPDATE products SET products.approved= 0 WHERE products.id = ?'

     // Pour chaque produits contenus dans le panier 
     for (let i = 0; i <= req.body.product_id.length; i++) {
         // S'il n'y a plus de produits dans le panier 
         if (i === req.body.product_id.length) {
             res.json({ response: true, msg: "Vos produits ne vont certainement pas arriver, c'est une démo" })
         }
         // Les produits retourne à l'état de produits à valider
         pool.query(soldProducts, [req.body.product_id[i]], (err, result) => {
             if (err) throw err
             // On supprime les produits qui ont l'id de l'utilisateur du shop
             pool.query(deleteShop, [req.body.product_id[i]], (err, deleted) => {
                 if (err) throw err

             })
         })
     }
 }
 export { payment, sold }
 