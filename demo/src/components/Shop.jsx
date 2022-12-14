import React,{useContext, Fragment, useEffect} from "react"
 import {ReducerContext} from "./reducer/reducer.jsx"
import axios from 'axios'
import BASE_URL from "../config.js"
import {NavLink, useNavigate} from "react-router-dom"

const Shop =({update}) => {
    const navigate = useNavigate()    
    const [state, dispatch] = useContext(ReducerContext)
    const [exposed, setExposed] = React.useState([])
    const [added, setAdded] = React.useState([])
    const [backMsg, setBackMsg] = React.useState({idProduct:null, msg:""})
    
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
            // GET pour vérifier si l'id du produit est dans le panier de l'user
            axios.get(`${BASE_URL}/checkShop/${state.id}`)
            .then((res) => {
                setAdded(res.data.checked)
                // S'il n'est pas présent dans le panier de l'user
                if(!res.data.checked.includes(exposed.id)){
                    // On lance une requête post pour l'ajouter à son panier 
                     axios.post((`${BASE_URL}/shop`), {
                         product_id: exposed.id,
                         user_id: state.id
                     }) 
                     .then((res) => {
                         console.log(res.data)
                         setBackMsg({idProduct:exposed.id, msg:res.data.msg})
                         updateBasket()
                        //  window.alert("produit ajouté")
                     })
                     .catch((err) => {
                         console.log(err)
                     })
                }else{
                    //Faire apparaitre au dessus du bouton un message à la place du window.alert
                    // window.alert('produit déjà ajouté')
                    setBackMsg({idProduct:exposed.id, msg:"produit déjà ajouté"})
                }            
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
const findID = () => {
    
}

     
    return(
        <Fragment>
        <header className="shop__header">
            <h2>Boutique</h2>
        </header>
        <div className="cards__container container">
            {exposed.map((e,i) => (
                <div key={i} className="cards">
                     <div className="cards__content"> 
                        <header className="cards__title container">
                                <h4>{e.title}</h4>
                        </header>
                        <main>
                            <div className="cards__img-container container">
                                <img src={`http://alexisleray.sites.3wa.io:9300/img/${e.url}`}  onClick={() => navigate(`/product/${e.id}`)}/>
                            </div>
                            <div className="cards__details container">
                                Créateur :  
                                <NavLink to={`/creatorProfil/${e.creator_id}`}>
                                     &nbsp;{e.name} {e.first_name}
                                </NavLink>
                                <p>{e.content}</p>
                                <p>{e.price} €</p>
                            </div> 
                        </main>
                        {state.logged ?
                            <Fragment>
                                {/*afficher le message du back qui dit que le produit a été ajouté au panier */}
                                { (backMsg.msg && e.id === backMsg.idProduct) && 
                                    <div >
                                        {backMsg.msg}
                                    </div>
                                }
                                    <div className="cards__footer container">
                                            <button type="submit" onClick={(el) => submit(el, e)}>Ajouter au panier</button> 
                                    </div>    
                            </Fragment>
                        :
                            <div className="cards__footer container">
                                <p>
                                    <NavLink to="/connexion">Connectez vous </NavLink> pour passer commande
                                    
                                </p>
                            </div>
                            
                        }
                    </div> 
                </div> 
            ))}
        </div>
    </Fragment>
    )
}
export default Shop