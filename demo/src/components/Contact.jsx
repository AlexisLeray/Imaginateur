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
    const submit = (e) => {
        e.preventDefault()
        const {id} = state 
        
            if(inputLength(title,63) && inputLength(content)){
                axios.post(`${BASE_URL}/contact`, {
                    id,
                    title, 
                    content,
                })
                .then((res) => {
                    if(res.data.response) {
                        
                        setSuccessMsg(res.data.msg)
                        setTitle('')
                        setContent('')
                    }
                })
                .catch((err) => {
                  console.log(err)
                })
            }else{
                seCheckInputs(true)
                console.log("champs trops longs")
            }
    } //fin de la fonction submit
    
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