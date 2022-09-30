import React from "react"

export const initialState = {
    todo: [],
    logged:false,
    admin:false,
    creator:false,
}

export const reducer = (state, action) => {
    switch(action.type){
        case 'test': {
            return {...state, todo:[...action.payload]}
        }
        case 'connexion': {
            return {...state, logged:true}
        }
        case 'admin': {
            return {...state, admin:true}
        }
        case 'creator': {
            return {...state, creator:true}
        }
        case 'logout': {
            return {...state, logged:false, admin:false, creator:false}
        }
        default: return state 
    }
}


export const ReducerContext = React.createContext([])

