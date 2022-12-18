import React, { useContext, Fragment, useEffect } from "react"
import { ReducerContext } from "./reducer/reducer.jsx"
import axios from 'axios'
import BASE_URL from "../config.js"
import { NavLink, useNavigate } from "react-router-dom"

const Shop = ({ update }) => {
    const navigate = useNavigate()
    const [state, dispatch] = useContext(ReducerContext)
    const [exposed, setExposed] = React.useState([])
    const [added, setAdded] = React.useState([])
    const [backMsg, setBackMsg] = React.useState({ idProduct: null, msg: "" })

    // ===========================================
    //          Récupération des oeuvres publiées
    // ==========================================
    // useEffect qui s'actualise au statu de update
    useEffect(() => {
        // Requête get 
        axios.get(`${BASE_URL}/shop`)
            // A la réponse du back
            .then((res) => {
                // On affecte le résultat à exposed
                setExposed(res.data.allProducts)
            }).catch((err) => {
                console.log(err)
            })
    }, [update])
    // ===========================================
    //          AJOUT AU PANIER
    // ==========================================
    const submit = (e, exposed) => {
        // preventDefault() empêche l'actualisation automatique de la page du navigateur
        e.preventDefault()
        // GET pour vérifier si l'id du produit est dans le panier de l'user
        axios.get(`${BASE_URL}/checkShop/${state.id}`)
            .then((res) => {
                // On affecte le résultat à added
                setAdded(res.data.checked)
                // Si l'oeuvre n'est pas présente dans le panier de l'user
                if (!res.data.checked.includes(exposed.id)) {
                    // On lance une requête post pour l'ajouter à son panier  en envoyant l'id du produit et l'id de l'utilisateur
                    axios.post((`${BASE_URL}/shop`), {
                            product_id: exposed.id,
                            user_id: state.id
                        })
                        //  Réponse du back
                        .then((res) => {
                            //  On affecte l'id du produit concerné et le message que contient le back à backMsg
                            setBackMsg({ idProduct: exposed.id, msg: res.data.msg })
                            //  fonction d'actualisation de panier
                            updateBasket()
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }
                // Si le produit est déjà présent dans le panier de l'utilisateur 
                else {
                    // On affecte l'id du produit et le messsage à backMsg
                    setBackMsg({ idProduct: exposed.id, msg: "produit déjà ajouté" })
                }
            })
            .catch((err) => {
                console.log(err)
            })

    }

    /// ===========================================
    //          ACTUALISATION DU PANIER
    // ==========================================
    // Fonction updateBasket pour mise à jour du panier 
    const updateBasket = () => {
        // Requête get pour récupérer le contenu du panier selon l'id de l'utilisateur
        axios.get(`${BASE_URL}/payment/${state.id}`)
            // Réponse du back
            .then((res) => {
                // Si présence de res.data.toBuy on affecte au state shop la quantité et le détail du panier
                res.data.toBuy && dispatch({ type: 'shop', quantity: res.data.toBuy.length, basketDetails: res.data.toBuy });
            })
            .catch((err) => {
                console.log(err);
            });
    }



    return (
        <Fragment>
            <section>
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
        </section>
    </Fragment>
    )
}
export default Shop
