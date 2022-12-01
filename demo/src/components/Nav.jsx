import {NavLink} from "react-router-dom"
import {useContext, Fragment, useEffect, useState} from 'react'
import {ReducerContext} from './reducer/reducer.jsx'
import { useParams } from "react-router-dom";
import BASE_URL from "../config.js";
import axios from 'axios';

const Nav = (props) => {
   const [count, setCount] = useState(0)
    const [state, dispatch] = useContext(ReducerContext)
    const [mobileMenu, setMobileMenu] = useState(false)
    const {id} = useParams()
    
      
  useEffect(() => {
    const token = localStorage.getItem("jwtToken")
    if(!state.login && token){
      axios.post(`${BASE_URL}/isLogged`,{token})
      .then((res) => {
        if(res.data.token){
          axios.defaults.headers.common['Authorization'] = 'Bearer '+res.data.token
        }
        res.data.logged
            && dispatch({
                type:'connexion',
                fname:res.data.first_name, 
                name:res.data.name, 
                id:res.data.id
            })
        res.data.admin 
            && dispatch({
                type:'admin',
                fname:res.data.first_name, 
                name:res.data.name, 
                id:res.data.id, 
                creatorId:res.data.id_creator
            })
        res.data.creator 
            && dispatch({
                type:'creator',
                creatorId: res.data.id_creator,
                fname:res.data.first_name,
                name:res.data.name
            })
      })
      .catch((err) => {
        console.log(err)
      })
    }
  },[])
  
  useEffect(()=> {
        axios.get(`${BASE_URL}/payment/${state.id}`)
        .then((res)=>{
            res.data.toBuy && dispatch({type:'shop', quantity: res.data.toBuy.length})
        })
        .catch((err) => {
            console.log(err)
        })
    })
    // const screenSize  = () => {
    //     if((window).width > 700) {
    //         setMobileMenu(true) 
    //         console.log(window.width)
    //     }
    // }
   useEffect(()=> {
       console.log(1)
        if(window.screen.width > 700){
            console.log(2)
            setMobileMenu(true)
        }
   }, [])
    
    const handleClick = (e) => {
        setMobileMenu(!mobileMenu)
    }
    const linkClicked = () => {
        setMobileMenu(!mobileMenu)
    }
    
    return(
       <Fragment>
       <div className="navigation">
        {mobileMenu &&
        <nav className="container navigation__nav">
            
                <ul className="navigation__list">
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
                            
                                {state.quantity}
                            
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