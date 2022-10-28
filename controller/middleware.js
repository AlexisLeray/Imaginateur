import parseurl from 'parseurl';
import {verifyToken} from './token.js'

const ADMIN = 'admin'
const CREATOR = 'creator'
const USER = 'user'

const protectedPath = (pathname) => {
    // indiquer les routes principales dans le tableau selon l'accès
    const adminPath = [ 'newCategory',  'admin', 'newCategory',  ' deleteArticle', 'updateArticle', 'deleteProduct'];
    const creatorPath = ['updateProduct', 'newPiece', 'myGalery', 'deleteProduct' , 'creator'];
    const userPath = ['contact', 'payment','profil', 'panier'];
    
    // router.get("/api/updateProduct/:id", showToUpdate)
    
    const protectedAdmin = adminPath.includes(pathname)
    const protectedCreator = creatorPath.includes(pathname)
    const protectedUser = userPath.includes(pathname)
    
    if(protectedAdmin){
        return ADMIN
    } else if(protectedUser){
        return USER
    } else if(protectedCreator){
        return CREATOR
    } else {
        return false
    }
}

const accesAutorized = (pathname,userData) => {
    if(protectedPath(pathname) === ADMIN){
        if(userData){
            return userData.admin
        }
        return false
    } else if(protectedPath(pathname) === CREATOR) {
        if(userData){
            return userData.creator
        }
        return false
    } else if(protectedPath(pathname) === USER) {
        if(userData){
            return userData.user
        }
        return false
    } else {
        return true
    }
}

const middleware = async (req, res, next) => {
    let pathname = parseurl(req).pathname.split('/')[2];
    const token = req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : null
    const userData = await verifyToken(token)
    if(accesAutorized(pathname,userData)){
        next()
    } else {
        res.json({response:false, msg:'acces refusé'})
    }
}

export default middleware