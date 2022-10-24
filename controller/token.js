import jwt from "jsonwebtoken"

const privateKey = 'eyJlbWFpbCI6InRlc3RAdGVzdC5mciIsInVzZXIiOnRydWUsImFkbWluIjp0cnVlLCJpYXQiOjE2NjY1MjQyNjYsImV4cCI6MTY2NjUyNzg2Nn0'

export const generateToken = async (userData) => {
    const token = await jwt.sign(userData, privateKey)
    return token
}

export const verifyToken = async (token) => {
    try {
        if(token) {
            const jwtToken = await jwt.verify(token, privateKey)
            return jwtToken
    
        } else {
            return undefined
        }
    }
    catch(err){
        // token invalide
        return undefined
    }
}