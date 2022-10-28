const host = "http://alexisleray.sites.3wa.io"
const port = 9300
const BASE_URL = `${host}:${port}`
import {pool} from '../config/dataBase.js'
import bcrypt from 'bcrypt';
import {inputLength} from '../components/checkLength.js'



const sendMessage = (req, res) => {
    
    let newMessage = 'INSERT INTO contact (contact.user_id, contact.title, contact.content, contact.date) VALUES (?,?,?,?)'
    
        pool.query(newMessage, [req.body.id, req.body.title, req.body.content, new Date()], (err, newMsg) => {
            if (err) throw err
            res.json({response:true, msg: 'Votre message a bien été pris en compte'})
        })
}

export default sendMessage