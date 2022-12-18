const host = "http://alexisleray.sites.3wa.io"
const port = 9300
const BASE_URL = `${host}:${port}`
import {pool} from '../config/dataBase.js'
import bcrypt from 'bcrypt';
import {inputLength} from '../components/checkLength.js'

// ===========================================
//          AJOUT DE CATEGORIE 
// ==========================================

const newCategory = (req, res) => {
    const newCategory = 'INSERT INTO categories (category) VALUES (?)'
    // On insert dans la table categories ce qui a été entré dans l'input
    pool.query(newCategory, [req.body.category], (err, added) => {
        if (err) throw err
        if (added) {
            res.json({response: true, msg:"Catégorie ajoutée"} )
        }else {
            res.json({response:false})
        }
    })
    
}
export default newCategory