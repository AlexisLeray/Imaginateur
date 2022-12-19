import React, { useContext, useEffect, Fragment, useState } from "react"
import { ReducerContext } from "./reducer/reducer.jsx"
import axios from 'axios'
import BASE_URL from "../config.js"
import { useParams, useNavigate } from "react-router-dom";
import { inputLength } from '../utils/utils.js'

const UpdateArticle = () => {


    // Déclaration des divers states
    const [articlesArray, setArticlesArray] = React.useState([])
    const [state, dispatch] = useContext(ReducerContext)
    const [title, setTitle] = React.useState("")
    const [content, setContent] = React.useState("")
    const [imgUrl, setImgUrl] = React.useState("")
    const [update, setUpdate] = React.useState("")
    const [imgDescription, setImgDescription] = React.useState("")
    const [imgId, setImgId] = React.useState("")
    const [backMsg, setBackMsg] = React.useState("")
    // Affectation de la fonction useNavigate à la constante navigate
    const navigate = useNavigate()

    // Récupération de l'id de l'article
    const { id } = useParams()

    /// ===========================================
    //          RECUPERATION DES INFOS DE L'ARTICLE
    // ==========================================
    // useEffect se mettant à jour selon le statut d'update
    useEffect(() => {
        //  Requête get en utilisant l'id du produit
        axios.get(`${BASE_URL}/updateArticle/${id}`)
            // Réponse du back
            .then((res) => {
                // On affecte le résultat du back au divers élément 
                setImgDescription(res.data.selectedProduct[0].description)
                setContent(res.data.selectedProduct[0].content)
                setTitle(res.data.selectedProduct[0].title)
                setImgUrl(res.data.selectedProduct[0].url)
                setImgId(res.data.selectedProduct[0].image_id)


            })
            .catch((err) => {
                console.log(err)
            })
    }, [update])

    /// ===========================================
    //        A quoi bon
    // ==========================================

    // useEffect(() =>{
    //         axios.get(`${BASE_URL}/updateArticle/${id}`)
    //         .then ((res) => {
    //             setArticlesArray(res.data.allCategory)
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }, [])

    const submit = (e) => {
        // preventDefault() empêche l'actualisation automatique de la page du navigateur
        e.preventDefault()
        // Création d'une nouvelle instance FormData appelée dataFile
        const dataFile = new FormData();
        // Création de l'objet en utilisant le spread operator  "..." pour inclure tous les inputs cibles avec le nom "avatar"
        const files = { ...e.target.picture.files };
        // Ajout des différents inputs clé/valeur concernant le formulaire dans l'objet dataFile
        dataFile.append('imgDescription', imgDescription)
        dataFile.append('content', content)
        dataFile.append('title', title)
        dataFile.append('imgUrl', imgUrl)
        dataFile.append('imgId', imgId)

        // Vérification de la longueur de caractère des inputs
        if (inputLength(title, 63) && inputLength(content) && inputLength(imgDescription)) {
            //  Vérifie si un fichier à été importé 
            if (files[0]) {
                // Si un fichier a été importé, l'ajoute dans dataFile avec le nom clé "files" et donnant le nom du fichier comme nom 
                dataFile.append('files', files[0], files[0].name)
            }
            // Méthode post pour l'envoi des informations en utilisant l'id de l'article
            axios.post(`${BASE_URL}/updateArticle/${id}`, dataFile)
                .then((res) => {
                    // S'il y a un message du back on l'affecte à backMsg
                    res.data.msg && setBackMsg(res.data.msg);
                    // Si réponse du back on fait une redirection vers la galerie d'exposition
                    res.data.response && navigate("/galery")
                    // S'il y a réponse du back pour vide le message
                    res.data.response && setBackMsg("")
                    setUpdate(!update)

                })
                .catch((err) => {
                    console.log(err)

                })
        }
        else {
            console.log("champs trops longs")
        }
    }

    return (
        <Fragment>
            <section className="update__container container"> 
                <h1>Modification d'article</h1>
                    <form onSubmit={submit} encType="multipart/form-data" className="section__update-inputs">
                       {imgUrl && 
                        <div className="update__container-img">
                            <img src={`http://alexisleray.sites.3wa.io:9300/img/${imgUrl}`}  alt={imgDescription}/> 
                        </div>
                        }
                        <div className="img-errorBack">
                            {backMsg}
                        </div>
                            <label name='picture'>
                                <input type='file' name='picture'/>
                            </label>
                            <label>Description de l'image
                                <input type="text" value={imgDescription} onChange={(e) => setImgDescription(e.target.value)} maxLength="255"  />
                                {(imgDescription && !inputLength(imgDescription)) && 
                                   <p>Max 255 caractères</p>
                                }
                            </label>    
                            <label>Titre de l'oeuvre
                                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} maxLength="63"  />
                                {!inputLength(title, 63) && 
                                   <p>Max 63 caractères</p>
                                }
                            </label>
                            <label className="section__update-area">Contenu de l'article
                                <textarea  value={content} onChange={(e) => setContent(e.target.value)}  maxLength="255" rows="5" cols="33" />
                                {!inputLength(content) &&  
                                   <p>Max 255 caractères</p>
                                }
                            </label>    
                        <input type='submit' value='Valider' className="section__update-submit" />
                    </form>
            </section>    
        </Fragment>
    )
}

export default UpdateArticle
