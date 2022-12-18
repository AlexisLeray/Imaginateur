import React, { useContext, useEffect, Fragment, useState } from "react"
import { NavLink } from "react-router-dom"
import { ReducerContext } from "./reducer/reducer.jsx"
import axios from 'axios'
import BASE_URL from "../config.js"


const MyGalery = ({ update }) => {
    // Récupération du contenu du reducer
    const [state, dispatch] = useContext(ReducerContext)
    //  Déclaration d'un tableau vide allProducts
    const [allProducts, setAllProducts] = useState([])
    // Déclaration de variable de l'id du créateur
    let id = state.creatorId

    // ===========================================
    // RECUPERATION DU CONTENU DE LA GALERIE DE L'ARTISTE
    // ==========================================
    // useEffect pour la récupération du contenu
    useEffect(() => {
        // axios get en utilisant l'id du crétaeur
        axios.get(`${BASE_URL}/myGalery/${id}`)
            // Si réponse du back on récupère les infos pour les stocker dans le state allProducts
            .then((res) => {
                setAllProducts(res.data.productArray)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [update])

    // ===========================================
    //          SUPPRESSION D'UNE OEUVRE
    // ==========================================

    const deleteProduct = (e, image) => {
        // preventDefault() empêche l'actualisation automatique de la page du navigateur
        e.preventDefault()
        // Requête post en envoyant l'id de l'image et son url
        axios.post(`${BASE_URL}/deleteProduct`, {
                id: image.id,
                imageId: image.image_id,
                image: image.url
            })
            // Si réponse du back on reprend le tableau allProducts en filtrant l'élément supprimé 
            .then((res) => {
                let data = [...allProducts]
                setAllProducts(data.filter((i) => i.id !== image.id))
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }
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
            <section className="galery table__container">
             {allProducts[0] && allProducts.map((e,i) => {
                 return(
            <div key={i} className="galery__table-container">
                <table  className="myGalery__table">
                    <tbody>
                        <tr>
                            <th>Titre</th>
                            <td>{e.title}</td>
                        </tr>
                        <tr>
                            <th>Image</th>
                            <td>
                                <div className="galery__img-container">
                                    <img src={`http://alexisleray.sites.3wa.io:9300/img/${e.url}`}  alt={e.description}/>
                                </div>
                            </td>
                        </tr>    
                        <tr>
                            <th>Prix</th>
                            <td>{e.price}€</td>
                        </tr>
                        <tr>
                            <th>Contenu</th>
                            <td>{e.content}</td>
                        </tr>    
                        <tr>
                            <th>Catégorie</th>
                            <td>{e.category}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="galery__btn navlink">
                        
                            <NavLink to={`/update/${e.id}`}>
                                Modifier
                            </NavLink>
                            <button type="submit" onClick={(el) => deleteProduct(el,e)}> 
                                Supprimer
                            </button>
                        
                        </div>
                </div>
                 )
             })}
            </section>
        </Fragment>
    )
}
export default MyGalery
