import React, { useContext, Fragment } from "react"
import { ReducerContext } from "./reducer/reducer.jsx"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import BASE_URL from "../config.js"
import { inputLength } from '../utils/utils.js'

const NewCategory = () => {
    // declaration des state
    let [category, setCategory] = React.useState("")
    const [msg, setMsg] = React.useState("")

    // ===========================================
    //          AJOUT DE CATEGORIE
    // ==========================================

    const submit = (e) => {
        // preventDefault() empêche l'actualisation automatique de la page du navigateur
        e.preventDefault()
        // Si le nombre de caractère maximal correspond à la longueur établie
        if (inputLength(category)) {
            // Requête post en envoyant le contenu de "category"
            axios.post(`${BASE_URL}/newCategory`, {
                    category
                })
                // Réponse du back récupère le message qui l'accompagne pour le stocker dans msg
                .then((res) => {
                    setMsg(res.data.msg)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        else {
            window.alert("champs trops longs")
        }
    }
    return (
        <Fragment> 
            <h2>Ajouter une nouvelle catégorie</h2>
            {msg &&
                <h2>{msg}</h2>
            }
                <form method="post" >
                    <label>Nouvelle catégorie
                        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} maxLength="255"/>
                        {!inputLength(category) && 
                            <p>Max 255 caractères</p>
                        }
                    </label>    
                    <button type="submit" onClick={submit}>valider</button>
                </form>
        </Fragment>
    )
}
export default NewCategory
