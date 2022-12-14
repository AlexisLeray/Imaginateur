import React,{useContext, Fragment, useEffect} from "react"
import {ReducerContext} from "./reducer/reducer.jsx"
import axios from 'axios'
import BASE_URL from "../config.js"
import Connexion from './Connexion.jsx'
import {NavLink} from "react-router-dom"
import { useParams } from "react-router-dom";
import {inputLength} from '../utils/utils.js'

const Creator =() => {
    
    const {id} = useParams()    
    const [state, dispatch] = useContext(ReducerContext);
    const [description, setDescription] = React.useState("")
    const [imgDescription, setImgDescription] = React.useState("")
    const [imgUrl, setImgUrl] = React.useState("")
    const [imgId, setImgId] = React.useState(0)
    const [creator, setCreator]= React.useState([])
    const [update, setUpdate] = React.useState(false)
    const [msg, setMsg] = React.useState("")
        
        useEffect(() => {
             axios.get(`${BASE_URL}/creator/${id}`)
                .then((res) => {
                    console.log(res.data.creator)
                    if(res.data.creator[0] && res.data.creator[0].url){
                        setImgUrl(res.data.creator[0].url)
                        setImgDescription(res.data.creator[0].imgTxt)
                        setDescription(res.data.creator[0].description)
                        setImgId(res.data.creator[0].image_id)
                        setCreator(res.data.creator)
                    }else{
                      
                        setDescription("")
                        setImgId("")
                        setCreator("")
                        
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }, [update])
        
        
        const submit = (e) => {
                e.preventDefault()
                const dataFile = new FormData();  //crer un nouvel objet vide appelé dataFile
                const files = {...e.target.avatar.files};
                
                // ajouter d'autre input au formulaire
                dataFile.append('imgDescription', imgDescription)
                dataFile.append('description', description)
                dataFile.append('imgUrl', imgUrl)
                dataFile.append('imgId', imgId)
                
                // L'image
                if(files[0]){
                    dataFile.append('files', files[0], files[0].name)
                }
            if(inputLength(imgDescription) && inputLength(description, 5000)){    
                axios.post(`${BASE_URL}/creator/${id}`, dataFile)
                .then((res)=> {
                    setUpdate(!update)
                    res.data.response && console.log('succesfully upload');
                    res.data.msg && setMsg(res.data.msg)
                    
                })
                .catch((err) => {
                    console.log(err)
                    
                })
            }else{
                console.log("champs trops longs")
            }
         } 

        return(
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
                
                     {creator[0] ? // ( 
                        
                            <Fragment>
                                <main className="creator__main">
                                    <div className="creator__img-container">
                                        <img  src={`http://alexisleray.sites.3wa.io:9300/img/${creator[0].url}`}  />
                                    </div>
                                    <form onSubmit={submit} encType="multipart/form-data" className="creator__main-form">
                                        <label name='avatar'>
                                            <input type='file' name='avatar'/>
                                        </label>
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