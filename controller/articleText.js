const host = "http://alexisleray.sites.3wa.io"
const port = 9300
const BASE_URL = `${host}:${port}`
import {pool} from '../config/dataBase.js'
import bcrypt from 'bcrypt';
import {inputLength} from '../components/checkLength.js'


const withoutPictures = (req, res) => {
    let newTxt = 'INSERT INTO  articles (title, content, image_id) VALUES (?,?,?)'
    pool.query(newTxt, [req.body.title, req.body.content, null], (err, txtAdded) => {
        if(err) throw err
        if(txtAdded){
            res.json({response:true})
        }else{
            res.json({response: false})
        }
    })
}
export default withoutPictures