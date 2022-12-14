import React,{useContext, useEffect,Fragment} from "react"
import {ReducerContext} from "./reducer/reducer.jsx"
import axios from 'axios'
import BASE_URL from "../config.js"
import {NavLink, useParams } from "react-router-dom";

const Payment = ({update}) => {
    const {id} = useParams()
    const [state, dispatch] = useContext(ReducerContext)
    
    const [price, setPrice] = React.useState([])
    const [msg, setMsg] = React.useState("")
    
    
    useEffect(()=> {
        let total = 0 
            for(let i = 0; i < parseInt(state.quantity); i++){
                        total += parseInt(state.basketDetails[i].price)
                        console.log(4)
             }
         setPrice(total)
        
      }, [state.quantity])
     
     
    const submit = (e) => {
        e.preventDefault()
        const idProduct = []
        const toBuy = [...state.basketDetails]
        toBuy.map((item) => {
            idProduct.push(item.product_id)
        })
        axios.post(`${BASE_URL}/payment/${id}`, {
            product_id: idProduct})
            .then((res) => {
                setMsg(res.data.msg)
                dispatch({type: 'shop', quantity: 0, basketDetails: []});
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return(
        <Fragment>
            <section>
                <header className="payment__header">
                    <h2>Paiement</h2>
                    {msg &&
                        <h3>{msg}</h3>
                    }
                </header>
                    {state.basketDetails[0]  ?  
                    <Fragment> 
                    <main>
                        <table className="payment__table table__container">
                            <thead>
                                <tr>
                                    <th>Titre</th>
                                    <th>Image</th>
                                    <th>Prix</th>
                                </tr>
                            </thead>
                            <tbody> 
                                {state.basketDetails.map((e,i)=> { 
                                    return (
                           
                                        <tr key={i}>
                                        <td>{e.title}</td>
                                        <td>
                                            <div className="payment__img-container">
                                            <img src={`http://alexisleray.sites.3wa.io:9300/img/${e.url}`} className="img_lite"  />
                                            </div>
                                        </td>
                                
                                        <td>{e.price}€</td>
                                    </tr>
                                    )
                                    
                                })}
                                </tbody>
                                <tfoot className="payment__table__footer">
                                <tr>
                                    <th>Total</th>
                                    <td></td>
                                    <td>{price}€</td>
                                </tr>
                                </tfoot>
                            
                        </table>  
                        <div className="container">    
                            <form type="post" className="payment__card ">
                                <div className="payment__card-info">
                                    <label> Numéro de carte
                                        <input type="number"   maxLength="5"/> 
                                    </label>
                                    <label>Date d'expiration
                                        <input type="number" /> 
                                    </label>
                                    <label>Nom du titulaire
                                        <input type="text" maxLength="63"/>
                                    </label>
                                    <label>Cryptogramme
                                        <input type="number" /> 
                                    </label>
                                </div>
                                <button type="submit" onClick={submit}>Ca part !</button>
                            </form> 
                        </div> 
                    </main>
                </Fragment>
                :
                <Fragment>
                    <main className="payment__empty">
                        <p>Votre panier est vide</p>
                        <NavLink to="/shop">
                            Retour vers la boutique
                        </NavLink>
                    </main>
                </Fragment>
                    }
            </section>
        </Fragment>
        )
}

export default Payment