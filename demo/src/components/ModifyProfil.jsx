import React,{useContext, Fragment, useEffect} from "react"
import {ReducerContext} from "./reducer/reducer.jsx"
import axios from 'axios'
import BASE_URL from "../config.js"
import Connexion from './Connexion.jsx'
import {NavLink} from "react-router-dom"
import { useParams } from "react-router-dom";

const ModifyProfil = () => {
    const {id} = useParams()
    const [state, dispatch] = useContext(ReducerContext)
    const [allProfil, setAllProfil] = React.useState("")
    
    useEffect(()=> {
        axios.get(`${BASE_URL}/profil/${id}`)
        .then((res) => {
            setAllProfil(res.data.profil)
        })
        .catch((err)=> {
            console.log(err)
        })
    }, [])
    //=================================BOUTON TEST A SUPPRIMER PAR LA SUITE============================
    const test = (e) => {
         e.preventDefault()
        
         console.log("allprofil", state)
     }
    return (
        <Fragment>
       
            <button type="submit" onClick={test}>test</button>
            <h2>pour modifier le profiiiiiileuuuh</h2>
        </Fragment>
        )
}

export default ModifyProfil