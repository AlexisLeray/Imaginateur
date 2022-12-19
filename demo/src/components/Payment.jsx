import React, { useContext, useEffect, Fragment } from "react"
import { ReducerContext } from "./reducer/reducer.jsx"
import axios from 'axios'
import BASE_URL from "../config.js"
import { NavLink, useParams } from "react-router-dom";

const Payment = ({ update }) => {
    // Récupération de l'id de l'url 
    const { id } = useParams()
    // Déclaration des divers states utiles
    const [state, dispatch] = useContext(ReducerContext)
    const [price, setPrice] = React.useState([])
    const [msg, setMsg] = React.useState("")

    // ===========================================
    //          CALCUL DU TOTAL DU PANIER
    // ==========================================
    // useEffect se mettant à jour lorsque que le state.quantity change
    useEffect(() => {
        // Déclaration de la variable total
        let total = 0
        // Pour ce fait tant que i est inférieur au state.quantity on l'incrémente
        for (let i = 0; i < parseInt(state.quantity); i++) {
            // On aditionne tous les prix contenus dans le state.basketDetails 
            total += parseInt(state.basketDetails[i].price)
        }
        // Quand la boucle est terminée on stock le résultat dans le price
        setPrice(total)
    }, [state.quantity])

    // ===========================================
    //          VALIDATION DU PAIEMENT
    // ==========================================

    const submit = (e) => {
        // preventDefault() empêche l'actualisation automatique de la page du navigateur
        e.preventDefault()
        // Déclaration d'une constante qui est un tableau vide appelé idProduct
        const idProduct = []
        // Stockage des informations de baskteDetails dans la constante toBuy
        const toBuy = [...state.basketDetails]
        // map de toBuy avec comme paramètre item
        toBuy.map((item) => {
            // On ajout au tableau idProduct l'id du produit de l'objet item 
            idProduct.push(item.product_id)
        })
        // Requête post en utilisant l'id de l'utilisateur pour laquelle on envoi l'id du produit sélectionné
        axios.post(`${BASE_URL}/payment/${id}`, {
                product_id: idProduct
            })
            // Si réponse du back on set son message dans msg et on vide le state du dispatch shop
            .then((res) => {
                setMsg(res.data.msg)
                dispatch({ type: 'shop', quantity: 0, basketDetails: [] });
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <Fragment>
            <section>
                <header className="payment__header">
                    <h2>Paiement</h2>
                    {msg &&
                        <div className="payment__msg">
                            <h3>{msg}</h3>
                        </div>
                    }
                </header>
                    {state.basketDetails[0]  ?  
                    <Fragment> 
                    <main>
                        <table className="payment__table table__container">
                            <thead>
                                <tr>
                                    <th>Titre</th>
                                    <th>Image</th>
                                    <th>Prix</th>
                                </tr>
                            </thead>
                            <tbody> 
                                {state.basketDetails.map((e,i)=> { 
                                    return (
                           
                                        <tr key={i}>
                                        <td>{e.title}</td>
                                        <td>
                                            <div className="payment__img-container">
                                            <img src={`http://alexisleray.sites.3wa.io:9300/img/${e.url}`} alt={e.img_description} className="img_lite"  />
                                            </div>
                                        </td>
                                
                                        <td>{e.price}€</td>
                                    </tr>
                                    )
                                    
                                })}
                                </tbody>
                                <tfoot className="payment__table__footer">
                                <tr>
                                    <th>Total</th>
                                    <td></td>
                                    <td>{price}€</td>
                                </tr>
                                </tfoot>
                            
                        </table>  
                        <div className="container">    
                            <form type="post" className="payment__card ">
                                <div className="payment__card-info">
                                    <label> Numéro de carte
                                        <input type="number"   maxLength="5"/> 
                                    </label>
                                    <label>Date d'expiration
                                        <input type="number" /> 
                                    </label>
                                    <label>Nom du titulaire
                                        <input type="text" maxLength="63"/>
                                    </label>
                                    <label>Cryptogramme
                                        <input type="number" /> 
                                    </label>
                                </div>
                                <button type="submit" onClick={submit}>Valider</button>
                            </form> 
                        </div> 
                    </main>
                </Fragment>
                :
                <Fragment>
                    <main className="payment__empty">
                        <p>Votre panier est vide</p>
                        <NavLink to="/shop">
                            Retour vers la boutique
                        </NavLink>
                    </main>
                </Fragment>
                    }
            </section>
        </Fragment>
    )
}

export default Payment
