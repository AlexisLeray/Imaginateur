import React,{useContext, useEffect,Fragment, useState, useRef} from "react"
import {ReducerContext} from "./reducer/reducer.jsx"
import axios from 'axios'
import BASE_URL from "../config.js"
import { useParams, NavLink, useNavigate } from "react-router-dom";
import {inputLength} from '../utils/utils.js'

const Galery = () => {
    const inputFile = useRef()
    const [state, dispatch] = useContext(ReducerContext)
    const [title, setTitle] = React.useState("")
    const [content, setContent] = React.useState("")
    const [url, setUrl] = React.useState("")  
    const [update, setUpdate] = React.useState("")
    const [imgDescription, setImgDescription] = React.useState("")
    const [allArticles, setAllArticles] = useState([])
    const [msg, setMsg] = React.useState("")
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
        if(inputLength(title,63) && inputLength(content, 1500) && inputLength(imgDescription,255)){
            
            if(files[0]){
                dataFile.append('files', files[0], files[0].name)
                axios.post(`${BASE_URL}/article`, dataFile)
                .then((res)=> {
                    
                    res.data.msg && setMsg(res.data.msg)
                    res.data.response && setMsg("")
                    setUpdate(!update)
                    setTitle("")
                    setContent("")
                    setUrl("")
                    setImgDescription("")
                    inputFile.current.value = null
                    console.log("c'est téléchargé")
                })
                .catch((err) => {
                    console.log(err)
                    
                })
            }else {
                console.log("ça passe dans le else")
                axios.post(`${BASE_URL}/articleTexte`, {
                    
                    title, 
                    content
                    
                })
                .then((res)=> {
                    
                    res.data.response && console.log('succesfully upload');
                    setUpdate(!update)
                    setTitle("")
                    setContent("")
                    setUrl("")
                    setImgDescription("")
                })
                .catch((err) => {
                    console.log(err)
                    
                })  
            }
        }else{
            console.log("champs trops longs")
        }
        
     } //fin de la fonction submit
    //  =============================SUPPPRESSION D'ARTICLE TIRE DE PRODUCTS===========================================
    const deleteArticle = (e, article) => {
        e.preventDefault()
        if(article.image_id !== null){
            axios.post(`${BASE_URL}/deleteArticle`, {
                
                id: article.id,
                imageId: article.image_id,
                image: article.url
            })
            .then((res) => {
                let data = [...allArticles]
                setAllArticles(data.filter((i) => i.id !== article.id))
        
            })
            .catch((err) => {
                console.log(err)
            })
        }else {
            axios.post(`${BASE_URL}/deleteArticle`, {
                id: article.id
            })
            .then((res) => {
                let data = [...allArticles]
                setAllArticles(data.filter((i) => i.id !== article.id))
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }
  
  //=================================BOUTON TEST A SUPPRIMER PAR LA SUITE============================
   
            // article est un paramètre qui équivaut au "e" du bouton il va permettre de choisir quel information du e (donc de toutes les informations de l'article) nous voulons récupérer 
    const test = (e, article) => { // TODO DELETE
          e.preventDefault()
          console.log("DESCRIPTION DE L'IMAGE", allArticles)
  
     }
  
    return(
        <Fragment>
            
         
            {state.admin &&
                <section className="article__admin container">
                    <div>
                        <h2>Nouvel article</h2>
                        <form onSubmit={submit} encType="multipart/form-data" className="article__admin-inputs">
                            <label name='avatar'>
                                <input type='file' ref={inputFile} name='avatar'/>
                            </label>
                            <label>Description de l'image
                                <input type="text" value={imgDescription} onChange={(e) => setImgDescription(e.target.value)} maxLength="63"/>
                                    {!inputLength(imgDescription,63) && 
                                        <p>Max 63 caractères</p>
                                    }
                            </label>
                            <label>Titre
                                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} maxLength="63"/>
                                    {!inputLength(title,63) && 
                                        <p>Max 63 caractères</p>
                                    }
                            </label>
                            <label>Contenu
                                <textarea value={content} onChange={(e) => setContent(e.target.value)} maxLength="1500" />
                                    {!inputLength(content, 1500) && 
                                        <p>Max 1500 caractères</p>
                                    }
                            </label>
                            <input type='submit' value='Valider'/>  {/*il y avait une value "submit"*/}
                        </form>
                        <div>
                            {msg}
                        </div>
                    </div>
                </section>    
            
            }
            <Fragment>
            <article className="container"> 
                <header>
                    <h2>Galerie d'exposition</h2>
                </header>
                {allArticles.map((e,i) => (
                    <div key={i} className="article__content">
                        <div className="article__content-title"> {/* a voir */}
                            <h3>{e.title}</h3>
                        </div>  {/* a voir */}
                        <div className="article__content-content"> {/* a voir */}
                    {e.url !== null &&(
                        <div className="article__content-img">
                            <img src={`http://alexisleray.sites.3wa.io:9300/img/${e.url}`}  className="img_lite" alt={e.description} />
                        </div>
                    )}
                    <p>{e.content}</p>
                    {/*il y avait price ici je ne sais pourquoi */}
                    </div> 
                    {state.admin && 
                        <div className="article__options"> 
                            <NavLink to={`/updateArticle/${e.id}`}>
                                Modifier
                            </NavLink>
                             {/*Pour le bouton delete on indique qu'au click on lance la fonction deleteArticle qui prend comme paramètre el l'élément et e l'ensemble des info de l'article en question*/}                                   
                            <button type="submit" onClick={(el) => deleteArticle(el, e)}> Supprimer </button> 
                        </div>
                    
                    }    
                    {/* a voir */}
                    </div>
                    
                ))}
                </article> 
            </Fragment>
        </Fragment>
        )
}
export default Galery