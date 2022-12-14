import React from "react"

export const initialState = {
    todo: [],
    logged:false,
    admin:false,
    creator:false,
    name: null,
    first_name: null,
    id: null,
    creatorId: null
}

export const reducer = (state, action) => {
    switch(action.type){
        case 'test': {
            return {...state, todo:[...action.payload]}
        }
        case 'connexion': {
            return {...state, 
            logged:true, 
            name:action.name, 
            first_name:action.fname, 
            mail: action.mail,
            id:action.id
            }
        }
        case 'admin': {
            
            return {...state, admin:true, creator:true, name:action.name, first_name:action.fname, creatorId:action.creatorId}
            
        }
        case 'creator': {   
            return {...state, creator:true, name:action.name, first_name:action.fname, creatorId:action.creatorId}
        }
        case 'logout': {
            return {...state, logged:false, admin:false, creator:false, name:null, first_name:null, creatorId: null, id: null, quantity: null}
        }
        case 'shop': {
            return {...state, quantity:action.quantity, basketDetails:action.basketDetails}
        }
        default: return state 
    }
}


export const ReducerContext = React.createContext([])

