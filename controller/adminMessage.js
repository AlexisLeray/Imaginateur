const host = "http://alexisleray.sites.3wa.io"
const port = 9300
const BASE_URL = `${host}:${port}`
import {pool} from '../config/dataBase.js'
import bcrypt from 'bcrypt';
import {inputLength} from '../components/checkLength.js'

const getMessage = (req, res) => {
    let comment = 'SELECT contact.id, contact.title, contact.content, contact.date, users.name, users.first_name, users.mail  FROM contact JOIN users ON contact.user_id = users.id '
    let commentArray = []
        pool.query(comment, [req.params.id], (error, comment) => {
        if(comment){
            
            if (error) throw error
            
            commentArray= comment
            res.json({response:true, commentArray})
        
        }else {
            res.json({response:false})
        }
    }) 
}

const deleteMsg = (req, res) => {
    let deleteMessage = 'DELETE FROM contact WHERE contact.id= ?'
    pool.query(deleteMessage, [req.body.id], (err, deleted) => {
        if (err) throw err
        if(deleted){
            res.json({response: true, msg:"mesage supprimé"})
        }else {
            res.json({response: false})
        }
    })
    console.log("ça marche")
}
export  {getMessage, deleteMsg}