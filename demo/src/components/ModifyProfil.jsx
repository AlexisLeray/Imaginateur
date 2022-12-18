import React,{useContext, Fragment, useEffect} from "react"
import {ReducerContext} from "./reducer/reducer.jsx"
import axios from 'axios'
import BASE_URL from "../config.js"
import Connexion from './Connexion.jsx'
import {NavLink} from "react-router-dom"
import { useParams, useNavigate } from "react-router-dom";
import {inputLength} from '../utils/utils.js'

const ModifyProfil = () => {
    // Affectation de la fonction useNavigate à la constante navigate
    const navigate = useNavigate();
    // Récupération de l'id de l'utilisateur stockée dans le reducer
    const {id} = useParams()
    // Déclaration des différents state à utiliser
    const [state, dispatch] = useContext(ReducerContext)
    const [allProfil, setAllProfil] = React.useState([])
    const [name, setName] = React.useState("")
    const [first_name, setFirst_name] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [confirmPassword, setConfirmPassword]= React.useState("")
    
    // Constante regex exigeant une minuscule, une majuscule, un chiffre, un caractère spécial et au moins 8 caractères
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
    
// ===========================================
//      RECUPERATION DES INFO PROFIL USER 
// ========================================== 
/// useEffect demandant les information du profil en utilisant l'id de l'utilisateur connecté
    useEffect(()=> {
        // Requête vers la BDD pour récupérer les information
        axios.get(`${BASE_URL}/profil/${id}`)
        // Au moment de la réponse
        .then((res) => {
            // On affecte le nom à name
            setName(res.data.profil[0].name)
        //   On stock le prénom dand fist_name
            setFirst_name(res.data.profil[0].first_name)
        //  On stock le profil dans profil 
            setAllProfil(res.data.profil)
        })
        .catch((err)=> {
            console.log(err)
        })
    }, [])
    
// ===========================================
//          AFFICHAGE INFO CREATEUR 
// ========================================== 
    const submit = (e) =>     {
        // preventDefault() empêche l'actualisation automatique de la page du navigateur
        e.preventDefault()
        // Vérification du nombre de caractères entrés dans les inputs 
        if(inputLength(name,63) && inputLength(first_name, 63) && inputLength(password) && inputLength(confirmPassword)){
                // Si le mot de passe et la confirmation du mot de passe par rapport au regex sont bons
                if(password.match(regex) && confirmPassword.match(regex)){
                    // Si le mot de passe entré correspond à la confirmation du mot de passe entré 
                    if(password === confirmPassword){
                        // On envoi le nom, prénom et le mot de passe au back en utilisant l'id de l'utilisateur 
                        axios.post(`${BASE_URL}/profil/${id}`, {
                            name,
                            first_name,
                            password
                        })
                        // La réponse de la base de donnée déconnecte l'utilisateur
                        .then((res) => {
                            navigate("/logout")
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                    }else{ //Si les mots de passe sont différents 
                        window.alert("les deux mots de passe sont différent")
                    }
                }else{ //Si le mot de passe ne correspond pas aux exigences du regex
                   window.alert("Le mot de passe doit contenir au minimum 8 caractères, un chiffre, une majuscule et un caractère spécial")
                }
        }else{ //Si l'utilisateur dépasse le nombre de caractères exigé
            window.alert("Nom et prénom limités à 63 charactères, 255 pour le mot de passe ")
        }
    } 
    
    return (
        <Fragment>
        {allProfil.map((e,i) => {
            return(
                <Fragment key={i}>
                    <section className="profil__container container">
                        <header>
                            <h3>Modification du mot du profil</h3>
                        </header>
                    <main className="profil__main">
                    <form method="post" className="profil__main-form">
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
                    </main>
                    <footer>
                        <p>Vous devrez vous reconnecter pour appliquer les changements</p>
                    </footer>
                </section>
            </Fragment>
                )
            })}
        </Fragment>
        )
}

export default ModifyProfil