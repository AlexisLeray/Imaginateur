import React,{useContext, Fragment} from "react"
import {ReducerContext} from "./reducer/reducer.jsx"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import BASE_URL from "../config.js"
import {inputLength} from '../utils/utils.js'

const NewCategory = () => {
    let [category, setCategory] = React.useState("")
    const [msg, setMsg] = React.useState("")
    
    const submit = (e) =>{
        e.preventDefault()
        if(inputLength(category)){
            axios.post(`${BASE_URL}/newCategory`, {
                category
            })
            .then((res) => {
                setMsg(res.data.msg)
            })
            .catch((err) =>{
                console.log(err)
            })
        }else{
            console.log("champs trops longs")
        }
    }
 return(
        <Fragment> 
            <h2>Ajouter une nouvelle catégorie</h2>
            {msg &&
                <h2>{msg}</h2>
            }
                <form method="post" >
                    <label>Nouvelle gatégorie
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