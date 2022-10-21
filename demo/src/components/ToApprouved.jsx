import React,{useContext, Fragment, useEffect} from "react"
import {ReducerContext} from "./reducer/reducer.jsx"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import BASE_URL from "../config.js"

//================================= FONCTION POUR AFFICHAGE DES PRODUITS NON VALIDES PAR L'ADMIN ============================
const ToApproved = ({update}) => {
    const [pendingPiece, setPendingPiece] = React.useState([])
    useEffect(() => {
             axios.get(`${BASE_URL}/toApproved`)
                .then((res) => {
                  setPendingPiece(res.data.newProducts)
                    
                })
                .catch((err)=> {
                    console.log(err)
                })
         }, [update])
//================================= VALIDATION DE L'ARTICLE PAR L'ADMIN ============================         
    const validate = (e, id) => {
        axios.post(`${BASE_URL}/toApproved`,  {
         id: id
     })
     .then((res) => {
         console.log("ARTICLE VALIDE : ", id)
         })
        .catch((err) => {
            console.log(err)
        })
    }

//========================================================================
    return(
    <Fragment>
        <table> 
            <thead>
                <tr>
                    <th>Auteur</th>
                    <th>Mail</th>
                    <th>Image</th>
                    <th>Description de l'image</th>
                    <th>Titre</th>
                    <th>Contenu</th>
                    <th>Prix</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {pendingPiece.map((e,i) => {
                console.log(e)
                 return(
        
                <tr key={i}>
                    <td>{e.first_name} {e.name}</td>
                    <td>{e.mail}</td>
                    <td>
                        <img src={`http://alexisleray.sites.3wa.io:9300/img/${e.url}`}  alt={e.description}/>
                    </td>
                    <td>{e.description}</td>
                    <td>{e.title}</td>
                    <td>{e.content}</td>
                    <td>{e.price}</td>
                    <td>
                         <button type="submit" onClick={(el) => validate(el, e.id)} > 
                            Approuvé ! 
                        </button>
                    </td>
                </tr>    
                 )
             })}
                    
            </tbody>
        </table>
    </Fragment>
       
        )
        
}
export default ToApproved