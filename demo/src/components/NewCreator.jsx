import {useContext, useEffect, Fragment, useState} from "react"
import {ReducerContext} from "./reducer/reducer.jsx"
import axios from 'axios'
import BASE_URL from "../config.js"
import {inputLength} from '../utils/utils.js'


const NewCreator = (e) => {
    const [state, dispatch] = useContext(ReducerContext)
    const [allUsers, setAllUsers] = useState([])
    const [info, setInfo] = useState("")
    const [update, setUpdate] = useState(false)
    let {id} = state
    useEffect(() => {
        axios.get(`${BASE_URL}/admin/newCreator`)
            .then((res) => {
                setAllUsers(res.data.usersTable)
           
            })
            .catch((err) => {
                console.log(err)
            })
    },[update])
    
    const submit = (e, user_id) => {
        e.preventDefault()          
        axios.post(`${BASE_URL}/admin/addCreator`, {          
            id:user_id                                      
        })                                                  
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
          <table>
            <thead>
            <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Mail</th>
                <th>id</th>
                <th>Créateurs</th>
            </tr>    
            </thead>
            <tbody>
            {allUsers.map((e,i) => {
            const user_id = e.id
                return(
        
                <tr key={i}>
                    <td>{e.name}</td>
                    <td>{e.first_name}</td>
                    <td>{e.mail}</td>
                    <td>{e.id}</td>
                    <td>
                     <form type="post" action="" onSubmit={(e) => submit(e,user_id)}>
                        <label>
                        
                            <button type="submit" value={state.id}>Créateur</button>
                        </label>
                    </form>
                    </td>
                </tr>    
                
                )
            })}
            </tbody>
            </table>
        </Fragment>  
        )
    
}
export default NewCreator