const host = "http://alexisleray.sites.3wa.io"
const port = 9300
const BASE_URL = `${host}:${port}`
import { pool } from '../config/dataBase.js'
import bcrypt from 'bcrypt';
import { inputLength } from '../components/checkLength.js'
import { asyncQuery } from '../config/dataBase.js';
import { generateToken } from "../controller/token.js"
const saltRounds = 10





const connexion = (req, res) => {
    //REQUETE SQL
    let connexionSQL = 'SELECT  users.hash, users.id, role_id, name, users.mail, first_name FROM users WHERE mail=?'
    let creatorConnexion = 'SELECT creators.id FROM creators WHERE `user_id` = ?'

    if (inputLength(req.body.mail, 63) && inputLength(req.body.password)) {
        // Récupération du mdp crypté, id ,role, nom , mail, prénom de l'user en utilisant le mail envoyé
        pool.query(connexionSQL, [req.body.mail], function(err, check) {
            if (err) throw err;
            // Si les deux adresses mail correspondent
            if (check[0] && check[0].mail) {
                // On compare les deux mot de passe
                bcrypt.compare(req.body.password, check[0].hash, async function(err, result) {
                    if (err) throw err;
                    if (result) {
                        // Si l'utilisateur est admin
                        const user = true
                        const admin = check[0].role_id === 1
                        const creator = check[0].role_id === 2 || check[0].role_id === 1
                        const name = check[0].name
                        const first_name = check[0].first_name
                        const id = check[0].id
                        const mail = check[0].mail
                        let userData = {
                            user,
                            admin,
                            creator,
                            name,
                            first_name,
                            mail,
                            id
                        }
                        // Si l'utilisateur a le role admin ou créateur 
                        if (creator || admin) {
                            // On récupère l'id du créateur en utilisant l'id user
                            pool.query(creatorConnexion, [check[0].id], async(err, test) => {
                                if (err) throw err
                                // on affecte l'id récupérée à id_creator
                                const id_creator = test[0].id
                                // on affecte l'id_creator à l'objet userData
                                userData.id_creator = id_creator
                                // Génération d'un token avec les information de userData 
                                const token = await generateToken(userData)
                                res.json({ response: true, admin, creator, name, first_name, mail, id, id_creator, token })
                            })
                        }
                        else {
                            const token = await generateToken(userData)
                            res.json({ response: true, admin, creator, name, first_name, mail, id, token })
                        }
                    }
                    else {
                        res.json({ response: false })
                    }
                })
            }
            else {
                res.json({ response: false, msg: 'Email ou mot de passe inconnu ' })
            }
        })
    }
    else {
        res.json({ response: false, msg: "pardon, mais c'est trop long" })
    }
}

export default connexion
