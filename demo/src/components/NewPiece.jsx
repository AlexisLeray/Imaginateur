import React,{useContext, Fragment} from "react"
 import {ReducerContext} from "./reducer/reducer.jsx"
import axios from 'axios'
import BASE_URL from "../config.js"

const NewPiece = () => {
    return(
        <Fragment>
            <h2>C'est la page nouvelle pièce </h2>
        </Fragment>
        )    
}
export default NewPiece