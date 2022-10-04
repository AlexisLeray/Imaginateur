import React,{useContext, Fragment} from "react"
 import {ReducerContext} from "./reducer/reducer.jsx"
import axios from 'axios'
import BASE_URL from "../config.js"
import Connexion from './Connexion.jsx'


const Galery =() => {
const [state, dispatch] = useContext(ReducerContext);
   
    return(
        <Fragment>
        {console.log("la réponse est : " + state.creator)}
            {state.creator === false ? 
                <Fragment>
                    <h2>Espace réservé aux créateurs</h2>
                    <Connexion />
                </Fragment>
            : 
                <h2>Bienvenue</h2>
            }
            </Fragment>
        )
}
export default Galery