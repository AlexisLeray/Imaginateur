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
// ============================================= AFFICHAGE DE L'ARTICLE EN FRONT ================================================
const showToUpdate = (req, res) => {
    let getArticle = 'SELECT articles.*, images.url, images.description FROM articles JOIN images ON images.id = articles.image_id  WHERE articles.id= ?'
     pool.query(getArticle, [req.params.id], (err, selectedProduct) => {
      if (err) throw err
      res.json({response: true, selectedProduct})
      
     })
}

// ============================================= UPDATE DU PRODUIT AVEC IMAGE================================================
 const update = (req,res) => {

 const form = formidable({keepExtensions: true});
    let updateArticle = 'UPDATE articles SET articles.title=?, articles.content=?, WHERE articles.id=?'
    let updatePicture = 'UPDATE images SET description=?, url=? WHERE images.id= (SELECT * FROM (SELECT images.id FROM images INNER JOIN articles ON articles.image_id = images.id WHERE articles.id= ?)sub GROUP BY id)'
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
                         pool.query(updatePicture, [fields.imgDescription,newFilename, req.params.id], (err, added) => {  
                            if (err) throw err
                                if (added){
                                  pool.query(updateArticle, [fields.title, fields.content, req.params.id], (err, addArticle) => {
                                    if (err) throw err
                                    if(addArticle) {
                                         res.json({response: true})   //l'url du fichier est bien transféré
                                    }else{
                                        res.json({response:false})  //il y a eu un soucis, l'url n'est pas envoyée// 
                                    }
                               }) 
                            }   
                        })    
                    }) 
                }
            } else {
// ============================================= UPDATE DU PRODUIT SANS IMAGE================================================
            pool.query(updateArticle, [fields.title, fields.content, req.params.id], (err, addArticle) => { 
                if (err) throw err
                if(addArticle) {
                    res.json({response: true})
                }else{
                    res.json({response:false})
                }
            })
        }
    })
 }


export  {showToUpdate, update}