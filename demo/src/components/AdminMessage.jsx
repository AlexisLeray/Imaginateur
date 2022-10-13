import {useContext, useEffect, Fragment, useState} from "react"
import {ReducerContext} from "./reducer/reducer.jsx"
import axios from 'axios'
import BASE_URL from "../config.js"



const Messagerie = () => {
    const [state, dispatch] = useContext(ReducerContext)
    const [allComment, setAllComment] = useState([])
    
    
    useEffect(() => {
     axios.get(`${BASE_URL}/admin/getMessage`)
            .then((res) => {
                setAllComment(res.data.commentArray)
    })
    .catch((err) => {
        console.log(err)
    })
    },[])
    
    
    return (
        <Fragment>    
          <table>
            <thead>
            <tr>
                <th>Titre</th>
                <th>Content</th>
                <th>Date</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Mail</th>
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
                    <td>{e.mail}</td>
                </tr>    
                
                )
            })}
            </tbody>
            </table>
        </Fragment>  
            )
}
export default Messagerie