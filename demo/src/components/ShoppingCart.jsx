import React,{useContext, useEffect,Fragment} from "react"
 import {ReducerContext} from "./reducer/reducer.jsx"
import axios from 'axios'
import BASE_URL from "../config.js"
import { useParams, NavLink } from "react-router-dom";

    
    
    
const ShoppingCart =() => {
    const {id} = useParams()
    let [myShop, setMyShop] = React.useState([])
    const [update, setUpdate] = React.useState(false)
        useEffect(() => {
            axios.get(`${BASE_URL}/panier/${id}`)    
                .then((res) => {
                    setMyShop(res.data.result)
                })
                
                .catch((err) => {
                    console.log(err)
                })
        }, [update])
        
const submit =(e, shop_id) => {
    e.preventDefault()
    axios.post(`${BASE_URL}/panier/${id}`, {
        shop_id: shop_id
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
            <h2>C'est la page du panier</h2>
            {myShop[0] ?   
               <Fragment >
                    {myShop.map((e,i) => (
                    <Fragment  key={i}>
                        <div className="cards">
                            <div className=""><p>{e.title}</p></div>
                            <div>
                                <img src={`http://alexisleray.sites.3wa.io:9300/img/${e.url}`} className="img_lite"/>
                            </div>
                            <div>{e.content}</div>
                            <div>{e.price}</div>
                        </div>
                            <button type="submit" onClick={(el) => submit(el, e.shop_id)}>Supprimer</button>
                        </Fragment>
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