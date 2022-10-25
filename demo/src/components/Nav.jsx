import {NavLink} from "react-router-dom"
import {useContext, Fragment, useEffect} from 'react'
import {ReducerContext} from './reducer/reducer.jsx'
import { useParams } from "react-router-dom";
import BASE_URL from "../config.js";
import axios from 'axios';

const Nav = (props) => {
   
    const [state, dispatch] = useContext(ReducerContext)
    const {id} = useParams()
    
      
  useEffect(() => {
    const token = localStorage.getItem("jwtToken")
    if(!state.login && token){
      axios.post(`${BASE_URL}/isLogged`,{token})
      .then((res) => {
        if(res.data.token){
          axios.defaults.headers.common['Authorization'] = 'Bearer '+res.data.token
        }
        if(res.data.logged){
            dispatch({
                type:'connexion',
                fname:res.data.first_name, 
                name:res.data.name, 
                id:res.data.id})
        }
        res.data.admin && dispatch({type:'admin',fname:res.data.first_name, 
                    name:res.data.name, 
                    id:res.data.id, 
                    creatorId:res.data.id_creator})
        res.data.creator && dispatch({type:'creator',creatorId: res.data.id_creator,
                    fname:res.data.first_name,
                    name:res.data.name
        })
      })
      .catch((err) => {
        console.log(err)
      })
    }
  },[])

    return(
        <nav>
            <ul>
                <li>
                    <NavLink to="/">
                        Accueil
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
                {!state.logged &&
                <li>
                    <NavLink to="/register">
                        Inscription
                    </NavLink>
                </li>
                }
                <li>
                    <NavLink to="/connexion">
                        Mon compte
                    </NavLink>
                </li>
                <li>
                    <NavLink to={`/panier/${state.id}`}>
                        Panier
                    </NavLink>
                </li>
                {state.creator &&  
                <Fragment> 
                    <li> 
                        <NavLink to={`/creator/${state.creatorId}`}>
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