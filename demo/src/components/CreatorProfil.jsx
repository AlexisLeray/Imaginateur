import React,{useContext,useEffect, Fragment, useState} from "react"
import {ReducerContext} from "./reducer/reducer.jsx"
import axios from 'axios'
import BASE_URL from "../config.js"
import { useParams } from "react-router-dom";


const CreatorProfil = () => {
    const {id} = useParams()
    const [profil, setProfil] = useState("")
   useEffect(()=> {
    axios.get(`${BASE_URL}/creatorProfil/${id}`)
        .then((res) => {
            setProfil(res.data.result)
        })
        .catch((err)=> {
            console.log(err)
        })
   }, [])    

    return(
        <Fragment>
            {profil &&   
                <Fragment>
                    <h2>Page spécifique du créateur</h2>
                    {profil.map((e,i) => (
                        <Fragment key={i} >
                            <img src={`http://alexisleray.sites.3wa.io:9300/img/${e.url}`} />
                           
                            <h2>{e.name} {e.first_name}</h2>
                            <p>Présentation : {e.description}</p>
                        </Fragment>
                    ))}
                </Fragment>    
            }
        </Fragment>
           
        )
}

export default CreatorProfil