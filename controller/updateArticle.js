 const host = "http://alexisleray.sites.3wa.io"
 const port = 9300
 const BASE_URL = `${host}:${port}`
 import { pool } from '../config/dataBase.js'
 import { inputLength } from '../components/checkLength.js'
 import checkAcceptedExtensions from '../components/checkAcceptedExtensions.js'

 import formidable from 'formidable';
 import fs from 'fs';

 // ===========================================
 //      AFFICHAGE DU PRODUIT A MODIFIER 
 // ========================================== 

 const getToUpdateArticle = (req, res) => {
  let getArticle = 'SELECT articles.*, images.url, images.description FROM articles LEFT JOIN images ON images.id = articles.image_id WHERE articles.id= ?'
  // Requête SQL vers la base de donnée en utilisant l'id du produit (req.params.id) 
  pool.query(getArticle, [req.params.id], (err, selectedProduct) => {
   if (err) throw err
   //  On reçoit le résultat de la requête sous forme d'un objet JSON avec la réponse true et le résultat de la requête SQL 
   res.json({ response: true, selectedProduct })

  })
 }

 // ===========================================
 //      MISE A JOUR DE L'ARTICLE AVEC IMAGE
 // ==========================================  
 const updateArticle = (req, res) => {
  // Constante from pour stocker une instance de la classe formidable en gardant les extensions des fichiers téléchargés 
  const form = formidable({ keepExtensions: true });
  //On défini la taille maximale des images 
  const maxSize = 2000000;
  const acceptedExtension = ['jpeg', 'jpg', 'png', 'gif'] //On défini les extensions acceptées 

  // .parse analyse les données de form avec en paramètre la requête et une callback asynchrone l'erreur/champs des inputs/ le fichier
  form.parse(req, async(err, fields, files) => {
   if (err) throw err;
   //  Si le nom du fichier n'est pas vide 
   if (files.files) {
    //  Variable qui contient le nom du fichier 
    let newFilename = files.files.newFilename;
    //  Chemin du fichier temporaire dans le dossier temp
    let oldPath = files.files.filepath;
    //  Chemin du nouveau fichier
    let newPath = `public/img/${newFilename}`; //nouveau lieu du fichier stocké 
    const file = files.files
    const isExtensionValid = await checkAcceptedExtensions(file, acceptedExtension)
    // Vérification de l'extension du fichier
    if (!isExtensionValid) {
     // Si l'extension n'est pas valide
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
       // S'il y a déjà une image 
       if (fields.imgId !== 'null') {
        // On vérifie la longueur des champs 
        if (inputLength(fields.title, 63) && inputLength(fields.content, 1500)) {
         const paramsArticleSQL = [fields.title, fields.content, req.params.id]
         const articlesQL = 'UPDATE articles SET articles.title=?, articles.content=? WHERE articles.id=?'

         const paramsImgSQL = [fields.imgDescription, newFilename, fields.imgId]
         const imgSQL = 'UPDATE images SET description = ?, url = ?  WHERE id = ?'
         // Première requête pour le titre et contenu
         pool.query(articlesQL, paramsArticleSQL, (err, result) => {
          if (err) throw err
          // Deuxième pour l'image et sa description 
          pool.query(imgSQL, paramsImgSQL, (err, result) => {
           if (err) throw err
           // Suppression de l'ancien fichier du dossier public
           fs.unlink('public/img/' + fields.imgUrl, (err) => {
            if (err) throw err
            res.json({ response: true, message: 'image envoyer + deja une image en BDD pour ce createur' })
           })
          })
         })
        }
        else {
         res.json({ response: false, msg: "Champs trop longs" })
        }
       }
       else { //Changement de l'image uniquement 
        // Vérification de la longueur des input
        if (inputLength(fields.imgDescription)) {

         const paramsImgSQL = [fields.imgDescription, newFilename]
         const imgSQL = 'INSERT INTO images (description, url) VALUES (?,?)'
         const articlesQL = 'UPDATE articles SET articles.title=?, articles.content=?, articles.image_id=? WHERE articles.id=?'
         // Requête pour insérer une image et sa description 
         pool.query(imgSQL, paramsImgSQL, (err, result) => {
          if (err) throw err
          const paramsarticlesQL = [fields.title, fields.content, result.insertId, req.params.id]
          // Requête pour modifier le titre, contenu, l'id de l'image
          pool.query(articlesQL, paramsarticlesQL, (err, result) => {
           if (err) throw err
           res.json({ response: true, message: "L'article a bien été modifié" })
          })
         })
        }
        else {
         res.json({ response: false, msg: "Champs trop longs" })
        }
       }
      })
     }
    }
   }
   else { //Changement du contenu de l'article sans image
    if (inputLength(fields.title, 63) && inputLength(fields.content, 1500)) {
     const articleDescription = 'UPDATE articles SET articles.title=?, articles.content=? WHERE articles.id=?'
     const articleDescriptionParams = [fields.title, fields.content, req.params.id]
     pool.query(articleDescription, articleDescriptionParams, (err, result) => {
      if (err) throw err
      res.json({ response: true, message: "L'article a bien été modifié" })
     })
    }
    else {
     res.json({ response: false, msg: "Champs trop longs" })
    }
   }
  })
  // 

 }


 export { getToUpdateArticle, updateArticle }
 