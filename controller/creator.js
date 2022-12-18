const host = "http://alexisleray.sites.3wa.io"
const port = 9300
const BASE_URL = `${host}:${port}`
import { pool } from '../config/dataBase.js'
import bcrypt from 'bcrypt';
import { inputLength } from '../components/checkLength.js'
import formidable from 'formidable';
import fs from 'fs';
import checkAcceptedExtensions from '../components/checkAcceptedExtensions.js'

// ===========================================
//     RECUPERATION INFO CREATEUR
// ==========================================  

const showCreator = (req, res) => {
    let selectedCreator = 'SELECT creators.description, creators.image_id, images.description AS imgTxt, users.name, users.first_name, images.url FROM creators JOIN users ON creators.user_id = users.id JOIN images ON creators.image_id = images.id WHERE creators.id= ?'
    let test = []
    // Utilisation de l'id de l'user pour selectionner le bon profil 
    pool.query(selectedCreator, [req.params.id], (err, creator) => {
        if (err) throw err
        if (creator) {
            res.json({ response: true, creator })
        }
        else {
            res.json({ response: false })
        }
    })
}

// ===========================================
//     AJOUT DES INFOS CREATEUR 
// ==========================================  

const creatorInfo = (req, res) => {
    // Constante from pour stocker une instance de la classe formidable en gardant les extensions des fichiers téléchargés 
    const form = formidable({ keepExtensions: true });
    //On défini la taille maximale des images 
    const maxSize = 2000000;
    //On défini les extensions acceptées 
    const acceptedExtension = ['jpeg', 'jpg', 'png', 'gif']

    // .parse analyse les données de form avec en paramètre la requête et une callback asynchrone l'erreur/champs des inputs/ le fichier
    form.parse(req, async(err, fields, files) => {
        if (err) throw err;
        if (inputLength(fields.description, 5000) && inputLength(fields.imgDescription)) {
            //  Si le nom du fichier n'est pas vide 
            if (files.files) {
                //  Variable qui contient le nom du fichier 
                let newFilename = files.files.newFilename;
                //  Chemin du fichier temporaire dans le dossier temp
                let oldPath = files.files.filepath;
                //  Chemin du nouveau fichier
                let newPath = `public/img/${newFilename}`; //nouveau lieu du fichier stocké 
                const file = files.files
                // Vérification de l'extension du fichier 
                const isExtensionValid = await checkAcceptedExtensions(file, acceptedExtension)
                //Si le fichier fait partie des fichier acceptés 
                if (!isExtensionValid) {
                    res.json({ response: false, msg: "format invalide" })
                }
                else {
                    // Si l'extension est valide on vérifie la taille 
                    if (file.size >= maxSize) {
                        res.json({ response: false, msg: "format trop lourd max 2mo" })
                    }
                    else {
                        // Si la taille est valide on copie le fichier dans le dossier 
                        fs.copyFile(oldPath, newPath, (err) => {
                            if (err) throw err;
                            // Si l'id de l'image n'est pas vide il y a donc déjà une image
                            if (fields.imgId !== "") {

                                const paramsCreatorSQL = [fields.description, req.params.id]
                                const creatorSQL = 'UPDATE creators SET creators.description=? WHERE creators.id=?'

                                const paramsImgSQL = [fields.imgDescription, newFilename, fields.imgId]
                                const imgSQL = 'UPDATE images SET description = ?, url = ?  WHERE id = ?'
                                // Requête update description créateur
                                pool.query(creatorSQL, paramsCreatorSQL, (err, result) => {
                                    if (err) throw err
                                    // Requête d'upadate de l'image crétaeur 
                                    pool.query(imgSQL, paramsImgSQL, (err, result) => {
                                        if (err) throw err
                                        //Suppression de l'ancien fichier du dossier public 
                                        fs.unlink('public/img/' + fields.imgUrl, (err) => {
                                            if (err) throw err
                                            res.json({ response: true, msg: 'image modifiée avec succès' })
                                        })
                                    })
                                })
                            }
                            else { // Si il n'y avait pas d'image
                                const paramsImgSQL = [fields.imgDescription, newFilename]
                                const imgSQL = 'INSERT INTO images (description, url) VALUES (?,?)'
                                const creatorSQL = 'UPDATE creators SET creators.description=?, creators.image_id = ? WHERE creators.id=?'
                                // Requête pour ajout d'une nouvelle image en BDD
                                pool.query(imgSQL, paramsImgSQL, (err, result) => {
                                    if (err) throw err
                                    const paramsCreatorSQL = [fields.description, result.insertId, req.params.id]
                                    // Requête de modification de la description et image id du créateur
                                    pool.query(creatorSQL, paramsCreatorSQL, (err, result) => {
                                        if (err) throw err
                                        res.json({ response: true, msg: "image envoyer + pas d'image en BDD pour ce createur" })
                                    })
                                })
                            }
                        })
                    }
                }
            }
            else { //Modification créateur sans image
                const creatorDescription = 'UPDATE creators SET creators.description=? WHERE creators.id=?'
                const creatorDescriptionParams = [fields.description, req.params.id]
                pool.query(creatorDescription, creatorDescriptionParams, (err, result) => {
                    if (err) throw err
                    res.json({ response: true, msg: "pas d'image envoyer + update description createur" })
                })
            }
        }
        else {
            res.json({ response: false })
        }
    })
}


export { showCreator, creatorInfo }
