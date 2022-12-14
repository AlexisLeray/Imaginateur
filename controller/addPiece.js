// FORMULAIRE D'AJOUT D'UNE NOUVELLE OEUVRE

 const host = "http://alexisleray.sites.3wa.io"
 const port = 9300
 const BASE_URL = `${host}:${port}`
 import {pool} from '../config/dataBase.js'
 import {inputLength} from '../components/checkLength.js'
 import checkAcceptedExtensions from '../components/checkAcceptedExtensions.js'


// ============================================================================================================

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

// ============================================================================================================
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



const addPiece = (req, res) => {
    
    const form = formidable({keepExtensions: true});
    const maxSize = 2000000; //On défini la taille maximale des images 
    const acceptedExtension = ['jpeg','jpg','png','gif'] //On défini les extensions acceptées 
    let newImg = 'INSERT INTO images (description, url) VALUES (?,?)'  
    let selectImg = 'SELECT id FROM images ORDER BY id DESC LIMIT 1'
    let newPiece = 'INSERT INTO products (creator_id, image_id, title, price, content, categorie_id) VALUES (?,?,?,?,?,?)'
    
        form.parse(req, async (err, fields, files) => {
            if (err) throw err;
            let newFilename = files.files.newFilename;
            let oldPath = files.files.filepath;
            let newPath = `public/img/${newFilename}`;
            const file = files.files;
            const isExtensionValid = await checkAcceptedExtensions(file, acceptedExtension)
            
            if(inputLength(fields.imgDescription) && inputLength(fields.title) && inputLength(fields.price, 11) && inputLength(fields.productDescription, 255)){
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
                                    pool.query(newPiece, [fields.creatorId, selected[0].id, fields.title, fields.price, fields.productDescription, fields.category], (err, addProduct) => {
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
            res.json({response: false, msg:"aucune image"})
        }
    })
}


export  {addPiece, getGategory}