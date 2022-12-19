 const host = "http://alexisleray.sites.3wa.io"
 const port = 9300
 const BASE_URL = `${host}:${port}`
 import {pool} from '../config/dataBase.js'
 import fs from 'fs'
 
 
 // ===========================================
//      SUPPRESSION D'ARTICLES 
// ========================================== 

const deleteArticle = (req,res) => {
    
    
    let deleteSQL = 'DELETE FROM articles WHERE id=?'
    let deleteImg = 'DELETE FROM images WHERE images.id=?'
    // Requête pour supprimer l'article selon son id 
    pool.query(deleteSQL, [req.body.id], (err, result) =>{
        if (err) throw err
        if(result) {
            // S'il l'image n'est pas undefined c'est qu'elle est présente
            if(req.body.imageID !== undefined) {
            // On supprime l'image grade à l'imageId
            pool.query(deleteImg, [req.body.imageId], (err, imgDeleted) => {
                if (err) throw err
                // On supprime le fichier du dossier public
                fs.unlink('public/img/'+req.body.image, (err) => {
                    if (err) throw err
                    res.json({response:true, msg:"image supprimée"})
                })
           })
            }else {
                res.json({response:true, msg:"article sans image supprimé"})
            }
        }else{
            res.json({response: false})
        }
    })
}
export default deleteArticle