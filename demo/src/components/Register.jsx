import React from "react"
import { useContext, useEffect, Fragment } from "react"
import axios from 'axios'
import BASE_URL from "../config.js"
import { inputLength } from '../utils/utils.js'
import { useNavigate, NavLink, useParams } from "react-router-dom"


const Register = () => {
    // Déclaration des divers states
    const [name, setName] = React.useState("")
    const [first_name, setFirst_name] = React.useState("")
    const [mail, setMail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [msg, setMsg] = React.useState("")
    const navigate = useNavigate();

    // Création d'un regex pour le mot de pass
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
    //  Création d'un regex pour le mail 
    const mailRegex = /^(?=.*[@])(?=.*[.])/

    const submit = (e) => {
        // preventDefault() empêche l'actualisation automatique de la page du navigateur
        e.preventDefault()
        // Vérification de la longueur des champs avec la fonction inputLenght
        if (password.match(regex) && inputLength(name, 63) && inputLength(first_name, 63) && mail.match(mailRegex) && inputLength(mail)) {
            //   Requête post en envoyant le nom, prénom, mail, mot de passe
            axios.post(`${BASE_URL}/register`, {
                    name,
                    first_name,
                    mail,
                    password
                })
                // A la réponse du back
                .then((res) => {

                    // Si elle est true tout s'est bien passé
                    if (res.data.response === true) {
                        // Redirection vers la page de connexion 
                        navigate('/connexion')
                    }
                    // Si elle est false envoi du message dans une alerte
                    else {

                        window.alert(res.data.msg)
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }

    }


    return (
        <section className="register container">
        <form method="post" className="register__form">
            
            <label>Nom : 
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} name="name" maxLength="63"/>
            {!inputLength(name,63) && 
                <p>Max 63 caractères</p>
            }
            </label>
            <label>Prénom : 
                <input type="text" value={first_name} onChange={(e) => setFirst_name(e.target.value)} name="first_name" maxLength="63" />
            {!inputLength(first_name,63) && 
                <p>Max 63 caractères</p>
            }
            </label>
            <label>Mail : 
                <input type="email" value={mail} onChange={(e) => setMail(e.target.value)} name="mail" maxLength="255" />
            {!inputLength(mail) && 
                <p>Max 255 caractères</p>
            }
            
            {!mail.match(mailRegex) ?
                <p className="errorActive">Veuillez entrer une adresse mail valide </p>
            :
                <div className="errorInactive"> 
                    <i className="fa-solid fa-circle-check"></i>
                </div>
            }
            </label>
            
            <label>Mot de passe : 
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" maxLength="255" />
            {!inputLength(password) && 
                <p>Maximum 255 caractères</p>
            }
            
            
            { password.length <= 7 ?
                <p className="errorActive">
                    Le mot de passe doit contenir au minimum 8 caractères
                </p>
            :
                <div className="errorInactive"> 
                    <i className="fa-solid fa-circle-check"></i>
                </div>
            }
            
            {!password.match(regex) ?
                <p className="errorActive"> 
                    Le mot de passe doit inclure une majuscule, une minuscule, un chiffre et un caracère spécial
                </p>
            :
                <div className="errorInactive">
                    <i className="fa-solid fa-circle-check"></i>
                </div>
            }
            
            
            </label>
            <button onClick={submit}>Valider</button>
                
        </form>
        </section>
    )
}

export default Register
