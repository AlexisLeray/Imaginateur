import React,{useContext, Fragment} from "react"
import {ReducerContext} from "./reducer/reducer.jsx"
import { useLocation, useNavigate } from "react-router-dom"
import axios from 'axios'
import BASE_URL from "../config.js"

const Connexion = () => {
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
          res.data.msg && setErrorBack(res.data.msg)
          // si la connexion est ok
          res.data.response && dispatch({type:'connexion', fname:res.data.first_name, name:res.data.name, id:res.data.id})
          // si l'user a le role admin
          res.data.admin && dispatch({type:'admin'}) 
          res.data.creator && dispatch({type:'creator'})
          console.log(res)
        
          
      })
      .catch((err) => {
          console.log(err)
          
      })
  }
  
    return( 
        <Fragment>
        {state.logged === false ?
            <form>
            
                <label>mail : 
                    <input type="email" value={mail} onChange={(e) => setMail(e.target.value)} maxLength="255"/>
                </label>
                <label>mot de passe : 
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} maxLength="255"/>
                </label>
                <button onClick={submit}>Connexion</button>
            {errorBack !== "" && <p>{errorBack}</p>}    
            </form> 
        :
        <Fragment>
        {console.log(state)}
            <h2>Vous êtes connecté</h2>
        </Fragment>
            
        }
        
        </Fragment>
        
        )
}

export default Connexion 