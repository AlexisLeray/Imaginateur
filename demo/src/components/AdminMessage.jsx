import { useContext, useEffect, Fragment, useState } from "react"
import { ReducerContext } from "./reducer/reducer.jsx"
import axios from 'axios'
import BASE_URL from "../config.js"



const Messagerie = () => {
    // Déclaration des states
    const [state, dispatch] = useContext(ReducerContext)
    const [allComment, setAllComment] = useState([])
    const [count, setCount] = useState()
    const [update, setUpdate] = useState(false)

    // ===========================================
    //          RECUPERATION DES MESSAGES
    // ===========================================

    // UseEffect pour la récupération des messages contenus en BDD qui sera mis à jour lors de la fonction deleteMsg avec le state update
    useEffect(() => {
        axios.get(`${BASE_URL}/admin/getMessage`)
            .then((res) => {
                // Lors de la récupération des données et affectation à allComment
                setAllComment(res.data.commentArray)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [update])

    // ===========================================
    //      SUPPRESSION DE MESSAGES
    // ===========================================

    // Fonction de suppression des messages au click du bouton 
    const deleteMsg = (e, id) => {
        e.preventDefault()
        // Demande de requête SQL avec le axios.post en envoyant l'id du message concerné
        axios.post(`${BASE_URL}/admin/getMessage`, {
                id: id
            })
            // Lors de la réponse on setUpdate en inversant son état pour relancer le get précédent et actualiser les messages affichés
            .then((res) => {
                setUpdate(!update)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    // ===========================================
    //      FONCTION POUR L'ENVOI DES MESSAGES
    // ===========================================

    // Fonction pour l'ouverture d'une fenêtre pour l'envoi des messages 
    function onEmailClick() {
        window.open(`mailto:${allComment[0].mail}`);
    }

    return (
        <Fragment>    
            <section className="message container">
                <h2>Messages</h2>
                <div className="testtable">
                {allComment.map((e,i) => {
                    return(
                        <div key={i} className="message__table-container">
                            <table className="message__table table__container">
                                <tbody>
                                    <tr>
                                        <th>Titre</th>
                                        <td>{e.title}</td>
                                    </tr>    
                                    <tr>
                                        <th>Contenu</th>
                                        <td>{e.content}</td>
                                    </tr>
                                    <tr>
                                        <th>Date</th>
                                        <td>{new Date (e.date).toLocaleDateString('fr')}</td>
                                    </tr>
                                    <tr>
                                        <th>Nom</th>
                                        <td>{e.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Prénom</th>
                                        <td>{e.first_name}</td>
                                    </tr>
                                </tbody>
                            </table> 
                            <div className="message__table-btn">
                                <button onClick={onEmailClick} target="_blank">{e.mail}</button>
                                <button type="submit" onClick={(el) => deleteMsg(el, e.id)}> supprimer </button>
                            </div>
                        </div>
                    )
                })}
                </div>
            </section>
        </Fragment>
    )
}
export default Messagerie
