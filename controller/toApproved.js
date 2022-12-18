 const host = "http://alexisleray.sites.3wa.io"
 const port = 9300
 const BASE_URL = `${host}:${port}`
 import { pool } from '../config/dataBase.js'
 import { inputLength } from '../components/checkLength.js'


 // ===========================================
 //     RECUPERATION DES PRODUITS 
 // ==========================================  

 const toApproved = (req, res) => {
     let products = 'SELECT products.id, products.title, products.price, products.content,  products.categorie_id, products.creator_id, users.name, users.first_name, users.mail, images.url, images.description FROM products JOIN creators ON creators.id = products.creator_id JOIN users ON creators.user_id = users.id JOIN images ON images.id = products.image_id WHERE approved = 0 '
     let newProducts = []
     // Récupération des détails des produit qui on le approved = 0 donc non validé par l'administrateur
     pool.query(products, [], (err, all) => {
         if (err) throw err
         if (all) {
             newProducts = all
             res.json({ response: true, newProducts })
         }
         else {
             res.json({ response: false })
         }
     })
 }

 // ===========================================
 //      VALIDATION DE L'OEUVRE 
 // ==========================================
 const validate = (req, res) => {
     let toValidate = 'UPDATE products SET approved = 1 WHERE id=?'
     // Requête qui met à jour la valeur de approved dans la BDD selon l'id de l'oeuvre
     pool.query(toValidate, [req.body.id], (err, validated) => {
         if (err) throw err
         if (validated) {
             res.json({ response: true })
         }
         else {
             res.json({ response: false })
         }
     })
 }
 export { toApproved, validate }
 