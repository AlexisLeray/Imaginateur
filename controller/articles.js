const host = "http://alexisleray.sites.3wa.io"
const port = 9300
const BASE_URL = `${host}:${port}`
import {pool} from '../config/dataBase.js'
import bcrypt from 'bcrypt';
import {inputLength} from '../components/checkLength.js'
import checkAcceptedExtensions from '../components/checkAcceptedExtensions.js'


const getArticle = (req, res) => {
    let getArticles = 'SELECT articles.*, images.url, images.description FROM articles LEFT JOIN images ON articles.image_id = images.id '
    let articlesArray = []
        pool.query(getArticles, [req.params.id], (error, articles) => {
        if (error) throw error
        if(articles){
            if (error) throw error
            articlesArray= articles
            res.json({response:true, articlesArray})
        }else {
            res.json({response:false})
        }
    }) 
}
// ===========================================AJOUT D'ARTICLES AVEC IMAGES======================================

import formidable from 'formidable';
import fs from 'fs';


// const checkAcceptedExtensions = (file) => {
// 	const type = file.mimetype.split('/').pop()
// 	const accepted = ['jpeg', 'jpg', 'png', 'gif']
// 	if (accepted.includes(type)) {
// 	    return true
// 	}
// 	return false
// }

const addArticle = (req, res) => {
    const form = formidable({keepExtensions: true});
    const maxSize = 2000000; //On défini la taille maximale des images 
    const acceptedExtension = ['jpeg','jpg','png','gif'] //On défini les extensions acceptées 
    let newImg = 'INSERT INTO images (description, url) VALUES (?,?)'  
    let selectImg = 'SELECT id FROM images ORDER BY id DESC LIMIT 1'
    let newPiece = 'INSERT INTO articles (title, content, image_id) VALUES (?,?,?)'
    
        form.parse(req, async (err, fields, files) => {
            if (err) throw err;
            const file = files.files
            let newFilename = files.files.newFilename;
            let oldPath = files.files.filepath;
            let newPath = `public/img/${newFilename}`;
            const isExtensionValid = await checkAcceptedExtensions(file, acceptedExtension)
            
        if(inputLength(fields.imgDescription) && inputLength(fields.title, 63) && inputLength(fields.content, 1500)){
                if(files.originalFilename !== ''){
                    if(!isExtensionValid){ 
                        console.log("extensioninvalid")
                        res.json({response: false, msg:"format invalide"})
                    }else {
                        if(file.size >= maxSize){
                            console.log("sizeInvalid")
                            res.json({response: false, msg:"format trop lourd max 2mo"})
                        }else {
                        fs.copyFile(oldPath, newPath, (err) => {
                            if (err) throw err;
                            // poolquery
                     pool.query(newImg, [fields.imgDescription,newFilename], (err, added) => {
                        if (err) throw err
                            if (added){
                                pool.query(selectImg, [], (err, selected) => {
                                    if (err) throw err;
                                    if(selected){
                                        pool.query(newPiece, [fields.title, fields.content, selected[0].id], (err, addArticle) => {
                                            if (err) throw err
                                            res.json({response: true})
                                        })
                                    }
                                }) 
                            }else{
                                res.json({response:false})
                            }
                        })
                    })
                    }
                } 
            }
       }else{
        
           res.json({response: false, msg:"Champs trop longs"})
       }// 
    })
}
// ===========================================AJOUT D'ARTICLES AVEC IMAGES======================================

export {addArticle, getArticle}