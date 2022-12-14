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
        <section className="admin ">
            <NewCategory />
                <nav className="adminNav container">
                    <ul className="adminNav__list">
                        <li>
                            <NavLink to="/admin/getMessage">
                                {counter}  messages
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
                </nav>    
            <h2>Nouvelles propositions d'oeuvres à publier</h2>
            <ToApprouved />    
            </section>
        </Fragment> 
    )
}
export default Admin