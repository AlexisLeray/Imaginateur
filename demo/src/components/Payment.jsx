import React,{useContext, useEffect,Fragment} from "react"
import {ReducerContext} from "./reducer/reducer.jsx"
import axios from 'axios'
import BASE_URL from "../config.js"
import { useParams } from "react-router-dom";

const Payment = () => {
    const {id} = useParams()
    const [state, dispatch] = useContext(ReducerContext)
    const [toBuy,setToBuy] = React.useState([])
    const [price, setPrice] = React.useState([])
    
    useEffect(()=> {
        axios.get(`${BASE_URL}/payment/${id}`)
            .then((res)=>{

                setToBuy(res.data.toBuy)
                
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    
    useEffect(()=> {
        let total = 0 
        
            for(let i = 0; i < toBuy.length; i++){
                    total += parseInt(toBuy[i].price)
            }
             
         setPrice(total)
         console.log(price)
     }, [toBuy])
     
     
    const submit = (e) => {
        e.preventDefault()
        const idProduct = []
        toBuy.map((item) => {
            idProduct.push(item.product_id)
        })
        axios.post(`${BASE_URL}/payment/${id}`, {
            product_id: idProduct})
            .then((res) => {
                console.log("c'est bon")
            })
            .catch((err) => {
                
                console.log(err)
            })
    }
    
    //=================================BOUTON TEST A SUPPRIMER PAR LA SUITE============================
    const test = (e) => {
         e.preventDefault()
 
         console.log(id)
     }
    return(
        <Fragment>
        {console.log(toBuy)}
        <button type="submit" onClick={test}>test</button>
            {toBuy &&   
                <table className="payment_table">
                    <thead>
                        <tr>
                            <td>Titre</td>
                            <td>Image</td>
                            <td>Prix</td>
                        </tr>
                    </thead>
                    <tbody>
                        {toBuy.map((e,i)=> { 
                            return (
                                <tr key={i}>
                                <td>{e.title}</td>
                                <td>
                                    <img src={`http://alexisleray.sites.3wa.io:9300/img/${e.url}`} className="img_lite"  />
                                </td>
                        
                                <td>{e.price}</td>
                            </tr>
                            )
                        })}
                        
                        <tr>
                            <td><h2>Total</h2></td>
                            <td></td>
                            <td>{price}</td>
                        </tr>
                    </tbody>
                </table>
            } 
            <form type="post">
                <label> Numéro de carte
                    <input type="number"   maxLength="5" /> 
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
                <button type="submit" onClick={submit}>Ca part !</button>
            </form>
        </Fragment>
        )
}

export default Payment