 const host = "http://alexisleray.sites.3wa.io"
 const port = 9300
 const BASE_URL = `${host}:${port}`
 import { pool } from '../config/dataBase.js'
 import fs from 'fs'

 // ===========================================
 //       SUPRESSION DE PRODUITS 
 // ==========================================

 const deleteProduct = (req, res) => {
     let deleteSQL = 'DELETE FROM products WHERE id=?'
     let deleteImg = 'DELETE FROM images WHERE images.id=?'
     // Requête qui supprime le produit de la table products selon son id 
     pool.query(deleteSQL, [req.body.id], (err, result) => {
         if (err) throw err
         if (result) {
             // S'il est supprimé on supprime l'imge selon son id
             pool.query(deleteImg, [req.body.imageId], (err, imgDeleted) => {
                 if (err) throw err
                 // On supprime le fichier du dossier public 
                 fs.unlink('public/img/' + req.body.image, (err) => {
                     if (err) throw err
                     res.json({ response: true, msg: "image supprimée" })
                 })
             })
         }
         else {
             console.log("IMAGE PAS SUPPRIMEE")
         }
     })
 }
 export default deleteProduct
 