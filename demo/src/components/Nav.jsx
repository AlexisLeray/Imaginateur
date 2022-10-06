import {NavLink} from "react-router-dom"
import {useContext, Fragment} from 'react'
import {ReducerContext} from './reducer/reducer.jsx'

const Nav = (props) => {
    const [state, dispatch] = useContext(ReducerContext)
    return(
        <nav>
            <ul>
                <li>
                    <NavLink to="/">
                        Accueil
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/workshop">
                        Atelier
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/galery">
                        Galerie
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/shop">
                        Boutique
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/contact">
                        Contact
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/About">
                        A propos
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/register">
                        Inscription
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/connexion">
                        Mon compte
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/shoppingCart">
                        Panier
                    </NavLink>
                </li>
                {state.creator && 
                <Fragment> 
                    <li> 
                        <NavLink to="/creator">
                        Espace créateur
                        </NavLink>
                    </li>
                </Fragment>
                }
                {state.admin && 
                <Fragment> 
                    <li> 
                        <NavLink to="/admin">
                        Admin
                        </NavLink>
                    </li>
                </Fragment>
                }
                {state.logged && 
                <Fragment> 
                <li> 
                        <NavLink to="/logout">
                        Déconnexion
                        </NavLink>
                   </li>
                </Fragment>
                }
            </ul>
           
        </nav>
        )
}

export default Nav