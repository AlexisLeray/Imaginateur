const host = "http://alexisleray.sites.3wa.io"
const port = 9300
const BASE_URL = `${host}:${port}`
import pool from '../config/dataBase.js'
import bcrypt from 'bcrypt';
import {inputLength} from '../components/checkLength.js'


const sendMessage = (req, res) => {
    let newMessage = 'INSERT into ? (?,?,?,?) VALUES (?,?,?,?)'
        pool.query(newMessage, [req.body.mail, req.body.content, req.body.content], (err, newMsg) => {
            if (err) throw err
        })
}

export default sendMessage