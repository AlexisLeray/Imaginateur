const host = "http://alexisleray.sites.3wa.io"
const port = 9300
const BASE_URL = `${host}:${port}`
import pool from '../config/dataBase.js'
import bcrypt from 'bcrypt';
import { inputLength } from '../components/checkLength.js'

// ===========================================
//      AFFICHAGE DU PANIER 
// ==========================================


const showBasket = (req, res) => {
    let getBasket = 'SELECT shop.id AS shop_id, shop.user_id, shop.product_id, products.id, products.title, products.price, products.image_id, users.name, users.first_name, images.url FROM shop JOIN products ON products.id = shop.product_id JOIN users ON users.id = shop.user_id JOIN images ON images.id = products.image_id WHERE user_id = ?'
    // On récupère toutes tous les produits contenus dans le panier de l'user grace à son id 
    pool.query(getBasket, [req.params.id], (err, result) => {
        if (err) throw err
        if (result) {
            // S'il n'est pas vide on envoi le resultat
            res.json({ response: true, result })
        }
        else {
            res.json({ response: false })
        }
    })
}

// ===========================================
//      SUPPRESSION DU PANIER 
// ==========================================

const deleteBasket = (req, res) => {
    let deleteProduct = 'DELETE FROM shop WHERE shop.id = ? AND shop.user_id = ?'
    // Requête pour supprimer le produits de la table shop selon l'id du shop et l'id de l'user 
    pool.query(deleteProduct, [req.body.shop_id, req.params.id], (err, deleted) => {
        if (err) throw err
        if (deleted) {
            // Si la requête a bien supprimé quelque chose 
            console.log("tout s'est bien passé")
            res.json({ response: true, msg: "Produit supprimé" })
        }
        else {
            console.log("tout s'est mal passé")
            res.json({ response: false })
        }
    })

}
export { showBasket, deleteBasket }
