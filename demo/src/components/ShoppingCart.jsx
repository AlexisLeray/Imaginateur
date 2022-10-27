import React,{useContext, useEffect,Fragment} from "react"
 import {ReducerContext} from "./reducer/reducer.jsx"
import axios from 'axios'
import BASE_URL from "../config.js"
import { useParams, NavLink } from "react-router-dom";

    
    
    
const ShoppingCart =() => {
    const {id} = useParams()
    let [myShop, setMyShop] = React.useState([])
        
        useEffect(() => {
            axios.get(`${BASE_URL}/panier/${id}`)    
                .then((res) => {
                    setMyShop(res.data.result)
                    console.log("ça passe ")
                })
                
                .catch((err) => {
                    console.log(err)
                })
        }, [])
        

        //=================================BOUTON TEST A SUPPRIMER PAR LA SUITE============================
    const test = (e) => {
         e.preventDefault()
        
         console.log("MYSHOP", myShop)
     }
    return(
        <Fragment>
        <button type="submit" onClick={test}>test</button>
            <h2>C'est la page du panier</h2>
            {myShop[0] ?   
               <Fragment>
                    {myShop.map((e,i) => (
                        <div key={i} className="cards">
                            <div className=""><p>{e.title}</p></div>
                            <div>
                                <img src={`http://alexisleray.sites.3wa.io:9300/img/${e.url}`} className="img_lite"/>
                            </div>
                            <div>{e.content}</div>
                            <div>{e.price}</div>
                        </div>
                    ))}
                
               
                    <NavLink to={`/payment/${id}`}> 
                        Valider mon panier 
                    </NavLink>
               </Fragment>
            :
            <Fragment>
                <h3>Votre panier est vide</h3>
            </Fragment>
            }
        </Fragment>
        )
}
export default ShoppingCart