import React,{useContext, Fragment} from "react"
import {ReducerContext} from "./reducer/reducer.jsx"
import axios from 'axios'
import BASE_URL from "../config.js"
import Connexion from './Connexion.jsx'

const Contact =() => {
    const [state, dispatch] = useContext(ReducerContext)
    
    
    
    
    
    let content;
    console.log(state.name)
    return(
        <Fragment>
            {state.logged === false ?
                <Fragment> 
                    <h2>Connectez-vous pour laisser un message</h2>
                    <Connexion />
                </Fragment>    
            :
                <form action ="" type="post">
                    Nom:
                    <p>{state.name}</p>
                    Prénom: 
                    <p>{state.first_name}</p>
                    <label>Adresse mail </label>
                        <input type="mail"  maxLength="255" />
                    
                    <label>T'AS QUOI A DIRE LA ?!!!!!! </label>
                        <textarea value={content}></textarea>
                    
                </form>
            }    
        </Fragment>
        )
}
export default Contact