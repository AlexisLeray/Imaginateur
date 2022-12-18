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
 const showToUpdate = (req, res) => {
  //  Déclaration de la requête SQL de selection de tous le produit en ajoutant la table image pour pouvoir l'afficher 
  let getProduct = 'SELECT *, images.url, images.description, categories.id, categories.category FROM products JOIN images ON images.id = products.image_id JOIN categories ON categories.id = products.categorie_id WHERE products.id= ?'
  // Requête SQL vers la base de donnée en utilisant l'id du produit (req.params.id) 
  pool.query(getProduct, [req.params.id], (err, selectedProduct) => {
   if (err) throw err
   //  On reçoit le résultat de la requête sous forme d'un objet JSON avec la réponse true et le résultat de la requête SQL 
   res.json({ response: true, selectedProduct })

  })
 }
 // ===========================================
 //      AFFICHAGE DES CATEGORIES 
 // ==========================================  

 const getGategory = (req, res) => {
  //  Déclaration de la requête SQL qui selectionne tout de la table categories
  const category = 'SELECT * from categories'
  //  Requête SQL de category en deuxième paramètre un tableau vide et callback err, allCategory 
  pool.query(category, [], (err, allCategory) => {
   if (err) throw err
   //  Si allCategory n'est pas vide 
   if (allCategory) {
    //  Résultat de la requête sous forme d'objet JSON contenant response: true et le résultat de la requête 
    res.json({ response: true, allCategory })
   }
   else {
    //  Dans l'autre cas renvois une reponse false 
    res.json({ response: false })
   }
  })
 }
 // ===========================================
 //      MISE A JOUR DU PRODUIT AVEC IMAGE
 // ==========================================  

 const update = (req, res) => {
  // Constante from pour stocker une instance de la classe formidable en gardant les extensions des fichiers téléchargés 
  const form = formidable({ keepExtensions: true });
  const maxSize = 2000000; //On défini la taille maximale des images 
  const acceptedExtension = ['jpeg', 'jpg', 'png', 'gif'] //On défini les extensions acceptées 


  let updateProduct = 'UPDATE products SET products.title=?, products.price=?, products.content=?, products.categorie_id=? WHERE products.id=?'
  let updatePicture = 'UPDATE images SET description=?, url=? WHERE images.id= (SELECT * FROM (SELECT images.id FROM images INNER JOIN products ON products.image_id = images.id WHERE products.id= ?)sub GROUP BY id)'

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
    let newPath = `public/img/${newFilename}`;
    const file = files.files
    // Vérification de l'extension du fichier 
    const isExtensionValid = await checkAcceptedExtensions(file, acceptedExtension)
    // Si l'extension n'est pas valide
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
       // suppression de l'ancien fichier du dossier public 
       fs.unlink('public/img/' + fields.imgUrl, (err) => {
        if (err) throw err
       })
       // Vérification de la longueur des inputs
       if (inputLength(fields.imgDescription) && inputLength(fields.title) && inputLength(fields.price) && inputLength(fields.productDescription)) {
        // Lancement requête SQL avec description de l'image, nom du fichier et id du produit
        pool.query(updatePicture, [fields.imgDescription, newFilename, req.params.id], (err, added) => {
         if (err) throw err
         if (added) {
          // Requête SQL pour le titre, prix, descritption, catégorie et id produit
          pool.query(updateProduct, [fields.title, fields.price, fields.productDescription, fields.category_id, req.params.id], (err, addProduct) => {
           if (err) throw err
           if (addProduct) {
            //l'url du fichier est bien transféré
            res.json({ response: true })
           }
           else {
            res.json({ response: false })
           }
          })
         }
        })
       }
       else {
        res.json({ response: false, msg: "Champs trop longs" })
       }
      })
     }
    }
   }
   else { 
    // ============================================= UPDATE DU PRODUIT SANS IMAGE================================================
    if (inputLength(fields.title) && inputLength(fields.price) && inputLength(fields.productDescription)) {
     // Requête avec uniquement titre, prix description, catégories et l'id produit
     pool.query(updateProduct, [fields.title, fields.price, fields.productDescription, fields.category_id, req.params.id], (err, addProduct) => {
      if (err) throw err
      if (addProduct) {
       res.json({ response: true })
      }
      else {
       res.json({ response: false })
      }
     })
    }
    else {
     res.json({ response: false, msg: "Champs trop longs" })
    }
   }
  })
 }


 export { showToUpdate, update }
 