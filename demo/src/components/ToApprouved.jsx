import React,{useContext, Fragment, useEffect} from "react"
import {ReducerContext} from "./reducer/reducer.jsx"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import BASE_URL from "../config.js"

//================================= FONCTION POUR AFFICHAGE DES PRODUITS NON VALIDES PAR L'ADMIN ============================
const ToApproved = ({}) => {
    const [pendingPiece, setPendingPiece] = React.useState([])
    const [update, setUpdate] = React.useState(false)
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
         setUpdate(!update)
         })
        .catch((err) => {
            console.log(err)
        })
    }

return(  
    <Fragment>
        <section className="approved__table-container table__container">
            {pendingPiece.map((e,i) => { 
                 return(  
                    <table key={i} className="approved__container">
                    <tbody>
                        <tr className="approved__row">   
                            <th>Auteur</th>
                            <td>{e.first_name} {e.name}</td>
                        </tr>
                        <tr className="approved__row">
                            <th>Mail</th>
                            <td>{e.mail}</td>
                        </tr>
                        
                        <tr className="approved__row">
                            <th>Image</th>
                            <td>    
                                <div className="approved__img-container">
                                    <img src={`http://alexisleray.sites.3wa.io:9300/img/${e.url}`}  alt={e.description}/>
                                </div>
                            </td>
                        </tr>
                        
                        <tr className="approved__row">
                            <th>Description de l'image</th>
                            <td>{e.description}</td>
                        </tr>
                        
                        <tr className="approved__row">
                            <th>Titre</th>
                            <td>{e.title}</td>
                        </tr>
                        <tr className="approved__row">
                            <th>Contenu</th>
                            <td>{e.content}</td>
                        </tr>
                        <tr className="approved__row">
                            <th>Prix</th>
                            <td>{e.price}€</td>
                        </tr>
                        <tr className="approved__row last_row">
                       {/* <th>Actions</th> */}
                       <th></th>
                            <td>
                                 <button type="submit" onClick={(el) => validate(el, e.id)} > 
                                    Approuvé ! 
                                </button>

                            </td>
                        </tr>
                    </tbody>
                </table>   
                 ) 
             })} 
             </section>
    </Fragment>
       
        )
        
}
export default ToApproved