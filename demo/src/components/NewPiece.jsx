// FORMULAIRE D'AJOUT D'UNE NOUVELLE PIECE A DISSOCIER DU RESTE POUR L'APPELER UNIQUEMENT SI BESOIN

import React,{useContext, Fragment, useEffect, useRef} from "react"
import {ReducerContext} from "./reducer/reducer.jsx"
import axios from 'axios'
import BASE_URL from "../config.js"
import MyGalery from './MyGalery.jsx'
import {inputLength} from '../utils/utils.js'

const NewPiece = () => {
    
    const inputFile = useRef()

    const [state, dispatch] = useContext(ReducerContext)
    
    const [imgDescription, setImgDescription] = React.useState("")
    const [price, setPrice] = React.useState("")
    const [productDescription, setProductDescription] = React.useState("")
    const [title, setTitle] = React.useState("")
    const [update, setUpdate] = React.useState(false)
    const [category, setCategory] = React.useState("12")
    const [categoryArray, setCategoryArray] = React.useState([])
    
    
    useEffect(() =>{
            axios.get(`${BASE_URL}/newPiece`)
            .then ((res) => {
                setCategoryArray(res.data.allCategory)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    
    const submit = (e) => {
        e.preventDefault()
        const dataFile = new FormData();  //crer un nouvel objet vide appelé dataFile
        const files = {...e.target.avatar.files};
        
        // ajouter d'autre input au formulaire
        dataFile.append('imgDescription', imgDescription)
        dataFile.append('price', price)
        dataFile.append('productDescription', productDescription )
        dataFile.append('creatorId', state.creatorId)
        dataFile.append('title', title)
        dataFile.append('category', category)
        
        
        
        // L'image
        if(inputLength(title,63) && inputLength(productDescription) && inputLength(price, 11) && inputLength(imgDescription,255)){
        //  if(category ==="")    {
            if(files[0]){
            dataFile.append('files', files[0], files[0].name)
                if(imgDescription && price && productDescription && title ){
                    axios.post(`${BASE_URL}/newPiece`, dataFile)
                    .then((res)=> {
                        res.data.response && console.log('succesfully upload');
                        setUpdate(!update)
                        setPrice("")
                        setProductDescription("")
                        setTitle("")
                        setCategory("12")
                        setImgDescription("")
                        inputFile.current.value = null
                    })
                    .catch((err) => {
                        console.log(err)
                        
                    })
                }else{
                    window.alert("merci de remplir tous les champs")
                }
                
            } else {
                window.alert("N'oubliez pas la photo pour montrer votre oeuvre")
            }
        }else{
            console.log("champs trops longs")
        }    
    } 
    
    return (
        <Fragment>
            <h1>Nouveau produit</h1>
            <form onSubmit={submit} encType="multipart/form-data">
                <label name='avatar' >
                    <input type='file' ref={inputFile} name='avatar'/>
                </label>
                <label>Description de l'image
                    <input type="text" value={imgDescription} onChange={(e) => setImgDescription(e.target.value)} maxLength="255"/>
                    {!inputLength(imgDescription,255) && 
                        <p>Max 255 caractères</p>
                    }
                </label>
                 <label>Titre de l'oeuvre
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} maxLength="63"/>
                    {!inputLength(title,63) && 
                        <p>Max 63 caractères</p>
                    }
                </label>    
                <label>Prix
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} min="1" max="10000"/>
                </label>    
                <label>Description de l'article
                    <textarea  value={productDescription} onChange={(e) => setProductDescription(e.target.value)} maxLength="255"/>
                    {!inputLength(productDescription,255) && 
                        <p>Max 255 caractères</p>
                    }
                </label>    
                <label>Catégorie
                    <select name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                        {categoryArray.map((e,i) => {
                            return(
                                <option key={i} value={e.id}>
                                    {e.category}
                                </option>
                            )
                        })}
                    </select>
                </label>
                
                    <input type='submit' value='Submit'/>
                
            </form>
            <MyGalery update={update} />
        </Fragment>
    )
}

export default NewPiece