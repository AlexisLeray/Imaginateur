import React, { useContext, Fragment, useEffect } from "react"
import { ReducerContext } from "./reducer/reducer.jsx"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import BASE_URL from "../config.js"


const ToApproved = () => {
    // Déclaration des divers states
    const [pendingPiece, setPendingPiece] = React.useState([])
    const [update, setUpdate] = React.useState(false)

    /// ===========================================
    //  RECUPERATION DES ARTICLES POUR PUBLICATION
    // ==========================================
    // useEffect se mettant à jour au changement du statut de update
    useEffect(() => {
        axios.get(`${BASE_URL}/toApproved`)
            // Réponse du back
            .then((res) => {
                // On affect le résultat du back à pendingPiece
                setPendingPiece(res.data.newProducts)

            })
            .catch((err) => {
                console.log(err)
            })
    }, [update])

    /// ===========================================
    //  FONCTION VALIDATION DE L'OEUVRE
    // ==========================================

    const validate = (e, id) => {
        // Requête post en envoyant l'id du produit
        axios.post(`${BASE_URL}/toApproved`, {
                id: id
            })
            // Réponse du back 
            .then((res) => {
                // On change le statut de update pour actualiser l'affichage des oeuvres
                setUpdate(!update)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <Fragment>
            <h2>Nouvelles propositions d'oeuvres à publier</h2>
        <section className="approved__table-container container">
            {pendingPiece.map((e,i) => { 
                 return(  
                    <table key={i} className="approved__container table__container">
                    <tbody>
                        <tr className="approved__row">   
                            <th>Auteur</th>
                            <td>{e.first_name} {e.name}</td>
                        </tr>
                        <tr className="approved__row">
                            <th>Mail</th>
                            <td>{e.mail}</td>
                        </tr>
                        
                        <tr className="approved__row">
                            <th>Image</th>
                            <td>    
                                <div className="approved__img-container">
                                    <img src={`http://alexisleray.sites.3wa.io:9300/img/${e.url}`}  alt={e.description}/>
                                </div>
                            </td>
                        </tr>
                        
                        <tr className="approved__row">
                            <th>Description de l'image</th>
                            <td>{e.description}</td>
                        </tr>
                        
                        <tr className="approved__row">
                            <th>Titre</th>
                            <td>{e.title}</td>
                        </tr>
                        <tr className="approved__row">
                            <th>Contenu</th>
                            <td>{e.content}</td>
                        </tr>
                        <tr className="approved__row">
                            <th>Prix</th>
                            <td>{e.price}€</td>
                        </tr>
                        <tr className="approved__row last_row">
                       {/* <th>Actions</th> */}
                       <th></th>
                            <td>
                                 <button type="submit" onClick={(el) => validate(el, e.id)} > 
                                    Approuvé ! 
                                </button>

                            </td>
                        </tr>
                    </tbody>
                </table>   
                 ) 
             })} 
             </section>
    </Fragment>

    )

}
export default ToApproved
