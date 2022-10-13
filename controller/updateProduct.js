 const host = "http://alexisleray.sites.3wa.io"
 const port = 9300
 const BASE_URL = `${host}:${port}`
 import pool from '../config/dataBase.js'
 

import formidable from 'formidable';
import fs from 'fs';


const checkAcceptedExtensions = (file) => {
	const type = file.mimetype.split('/').pop()
	const accepted = ['jpeg', 'jpg', 'png', 'gif']
	if (accepted.includes(type)) {
	    return true
	}
	return false
}

const showToUpdate = (req, res) => {
 
    let getProduct = 'SELECT *, images.url, images.description FROM products JOIN images ON images.id = products.image_id WHERE products.id= ?'

     pool.query(getProduct, [req.params.id], (err, selectedProduct) => {
      if (err) throw err
      console.log("mqlsdjfmlqdkjsf", selectedProduct)
      res.json({response: true, selectedProduct})
      
     })
}

 const update = (req,res) => {
 const form = formidable({keepExtensions: true});
    let updateProduct = 'UPDATE products SET title=?, price=?, content=? WHERE id=?'
    let updatePicture = 'UPDATE images SET description=?, url=?'
        form.parse(req, (err, fields, files) => {
            if (err) throw err;
            let newFilename = files.files.newFilename;
            let oldPath = files.files.filepath;
    console.log(oldPath)
            let newPath = `public/img/${newFilename}`;
            
            const file = files.files
             if(files.originalFilename !== ''){
                 if(checkAcceptedExtensions(file)){
                    fs.copyFile(oldPath, newPath, (err) => {
                        if (err) throw err;
                        // poolquery
                 pool.query(updatePicture, [fields.imgDescription,newFilename], (err, added) => {
                    if (err) throw err
                        if (added){
                             res.json({response: true})
                        }else{
                            res.json({response:false})
                        }
                    })
                    pool.query(updateProduct, [fields.title, fields.price, fields.productDescription], (err, addProduct) => {
                    if (err) throw err
                      if(addProduct) {
                        res.json({response: true})
                        }else{
                            res.json({response:false})
                        }
                    })
                }) 
            }
         }
    })
 }


export  {showToUpdate, update}
// export default showToUpdate