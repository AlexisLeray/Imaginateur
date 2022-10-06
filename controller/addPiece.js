 const host = "http://alexisleray.sites.3wa.io"
 const port = 9300
 const BASE_URL = `${host}:${port}`
 import pool from '../config/dataBase.js'
// import bcrypt from 'bcrypt';
 import {inputLength} from '../components/checkLength.js'

// const addPiece = (req, res) => {
//     let newPiece = 'INSERT INTO products.creator_id, , products.price, products.description, products.categorie_id'
// }
// export default addPiece



// // ============================================================================================================

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

const addPiece = (req, res) => {
    
    const form = formidable({keepExtensions: true});
    let newImg = 'INSERT INTO images (description, url) VALUES (?,?)'  ///
    
        form.parse(req, (err, fields, files) => {
            if (err) throw err;
            console.log(fields)
            let newFilename = files.files.newFilename;
            let oldPath = files.files.filepath;
    
            let newPath = `public/img/${newFilename}`;
            console.log(newPath)
            
            const file = files.files
            if(files.originalFilename !== ''){
                if(checkAcceptedExtensions(file)){
                    fs.copyFile(oldPath, newPath, (err) => {
                        if (err) throw err;
                        // poolquery
             pool.query(newImg, [fields.description,newFilename], (err, added) => {
                     if (err) throw err
                 console.log("ça rentre")
                        res.json({response:true})
             })
                
                    }) 
                }
            }
        })
}


export default addPiece