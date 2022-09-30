import React from "react"
import axios from 'axios'
import BASE_URL from "../config.js"


const Register = () =>{
    const [name, setName] = React.useState("")
    const [first_name, setFirst_name] = React.useState("")
    const [mail, setMail] = React.useState("")
    const [password, setPassword] = React.useState("")
    
    const submit = (e) => {
        e.preventDefault()
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
    
    return(
        <form method="post">
            <label>Nom : 
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} name="name"/>
            </label>
            <label>Prénom : 
                <input type="text" value={first_name} onChange={(e) => setFirst_name(e.target.value)} name="first_name"/>
            </label>
            <label>Mail : 
                <input type="email" value={mail} onChange={(e) => setMail(e.target.value)} name="mail"/>
            </label>
            <label>Mot de passe : 
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password"/>
            </label>
            <button onClick={submit}>clique</button>
                
        </form>
        )
}

export default Register