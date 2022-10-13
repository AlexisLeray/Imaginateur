const host = "http://alexisleray.sites.3wa.io"
const port = 9300
const BASE_URL = `${host}:${port}`
import pool from '../config/dataBase.js'
import bcrypt from 'bcrypt';
import {inputLength} from '../components/checkLength.js'

const addCreator = (req, res) => {
    let addNewCreator = 'UPDATE users SET role_id = 2 WHERE id = ? '
    let creatorList = 'INSERT INTO creators (user_id) VALUES (?)'
    pool.query(addNewCreator, [req.body.id], (err, creator) => {
        if (err) throw err 
            if(creator) {
                     pool.query(creatorList, [req.body.id], (err,addToList) => {
                            if(err)throw err
                            res.json({reponse: true, creator, msg: 'Créateur ajouté !'})        
                        })
            }else {
                res.json({response:false})
        }
    })
}
export default addCreator