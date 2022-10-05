import React from "react"

export const initialState = {
    todo: [],
    logged:false,
    admin:false,
    creator:false,
    name: null,
    first_name: null,
    id: null
}

export const reducer = (state, action) => {
    switch(action.type){
        case 'test': {
            return {...state, todo:[...action.payload]}
        }
        case 'connexion': {
            return {...state, logged:true, name:action.name, first_name:action.fname, id:action.id
            }
        }
        case 'admin': {
            return {...state, admin:true}
        }
        case 'creator': {
            return {...state, creator:true}
        }
        case 'logout': {
            return {...state, logged:false, admin:false, creator:false, name:null, first_name:null}
        }
        default: return state 
    }
}


export const ReducerContext = React.createContext([])

