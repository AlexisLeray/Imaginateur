 const host = "http://alexisleray.sites.3wa.io"
 const port = 9300
 const BASE_URL = `${host}:${port}`
 import {pool} from '../config/dataBase.js'
 import {inputLength} from '../components/checkLength.js'

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
// ============================================= AFFICHAGE DE L'ARTICLE EN FRONT ================================================
const showToUpdate = (req, res) => {
    let getProduct = 'SELECT *, images.url, images.description, categories.id, categories.category FROM products JOIN images ON images.id = products.image_id JOIN categories ON categories.id = products.categorie_id WHERE products.id= ?'

     pool.query(getProduct, [req.params.id], (err, selectedProduct) => {
      if (err) throw err
      res.json({response: true, selectedProduct})
      
     })
}
// ==============================================RECUPERATION DES CATEGORIES==============================================================

const getGategory = (req, res) => {
    const category = 'SELECT * from categories'
    pool.query(category, [], (err, allCategory) => {
        if (err) throw err
        if(allCategory) {
            res.json({response: true, allCategory})
        }else {
            res.json({response:false})
        }
    })
}
// ============================================= UPDATE DU PRODUIT AVEC IMAGE================================================
 const update = (req,res) => {

 const form = formidable({keepExtensions: true});
    let updateProduct = 'UPDATE products SET products.title=?, products.price=?, products.content=?, products.categorie_id=? WHERE products.id=?'
    let updatePicture = 'UPDATE images SET description=?, url=? WHERE images.id= (SELECT * FROM (SELECT images.id FROM images INNER JOIN products ON products.image_id = images.id WHERE products.id= ?)sub GROUP BY id)'
        form.parse(req, (err, fields, files) => {
            if (err) throw err;
            if(files.files){    //Si le nom du fichier n'est pas vide 
                let newFilename = files.files.newFilename;  
                let oldPath = files.files.filepath;  //fichier stocké dans le dossier temp 
                let newPath = `public/img/${newFilename}`; //nouveau lieu du fichier stocké 
                const file = files.files
                 if(checkAcceptedExtensions(file)){   //Si le fichier fait partie des fichier acceptés 
                    fs.copyFile(oldPath, newPath, (err) => {   //On copie le fichier dans le dossier     
                        if (err) throw err;
                          fs.unlink('public/img/'+fields.imgUrl, (err) => {  //Suppression de l'ancien fichier du dossier public 
                             if (err) throw err
                                    })            
                        //On lance la pool.query pour l'envoi de l'url et de la description en bdd
                        if(inputLength(fields.imgDescription) && inputLength(fields.title) && inputLength(fields.price) && inputLength(fields.productDescription)){
                         pool.query(updatePicture, [fields.imgDescription,newFilename, req.params.id], (err, added) => {  
                            if (err) throw err
                                if (added){
                                  pool.query(updateProduct, [fields.title, fields.price, fields.productDescription, fields.category_id, req.params.id], (err, addProduct) => {
                                    if (err) throw err
                                    if(addProduct) {
                                         res.json({response: true})   //l'url du fichier est bien transféré
                                    }else{
                                        res.json({response:false})  //il y a eu un soucis, l'url n'est pas envoyée// 
                                    }
                               }) 
                            }   
                        }) 
                        }else{
                            res.json({response: false, msg:"Champs trop longs"})
                        } 
                    }) 
                }
            } else {
// ============================================= UPDATE DU PRODUIT SANS IMAGE================================================
            if(inputLength(fields.title) && inputLength(fields.price) && inputLength(fields.productDescription)){
            pool.query(updateProduct, [fields.title, fields.price, fields.productDescription, fields.category_id, req.params.id], (err, addProduct) => { 
                if (err) throw err
                if(addProduct) {
                    res.json({response: true})
                }else{
                    res.json({response:false})
                }
            })
            }else{
                res.json({response: false, msg:"Champs trop longs"})
            } 
        }
    })
 }


export  {showToUpdate, update}
