import React,{useContext, Fragment, useEffect} from "react"
import {ReducerContext} from "./reducer/reducer.jsx"
import axios from 'axios'
import BASE_URL from "../config.js"
import Connexion from './Connexion.jsx'
import {NavLink} from "react-router-dom"
import { useParams, useNavigate } from "react-router-dom";
import {inputLength} from '../utils/utils.js'

const ModifyProfil = () => {
    const navigate = useNavigate();
    const {id} = useParams()
    const [state, dispatch] = useContext(ReducerContext)
    const [allProfil, setAllProfil] = React.useState([])
    const [name, setName] = React.useState("")
    const [first_name, setFirst_name] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [confirmPassword, setConfirmPassword]= React.useState("")
    
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
    useEffect(()=> {
        axios.get(`${BASE_URL}/profil/${id}`)
        .then((res) => {
           
            setName(res.data.profil[0].name)
           
            setFirst_name(res.data.profil[0].first_name)
           
            setAllProfil(res.data.profil)
        
        })
        .catch((err)=> {
            console.log(err)
        })
    }, [])
    //========================================SUBMIT MODIFICATIONS ====================================
    const submit = (e) =>     {
        e.preventDefault()
        
        if(inputLength(name,63) && inputLength(first_name, 63) && inputLength(password) && inputLength(confirmPassword)){
                if(password.match(regex) && confirmPassword.match(regex)){
                    if(password === confirmPassword){
                        axios.post(`${BASE_URL}/profil/${id}`, {
                            name,
                            first_name,
                            password
                        })
                        .then((res) => {
                            console.log('ça passe')
                            navigate("/logout")
                            
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                    }else{
                        window.alert("les deux mots de passe sont différent")
                    }
                }else{
                   window.alert("Le mot de passe doit contenir au minimum 8 caractères, un chiffre, une majuscule et un caractère spécial")
                }
        }else{
            window.alert("Nom et prénom limités à 63 charactères, 255 pour le mot de passe ")
        }
    } 
    
    return (
        <Fragment>
            <h2>pour modifier le profiiiiiileuuuh</h2>
            {allProfil.map((e,i) => {
                return(
                <Fragment key={i}>
                   <form method="post"  >
                        <label> Nom 
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} name="name" maxLength="63"/>
                            {!inputLength(name, 63) && 
                                <p>Max 63 caractères</p>
                            }
                        </label>
                        <label> Prénom 
                            <input type="text" value={first_name} onChange={(e) => setFirst_name(e.target.value)} name="first_name" maxLength="63" />
                            {!inputLength(first_name, 63) && 
                                <p>Max 63 caractères</p>
                            }
                        </label>
                        <label> Nouveau mot de passe 
                            <input type="password" value={password}  name="password" onChange={(e) => setPassword(e.target.value)} maxLength="255"/>
                            {!inputLength(password) && 
                                <p>Max 255 caractères</p>
                            }
                        </label>
                        <label> Confirmer le mot de passe  
                            <input type="password" value={confirmPassword} name="password" onChange={(e) => setConfirmPassword(e.target.value)}  maxLength="255"/>
                            {!inputLength(confirmPassword) && 
                                <p>Max 255 caractères</p>
                            }
                        </label>
                        <button type="submit" value='Submit' onClick={submit}>Valider</button>
                    </form>
                    <p>Vous devrez vous reconnecter pour appliquer les changements</p>
                </Fragment>
                )
            })}
        </Fragment>
        )
}

export default ModifyProfil