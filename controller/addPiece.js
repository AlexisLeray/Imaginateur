// FORMULAIRE D'AJOUT D'UNE NOUVELLE OEUVRE

const host = "http://alexisleray.sites.3wa.io"
const port = 9300
const BASE_URL = `${host}:${port}`
import { pool } from '../config/dataBase.js'
import { inputLength } from '../components/checkLength.js'
import checkAcceptedExtensions from '../components/checkAcceptedExtensions.js'


// ===========================================
//     RECUPERATION DES CATEGORIES 
// ==========================================  

const getGategory = (req, res) => {
    const category = 'SELECT * from categories'
    pool.query(category, [], (err, allCategory) => {
        if (err) throw err
        if (allCategory) {
            res.json({ response: true, allCategory })
        }
        else {
            res.json({ response: false })
        }
    })
}

// ===========================================
//      AJOUT D'UNE OEUVRE
// ==========================================  
import formidable from 'formidable';
import fs from 'fs';



const addPiece = (req, res) => {
    // Constante from pour stocker une instance de la classe formidable en gardant les extensions des fichiers téléchargés 
    const form = formidable({ keepExtensions: true });
    const maxSize = 2000000; //On défini la taille maximale des images 
    const acceptedExtension = ['jpeg', 'jpg', 'png', 'gif'] //On défini les extensions acceptées 
    let newImg = 'INSERT INTO images (description, url) VALUES (?,?)'
    let selectImg = 'SELECT id FROM images ORDER BY id DESC LIMIT 1'
    let newPiece = 'INSERT INTO products (creator_id, image_id, title, price, content, categorie_id) VALUES (?,?,?,?,?,?)'
    // .parse analyse les données de form avec en paramètre la requête et une callback asynchrone l'erreur/champs des inputs/ le fichier
    form.parse(req, async(err, fields, files) => {
        if (err) throw err;
        //  Variable qui contient le nom du fichier 
        let newFilename = files.files.newFilename;
        //  Chemin du fichier temporaire dans le dossier temp
        let oldPath = files.files.filepath;
        //  Chemin du nouveau fichier
        let newPath = `public/img/${newFilename}`;
        const file = files.files;
        // Vérification de l'extension du fichier 
        const isExtensionValid = await checkAcceptedExtensions(file, acceptedExtension)

        if (inputLength(fields.imgDescription) && inputLength(fields.title) && inputLength(fields.price, 11) && inputLength(fields.productDescription, 255)) {
            // Si le nom du fichier n'est pas vide 
            if (files.originalFilename !== '') {
                // On vérifie que l'extension n'est pas valide 
                if (!isExtensionValid) {
                    res.json({ response: false, msg: "format invalide" })
                }
                else {
                    // Vérification de la taille du fichier 
                    if (file.size >= maxSize) {
                        res.json({ response: false, msg: "format trop lourd max 2mo" })
                    }
                    else {
                        // Si la taille est valide on copie le fichier dans le dossier 
                        fs.copyFile(oldPath, newPath, (err) => {
                            if (err) throw err;
                            // poolquery pour envoi d'image et sa description en BDD 
                            pool.query(newImg, [fields.imgDescription, newFilename], (err, added) => {
                                if (err) throw err
                                if (added) {
                                    // Récupération de la dernière image ajoutée 
                                    pool.query(selectImg, [], (err, selected) => {
                                        if (err) throw err;
                                        if (selected) {
                                            // Ajout du produit avec toutes ses infos et l'image récupérée précedemment
                                            pool.query(newPiece, [fields.creatorId, selected[0].id, fields.title, fields.price, fields.productDescription, fields.category], (err, addProduct) => {
                                                if (err) throw err
                                                res.json({ response: true })
                                            })
                                        }
                                    })
                                }
                                else {
                                    res.json({ response: false })
                                }
                            })
                        })
                    }
                }
            }
        }
        else {
            res.json({ response: false, msg: "aucune image" })
        }
    })
}


export { addPiece, getGategory }
