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
    
//=================================BOUTON TEST A SUPPRIMER PAR LA SUITE============================
    const test = (e) => {
         e.preventDefault()
        
         console.log("TEST", allComment)
     }
    
    return (
        <Fragment>    
        <button type="submit" onClick={test}>test</button>
     
          <table>
            <thead>
            <tr>
                <th>Titre</th>
                <th>Content</th>
                <th>Date</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Mail</th>
                <th></th>
            </tr>    
            </thead>
            <tbody>
            {allComment.map((e,i) => {
                return(
        
                <tr key={i}>
                    <td>{e.title}</td>
                    <td>{e.content}</td>
                    <td>{new Date (e.date).toLocaleDateString('fr')}</td>
                    <td>{e.name}</td>
                    <td>{e.first_name}</td>
                    <td><button onClick={onEmailClick} target="_blank">{e.mail}</button></td>
                    <td>
                        <button type="submit" onClick={(el) => deleteMsg(el, e.id)}> supprimer </button>
                    </td>
                </tr>    
                
                )
            })}
            </tbody>
            </table>
        </Fragment>  
            )
}
export default Messagerie