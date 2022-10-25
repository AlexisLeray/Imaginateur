import React,{useContext, Fragment, useEffect} from "react"
 import {ReducerContext} from "./reducer/reducer.jsx"
import axios from 'axios'
import BASE_URL from "../config.js"
import {NavLink} from "react-router-dom"

const Shop =({update}) => {
    
    const [state, dispatch] = useContext(ReducerContext)
    const [exposed, setExposed] = React.useState([])
    useEffect(() => {
        
        axios.get(`${BASE_URL}/shop`)
            .then((res) => {
                setExposed(res.data.allProducts)
            }).catch((err) => {
                console.log(err)
            })
    }, [update])
//=================================AJOUTER AU PANIER====================================
    const submit = (e, exposed) => {
        e.preventDefault()
         axios.post((`${BASE_URL}/shop`), {
             product_id: exposed.id,
             user_id: state.id
         }) 
         .then((res) => {
             console.log(res.msg)
         })
         .catch((err) => {
             console.log(err)
         })
        
    }
    
//=================================BOUTON TEST A SUPPRIMER PAR LA SUITE============================
    const test = (e) => {
         e.preventDefault()
        
         console.log("EXPOSED", submit)
     }
//=================================BOUTON TEST A SUPPRIMER PAR LA SUITE============================
    return(
        
    <div className="cards_container">
    <button type="submit" onClick={test}>test</button>
        {exposed.map((e,i) => (
            <div key={i} className="cards">
                <div className=""><p>{e.title}</p></div>
                <div>
                    <img src={`http://alexisleray.sites.3wa.io:9300/img/${e.url}`} />
                </div>
                <div>{e.content}</div>
                <div>{e.price}</div>
            {state.logged ?     
                <button type="submit" onClick={(el) => submit(el, e)}>Ajouter au panier</button>
            :
                <p>
                    <NavLink to="/connexion">connectez vous </NavLink> pour passer commande
                    
                </p>
            }
            </div>
        ))}
    </div>
        )
}
export default Shop