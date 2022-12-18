const host = "http://alexisleray.sites.3wa.io"
const port = 9300
const BASE_URL = `${host}:${port}`
import { pool } from '../config/dataBase.js'
import bcrypt from 'bcrypt';
import { inputLength } from '../components/checkLength.js'

// ===========================================
//      AJOUT DE MESSAGE 
// ==========================================  

const sendMessage = (req, res) => {

    let newMessage = 'INSERT INTO contact (contact.user_id, contact.title, contact.content, contact.date) VALUES (?,?,?,?)'
    if (inputLength(req.body.content) && inputLength(req.body.title, 63)) {
        // On insert dans la table contact les informations envoyées par le formulaire ainsi que la date  
        pool.query(newMessage, [req.body.id, req.body.title, req.body.content, new Date()], (err, newMsg) => {
            if (err) throw err
            res.json({ response: true, msg: 'Votre message a bien été pris en compte' })
        })
    }
    else {
        res.json({ response: false, msg: "Maximum 63 caractères pour le titre, 255 pour le contenu" })
    }
}

export default sendMessage
