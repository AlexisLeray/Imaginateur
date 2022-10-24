 const host = "http://alexisleray.sites.3wa.io"
 const port = 9300
 const BASE_URL = `${host}:${port}`
 import {pool} from '../config/dataBase.js'
 
 
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
 const updateProfil = (req, res) => {
     
 }
 
 export {getProfil, updateProfil}