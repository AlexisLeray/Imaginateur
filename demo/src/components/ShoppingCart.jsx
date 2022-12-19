import React, { useContext, useEffect, Fragment } from "react"
import { ReducerContext } from "./reducer/reducer.jsx"
import axios from 'axios'
import BASE_URL from "../config.js"
import { useParams, NavLink } from "react-router-dom";




const ShoppingCart = () => {
    // Récupération des données du reducer
    const [state, dispatch] = useContext(ReducerContext)
    const { id } = useParams()
    // Déclaration des divers states
    let [myShop, setMyShop] = React.useState([])
    const [update, setUpdate] = React.useState(false)

    // ===========================================
    //          RECUPERATION DU CONTENU DU PANIER
    // ==========================================
    // useEffect qui se met à jour en fonction du statur de update
    useEffect(() => {
        axios.get(`${BASE_URL}/panier/${id}`)
            // Réponse du back
            .then((res) => {
                // On stock le résultat dans la requête dans myShop
                setMyShop(res.data.result)
            })

            .catch((err) => {
                console.log(err)
            })
    }, [update])
    // ===========================================
    //      SUPPRESSION DU PRODUIT DU PANIER 
    // ==========================================


    const submit = (e, shop_id) => {
        // preventDefault() empêche l'actualisation automatique de la page du navigateur
        e.preventDefault()
        // Requête post en utilisant l'id de l'utilisateur et en envoyant l'id du panier concerné
        axios.post(`${BASE_URL}/panier/${id}`, {
                shop_id: shop_id
            })
            .then((res) => {
                // On change le statur d'update pour actualisation du useEffect
                setUpdate(!update)
                // On execute la fonction updateBasket
                updateBasket()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // ===========================================
    //      ACTUALISATION DU PANIER
    // ==========================================
    // Fonction updateBasket pour mise à jour du panier 
    const updateBasket = () => {
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
    }
    
    return (
        <Fragment>
            <section className="basket__container container">
                <header>
                    <h2>Votre panier</h2>
                </header>
                <main className="basket__main container">
                {myShop[0] ?   
                   <Fragment>
                            {myShop.map((e,i) => (
                            <Fragment  key={i}>
                                    <div className="basket__card-content  cards">
                                        <h3>{e.title}</h3>
                                        <div className="basket__card-img container">
                                            <img src={`http://alexisleray.sites.3wa.io:9300/img/${e.url}`} alt={e.description} className="img_lite"/>
                                        </div>
                                        <div>{e.content}</div>
                                        <div>Prix : {e.price}€</div>
                                        <button type="submit" onClick={(el) => submit(el, e.shop_id)}>Supprimer</button>
                                    </div>    
                                </Fragment>
                            ))}
                        
                       <div className="basket__payment">
                            <NavLink to={`/payment/${id}`}> 
                                Valider mon panier 
                            </NavLink>
                        </div>
                   </Fragment>
                :
                <Fragment>
                    <NavLink to="/shop">
                        Retour vers la boutique
                    </NavLink>
                </Fragment>
                }
                </main> 
            </section>
        </Fragment>
    )
}
export default ShoppingCart
