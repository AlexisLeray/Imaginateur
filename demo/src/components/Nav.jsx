import {NavLink} from "react-router-dom"
import {useContext, Fragment} from 'react'
import {ReducerContext} from './reducer/reducer.jsx'

const Nav = (props) => {
    const [state, dispatch] = useContext(ReducerContext)
    console.log(state.login)
    return(
        <nav>
            <ul>
                <li>
                    <NavLink to="/">
                        Acceuil
                    </NavLink>
                </li>
                <li>
                    <NavLink to="">
                        Atelier
                    </NavLink>
                </li>
                <li>
                    <NavLink to="">
                        Galerie
                    </NavLink>
                </li>
                <li>
                    <NavLink to="">
                        Boutique
                    </NavLink>
                </li>
                <li>
                    <NavLink to="">
                        Contact
                    </NavLink>
                </li>
                <li>
                    <NavLink to="">
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
                    <NavLink to="">
                        Panier
                    </NavLink>
                </li>
                {state.logged && 
                <Fragment> 
                    <li> 
                        <NavLink to="/profil">
                        Profil
                        </NavLink>
                    </li>
                </Fragment>
                }
                {state.creator && 
                <Fragment> 
                    <li> 
                        <NavLink to="/creator">
                        Créateurs
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