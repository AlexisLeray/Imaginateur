import { useContext, useEffect, Fragment, useState } from "react"
import { ReducerContext } from "./reducer/reducer.jsx"
import axios from 'axios'
import BASE_URL from "../config.js"
import { inputLength } from '../utils/utils.js'


const NewCreator = (e) => {
    // Accès au contenu du reducer 
    const [state, dispatch] = useContext(ReducerContext)
    // Déclaration des divers states
    const [allUsers, setAllUsers] = useState([])
    const [info, setInfo] = useState("")
    const [update, setUpdate] = useState(false)
    let { id } = state

    // ===========================================
    //       RECUPERATION DES USERS INSCRITS 
    // ==========================================
    // useEffect pour la récupérations des users qui se met à jour selon update
    useEffect(() => {
        axios.get(`${BASE_URL}/admin/newCreator`)
            // Si réponse du back on stock les inscrits dans le state allUsers
            .then((res) => {
                setAllUsers(res.data.usersTable)

            })
            .catch((err) => {
                console.log(err)
            })
    }, [update])

    // ===========================================
    //  CHANGEMENT STATUR USER VERS CREATEUR 
    // ==========================================
    // Au click du bouton on execute la fonction en envoyant l'id de l'user
    const submit = (e, user_id) => {
        // preventDefault() empêche l'actualisation automatique de la page du navigateur
        e.preventDefault()
        axios.post(`${BASE_URL}/admin/addCreator`, {
                id: user_id
            })
            // Si réponse du back on stock le message dans info et change le statut de update pour relancer le useEffect
            .then((res) => {
                setInfo(res.data.msg)
                setUpdate(!update)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <Fragment>    
            <section className="newCreator container">
                <h2>Nouveau créateur</h2>
                {allUsers.map((e,i) => {
                    const user_id = e.id
                    return(
                    <div key={i} className="newCreator__table-container">
                        <table  className="newCreator__table table__container">
                            <tbody>
                                <tr> 
                                    <th>Nom</th>
                                    <td>{e.name}</td>
                                </tr>
                                <tr>
                                    <th>Prénom</th>
                                    <td>{e.first_name}</td>
                                </tr>
                                <tr>
                                    <th>Mail</th>
                                    <td>{e.mail}</td>
                                </tr>
                                <tr>
                                    <th>ID</th>
                                    <td>{e.id}</td>
                                </tr>
                            </tbody>    
                        </table>
                            <div className="newCreator__table-btn">
                                 <form type="post" action="" onSubmit={(e) => submit(e,user_id)}>
                                    <label>
                                    
                                        <button type="submit" value={state.id}>Créateur</button>
                                    </label>
                                </form>
                            </div>
                            
                    </div>
                    )
                })}
            </section>
        </Fragment>
    )

}
export default NewCreator
