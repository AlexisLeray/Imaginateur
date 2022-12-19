const host = "http://alexisleray.sites.3wa.io"
const port = 9300
const BASE_URL = `${host}:${port}`
import { pool } from '../config/dataBase.js'
import { inputLength } from '../components/checkLength.js'

// ===========================================
//      AFFICHAGE PROFIL CREATEUR 
// ==========================================  

const creatorProfil = (req, res) => {
    let getProfil = 'SELECT users.name, users.first_name, creators.description, images.url, images.description AS img_description FROM users JOIN creators ON creators.user_id = users.id JOIN images ON creators.image_id = images.id WHERE creators.id = ?'
    // Requête pour récupérer nom, prénom, description, et image d'un créateur en utilisant son id
    pool.query(getProfil, [req.params.id], (err, result) => {
        if (err) throw err
        if (result) {
            res.json({ response: true, result })
        }
        else {
            res.json({ response: false })
        }
    })

}
export default creatorProfil
