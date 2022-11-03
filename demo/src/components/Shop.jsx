import React,{useContext, Fragment, useEffect} from "react"
 import {ReducerContext} from "./reducer/reducer.jsx"
import axios from 'axios'
import BASE_URL from "../config.js"
import {NavLink, useNavigate} from "react-router-dom"

const Shop =({update}) => {
    const navigate = useNavigate()    
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
            axios.get(`${BASE_URL}/checkShop/${state.id}`)
            .then((res) => {
                if(!res.data.checked.includes(exposed.id)){
                     axios.post((`${BASE_URL}/shop`), {
                         product_id: exposed.id,
                         user_id: state.id
                     }) 
                     .then((res) => {
                         console.log(res.data.msg)
                     })
                     .catch((err) => {
                         console.log(err)
                     })
                }else{
                    window.alert('produit déjà ajouté')
                }            
            })
            .catch((err) => {
                console.log(err)
            })
    }
    
    return(
        
    <div className="cards_container">
        {exposed.map((e,i) => (
            <div key={i} className="cards">
                <div className="productBtn">
                    
                        <div className=""><p>{e.title}</p></div>
                        <div>
                            <img src={`http://alexisleray.sites.3wa.io:9300/img/${e.url}`}  onClick={() => navigate(`/product/${e.id}`)}/>
                        </div>
                        <div>
                            Créateur :  
                            <NavLink to={`/creatorProfil/${e.creator_id}`}>
                                {e.name} {e.first_name}
                            </NavLink>
                        </div>
                        <div>{e.content}</div>
                        <div>{e.price}</div>
                
                </div>     
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