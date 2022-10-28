const host = "http://alexisleray.sites.3wa.io"
const port = 9300
const BASE_URL = `${host}:${port}`
import {pool} from '../config/dataBase.js'
import bcrypt from 'bcrypt';
import {inputLength} from '../components/checkLength.js'
const saltRounds = 10
 
// ===============================RECUPERATION DES INFOS UTILISATEUR=============================================
 const getProfil = (req, res) => {
     let getProfil = 'SELECT users.* FROM users WHERE users.id= ?'
     pool.query(getProfil, [req.params.id], (err, profil) => {
        if (err) throw err
         if(profil) {
             res.json({response: true, profil})
         }else{
             res.json({response: false})
         }
     })
 }
 // ===================================MISE A JOUR DU PROFIL======================================================
    const updateProfil = (req, res) => {
        let updatePass = 'UPDATE users SET first_name=?, hash=?, name=? WHERE users.id =? '
        let updateDetail = 'UPDATE users SET first_name=?, name=? WHERE users.id =? '
        if(req.body.password){
            bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
                if (err) throw err
                pool.query(updatePass, [req.body.first_name, hash, req.body.name, req.params.id], (error, result) => {
                    if (error) throw error
                    res.json({response:true})
                })
            })
        } else {
            pool.query(updateDetail, [req.body.first_name, req.body.name, req.params.id], (error, result) => {
                if (error) throw error
                res.json({response:true})
            })
        }
}
 
 
 export {getProfil, updateProfil}