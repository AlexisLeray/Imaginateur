 const host = "http://alexisleray.sites.3wa.io"
 const port = 9300
 const BASE_URL = `${host}:${port}`
 import {pool} from '../config/dataBase.js'
 import {inputLength} from '../components/checkLength.js'
 
 const myGalery = (req, res) => {

    let myProducts = 'SELECT products.id, products.title, products.price, products.content, image_id, images.url, images.description, categories.category FROM products JOIN images ON images.id = products.image_id JOIN categories ON categories.id = products.categorie_id WHERE creator_id =?'
    let productArray = []
    
    
        pool.query(myProducts, [req.params.id], (error, products) => {
            console.log(1)
        
        if (error) throw error
        if(products){
            console.log(2)
            if (error) throw error
            console.log(3)
            productArray= products
            res.json({response:true, productArray})
        
        }else {
            console.log(4)
            res.json({response:false})
        }
    }) 
    
 }
 export default myGalery