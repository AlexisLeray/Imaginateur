const host = "http://alexisleray.sites.3wa.io"
const port = 9300
const BASE_URL = `${host}:${port}`
import pool from '../config/dataBase.js'
import bcrypt from 'bcrypt';
import {inputLength} from '../components/checkLength.js'

const getMessage = (req, res) => {
    let comment = 'SELECT contact.title, contact.content, contact.date, users.name, users.first_name, users.mail  FROM contact JOIN users ON contact.user_id = users.id '
    let commentArray = []
        pool.query(comment, [], (error, comment) => {
        if(comment){
            
            if (error) throw error
            
            commentArray= comment
            // console.log("C'est la date : ", commentArray[0].date.toLocaleDateString()) c'est pas ça 
            res.json({response:true, commentArray})
        
        }else {
            res.json({response:false})
        }
    }) 
}
export default getMessage