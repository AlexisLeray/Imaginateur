 const host = "http://alexisleray.sites.3wa.io"
 const port = 9300
 const BASE_URL = `${host}:${port}`
 import pool from '../config/dataBase.js'
 import {inputLength} from '../components/checkLength.js'


const toApprouved = (req, res) => {
    let products = 'SELECT products.title, products.price, products.content, products.categorie_id,creators.id, users.name,users.first_name, users.mail, images.url, images.description FROM products JOIN creators ON creators.id = products.creator_id JOIN users ON creators.user_id = users.id JOIN images ON images.id = products.image_id WHERE approuved = 0 '
    let newProducts = []
    pool.query(products, [], (err, all) => {
        if (err) throw err
        if (all) {
            newProducts= all
            res.json({response: true, newProducts})
        }else{
            res.json({response:false })
        }
    })
}
export default toApprouved