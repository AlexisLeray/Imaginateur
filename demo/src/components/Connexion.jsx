import React, { useContext, Fragment, useEffect } from "react"
import { ReducerContext } from "./reducer/reducer.jsx"
import { useNavigate, NavLink, useParams } from "react-router-dom"
import axios from 'axios'
import BASE_URL from "../config.js"
// import { LOGIN, ADMIN } from '../config/constante'
import ModifyProfil from '../components/ModifyProfil'
import { inputLength } from '../utils/utils.js'


const Connexion = () => {
    const { id } = useParams()
    const [mail, setMail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [errorBack, setErrorBack] = React.useState("")
    const [state, dispatch] = useContext(ReducerContext);
    const navigate = useNavigate();

    // Regex exigant une @ et un .
    const mailRegex = /^(?=.*[@])(?=.*[.])/

    // ===========================================
    //          FONCTION SUBMIT 
    // ===========================================

    const submit = (e) => {
        // preventDefault() empêche l'actualisation automatique de la page du navigateur
        e.preventDefault()
        // Si l'adresse mail correspond au exigence du mailRegex 
        if (mail.match(mailRegex)) {
            // Vérification des nombres de caractères du mail et mot de passe 
            if (inputLength(mail) && inputLength(password)) {
                // Si les condition précédentes sont remplie requete post pour la connexion en utilisant le mail et mot de passe 
                axios.post(`${BASE_URL}/connexion`, {
                        mail,
                        password
                    })
                    .then((res) => {
                        // Si il y a une réponse de la BDD
                        if (res.data.response) {
                            // Enregistrement du JWT reçu dans le stockage local du navigateur sous la clé "jwtToken"
                            localStorage.setItem('jwtToken', res.data.token)
                            // Définit l'entête HTTP "Authorization" de la bibliothèque axios pour des requête axios ultérieur
                            axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token

                            res.data.msg && setErrorBack(res.data.msg)
                            // si la connexion est ok on envoit les différentes informations dans le reducer 
                            if (res.data.response) {
                                dispatch({
                                    type: 'connexion',
                                    fname: res.data.first_name,
                                    name: res.data.name,
                                    id: res.data.id,
                                    mail: res.data.mail
                                });
                                navigate("/")
                            }
                            // si l'utilisateur a le role admin
                            if (res.data.admin) {
                                dispatch({
                                    type: 'admin',
                                    fname: res.data.first_name,
                                    name: res.data.name,
                                    id: res.data.id,
                                    creatorId: res.data.id_creator
                                });
                                if (res.data.admin && res.data.creator) {
                                    navigate("/admin")
                                }
                            }
                            // Si l'user à le rôle de créateur
                            if (res.data.creator) {
                                dispatch({
                                    type: 'creator',
                                    name: res.data.name,
                                    fname: res.data.first_name,
                                    creatorId: res.data.id_creator
                                });
                                if (res.data.creator && !res.data.admin) {
                                    navigate("/NewPiece")
                                }
                            }

                        }
                        else {
                            // alerte de mot de passe ou mail inconnu
                            window.alert("Email ou mot de passe inconnu")
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })

            }
            else {
                console.log("champs trops longs")
            }
        }
        else {
            window.alert("Adresse mail non valide")
        }
    }



    return (

        <Fragment>
            {state.logged === false ?
            <section>
                <form action="" method="post" className="connexion__form container">
                    <label>
                        <h4>Mail : </h4>
                        <input type="email" value={mail} onChange={(e) => setMail(e.target.value)} maxLength="255"/>
                    {!inputLength(mail) && 
                        <p>Max 63 caractères</p>
                    }
                    </label>
                    <label>
                        <h4>Mot de passe : </h4> 
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} maxLength="255"/>
                    {!inputLength(password) && 
                        <p>Max 63 caractères</p>
                    }
                    </label>
                    <button onClick={submit}>Connexion</button>
                    {errorBack !== "" && <p>{errorBack}</p>}    
                </form> 
            </section>
            :
                <Fragment>
                    <section className="section__account container">
                        <header className="account__header">
                            <h2>Bienvenue <span className="account__name-span">{state.first_name}</span></h2>
                        </header>
                        <main className="account__main">
                            <p>Nom: {state.name}</p>
                            <p>Prénom: {state.first_name}</p>
                            <p>Mail: {state.mail}</p>
                            <p>Pour modifier votre profil, cliquez sur le lien suivant : </p>
                            <NavLink to={`/updateProfil/${state.id}`} className="account__modify-button">Modifier mon profil
                            </NavLink>
                        </main>
                    </section>
                </Fragment>
            }
        </Fragment>
    )
}

export default Connexion
