// PAS SUR QUE CE SOIT UTILE OU ALORS SEULEMENT POUR COTE USER AFFICHAGE DES DIFFERENTES OEUVRE


const host = "http://alexisleray.sites.3wa.io"
const port = 9300
const BASE_URL = `${host}:${port}`
import {pool} from '../config/dataBase.js'
import bcrypt from 'bcrypt';
import {inputLength} from '../components/checkLength.js'

const product = (req,res) => {
    const getProduct = 'SELECT products.title,products.price, products.content, images.url FROM products JOIN images ON products.image_id= images.id WHERE products.id= ?'
    pool.query(getProduct, [req.params.id], (err, product) => {
        if (err) throw err
        if(product){
            res.json({response:true, product})
        }else{
            res.json({response:false})
        }
    })
}
export default product