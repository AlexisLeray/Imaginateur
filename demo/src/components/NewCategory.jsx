import React,{useContext, Fragment} from "react"
import {ReducerContext} from "./reducer/reducer.jsx"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import BASE_URL from "../config.js"

const NewCategory = () => {
    let [category, setCategory] = React.useState("")
    
    const submit = (e) =>{
        e.preventDefault()
        axios.post(`${BASE_URL}/newCategory`, {
            category
        })
    }
 return(
        <Fragment> 
            <h2>Ajouter une nouvelle catégorie</h2>
                <form method="post" >
                    <label>Nouvelle gatégorie</label>
                    <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} maxLength="255"/>
                    <button type="submit" onClick={submit}>valider</button>
                </form>
        </Fragment>
     )   
}
export default NewCategory 