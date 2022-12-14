import {useContext, useEffect, Fragment, useState} from "react"
import {ReducerContext} from "./reducer/reducer.jsx"
import axios from 'axios'
import BASE_URL from "../config.js"



const Messagerie = () => {
    const [state, dispatch] = useContext(ReducerContext)
    const [allComment, setAllComment] = useState([])
    const [count, setCount] = useState()
    const [update, setUpdate] = useState(false)
    
    useEffect(() => {
        axios.get(`${BASE_URL}/admin/getMessage`)
        .then((res) => {
            setAllComment(res.data.commentArray)
        })
        .catch((err) => {
            console.log(err)
        })
    },[update])

const deleteMsg = (e,id)=> {
    e.preventDefault()
    axios.post(`${BASE_URL}/admin/getMessage`, {
        id: id
    })
    .then((res) => {
        setUpdate(!update)
        console.log("message supprimé ")
    })
    .catch((err) => {
        console.log(err)
    })
}
// ==================================FONCTION POUR L'ENVOI D'UN MAIL================================
    function onEmailClick() {
        window.open(`mailto:${allComment[0].mail}`);
    }
    
    // return (
    //     <Fragment>    
    //         <table>
    //             <thead>
    //                 <tr>
    //                     <th>Titre</th>
    //                     <th>Content</th>
    //                     <th>Date</th>
    //                     <th>Nom</th>
    //                     <th>Prénom</th>
    //                     <th>Mail</th>
    //                     <th></th>
    //                 </tr>    
    //             </thead>
    //             <tbody>
    //                 {allComment.map((e,i) => {
    //                     return(
    //                     <tr key={i}>
    //                         <td>{e.title}</td>
    //                         <td>{e.content}</td>
    //                         <td>{new Date (e.date).toLocaleDateString('fr')}</td>
    //                         <td>{e.name}</td>
    //                         <td>{e.first_name}</td>
    //                         <td><button onClick={onEmailClick} target="_blank">{e.mail}</button></td>
    //                         <td>
    //                             <button type="submit" onClick={(el) => deleteMsg(el, e.id)}> supprimer </button>
    //                         </td>
    //                     </tr>    
    //                     )
    //                 })}
    //             </tbody>
    //         </table>
    //     </Fragment>  
    // )
        return (
        <Fragment>    
            <section>
                <h2>Messages</h2>
                {allComment.map((e,i) => {
                    return(
                    <div key={i} className="galery__table-container">
                    <table className="message__table table__container">
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
                        </table> 
                        <div className="message__table-btn">
                            <button onClick={onEmailClick} target="_blank">{e.mail}</button>
                            
                                <button type="submit" onClick={(el) => deleteMsg(el, e.id)}> supprimer </button>
                            
                        </div>
                       
                    </div>
                    )
                })}
            </section>
        </Fragment>  
    )
}
export default Messagerie