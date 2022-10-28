const host = "http://alexisleray.sites.3wa.io"
const port = 9300
const BASE_URL = `${host}:${port}`
import {pool} from '../config/dataBase.js'
import bcrypt from 'bcrypt';
import {inputLength} from '../components/checkLength.js'
import formidable from 'formidable';
import fs from 'fs';

const showCreator = (req, res) => {
    let selectedCreator = 'SELECT creators.description, creators.image_id, images.description AS imgTxt, users.name, users.first_name, images.url FROM creators JOIN users ON creators.user_id = users.id JOIN images ON creators.image_id = images.id WHERE creators.id= ?'
    let test = [] 
        pool.query(selectedCreator, [req.params.id], (err, creator) => {
            if (err) throw err
            console.log(creator)
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
    console.log(1)
    const form = formidable({keepExtensions: true});
    form.parse(req, (err, fields, files) => {
        console.log(2)
        if (err) throw err;
        if(files.files){    //Si le nom du fichier n'est pas vide 
        console.log(3)
            let newFilename = files.files.newFilename;  
            let oldPath = files.files.filepath;  //fichier stocké dans le dossier temp 
            let newPath = `public/img/${newFilename}`; //nouveau lieu du fichier stocké 
            const file = files.files
            if(checkAcceptedExtensions(file)){   //Si le fichier fait partie des fichier acceptés 
            console.log(4)
                fs.copyFile(oldPath, newPath, (err) => {   //On copie le fichier dans le dossier     
                console.log(5)
                    if (err) throw err;
                    if(fields.imgId !== ""){
                        console.log(6)
                        const paramsCreatorSQL = [fields.description, req.params.id]
                        const creatorSQL = 'UPDATE creators SET creators.description=? WHERE creators.id=?'

                        const paramsImgSQL = [fields.imgDescription, newFilename, fields.imgId]
                        const imgSQL = 'UPDATE images SET description = ?, url = ?  WHERE id = ?'

                        pool.query(creatorSQL, paramsCreatorSQL, (err, result) => {
                            console.log(7)
                            if(err) throw err
                            pool.query(imgSQL,paramsImgSQL, (err, result) => {
                                console.log(8)
                                if(err) throw err
                                fs.unlink('public/img/'+fields.imgUrl, (err) => {  //Suppression de l'ancien fichier du dossier public 
                                console.log(9)
                                    if (err) throw err
                                    res.json({response:true, message:'image envoyer + deja une image en BDD pour ce createur'})
                                })
                            })
                        })
                    } else {
                        console.log(10)
                        const paramsImgSQL = [fields.imgDescription, newFilename]
                        const imgSQL = 'INSERT INTO images (description, url) VALUES (?,?)' 
                        const creatorSQL = 'UPDATE creators SET creators.description=?, creators.image_id = ? WHERE creators.id=?'
                        pool.query(imgSQL,paramsImgSQL, (err, result) => {
                            console.log(11)
                            if(err) throw err
                            const paramsCreatorSQL = [fields.description, result.insertId, req.params.id]
                            pool.query(creatorSQL,paramsCreatorSQL, (err, result) => {
                                console.log(12)
                                if(err) throw err
                                res.json({response:true, message:"image envoyer + pas d'image en BDD pour ce createur"})    
                            })
                        })
                    }
                })
            } else {
                console.log(13)
                res.json({response:false, message:'image au mauvais format'})
            }
        } else {
            console.log(14)
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