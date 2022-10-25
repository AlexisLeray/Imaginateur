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
            console.log("champs trops longs")
        }    
    } //fin de la fonction submit
    
    return(
        <Fragment>
            {state.logged === false ?
                <Fragment> 
                    <h2>Connectez-vous pour laisser un message</h2>
                    <Connexion />
                </Fragment>    
            :
                <form action ="" type="post" onSubmit={submit}>
                {successMsg !== "" && <p>{successMsg}</p>}
                    Nom:
                    <p>{state.name}</p>
                    Prénom: 
                    <p>{state.first_name}</p>
                    <label>Adresse mail 
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} maxLength="63" />
                        {!inputLength(title, 63) && 
                            <p>Max 63 caractères</p>
                        }
                    </label>
                    <label>T'AS QUOI A DIRE LA ?!!!!!! </label>
                        <textarea value={content} onChange={(e) => setContent(e.target.value)} maxLength="255" rows="10" cols="24"></textarea>
                        {!inputLength(content) && 
                            <p>Max 255 caractères</p>
                        }
                    <button type="submit">jensairien</button>
                </form>
            }    
        </Fragment>
        )
}
export default Contact