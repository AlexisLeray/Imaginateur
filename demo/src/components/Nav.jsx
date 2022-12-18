import { NavLink } from "react-router-dom"
import { useContext, Fragment, useEffect, useState } from 'react'
import { ReducerContext } from './reducer/reducer.jsx'
import { useParams } from "react-router-dom";
import BASE_URL from "../config.js";
import axios from 'axios';

const Nav = (props) => {
    const [count, setCount] = useState(0)
    const [state, dispatch] = useContext(ReducerContext)
    const [mobileMenu, setMobileMenu] = useState(false)
    const { id } = useParams()



    useEffect(() => {
        //   Récupération du jeton d'authentification stocké dans le local storage avec jwtToken
        const token = localStorage.getItem("jwtToken")
        // Vérification si l'utilisateur est déjà connecté 
        if (!state.login && token) {
            // s'il ne l'est pas requête axios 
            axios.post(`${BASE_URL}/isLogged`, { token })
                //  réponse positive de la requête 
                .then((res) => {
                    if (res.data.token) {
                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token
                    }
                    // envoi des données vers le reducer selon le statut de la personne connectée 
                    res.data.logged &&
                        dispatch({
                            type: 'connexion',
                            fname: res.data.first_name,
                            name: res.data.name,
                            id: res.data.id
                        })
                    res.data.admin &&
                        dispatch({
                            type: 'admin',
                            fname: res.data.first_name,
                            name: res.data.name,
                            id: res.data.id,
                            creatorId: res.data.id_creator
                        })
                    res.data.creator &&
                        dispatch({
                            type: 'creator',
                            creatorId: res.data.id_creator,
                            fname: res.data.first_name,
                            name: res.data.name
                        })
                })
                // Toute erreur, console log de l'erreur 
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [])
    // ===========================================
    //              DETECTION TAILLE ECRAN
    // ===========================================
    useEffect(() => {
        if (window.innerWidth >= 1000) {
            setMobileMenu(true)
        }
    })
    // ===========================================
    //          Apparition de la navbar
    // ===========================================
    // Fonctions pour l'affichage de la navbar selon le le statut de mobileMenu true ou false
    const handleClick = (e) => {
        setMobileMenu(!mobileMenu)
    }
    const linkClicked = () => {
        setMobileMenu(!mobileMenu)
    }



    return (
        <Fragment>
       <div className="navigation">
        {mobileMenu &&
        <nav className="container navigation__nav">
            
                <ul className="navigation__list container">
                    <li>
                        <NavLink to="/" className="navigation__link" onClick={linkClicked}>
                            Accueil
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/galery" className="navigation__link" onClick={linkClicked}>
                            Galerie
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/shop" className="navigation__link" onClick={linkClicked}>
                            Boutique
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact" className="navigation__link" onClick={linkClicked}>
                            Contact
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/About" className="navigation__link" onClick={linkClicked}>
                            A propos
                        </NavLink>
                    </li>
                    {!state.logged &&
                    <li>
                        <NavLink to="/register" className="navigation__link" onClick={linkClicked}>
                            Inscription
                        </NavLink>
                    </li>
                    }
                    <li>
                        <NavLink to="/connexion" className="navigation__link" onClick={linkClicked}>
                            Mon compte
                        </NavLink>
                    </li>
                   {state.logged &&
                        <li>
                        
                            <NavLink to={`/panier/${state.id}`} className="navigation__link" onClick={linkClicked}>
                                Panier
                            
                                &nbsp;{state.quantity}
                            
                            </NavLink>
                        </li>
                   }
                    {state.creator &&  
                    <Fragment> 
                        <li> 
                            <NavLink to={`/creator/${state.creatorId}`} className="navigation__link" onClick={linkClicked}>
                            Espace créateur
                            </NavLink>
                        </li>
                    </Fragment>
                    }
                    {state.admin && 
                    <Fragment> 
                        <li> 
                            <NavLink to="/admin" className="navigation__link" onClick={linkClicked}>
                            Admin
                            </NavLink>
                        </li>
                    </Fragment>
                    }
                    {state.logged && 
                    <Fragment> 
                        <li> 
                            <NavLink to="/logout" className="navigation__link" onClick={linkClicked}>
                            Déconnexion
                            </NavLink>
                       </li>
                    </Fragment>
                    }
                </ul>
                
        </nav>
        }
            <div  className={mobileMenu ? "navigation__background navigation__background-scale" : "navigation__background"}></div>
           
            <button onClick={handleClick} className=" navigation__button" > Menu </button>
            
        </div>    
        </Fragment>
    )
}

export default Nav
