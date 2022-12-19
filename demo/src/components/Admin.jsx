import React, { Fragment, useEffect, useState, useContext } from "react"
import { NavLink } from "react-router-dom"
import NewCategory from "./NewCategory"
import ToApprouved from "./ToApprouved"
import BASE_URL from "../config.js"
import axios from "axios"
import { ReducerContext } from "./reducer/reducer.jsx"




const Admin = () => {
    const [state, dispatch] = useContext(ReducerContext);
    const [counter, setCounter] = useState(0)
    // ===========================================
    //  COMPTABILISATION DU NOMBRE DE MESSAGES
    // ===========================================
    // useEffect lancant une requête get au montage 
    useEffect(() => {
        axios.get(`${BASE_URL}/admin/getMessage`)
            // une fois résultat obtenu setCounter de la longueur du tableau reçu
            .then((res) => {
                setCounter(res.data.commentArray.length)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    /// ===========================================
    //          ACTUALISATION DU PANIER
    // ==========================================
    useEffect(() => {
        // Requête get pour récupérer le contenu du panier selon l'id de l'utilisateur
        axios.get(`${BASE_URL}/payment/${state.id}`)
            // Réponse du back
            .then((res) => {
                // Si présence de res.data.toBuy on affecte au state shop la quantité et le détail du panier
                res.data.toBuy && dispatch({ type: 'shop', quantity: res.data.toBuy.length, basketDetails: res.data.toBuy });
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])
    return (
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
                
                <ToApprouved />    
            </section>
        </Fragment>
    )
}
export default Admin
