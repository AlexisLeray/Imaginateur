import { generateToken, verifyToken } from './token.js'

// ===========================================
//       VERIFICATION DE CONNEXION
// ==========================================
// Fonction asynchrone 
const isLogged = async(req, res) => {
    // On vérifie l'objet req.body.token avec la fonction verifyToken et on attend la réponse 
    const userData = await verifyToken(req.body.token)
    // On vérifie si userData existe
    if (userData) {
        // Si elle existe c'est que le jeton fourni est valide et on strock les infos dans la variable token
        const token = await generateToken(userData)
        res.json({
            response: true,
            logged: true,
            admin: userData.admin,
            creator: userData.creator,
            name: userData.name,
            first_name: userData.first_name,
            id: userData.id,
            id_creator: userData.id_creator,
            token
        })
    }
    else {
        res.json({ response: false })
    }
};

export default isLogged;
