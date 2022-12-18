const host = "http://alexisleray.sites.3wa.io"
const port = 9300
const BASE_URL = `${host}:${port}`
import { pool } from '../config/dataBase.js'
import bcrypt from 'bcrypt';
import { inputLength } from '../components/checkLength.js'
import checkAcceptedExtensions from '../components/checkAcceptedExtensions.js'


// ===========================================
//      RECUPERATION DES ARTICLES
// ==========================================  

const getArticle = (req, res) => {
    let getArticles = 'SELECT articles.*, images.url, images.description FROM articles LEFT JOIN images ON articles.image_id = images.id '
    let articlesArray = []
    // On déclenche la requête SQL pour récupérer le contenu de la table article + les images 
    pool.query(getArticles, [req.params.id], (error, articles) => {
        if (error) throw error
        if (articles) {
            if (error) throw error
            // Affectation des articles au tableau vide articleArray 
            articlesArray = articles
            res.json({ response: true, articlesArray })
        }
        else {
            res.json({ response: false })
        }
    })
}
// ===========================================
//      AJOUT DES ARTICLES AVEC IMAGE
// ==========================================  

import formidable from 'formidable';
import fs from 'fs';

const addArticle = (req, res) => {
    // Constante from pour stocker une instance de la classe formidable en gardant les extensions des fichiers téléchargés 
    const form = formidable({ keepExtensions: true });
    const maxSize = 2000000; //On défini la taille maximale des images 
    const acceptedExtension = ['jpeg', 'jpg', 'png', 'gif'] //On défini les extensions acceptées 
    let newImg = 'INSERT INTO images (description, url) VALUES (?,?)'
    let selectImg = 'SELECT id FROM images ORDER BY id DESC LIMIT 1'
    let newPiece = 'INSERT INTO articles (title, content, image_id) VALUES (?,?,?)'
    // .parse analyse les données de form avec en paramètre la requête et une callback asynchrone l'erreur/champs des inputs/ le fichier
    form.parse(req, async(err, fields, files) => {
        if (err) throw err;
        const file = files.files
        //  Variable qui contient le nom du fichier 
        let newFilename = files.files.newFilename;
        //  Chemin du fichier temporaire dans le dossier temp
        let oldPath = files.files.filepath;
        //  Chemin du nouveau fichier
        let newPath = `public/img/${newFilename}`;
        // Vérification de l'extension du fichier 
        const isExtensionValid = await checkAcceptedExtensions(file, acceptedExtension)

        if (inputLength(fields.imgDescription) && inputLength(fields.title, 63) && inputLength(fields.content, 1500)) {
            // Si le nom du fichier n'est pas un caractère vide
            if (files.originalFilename !== '') {
                // Si l'extension n'est pas valide
                if (!isExtensionValid) {
                    res.json({ response: false, msg: "format invalide" })
                }
                else {
                    // Si la taille du fichier n'est pas valide 
                    if (file.size >= maxSize) {
                        res.json({ response: false, msg: "format trop lourd max 2mo" })
                    }
                    else {
                        // Si la taille est valide on copie le fichier dans le dossier 
                        fs.copyFile(oldPath, newPath, (err) => {
                            if (err) throw err;
                            // Ajout de l'url de l'image et sa description dans la BDD
                            pool.query(newImg, [fields.imgDescription, newFilename], (err, added) => {
                                if (err) throw err
                                if (added) {
                                    // Si l'image est bien ajoutée on la récupère 
                                    pool.query(selectImg, [], (err, selected) => {
                                        if (err) throw err;
                                        if (selected) {
                                            // Si on l'a bie nrécupérer on ajoute le titre, contenu et image id à la table "articles"
                                            pool.query(newPiece, [fields.title, fields.content, selected[0].id], (err, addArticle) => {
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

            res.json({ response: false, msg: "Champs trop longs" })
        } // 
    })
}


export { addArticle, getArticle }
