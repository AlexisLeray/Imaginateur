import React,{useContext,useEffect, Fragment, useState} from "react"
import {ReducerContext} from "./reducer/reducer.jsx"
import axios from 'axios'
import BASE_URL from "../config.js"
import { useParams } from "react-router-dom";


const CreatorProfil = () => {
    // Stockage de l'id utilisateur displonible dans le reducer
    const {id} = useParams()
    const [profil, setProfil] = useState("")
    
// ===========================================
//        RECUPERATION DES INFO CREATEUR
// ==========================================    
    // useEffect au montage du composant 
    useEffect(()=> {
        // Requête SQL pour récupérer les informations du profil créateur
        axios.get(`${BASE_URL}/creatorProfil/${id}`)
        .then((res) => {
            // Si il y a une réponse du la BDD on stock le résultat dans profil
            setProfil(res.data.result)
        })
        .catch((err)=> {
            // En cas d'erreur console.log de l'errer
            console.log(err)
        })
   }, [])    

    return(
        <Fragment>
            <section className="creatorProfil container">
                {profil &&   
                    <Fragment>
                        <h2>Page spécifique du créateur</h2>
                        {profil.map((e,i) => (
                            <Fragment key={i}>
                                <div className="creatorProfil__content">
                                    <div className="creatorProfil__content-img-container">
                                        <img src={`http://alexisleray.sites.3wa.io:9300/img/${e.url}`} />
                                    </div>
                                        <h3>{e.name} {e.first_name}</h3>
                                </div>
                                    <div className="creatorProdil__content-txt">
                                        <h3>Présentation : </h3>
                                        <p>{e.description}</p>
                                    </div>
                                
                            </Fragment>
                        ))}
                    </Fragment>    
                }
            </section>
        </Fragment>
    )
}

export default CreatorProfil