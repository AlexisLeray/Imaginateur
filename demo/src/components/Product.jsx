import React, { useContext, useEffect, Fragment, useState } from "react"
import { ReducerContext } from "./reducer/reducer.jsx"
import axios from 'axios'
import BASE_URL from "../config.js"
import { useParams, useNavigate } from "react-router-dom";
import { inputLength } from '../utils/utils.js'

const Product = () => {
    // Déclaration d'un state product qui est un tableau vide 
    const [product, setProduct] = React.useState([])
    // Récupération de l'id produit contenu dans l'url
    const { id } = useParams()

    // ===========================================
    //          PUBLICATION D'ARTICLES
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
            {product.map((e,i) => (
                <div key={i}>
                    <div>    
                        <h2>{e.title}</h2> 
                    </div>
                    <div>   
                        <img src={`http://alexisleray.sites.3wa.io:9300/img/${e.url}`} /> 
                    </div>
                    <div>
                        <p>Descriptif : {e.content}</p> 
                    </div>
                    <div>  
                        <p>Prix : {e.price}</p>
                    </div>
                </div>    
            ))}
        </Fragment>
    )
}

export default Product
