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
// ===========================================
//          AFFICHAGE DES ARTICLES
// ===========================================
    
    // useEffect pour récupération des différents articles présents en BDD avec mise à jour lors de changement d'état du state update
    useEffect(() => {
        axios.get(`${BASE_URL}/article`)
    // Affecter le résultat de la requête à allArticles 
        .then((res) => {
            setAllArticles(res.data.articlesArray)
        })
        .catch((err) => {
            console.log(err)
        })
    },[update])
// ===========================================
//          PUBLICATION D'ARTICLES
// ==========================================

    
   const submit = (e) => {
    // preventDefault() empêche l'actualisation automatique de la page du navigateur
        e.preventDefault()
    // Création d'une nouvelle instance FormData appelée dataFile
        const dataFile = new FormData(); 
    // Création de l'objet en utilisant le spread operator  "..." pour inclure tous les inputs cibles avec le nom "avatar"
        const files = {...e.target.avatar.files};
        
    // Ajout des différents inputs concernant le formulaire 
        dataFile.append('title', title)
        dataFile.append('content', content)
        dataFile.append('imgDescription', imgDescription)
        
        
        
    // Vérification de la longueur de caractères des inputs avec la fonction inputLength
        if(inputLength(title,63) && inputLength(content, 1500) && inputLength(imgDescription,255)){
            
    //  Vérifie si un fichier à été importé 
            if(files[0]){
    // Si un fichier a été importé, l'ajoute dans dataFile avec le nom clé "files" et donnant le nom du fichier comme nom 
                dataFile.append('files', files[0], files[0].name)
    // Requête SQL 
                axios.post(`${BASE_URL}/article`, dataFile)
                .then((res)=> {
    // Différentes actions après réponse de la base de donnée 
                    // S'il y a un message le stocker dans msg avec setMsg pour l'afficher en front
                    res.data.msg && setMsg(res.data.msg)
                    // Vider le msg
                    res.data.response && setMsg("")
                    // Inverser la valeur de update pour actualisation d'affichage des articles 
                    setUpdate(!update)
                    // Vider les inputs title, content, url, imgDescription
                    setTitle("")
                    setContent("")
                    setUrl("")
                    setImgDescription("")
                    // Vider l'input contenant le fichier télécharge 
                    inputFile.current.value = null
                })
                .catch((err) => {
                    console.log(err)
                    
                })
            }else { // Si aucun fichier n'a été téléchargé 
            // Requête post avec uniquement le title et content 
                axios.post(`${BASE_URL}/articleTexte`, {
                    title, 
                    content
                })
                .then((res)=> {
                    // On affiche un message console, change le statut d'update et vide les inputs 
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
        
     }
// ===========================================
//          SUPPRESSION DE D'ARTICLES
// ==========================================
    const deleteArticle = (e, article) => {
        // Empêcher l'actualisation automatique de la page du navigateur 
        e.preventDefault()
        // Si l'id de l'image n'est pas égale à null il y a donc une image 
        if(article.image_id !== null){
            // Requête post pour la suppression de l'article en envoyant l'id de l'article, l'id de l'image et l'url de l'image 
            axios.post(`${BASE_URL}/deleteArticle`, {
                
                id: article.id,
                imageId: article.image_id,
                image: article.url
            })
            .then((res) => {
                // Réponse de la BDD nous reprenons tous les articles qu'on stock dans une variable data
                let data = [...allArticles]
                // Set de all articles en utilisant la méthode filter du tableau data pour créer un nouveau tableau en excluant l'id qui a été retiré 
                setAllArticles(data.filter((i) => i.id !== article.id))
        
            })
            .catch((err) => {
                console.log(err)
            })
        }else {
            // Requête post pour la suppression de l'article en envoyant l'id de l'article
            axios.post(`${BASE_URL}/deleteArticle`, {
                id: article.id
            })
            .then((res) => {
                // Réponse de la BDD nous reprenons tous les articles qu'on stock dans une variable data
                let data = [...allArticles]
                // Set de all articles en utilisant la méthode filter du tableau data pour créer un nouveau tableau en excluant l'id qui a été retiré 
                setAllArticles(data.filter((i) => i.id !== article.id))
            })
            .catch((err) => {
                console.log(err)
            })
        }
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
                    </div>
                ))}
                </article> 
            </Fragment>
        </Fragment>
        )
}
export default Galery