import React,{useContext, useEffect, Fragment} from "react"
 import {ReducerContext} from "./reducer/reducer.jsx"
import axios from 'axios'
import BASE_URL from "../config.js"
import {inputLength} from '../utils/utils.js'
import Messagerie from './AdminMessage.jsx'
import {NavLink} from "react-router-dom"




const About =() => {
    return(
        <Fragment>
            <ul>
                <li>
                    <NavLink to="/getMessage">
                        T'as des messages ? 
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/newPiece">
                        Mes oeuvres
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/newPiece">
                        Nouvelle oeuvre 
                    </NavLink>
                </li>
                
                <li>
                    <NavLink to="/admin/newCreator">
                        Nouveau Créateur
                    </NavLink>
                </li>
            </ul>
            <h2>C'est la page Admin</h2>
        </Fragment>    
            )
}
export default About