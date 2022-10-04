const host = "http://alexisleray.sites.3wa.io"
const port = 9300
const BASE_URL = `${host}:${port}`
import pool from '../config/dataBase.js'
import bcrypt from 'bcrypt';
import {inputLength} from '../components/checkLength.js'
const saltRounds = 10


const addUserSubmit = (req, res) => {
       let checkMail = 'SELECT COUNT(*) AS cnt FROM users WHERE mail=?'
       let addUser = 'INSERT INTO users (first_name, hash, mail, name, role_id) VALUES (?,?,?,?,?)'
    if(inputLength(req.body.mail) && inputLength(req.body.first_name,63) && inputLength(req.body.name,63) && inputLength(req.body.password)  ) {
    pool.query(checkMail, [req.body.mail], (err, newMail) => {
     if (err) throw err
     if(newMail[0].cnt > 0){
      console.log("mail déjà pris")
      res.json({response:false})
     }
     else {
      bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
       if (err) throw err
       pool.query(addUser, [req.body.first_name, hash, req.body.mail, req.body.name, 3], (error, result) => {
        if (error) throw error
        res.json({response:true})
       })
      })
     }
    
    })
  } else {
   console.log("c'est trop long")
   res.json({response: false, msg: 'champs trop long'})
  }
}
export  default addUserSubmit 