import React from "react"
import {useContext, useEffect, Fragment} from "react"
import axios from 'axios'
import BASE_URL from "../config.js"
import {inputLength} from '../utils/utils.js'


const Register = () =>{
    const [name, setName] = React.useState("")
    const [first_name, setFirst_name] = React.useState("")
    const [mail, setMail] = React.useState("")
    const [password, setPassword] = React.useState("")
    
    
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
        const mailRegex = /^(?=.*[@])(?=.*[.])/
    
    const submit = (e) => {
        e.preventDefault()

        if(password.match(regex) && inputLength(name,63) && inputLength(first_name,63) && mail.match(mailRegex) && inputLength(mail)){
          axios.post(`${BASE_URL}/register`, {
                name,
                first_name,
                mail,
                password
            })
            .then( (res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
        } 
        
    }
    
    
    return(
        <form method="post">
            
            <label>Nom : 
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} name="name" maxLength="63"/>
            {!inputLength(name,63) && 
                <p>Max 63 caractères</p>
            }
            </label>
            <label>Prénom : 
                <input type="text" value={first_name} onChange={(e) => setFirst_name(e.target.value)} name="first_name" maxLength="63"/>
            {!inputLength(first_name,63) && 
                <p>Max 63 caractères</p>
            }
            </label>
            <label>Mail : 
                <input type="email" value={mail} onChange={(e) => setMail(e.target.value)} name="mail" maxLength="255"/>
            {!inputLength(mail) && 
                <p>Max 255 caractères</p>
            }
            {!mail.match(mailRegex) &&
            <p>Veuillez entrer une adresse mail valide</p>
            }
            </label>
            <label>Mot de passe : 
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" maxLength="255" />
            {!inputLength(password) && 
                <p>Maximum 255 caractères</p>
            }
            { password.length <= 7  &&
            <p>Le mot de passe doit contenir au minimum 8 caractères</p>
            }
            {  !password.match(regex) &&
            <p>Le mot de passe doit inclure une majuscule, une minuscule, un chiffre et un caractère spécial</p>
            }
                
            </label>
            <button onClick={submit}>clique</button>
                
        </form>
        )
}

export default Register