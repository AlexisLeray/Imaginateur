import {generateToken, verifyToken} from './token.js'

const isLogged = async (req,res) => {
    const userData = await verifyToken(req.body.token)
    if(userData){
        const token = await generateToken(userData)
        res.json({response:true,
        logged:true,
        admin:userData.admin, 
        creator:userData.creator, 
        name:userData.name, 
        first_name:userData.first_name, 
        id:userData.id, 
        id_creator:userData.id_creator, 
        token})
    } else {
        res.json({response:false})
    }
};

export default isLogged;