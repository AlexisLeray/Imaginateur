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
            console.log("champs trops longs")
        }
    } //fin fonction submit
    //=================================BOUTON TEST A SUPPRIMER PAR LA SUITE============================
    const test = (e) => {
         e.preventDefault()
        
         console.log("allProfil", name,first_name)
     }
    return (
        <Fragment>
       
            <button type="submit" onClick={test}>test</button>
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
                        <label> Mot de passe  
                            <input type="text" value={password}  name="password" onChange={(e) => setPassword(e.target.value)} maxLength="255"/>
                            {!inputLength(password) && 
                                <p>Max 255 caractères</p>
                            }
                        </label>
                        <label> Confirmer le mot de passe  
                            <input type="text" value={confirmPassword} name="password" onChange={(e) => setConfirmPassword(e.target.value)}  maxLength="255"/>
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