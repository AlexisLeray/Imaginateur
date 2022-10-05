import React,{useContext, Fragment} from "react"
 import {ReducerContext} from "./reducer/reducer.jsx"
import axios from 'axios'
import BASE_URL from "../config.js"

const Home =() => {
    return(
        <Fragment>
            <h2>C'est la page home</h2>
        </Fragment>
        )
}
export default Home