import jwt from "jsonwebtoken"

const privateKey = 'eyJlbWFpbCI6InRlc3RAdGVzdC5mciIsInVzZXIiOnRydWUsImFkbWluIjp0cnVlLCJpYXQiOjE2NjY1MjQyNjYsImV4cCI6MTY2NjUyNzg2Nn0'

// ===========================================
//      GENERATION D'UN NOUVEAU JETON D'AUTHENTIFICAITON 
// ==========================================

export const generateToken = async(userData) => {
    // console.log(userData)
    const token = await jwt.sign(userData, privateKey)
    return token
}

// ===========================================
//      FONCTION DE VERIFICATION DE JWT 
// ==========================================

export const verifyToken = async(token) => {
    try {
        if (token) {
            const jwtToken = await jwt.verify(token, privateKey)
            return jwtToken

        }
        else {
            return undefined
        }
    }
    catch (err) {
        // token invalide
        return undefined
    }
}
