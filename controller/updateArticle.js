 const host = "http://alexisleray.sites.3wa.io"
 const port = 9300
 const BASE_URL = `${host}:${port}`
 import {pool} from '../config/dataBase.js'
 

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
const getToUpdateArticle = (req, res) => {
    let getArticle = 'SELECT articles.*, images.url, images.description FROM articles LEFT JOIN images ON images.id = articles.image_id WHERE articles.id= ?'
 
     pool.query(getArticle, [req.params.id], (err, selectedProduct) => {
      if (err) throw err
      
      res.json({response: true, selectedProduct})
      
     })
}

// ============================================= UPDATE DU PRODUIT AVEC IMAGE================================================
 const updateArticle = (req,res) => {

 const form = formidable({keepExtensions: true});
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
                        console.log("IMAGE", fields.imgId)
                         if(fields.imgId !== 'null'){  // si il y a déjà une image 
                            const paramsArticlesQL = [fields.title, fields.content, req.params.id]
                            const articlesQL = 'UPDATE articles SET articles.title=?, articles.content=? WHERE articles.id=?'
    
                            const paramsImgSQL = [fields.imgDescription, newFilename, fields.imgId]
                            const imgSQL = 'UPDATE images SET description = ?, url = ?  WHERE id = ?'
    
                            pool.query(articlesQL, paramsArticlesQL, (err, result) => {
                                if(err) throw err
                                pool.query(imgSQL,paramsImgSQL, (err, result) => {
                                    if(err) throw err
                                    fs.unlink('public/img/'+fields.imgUrl, (err) => {  //Suppression de l'ancien fichier du dossier public 
                                        if (err) throw err
                                        res.json({response:true, message:'image envoyer + deja une image en BDD pour ce createur'})
                                    })
                                })
                            })
                  
                    } else {
                        const paramsImgSQL = [fields.imgDescription, newFilename]
                        const imgSQL = 'INSERT INTO images (description, url) VALUES (?,?)' 
                        const articlesQL = 'UPDATE articles SET articles.title=?, articles.content=?, articles.image_id=? WHERE articles.id=?'
                        pool.query(imgSQL,paramsImgSQL, (err, result) => {
                            if(err) throw err
                            const paramsarticlesQL = [fields.title, fields.content, result.insertId, req.params.id]
                            pool.query(articlesQL,paramsarticlesQL, (err, result) => {
                                if(err) throw err
                                res.json({response:true, message:"image envoyer + pas d'image en BDD pour ce createur"})    
                            })
                        })
                    }
                })
            }else {
                            res.json({response:false, message:'image au mauvais format'})
                        }
             
        } else {
            const creatorDescription = 'UPDATE articles SET articles.title=?, articles.content=? WHERE articles.id=?'
            const creatorDescriptionParams = [fields.title, fields.content, req.params.id]
            pool.query(creatorDescription, creatorDescriptionParams, (err, result) => {
                if(err) throw err
                res.json({response:true, message:"pas d'image envoyer + update description createur"})    
            })
        }
    })
  
 }


export  {getToUpdateArticle, updateArticle}