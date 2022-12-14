const host = "http://alexisleray.sites.3wa.io"
const port = 9300
const BASE_URL = `${host}:${port}`
import {pool} from '../config/dataBase.js'
import {inputLength} from '../components/checkLength.js'

const showShop= (req, res) => {
    
    let showProducts = 'SELECT products.id, products.title, products.price, products.content, images.url, creators.id AS creator_id, users.name, users.first_name FROM products JOIN images ON products.image_id = images.id JOIN creators ON creators.id = products.creator_id JOIN users ON creators.user_id = users.id WHERE products.approved = 1'
     
        pool.query(showProducts, [], (err, allProducts) => {
            if (err) throw err    
            if(allProducts){
                res.json({response:true, allProducts})
            }else {
                res.json({response:false})
            }    
        })   
}

const checkBasket = (req,res) => {
    let toCheck = 'SELECT shop.product_id FROM shop WHERE shop.user_id = ? '
    pool.query(toCheck, [req.params.id], (err, checked) => {
        if (err) throw err
        if(checked){
            const data = []
            for(let i = 0; i <= checked.length; i++){
                if(i === checked.length){
                    res.json({response: true, checked:data})
                }else {
                    data.push(checked[i].product_id)
                }
                
            }
            
        }else {
            res.json({response:false})
        }
    })
}


const shop = (req, res) => {
    let addToShop = 'INSERT INTO shop (user_id, product_id) VALUES (?,?)'
        pool.query(addToShop, [req.body.user_id, req.body.product_id], (err, added) => {
            if (err) throw err
            if(added){
                res.json({response:true, msg:"Le produit a été ajouté à votre panier"})
            }else{
                res.json({response: false})
            }
        })
    
}
export {showShop, shop, checkBasket} 