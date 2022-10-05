import React,{useContext, Fragment} from "react"
import {ReducerContext} from "./reducer/reducer.jsx"
import axios from 'axios'
import BASE_URL from "../config.js"
import Connexion from './Connexion.jsx'

const Contact =() => {
    const [state, dispatch] = useContext(ReducerContext)
    const [title, setTitle] = React.useState("")
    const [content, setContent] = React.useState("")
    const [successMsg, setSuccessMsg] = React.useState("")
    
    const submit = () => {
        
        const {id} = state 
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
            
    }
    
    console.log(state)
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
                    <label>Adresse mail </label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} maxLength="255" />
                    
                    <label>T'AS QUOI A DIRE LA ?!!!!!! </label>
                        <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                    <button type="submit">jensairien</button>
                </form>
            }    
        </Fragment>
        )
}
export default Contact