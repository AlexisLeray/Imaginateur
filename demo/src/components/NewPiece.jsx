import React,{useContext, Fragment} from "react"
 import {ReducerContext} from "./reducer/reducer.jsx"
import axios from 'axios'
import BASE_URL from "../config.js"

const NewPiece = () => {

    const [state, dispatch] = useContext(ReducerContext)
    const [description, setDescription] = React.useState("")
    const submit = (e) => {
        e.preventDefault()
        const dataFile = new FormData();
        const files = {...e.target.avatar.files};
        
        
        console.log(files)
        
        // ajouter d'autre input au formulaire
        dataFile.append('description', description)
        
        
        // L'image
        dataFile.append('files', files[0], files[0].name)
        
        axios.post(`${BASE_URL}/newPiece`, dataFile)
        .then((res)=> {
            console.log(res)
            res.data.response && console.log('succesfully upload');
            
        })
        .catch((err) => {
            console.log(err)
            
        })
    } 
    
    return (
        <Fragment>
            <h1>Ajouter/Modifier l'avatar</h1>
            <form onSubmit={submit} encType="multipart/form-data">
                <label name='avatar'>
                    <input type='file' name='avatar'/>
                <label>Description</label>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                    
                    <input type='submit' value='Submit'/>
                </label>
            </form>
        </Fragment>
    )
}

export default NewPiece