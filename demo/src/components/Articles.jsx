import React,{useContext, useEffect,Fragment, useState} from "react"
import {ReducerContext} from "./reducer/reducer.jsx"
import axios from 'axios'
import BASE_URL from "../config.js"
import { useParams } from "react-router-dom";


const Galery = () => {
    const [state, dispatch] = useContext(ReducerContext)
    const [title, setTitle] = React.useState("")
    const [content, setContent] = React.useState("")
    const [url, setUrl] = React.useState("")  
    const [update, setUpdate] = React.useState("")
    const [imgDescription, setImgDescription] = React.useState("")
    const [allArticles, setAllArticles] = useState([])
// ==================================AFFICHAGE DES ARTICLES ============================================
  useEffect(() => {
        axios.get(`${BASE_URL}/article`)
        .then((res) => {
            setAllArticles(res.data.articlesArray)
        })
        .catch((err) => {
            console.log(err)
        })
    },[update])
// ==================================PUBLICATION DES ARTICLES===========================================
   const submit = (e) => {
        e.preventDefault()
        const dataFile = new FormData();  //crer un nouvel objet vide appelé dataFile
        const files = {...e.target.avatar.files};
        
        // ajouter d'autre input au formulaire
        dataFile.append('title', title)
        dataFile.append('content', content)
        dataFile.append('imgDescription', imgDescription)
        
        
        
        // L'image
        if(files[0]){
        dataFile.append('files', files[0], files[0].name)
        axios.post(`${BASE_URL}/article`, dataFile)
        .then((res)=> {
            
            console.log(res)
            res.data.response && console.log('succesfully upload');
            setUpdate(!update)
            
        })
        .catch((err) => {
            console.log(err)
            
        })
        } else {
            console.log("ça passe dans le else")
            axios.post(`${BASE_URL}/articleTexte`, {
                
                title, 
                content
                
            })
            .then((res)=> {
                console.log(res)
                res.data.response && console.log('succesfully upload');
                setUpdate(!update)
        })
        .catch((err) => {
            console.log(err)
            
        })  
        }
     } 
    //  =============================DELETE ARTICLE============================================
    const deleteProduct = (e, image) => {
        e.preventDefault()
        axios.post(`${BASE_URL}/deleteArticle`, {
            id:image.id,
            imageId:image.image_id,
            image:image.url
        })
        .then((res) => {
            let data = [...allArticles]
            setAllArticles(data.filter((i) => i.id !== image.id))
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
        console.log("ça marche aussi")
    }
  
  //=================================BOUTON TEST A SUPPRIMER PAR LA SUITE============================
    const test = (e) => {
         e.preventDefault()
        
         console.log("ALLARTICLES", allArticles[2].url)
     }
  
    return(
         
         
       <Fragment>
     <button type="submit" onClick={test}>test</button>
         
            {state.admin &&
         
                <div>
                <h1>Nouvel article</h1>
                <form onSubmit={submit} encType="multipart/form-data">
                    <label name='avatar'>
                        <input type='file' name='avatar'/>
                    </label>
                     <label>Description de l'image
                        <input type="text" value={imgDescription} onChange={(e) => setImgDescription(e.target.value)} />
                    </label>
                    <label>Titre
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </label>
                     <label>Contenu
                        <input type="text" value={content} onChange={(e) => setContent(e.target.value)} />
                    </label>
                        <input type='submit' value='Submit'/>
                </form>
                </div>
            
            }
            <Fragment>
            <h2>partie galerie users</h2>
            
                {allArticles.map((e,i) => (
                    <div key={i}>
                        <div className=""><p>{e.title}</p></div>
                    {e.url !== null &&(
                        <div>
                            <img src={`http://alexisleray.sites.3wa.io:9300/img/${e.url}`}  className="img_lite"/>
                        </div>
                    )}
                        <div>{e.content}</div>
                        <div>{e.price}</div>
                        
                        
                    </div>
                ))}
                
            </Fragment>
            
        </Fragment>
        )
}
export default Galery