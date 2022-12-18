const host = "http://alexisleray.sites.3wa.io"
const port = 9300
const BASE_URL = `${host}:${port}`
import { pool } from '../config/dataBase.js'
import bcrypt from 'bcrypt';
import { inputLength } from '../components/checkLength.js'

// ===========================================
//          NOUVEAU CREATEUR 
// ==========================================

const newCreator = (req, res) => {
    let allUsers = 'SELECT users.name, users.first_name, users.mail, users.id FROM users WHERE role_id= 3'
    let usersTable = []
    // On selectionne tous les users qui n'ont pas le rôle de créateur 
    pool.query(allUsers, [], (err, users) => {
        if (err) throw err
        if (users) {
            // Le résultat de la requête est stoqué dans un tableau et renvoyé au front
            usersTable = users
            res.json({ response: true, usersTable })
        }
        else {
            res.json({ response: false })
        }
    })

}


export default newCreator
