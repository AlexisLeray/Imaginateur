 const host = "http://alexisleray.sites.3wa.io"
 const port = 9300
 const BASE_URL = `${host}:${port}`
 import pool from '../config/dataBase.js'
 import fs from 'fs'
 
const deleteArticle = (req,res) => {
    
    
    let deleteSQL = 'DELETE FROM articles WHERE id=?'
    let deleteImg = 'DELETE FROM images WHERE images.id=?'
    pool.query(deleteSQL, [req.body.id], (err, result) =>{
        if (err) throw err
        if(result) {
            pool.query(deleteImg, [req.body.imageId], (err, imgDeleted) => {
                if (err) throw err
                fs.unlink('public/img/'+req.body.image, (err) => {
                    if (err) throw err
                    res.json({response:true, msg:"image supprimée"})
                })
           })
        }else{
            console.log("IMAGE PAS SUPPRIMEE")
        }
    })
}
export default deleteArticle