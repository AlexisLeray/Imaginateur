import React, { useContext, Fragment, useEffect } from "react"
import { ReducerContext } from "./reducer/reducer.jsx"
import axios from 'axios'
import BASE_URL from "../config.js"
import Connexion from './Connexion.jsx'
import { NavLink } from "react-router-dom"
import { useParams } from "react-router-dom";
import { inputLength } from '../utils/utils.js'

const Creator = () => {

    // Stockage de l'id utilisateur displonible dans le reducer 
    const { id } = useParams()
    // Déclaration des différents states
    const [state, dispatch] = useContext(ReducerContext);
    const [description, setDescription] = React.useState("")
    const [imgDescription, setImgDescription] = React.useState("")
    const [imgUrl, setImgUrl] = React.useState("")
    const [imgId, setImgId] = React.useState(0)
    const [creator, setCreator] = React.useState([])
    const [update, setUpdate] = React.useState(false)
    const [msg, setMsg] = React.useState("")

    // ===========================================
    //          AFFICAHGE INFO CREATEUR 
    // ==========================================    

    // useEffect de récupération des infos du créateur
    useEffect(() => {
        // Méthode get pour récupérer les informations du créateur disponible selon son id
        axios.get(`${BASE_URL}/creator/${id}`)
            .then((res) => {
                // Si le profil du créateur contient l'url d'une image 
                if (res.data.creator[0] && res.data.creator[0].url) {
                    // On set l'url de l'image dans imgUrl
                    setImgUrl(res.data.creator[0].url)
                    // On set la description de l'image dans imgDescription
                    setImgDescription(res.data.creator[0].imgTxt)
                    // On set la description du créateur dans description 
                    setDescription(res.data.creator[0].description)
                    // On set l'id de l'image dans imgId
                    setImgId(res.data.creator[0].image_id)
                    setCreator(res.data.creator)
                }
                // Si le profil du crétaeur est vide 
                else {
                    setDescription("")
                    setImgId("")
                    setCreator("")

                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [update])

    // ===========================================
    //      CREATION DU PROFIL CREATEUR
    // ==========================================        

    const submit = (e) => {
        // preventDefault() empêche l'actualisation automatique de la page du navigateur
        e.preventDefault()
        // Création d'une nouvelle instance FormData appelée dataFile
        const dataFile = new FormData();
        // Création de l'objet en utilisant le spread operator  "..." pour inclure tous les inputs cibles avec le nom "avatar"
        const files = { ...e.target.avatar.files };

        // Ajout des différents inputs concernant le formulaire 
        dataFile.append('imgDescription', imgDescription)
        dataFile.append('description', description)
        dataFile.append('imgUrl', imgUrl)
        dataFile.append('imgId', imgId)

        //  Vérifie si un fichier à été importé 
        if (files[0]) {
            // Si un fichier a été importé, l'ajoute dans dataFile avec le nom clé "files" et donnant le nom du fichier comme nom 
            dataFile.append('files', files[0], files[0].name)
        }
        // Vérification du nombre de caractères dans les inputs 
        if (inputLength(imgDescription) && inputLength(description, 5000)) {
            // Méthode post pour l'envoi des informations en utilisant l'id du créateur pour cibler son profil 
            axios.post(`${BASE_URL}/creator/${id}`, dataFile)
                // Réponse de la base de donnée 
                .then((res) => {
                    // On change l'état de update pour activer le useEffect précédent et mettre à jours les infos
                    setUpdate(!update)
                    // Si il y a une réponse de la BDD on reçoit un console log dans la console
                    res.data.response && console.log('succesfully upload');
                    // Si il y a une réponse de la base de donnée avec un message on le stock dans msg pour le rendre disponible
                    res.data.msg && setMsg(res.data.msg)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        else {
            // Si la longueur des champs dépasse la condition 
            window.alert("champs trops longs")
        }
    }

    return (
        <Fragment>
                <section className="creator container">
                {state.creator === false ? 
                    <Fragment>
                        <header>
                            <h2>Espace réservé aux créateurs</h2>
                            <Connexion />
                        </header>
                    </Fragment>
                : 
                <Fragment>
                    <header>
                        <h2>Bienvenue</h2>
                        <ul>
                            <li>
                                <NavLink to="/NewPiece">
                                    Ma galerie
                                </NavLink>    
                            </li>
                        </ul>
                    </header>
                </Fragment>    
                }
                     {creator[0] ? 
                            <Fragment>
                                <main className="creator__main">
                                    <div className="creator__img-container">
                                        <img  src={`http://alexisleray.sites.3wa.io:9300/img/${creator[0].url}`}  />
                                    </div>
                                    <form onSubmit={submit} encType="multipart/form-data" className="creator__main-form">
                                        <label name='avatar'>
                                            <input type='file' name='avatar'/>
                                        </label>
                                        <div className="creator__main-txtInputs">
                                            <label>Courte descrption de votre image 
                                                <input type="text/"  defaultValue={creator[0].imgTxt}  onChange={(e) => setImgDescription(e.target.value)}  maxLength="255"/>
                                                {!inputLength(imgDescription) && 
                                                    <p>Max 255 caractères</p>
                                                }    
                                            </label>
                                            <label>Présentez vous en quelques mots
                                                <textarea   defaultValue={creator[0].description}  onChange={(e) => setDescription(e.target.value)}  maxLength="5000"/>
                                                {!inputLength(description, 5000) && 
                                                    <p>Max 5000 caractères</p>
                                                }
                                            </label>
                                        </div>
                                        <input type='submit' value='Submit' />
                                    </form>
                                    <div>
                                        {msg}
                                    </div>
                                </main>
                            </Fragment>
                      
                        : 
                            <Fragment>
                                <main>
                                    <form onSubmit={submit} encType="multipart/form-data">
                                        <label name='avatar'>
                                            <input type='file' name='avatar'/>
                                        </label>
                                        <label>Courte descrption de votre image 
                                            <input type="text/"  value={imgDescription}  onChange={(e) => setImgDescription(e.target.value)}  />
                                            {!inputLength(imgDescription) && 
                                                <p>Max 255 caractères</p>
                                            }
                                        </label>
                                        <label>Présentez vous en quelques mots
                                            <textarea  value={description} onChange={(e) => setDescription(e.target.value)} maxLength="5000" />
                                            {!inputLength(description, 5000) && 
                                                <p>Max 5000 caractères</p>
                                             }
                                        </label>
                                        <input type='submit' value='Submit' />
                                    </form>
                                </main>
                            </Fragment >
                        }
                   </section>
                </Fragment>
    )
}
export default Creator
