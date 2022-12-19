const host = "http://alexisleray.sites.3wa.io"
const port = 9300
const BASE_URL = `${host}:${port}`
import { pool } from '../config/dataBase.js'
import bcrypt from 'bcrypt';
import { inputLength } from '../components/checkLength.js'

// ===========================================
//      RECUPERATION DES MESSAGES 
// ==========================================  

const getMessage = (req, res) => {
    let comment = 'SELECT contact.id, contact.title, contact.content, contact.date, users.name, users.first_name, users.mail  FROM contact JOIN users ON contact.user_id = users.id '
    let commentArray = []
    // Requête SQL qui récupère l'ensemble des messages présents en BDD
    pool.query(comment, [req.params.id], (error, comment) => {
        if (comment) {
            if (error) throw error
            // Si réponse de la BDD on affect le résultat au tableau commentArray
            commentArray = comment
            res.json({ response: true, commentArray })

        }
        else {
            res.json({ response: false })
        }
    })
}

// ===========================================
//     SUPRESSION DES MESSAGES 
// ==========================================  

const deleteMsg = (req, res) => {
    let deleteMessage = 'DELETE FROM contact WHERE contact.id= ?'
    // Requête supression du message de la table contact en utilisant l'id du message
    pool.query(deleteMessage, [req.body.id], (err, deleted) => {
        if (err) throw err
        if (deleted) {
            res.json({ response: true, msg: "mesage supprimé" })
        }
        else {
            res.json({ response: false })
        }
    })
}
export { getMessage, deleteMsg }
