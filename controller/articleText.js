const host = "http://alexisleray.sites.3wa.io"
const port = 9300
const BASE_URL = `${host}:${port}`
import { pool } from '../config/dataBase.js'
import bcrypt from 'bcrypt';
import { inputLength } from '../components/checkLength.js'

// ===========================================
//      AJOUT DES ARTICLES SANS IMAGES 
// ========================================== 

const withoutPictures = (req, res) => {
    let newTxt = 'INSERT INTO  articles (title, content, image_id) VALUES (?,?,?)'
    if (inputLength(req.body.title, 63) && inputLength(req.body.content, 1500)) {
        // Requête pour insérer le titre contenu et un image_id null dans la table articles 
        pool.query(newTxt, [req.body.title, req.body.content, null], (err, txtAdded) => {
            if (err) throw err
            if (txtAdded) {
                res.json({ response: true })
            }
            else {
                res.json({ response: false })
            }
        })
    }
    else {
        res.json({ response: false, msg: "Champs trop longs" })
    }
}
export default withoutPictures
