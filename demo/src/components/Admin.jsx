import React,{Fragment, useEffect, useState} from "react"
import {NavLink} from "react-router-dom"
import NewCategory from "./NewCategory"
import ToApprouved from "./ToApprouved"
import BASE_URL from "../config.js"
import axios from "axios"




const Admin =() => {
    const [counter, setCounter] = useState(0)
    useEffect(() => {
    axios.get(`${BASE_URL}/admin/getMessage`)
        .then((res) => {
            setCounter(res.data.commentArray.length)
        })
        .catch((err) => {
            console.log(err)
        })
    },[])
    
    return(
        <Fragment>
            <NewCategory />
            <ul>
                <li>
                    <NavLink to="/admin/getMessage">
                        {counter} nouveaux messages
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/NewPiece">
                        Mes oeuvres
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/newCreator">
                        Nouveau Créateur
                    </NavLink>
                </li>
            </ul>
            <h2>Nouvelles propositions d'oeuvres à publier</h2>
            <ToApprouved />    
        </Fragment> 
    )
}
export default Admin