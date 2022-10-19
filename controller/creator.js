const host = "http://alexisleray.sites.3wa.io"
const port = 9300
const BASE_URL = `${host}:${port}`
import pool from '../config/dataBase.js'
import bcrypt from 'bcrypt';
import {inputLength} from '../components/checkLength.js'
import formidable from 'formidable';
import fs from 'fs';

const showCreator = (req, res) => {
    let selectedCreator = 'SELECT creators.description, creators.image_id, images.description AS imgTxt, users.name, users.first_name, images.url FROM creators JOIN users ON creators.user_id = users.id JOIN images ON creators.image_id = images.id WHERE creators.id= ?'
    let test = [] 
        pool.query(selectedCreator, [req.params.id], (err, creator) => {
            if (err) throw err
            if(creator){
               res.json({response: true, creator})
               }else{
                   res.json({response: false})
               }
        })
}

const checkAcceptedExtensions = (file) => {
	const type = file.mimetype.split('/').pop()
	const accepted = ['jpeg', 'jpg', 'png', 'gif']
	if (accepted.includes(type)) {
	    return true
	}
	return false
}

const creatorInfo = (req, res) => {
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
                    if(fields.imgId !== "undefined"){
                        const paramsCreatorSQL = [fields.description, req.params.id]
                        const creatorSQL = 'UPDATE creators SET creators.description=? WHERE creators.id=?'

                        const paramsImgSQL = [fields.imgDescription, newFilename, fields.imgId]
                        const imgSQL = 'UPDATE images SET description = ?, url = ?  WHERE id = ?'

                        pool.query(creatorSQL, paramsCreatorSQL, (err, result) => {
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
                        const creatorSQL = 'UPDATE creators SET creators.description=?, creators.image_id = ? WHERE creators.id=?'
                        pool.query(imgSQL,paramsImgSQL, (err, result) => {
                            if(err) throw err
                            const paramsCreatorSQL = [fields.description, result.insertId, req.params.id]
                            pool.query(creatorSQL,paramsCreatorSQL, (err, result) => {
                                if(err) throw err
                                res.json({response:true, message:"image envoyer + pas d'image en BDD pour ce createur"})    
                            })
                        })
                    }
                })
            } else {
                res.json({response:false, message:'image au mauvais format'})
            }
        } else {
            const creatorDescription = 'UPDATE creators SET creators.description=? WHERE creators.id=?'
            const creatorDescriptionParams = [fields.description, req.params.id]
            pool.query(creatorDescription, creatorDescriptionParams, (err, result) => {
                if(err) throw err
                res.json({response:true, message:"pas d'image envoyer + update description createur"})    
            })
        }
    })
}


export {showCreator, creatorInfo}