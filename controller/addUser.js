const host = "http://alexisleray.sites.3wa.io"
const port = 9300
const BASE_URL = `${host}:${port}`
import { pool } from '../config/dataBase.js'
import bcrypt from 'bcrypt';
import { inputLength } from '../components/checkLength.js'
const saltRounds = 10

// ===========================================
//    AJOUT D'UTILISATEUR
// ==========================================  

const addUserSubmit = (req, res) => {
 // On compte le nombre de fois où l'adresse mail apparait dans la BDD 
 let checkMail = 'SELECT COUNT(*) AS cnt FROM users WHERE mail=?'
 // Ajout des info de l'utilisateur dans la BDD
 let addUser = 'INSERT INTO users (first_name, hash, mail, name, role_id) VALUES (?,?,?,?,?)'
 // Vérification longueur caractères de inputs
 if (inputLength(req.body.mail) && inputLength(req.body.first_name, 63) && inputLength(req.body.name, 63) && inputLength(req.body.password)) {
  // Requête SQL de vérification du mail
  pool.query(checkMail, [req.body.mail], (err, newMail) => {
   if (err) throw err
   // Si le mail apparait plus de 0 fois dans la BDD
   if (newMail[0].cnt > 0) {
    res.json({ response: false, msg: "Email déjà prit" })
   }
   else {
    // Sinon cryptage du mot de passe
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
     if (err) throw err
     // Ajout du nouvel utilisateur dans la BDD avec le rôle user
     pool.query(addUser, [req.body.first_name, hash, req.body.mail, req.body.name, 3], (error, result) => {
      if (error) throw error
      res.json({ response: true })
     })
    })
   }

  })
 }
 else {
  res.json({ response: false, msg: 'champs trop long' })
 }
}
export default addUserSubmit
