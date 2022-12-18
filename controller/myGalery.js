 const host = "http://alexisleray.sites.3wa.io"
 const port = 9300
 const BASE_URL = `${host}:${port}`
 import { pool } from '../config/dataBase.js'
 import { inputLength } from '../components/checkLength.js'


 // ===========================================
 //      AFFICHAGE DES ARTICLES DU CREATEUR 
 // ==========================================


 const myGalery = (req, res) => {

     let myProducts = 'SELECT products.id, products.title, products.price, products.content, image_id, images.url, images.description, categories.category FROM products JOIN images ON images.id = products.image_id JOIN categories ON categories.id = products.categorie_id WHERE creator_id =?'
     let productArray = []

     // Récupération de tous les articles selon l'id du créateur 
     pool.query(myProducts, [req.params.id], (error, products) => {
         if (error) throw error
         if (products) {
             if (error) throw error
             // On assigne le résultat à productArray
             productArray = products
             res.json({ response: true, productArray })

         }
         else {
             res.json({ response: false })
         }
     })

 }
 export default myGalery
 