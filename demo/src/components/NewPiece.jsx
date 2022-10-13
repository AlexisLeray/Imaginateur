// FORMULAIRE D'AJOUT D'UNE NOUVELLE PIECE A DISSOCIER DU RESTE POUR L'APPELER UNIQUEMENT SI BESOIN

import React,{useContext, Fragment} from "react"
 import {ReducerContext} from "./reducer/reducer.jsx"
import axios from 'axios'
import BASE_URL from "../config.js"
import MyGalery from './MyGalery.jsx'

const NewPiece = () => {

    const [state, dispatch] = useContext(ReducerContext)
    
    const [imgDescription, setImgDescription] = React.useState("")
    const [price, setPrice] = React.useState("")
    const [productDescription, setProductDescription] = React.useState("")
    const [title, setTitle] = React.useState("")
    const [update, setUpdate] = React.useState(false)
    
    
    const submit = (e) => {
        e.preventDefault()
        const dataFile = new FormData();
        const files = {...e.target.avatar.files};
        
        // ajouter d'autre input au formulaire
        dataFile.append('imgDescription', imgDescription)
        dataFile.append('price', price)
        dataFile.append('productDescription', productDescription )
        dataFile.append('creatorId', state.creatorId)
        dataFile.append('title', title)
        
        
        
        // L'image
        dataFile.append('files', files[0], files[0].name)
        axios.post(`${BASE_URL}/newPiece`, dataFile)
        .then((res)=> {
            
            console.log(res)
            res.data.response && console.log('succesfully upload');
            setUpdate(!update)
            
        })
        .catch((err) => {
            console.log(err)
            
        })
     } 
     
    
    return (
        <Fragment>
            <h1>Nouveau produit</h1>
            <form onSubmit={submit} encType="multipart/form-data">
                <label name='avatar'>
                    <input type='file' name='avatar'/>
                <label>Description de l'image</label>
                    <input type="text" value={imgDescription} onChange={(e) => setImgDescription(e.target.value)} />
                 <label>Titre de l'oeuvre</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                <label>Prix</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                <label>Description de l'article</label>
                    <textarea  value={productDescription} onChange={(e) => setProductDescription(e.target.value)} />
                    <input type='submit' value='Submit'/>
                </label>
            </form>
            <MyGalery update={update} />
        </Fragment>
    )
}

export default NewPiece