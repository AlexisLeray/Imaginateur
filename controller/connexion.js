const host = "http://alexisleray.sites.3wa.io"
const port = 9300
const BASE_URL = `${host}:${port}`
import pool from '../config/dataBase.js'
import bcrypt from 'bcrypt';
import {inputLength} from '../components/checkLength.js'
const saltRounds = 10


const connexion = (req, res) => {
    // console.log(req.body)  
    //REQUETE SQL
    let connexionSQL = 'SELECT  users.hash, users.id, role_id, name, first_name FROM users WHERE mail=?'
    let creatorConnexion = 'SELECT creators.id FROM creators WHERE `user_id` = ?'
    if (inputLength(req.body.mail,63) && inputLength(req.body.password,63)){
        pool.query(connexionSQL, [req.body.mail, req.body.name, req.body.first_name], function(err, check ) {
            if (err) throw err; 
            if (check[0]) {
                bcrypt.compare(req.body.password, check[0].hash, function(err, result) {
                    if (err) throw err;
                    if (result) {
                        // si il a le role admin true
                        const admin = check[0].role_id === 1
                        const creator = check[0].role_id === 2
                        const name = check[0].name
                        const first_name = check[0].first_name
                        const id = check[0].id
                            
                        if(creator || admin){   
                                console.log(check) 
                            pool.query(creatorConnexion, [check[0].id] ,(err, test) => {
                                if (err) throw err
                                console.log(test)
                                const id_creator = test[0].id
                                res.json({response: true, admin, creator, name, first_name, id, id_creator})
                            })
                        } else {
                            res.json({response: true, admin, creator, name, first_name, id})
                        }
                    }else{
                        console.log("pas connecté ")
                        res.json({response:false})
                    }
                })
            }else {
                console.log("autre erreur")
                res.json({response : false, msg:'Email ou mot de passe inconnu '})
            }
        })
    }else {
        res.json({response : false, msg:"pardon, mais c'est trop long"})
    }      
}

export default connexion