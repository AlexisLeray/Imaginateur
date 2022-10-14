import React,{useContext,useEffect, Fragment, useState} from "react"
import {ReducerContext} from "./reducer/reducer.jsx"
import axios from 'axios'
import BASE_URL from "../config.js"
import { useParams } from "react-router-dom";

const UpdateProduct = () => {
    
   
   
    // ===================================POUR AFFICHAGE DE L'ARTICLE AVANT MODIF ===================================
    const {id} = useParams()
         useEffect(() => {
             axios.get(`${BASE_URL}/updateProduct/${id}`)
                .then((res) => {
                    setImgDescription(res.data.selectedProduct[0].description)
                    setPrice(res.data.selectedProduct[0].price)
                    setProductDescription(res.data.selectedProduct[0].content)
                    setTitle(res.data.selectedProduct[0].title)
                    setImgUrl(res.data.selectedProduct[0].url)
                })
                .catch((err)=> {
                    console.log(err)
                })
         }, [])
     
   
   
    // ===================================POUR UPDATE DU PRODUIT ===================================
    const [state, dispatch] = useContext(ReducerContext)
    
    const [imgDescription, setImgDescription] = React.useState("")
    const [price, setPrice] = React.useState("")
    const [productDescription, setProductDescription] = React.useState("")
    const [title, setTitle] = React.useState("")
    const [update, setUpdate] = React.useState(false)
    const [product_id, setProduct_id] = React.useState()
    const [imgUrl, setImgUrl] = React.useState("")
    
    
    const submit = (e) => {
        e.preventDefault()
        const dataFile = new FormData(); //crer un nouvel objet vide appelé dataFile
        const files = {...e.target.picture.files};
        
        // ajouter d'autre input au formulaire
        dataFile.append('imgDescription', imgDescription) //ajout de la clé, valeur dans l'objet dataFile
        dataFile.append('price', price)
        dataFile.append('productDescription', productDescription )
        dataFile.append('creatorId', state.creatorId)
        dataFile.append('title', title)
        dataFile.append('imgUrl', imgUrl)
        
        // L'image
        if(files[0]){                                                   
            dataFile.append('files', files[0], files[0].name)
        }
        axios.post(`${BASE_URL}/updateProduct/${id}`, dataFile)
        .then((res)=> {
            
            console.log(res)
            res.data.response && console.log('succesfully upload');
            setUpdate(!update)
            
        })
        .catch((err) => {
            console.log(err)
            
        })
     } 
     

    // ===================================TEMPORAIRE JUSTE POUR DESACTIVER LE BOUTON =================================== 
     const test = (e) => {
         e.preventDefault()
            
         console.log(update)
     }
    // ========================================================================================================= 
    return (
        <Fragment>
            <h1>Nouveau produit</h1>
                          
                    <form onSubmit={submit} encType="multipart/form-data">
                       {imgUrl && <img src={`http://alexisleray.sites.3wa.io:9300/img/${imgUrl}`}  /> }
                        <label name='picture'>
                            <input type='file' name='picture'/>
                        <label>Description de l'image</label>
                            <input type="text" value={imgDescription} onChange={(e) => setImgDescription(e.target.value)} />
                         <label>Titre de l'oeuvre</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}  />
                        <label>Prix</label>
                            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                        <label>Description de l'article</label>
                            <textarea  value={productDescription} onChange={(e) => setProductDescription(e.target.value)} />
                            <input type='submit' value='Submit' />
                        </label>
                    </form>
                <button type="submit" onClick={test}>test</button>
        </Fragment>
    )
}

export default UpdateProduct