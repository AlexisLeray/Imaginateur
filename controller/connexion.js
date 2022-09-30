const host = "http://alexisleray.sites.3wa.io"
const port = 9300
const BASE_URL = `${host}:${port}`
import pool from '../config/dataBase.js'
import bcrypt from 'bcrypt';
const saltRounds = 10


const connexion = (req, res) => {
    // console.log(req.body)  
    //REQUETE SQL
    let connexionSQL = 'SELECT  users.hash, users.id, role_id FROM users WHERE mail=?'
        
        pool.query(connexionSQL, [req.body.mail], function(err, check ) {
            if (err) throw err; 
            if (check[0]) {
                bcrypt.compare(req.body.password, check[0].hash, function(err, result) {
                    if (err) throw err;
                    if (result) {
                        // si il a le role admin true
                        const admin = check[0].role_id === 1
                        const creator = check[0].role_id === 2
                        
                        res.json({response: true, admin, creator})
                    }else{
                        console.log("pas connecté ")
                        res.json({response:false})
                    }
                })
            }else {
                console.log("autre erreur")
                res.json({response : false})
            }
        })
    }

export default connexion