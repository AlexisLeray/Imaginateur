import React,{useContext,useEffect, Fragment, useState} from "react"
import {ReducerContext} from "./reducer/reducer.jsx"
import axios from 'axios'
import BASE_URL from "../config.js"
import { useParams, useNavigate } from "react-router-dom";
import {inputLength} from '../utils/utils.js'

const UpdateArticle = () => {
     
   
   
    // ===================================POUR UPDATE DU PRODUIT ===================================

    const [articlesArray, setArticlesArray] = React.useState([])
    const [state, dispatch] = useContext(ReducerContext)
    const [title, setTitle] = React.useState("")
    const [content, setContent] = React.useState("")
    const [imgUrl, setImgUrl] = React.useState("")  
    const [update, setUpdate] = React.useState("")
    const [imgDescription, setImgDescription] = React.useState("")
    const [imgId, setImgId] = React.useState()
    
    
        // ===================================POUR AFFICHAGE DE L'ARTICLE AVANT MODIF ===================================
    const {id} = useParams()
         useEffect(() => {
             axios.get(`${BASE_URL}/updateArticle/${id}`)
                .then((res) => {
                    setImgDescription(res.data.selectedProduct[0].description)
                    setContent(res.data.selectedProduct[0].content)
                    setTitle(res.data.selectedProduct[0].title)
                    setImgUrl(res.data.selectedProduct[0].url)
                    setImgId(res.data.selectedProduct[0].image_id)
                    
                    
                })
                .catch((err)=> {
                    console.log(err)
                })
         }, [])
   
    useEffect(() =>{
            axios.get(`${BASE_URL}/updateArticle/${id}`)
            .then ((res) => {
                console.log(2)
                setArticlesArray(res.data.allCategory)
            })
            .catch((err) => {
                console.log(3)
                console.log(err)
            })
    }, [])
    
    const submit = (e) => {
        e.preventDefault()
        const dataFile = new FormData();  //crer un nouvel objet vide appelé dataFile
        const files = {...e.target.picture.files};
        
        dataFile.append('imgDescription', imgDescription) //ajout de la clé, valeur dans l'objet dataFile
        dataFile.append('content', content )
        dataFile.append('title', title)
        dataFile.append('imgUrl', imgUrl)
        dataFile.append('imgId', imgId)
        
        // L'image
        if(inputLength(title,63) && inputLength(content) && inputLength(imgDescription)){
            if(files[0]){                                                   
                dataFile.append('files', files[0], files[0].name)
            }
            axios.post(`${BASE_URL}/updateArticle/${id}`, dataFile)
            .then((res)=> {
                
                console.log(res)
                res.data.response && console.log('succesfully upload');
                setUpdate(!update)
                
            })
            .catch((err) => {
                console.log(err)
                
            })
        }else{
            console.log("champs trops longs")
        }
     } 
     //=================================BOUTON TEST A SUPPRIMER PAR LA SUITE============================
    const test = (e) => {
         e.preventDefault()
        
         console.log("imgId", imgId)
    }
    // ========================================================================================================= 
    return (
        <Fragment>
            <h1>Nouveau produit</h1>
                <button type="submit" onClick={test}>test</button>          
                    <form onSubmit={submit} encType="multipart/form-data">
                       {imgUrl && <img src={`http://alexisleray.sites.3wa.io:9300/img/${imgUrl}`}  /> }
                        <label name='picture'>
                            <input type='file' name='picture'/>
                        </label>
                        <label>Description de l'image
                            <input type="text" value={imgDescription} onChange={(e) => setImgDescription(e.target.value)} maxLength="255" />
                            {!inputLength(imgDescription) && 
                               <p>Max 255 caractères</p>
                            }
                        </label>    
                        <label>Titre de l'oeuvre
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}  maxLength="63"  />
                            {!inputLength(title) && 
                               <p>Max 63 caractères</p>
                            }
                        </label>
                        <label>Contenu de l'article
                            <textarea  value={content} onChange={(e) => setContent(e.target.value)} maxLength="255" />
                            {!inputLength(content) && 
                               <p>Max 255 caractères</p>
                            }
                        </label>    
                            <input type='submit' value='Submit' />
                    </form>
                <button type="submit" onClick={test}>test</button>
        </Fragment>
    )
}

export default UpdateArticle