const host = "http://alexisleray.sites.3wa.io"
const port = 9300
const BASE_URL = `${host}:${port}`
import { pool } from '../config/dataBase.js'
import { inputLength } from '../components/checkLength.js'

// ===========================================
//       RECUPERATION DES IMAGES CAROUSEL
// ==========================================

const home = (req, res) => {
    let getProducts = 'SELECT products.*, images.url, images.description FROM products JOIN images ON images.id = products.image_id ORDER BY RAND() LIMIT 4'
    // Récupération de 4 produits et leurs image de façon aléatoire
    pool.query(getProducts, [], (err, result) => {
        if (err) throw err
        if (result) {
            console.log("RESULT", result)
            res.json({ response: true, result })
        }
        else {
            res.json({ response: false })
        }
    })
}
export default home
