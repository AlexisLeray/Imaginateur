import React,{useContext, Fragment,useEffect} from "react"
import {ReducerContext} from "./reducer/reducer.jsx"
import { useNavigate, NavLink, useParams} from "react-router-dom"
import axios from 'axios'
import BASE_URL from "../config.js"
// import { LOGIN, ADMIN } from '../config/constante'
import ModifyProfil from '../components/ModifyProfil'
import {inputLength} from '../utils/utils.js'


const Connexion = () => {
    const {id} = useParams()
    const [mail, setMail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [errorBack, setErrorBack] = React.useState("")
    const [state, dispatch] = useContext(ReducerContext);
    const navigate = useNavigate();
    
  const mailRegex = /^(?=.*[@])(?=.*[.])/
  const submit = (e) => {
      
      e.preventDefault()
        if(mail.match(mailRegex)){
            console.log(1)
        if(inputLength(mail) && inputLength(password) ){  
                axios.post(`${BASE_URL}/connexion`, {
                  mail, 
                  password
              })
            .then((res) => {
                console.log(2)
                if(res.data.response) {
                    localStorage.setItem('jwtToken', res.data.token)
                    axios.defaults.headers.common['Authorization'] = 'Bearer '+res.data.token
                    
                    res.data.msg && setErrorBack(res.data.msg)
                    // si la connexion est ok
                    if(res.data.response){
                      dispatch({type:'connexion', 
                      fname:res.data.first_name, 
                      name:res.data.name, 
                      id:res.data.id, 
                      mail:res.data.mail});
                      navigate("/")  
                    } 
                    // si l'user a le role admin
                    // res.data.admin && dispatch({type:'admin', fname:res.data.first_name, name:res.data.name, id:res.data.id, creatorId:res.data.id_creator});
                    if(res.data.admin){
                        console.log(3)
                        dispatch({type:'admin', fname:res.data.first_name, 
                        name:res.data.name, 
                        id:res.data.id, 
                        creatorId:res.data.id_creator});
                        if(res.data.admin && res.data.creator){
                            console.log("test")
                            navigate("/admin")
                        }
                    }
                    if(res.data.creator){ 
                    dispatch({type:'creator', 
                    name:res.data.name, 
                    fname:res.data.first_name, 
                    creatorId: res.data.id_creator,}) ; 
                    if(res.data.creator && !res.data.admin){    
                        console.log("test")
                        navigate("/NewPiece")
                    }
                    }
                    
                } else {
                    console.log(4)
                    window.alert("Email ou mot de passe inconnu")
                }
            })
            .catch((err) => {
                console.log(5)
                window.alert("Y'a une douille")
                console.log(err)
            })
  
        }else{
            console.log(6)
            console.log("champs trops longs")
        }
  }else{
      console.log(7)
      window.alert("Adresse mail non valide")
  }
            
    } //fin de la fonction submit

//=================================BOUTON TEST A SUPPRIMER PAR LA SUITE============================
    const test = (e) => {
         e.preventDefault()
        
         console.log("mail : ", state)
     }
    return( 
        <Fragment>
        <button type="submit" onClick={test}>test</button>
        {state.logged === false ?
            <form action="" method="post">
                <label>mail : </label>
                    <input type="email" value={mail} onChange={(e) => setMail(e.target.value)} maxLength="255"/>
            {!inputLength(mail) && 
                <p>Max 63 caractères</p>
            }
            <label>mot de passe : </label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} maxLength="255"/>
            {!inputLength(password) && 
                <p>Max 63 caractères</p>
            }
                <button onClick={submit}>Connexion</button>
                {errorBack !== "" && <p>{errorBack}</p>}    
            </form> 
        :
            <Fragment>
                <h2>Bienvenue {state.first_name}</h2>
                <p>Nom: {state.name}</p>
                <p>Prénom: {state.first_name}</p>
                <p>Mail: {state.mail}</p>
                <p>Pour modifier votre profil, cliquez sur le lien suivant : </p>
                    <NavLink to={`/updateProfil/${state.id}`}>
                        Modifier mon profil
                    </NavLink>
                
            </Fragment>
            
        }
        
        </Fragment>
        
    )
}

export default Connexion 