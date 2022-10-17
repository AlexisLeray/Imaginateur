import React,{useContext, Fragment} from "react"
import {ReducerContext} from "./reducer/reducer.jsx"
import { useNavigate } from "react-router-dom"
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
          res.data.response && dispatch({type:'connexion', fname:res.data.first_name, name:res.data.name, id:res.data.id}); navigate('/')
          // si l'user a le role admin
          res.data.admin && dispatch({type:'admin', fname:res.data.first_name, name:res.data.name, id:res.data.id, creatorId:res.data.id_creator}); navigate('/admin')
          
          res.data.creator && dispatch({type:'creator', creatorId: res.data.id_creator}); navigate('/Creator')
        
          
      })
      .catch((err) => {
          console.log(err)
          
      })
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
                </Fragment>
            
        }
        
        </Fragment>
        
    )
}

export default Connexion 