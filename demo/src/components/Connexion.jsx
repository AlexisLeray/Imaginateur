import React,{useContext} from "react"
 import {ReducerContext} from "./reducer/reducer.jsx"
import axios from 'axios'
import BASE_URL from "../config.js"

const Connexion = () => {
  const [mail, setMail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [state, dispatch] = useContext(ReducerContext);
  
  const submit = (e) => {
      e.preventDefault()
      axios.post(`${BASE_URL}/connexion`, {
          mail, 
          password
      })
      .then((res) => {
          // si la connexion est ok
          dispatch({type:'connexion'})
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
            <form>
                <label>mail : 
                    <input type="email" value={mail} onChange={(e) => setMail(e.target.value)} />
                </label>
                <label>mot de passe : 
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <button onClick={submit}>Connexion</button>
            </form> 
        )
}

export default Connexion 