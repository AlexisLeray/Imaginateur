import React,{useContext, useEffect,Fragment} from "react"
 import {ReducerContext} from "./reducer/reducer.jsx"
import axios from 'axios'
import BASE_URL from "../config.js"
import { useParams, NavLink } from "react-router-dom";

    
    
    
const ShoppingCart =() => {
    const [state, dispatch] = useContext(ReducerContext)
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
        updateBasket()
    })
    .catch((err) => {
        console.log(err)
    })
    
}
const updateBasket = () => {
    axios.get(`${BASE_URL}/payment/${state.id}`)
    .then((res) => {
        console.log("then quantity")
      res.data.toBuy && dispatch({type: 'shop', quantity: res.data.toBuy.length, basketDetails: res.data.toBuy});
    })
    .catch((err) => {
      console.log(err);
    });
}

    return(
        <Fragment>
            <section className="basket__container container">
                <header>
                    <h2>Votre panier</h2>
                </header>
                <main className="basket__main container">
                {myShop[0] ?   
                   <Fragment>
                            {myShop.map((e,i) => (
                            <Fragment  key={i}>
                                    <div className="basket__card-content  cards">
                                        <div className=""><h3>{e.title}</h3></div>
                                        <div className="basket__card-img container">
                                            <img src={`http://alexisleray.sites.3wa.io:9300/img/${e.url}`} className="img_lite"/>
                                        </div>
                                        <div>{e.content}</div>
                                        <div>Prix : {e.price}€</div>
                                        <button type="submit" onClick={(el) => submit(el, e.shop_id)}>Supprimer</button>
                                    </div>    
                                </Fragment>
                            ))}
                        
                       <div className="basket__payment">
                            <NavLink to={`/payment/${id}`}> 
                                Valider mon panier 
                            </NavLink>
                        </div>
                   </Fragment>
                :
                <Fragment>
                    <h3>Votre panier est vide</h3>
                </Fragment>
                }
                </main> 
            </section>
        </Fragment>
        )
}
export default ShoppingCart