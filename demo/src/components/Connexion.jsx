import React,{useContext, Fragment} from "react"
import {ReducerContext} from "./reducer/reducer.jsx"
import { useNavigate, NavLink, useParams} from "react-router-dom"
import axios from 'axios'
import BASE_URL from "../config.js"
// import { LOGIN, ADMIN } from '../config/constante'
import ModifyProfil from '../components/ModifyProfil'


const Connexion = () => {
    const {id} = useParams()
    const [mail, setMail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [errorBack, setErrorBack] = React.useState("")
    const [state, dispatch] = useContext(ReducerContext);
    const navigate = useNavigate();
  
  const submit = (e) => {
      
      e.preventDefault()
        axios.post(`${BASE_URL}/connexion`, {
          mail, 
          password
      })
      .then((res) => {
          if(res.data.response) {
              console.log(res.data)
                localStorage.setItem('jwtToken', res.data.token)
                axios.defaults.headers.common['Authorization'] = 'Bearer '+res.data.token
                
                res.data.msg && setErrorBack(res.data.msg)
                // si la connexion est ok
                res.data.response && dispatch({type:'connexion', fname:res.data.first_name, name:res.data.name, id:res.data.id}); navigate("/")
                // si l'user a le role admin
                // res.data.admin && dispatch({type:'admin', fname:res.data.first_name, name:res.data.name, id:res.data.id, creatorId:res.data.id_creator});
                if(res.data.admin){
                    console.log("fname:"+res.data.first_name)
                    console.log("name:"+res.data.name)
                    console.log("id:"+res.data.id)
                    console.log("creatorId:"+res.data.id_creator)
                    dispatch({type:'admin', fname:res.data.first_name, 
                    name:res.data.name, 
                    id:res.data.id, 
                    creatorId:res.data.id_creator});
                }
                res.data.creator && dispatch({type:'creator', name:res.data.name, fname:res.data.first_name, creatorId: res.data.id_creator}); 
                // name, fname, creatorId
                
                navigate("/")
          } else {
                window.alert(res.data.message)
            }
          
      })
      .catch((err) => {
          console.log(err)
          
      })
  }
//=================================BOUTON TEST A SUPPRIMER PAR LA SUITE============================
    const test = (e) => {
         e.preventDefault()
        
         console.log("STATE", state)
     }
    return( 
        <Fragment>
        {state.logged === false ?
            <form action="" method="post">
                <label>mail : </label>
                    <input type="email" value={mail} onChange={(e) => setMail(e.target.value)} maxLength="255"/>
            <label>mot de passe : </label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} maxLength="255"/>
                <button onClick={submit}>Connexion</button>
                {errorBack !== "" && <p>{errorBack}</p>}    
            </form> 
        :
            <Fragment>
                    <h2>Vous êtes connecté</h2>
                <NavLink to={`/updateProfil/${id}`}>
                    Modifier le profil
                </NavLink>        
                {state.map((e,i) => {
                 <Fragment>
                   <p>{state.name}</p>
                   <p>{state.first_name}</p>
                   <p>{state.mail}</p>
                 </Fragment>  
                })}
            </Fragment>
            
        }
        
        </Fragment>
        
    )
}

export default Connexion 