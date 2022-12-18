import React,{useContext, Fragment} from "react"
import {ReducerContext} from "./reducer/reducer.jsx"
import axios from 'axios'
import BASE_URL from "../config.js"
import Connexion from './Connexion.jsx'
import {inputLength} from '../utils/utils.js'

const Contact =() => {
    const [state, dispatch] = useContext(ReducerContext)
    const [title, setTitle] = React.useState("")
    const [content, setContent] = React.useState("")
    const [successMsg, setSuccessMsg] = React.useState("")
    const [checkInputs, seCheckInputs] = React.useState(false)
    
// ===========================================
//          FONCTION SUBMIT MESSAGES 
// ==========================================
    
    const submit = (e) => {
        // preventDefault() empêche l'actualisation automatique de la page du navigateur
        e.preventDefault()
        // Récurpération de l'id de l'utilisateur 
        const {id} = state 
        
        // Vérification de la longueur des champs entrés 
        if(inputLength(title,63) && inputLength(content)){
            // Méthode post vers la BDD de contact avec l'id de l'utilisateur, le titre et le contenu de son message 
            axios.post(`${BASE_URL}/contact`, {
                id,
                title, 
                content,
            })
            .then((res) => {
                // Si il y a une réponse de la BDD
                if(res.data.response) {
                    // Affecter le message au state successMsg et on vide les inputs title et content 
                    setSuccessMsg(res.data.msg)
                    setTitle('')
                    setContent('')
                }else {
                    // Si reponse false set juste le message 
                    setSuccessMsg(res.data.msg)
                }
            })
            .catch((err) => {
                console.log(2)
              console.log(err)
            })
        }
        else {
            seCheckInputs(true)
            console.log("champs trops longs")
        }
    } 
    
    return(
        <Fragment>
            <section>
                {state.logged === false ?
                    <Fragment> 
                        <div className="contact__form container">
                            <h2>Connectez-vous pour laisser un message</h2>
                            <Connexion />
                        </div>    
                    </Fragment>    
                :
                    <form action ="" type="post" onSubmit={submit} className="contact__form container">
                        {successMsg !== "" && <p>{successMsg}</p>}
                        <header>
                            <div className="contact__form__header-name">
                                <h3>Nom: </h3>
                                <p>{state.name}</p>
                            </div>
                            <div className="contact__form__header-firstName">
                                <h3>Prénom:</h3> 
                                <p>{state.first_name}</p>
                            </div>
                        </header>
                        <main>
                            <label>Objet de la demande 
                                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} maxLength="63" />
                                {!inputLength(title, 63) && 
                                    <p>Max 63 caractères</p>
                                }
                            </label>
                            <label>Dites nous tout
                                <textarea value={content} onChange={(e) => setContent(e.target.value)} maxLength="255" rows="10" cols="24"></textarea>
                            </label>
                                {!inputLength(content) && 
                                    <p>Max 255 caractères</p>
                                }
                                {checkInputs &&
                                    <h2>L'objet doit contenir maximum 63 charactères et 255 pour les détails</h2>
                                }
                            <button type="submit">Envoyer</button>
                        </main>
                    </form>
                }    
            </section>
        </Fragment>
        )
}
export default Contact