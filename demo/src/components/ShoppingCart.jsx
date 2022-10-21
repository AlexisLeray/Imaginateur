import React,{useContext, useEffect,Fragment} from "react"
 import {ReducerContext} from "./reducer/reducer.jsx"
import axios from 'axios'
import BASE_URL from "../config.js"
import { useParams, NavLink } from "react-router-dom";

    
    
    
const ShoppingCart =() => {
    const {id} = useParams()
    let [myShop, setMyShop] = React.useState([])
        
        useEffect(() => {
            console.log(10)
            axios.get(`${BASE_URL}/panier/${id}`)    
                .then((res) => {
                    console.log(11)
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
            {myShop &&   
               <div>
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
                </div>
            }   
                <NavLink to={`/payment/${id}`}> 
                    Valider mon panier 
                </NavLink>
        </Fragment>
        )
}
export default ShoppingCart