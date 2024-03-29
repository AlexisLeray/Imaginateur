import React, { useContext, useEffect, Fragment, useState } from "react"
import { ReducerContext } from "./reducer/reducer.jsx"
import axios from 'axios'
import BASE_URL from "../config.js"
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { inputLength } from '../utils/utils.js'

const Product = () => {
    // Déclaration d'un state product qui est un tableau vide 
    const [product, setProduct] = React.useState([])
    // Récupération de l'id produit contenu dans l'url
    const { id } = useParams()

    // ===========================================
    //        AFFICHAGE DU PRODUIT
    // ==========================================
    // useEffect au montage pour récupérer les détails du produit
    useEffect(() => {
        // Requête post en utilisant l'id produit
        axios.get(`${BASE_URL}/product/${id}`)
            // Si réponse du back on affecte le résultat à product
            .then((res) => {
                setProduct(res.data.product)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <Fragment>
            <section className="productPage container"> 
                {product.map((e,i) => (
                    <div key={i} className="productPage__content-container">
                        <div>    
                            <h3>{e.title}</h3> 
                        </div>
                        <div className="productPage__img-container">   
                            <img src={`http://alexisleray.sites.3wa.io:9300/img/${e.url}`} alt={e.description} /> 
                        </div>
                        <div>
                            <p>Description :</p>
                            <p>{e.content}</p> 
                        </div>
                        <div>
                            <p>Prix :</p>
                            <p>{e.price}€</p>
                        </div>
                    </div>    
                ))}
                <NavLink to="/shop" className="productPage__navlink">
                    Retour vers la boutique
                </NavLink>
            </section>
        </Fragment>
    )
}

export default Product
