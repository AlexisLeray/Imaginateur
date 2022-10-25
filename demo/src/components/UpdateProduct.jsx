import React,{useContext,useEffect, Fragment, useState} from "react"
import {ReducerContext} from "./reducer/reducer.jsx"
import axios from 'axios'
import BASE_URL from "../config.js"
import { useParams } from "react-router-dom";
import {inputLength} from '../utils/utils.js'

const UpdateProduct = () => {
     
   
   
    // ===================================POUR UPDATE DU PRODUIT ===================================
    const [state, dispatch] = useContext(ReducerContext)
    
    const [imgDescription, setImgDescription] = React.useState("")
    const [price, setPrice] = React.useState("")
    const [productDescription, setProductDescription] = React.useState("")
    const [title, setTitle] = React.useState("")
    const [update, setUpdate] = React.useState(false)
    const [product_id, setProduct_id] = React.useState()
    const [imgUrl, setImgUrl] = React.useState("")
    const [category, setCategory] = React.useState("")
    const [category_id, setCategory_id]= React.useState("")
    const [categoryArray, setCategoryArray] = React.useState([])
    
    
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
                    setCategory(res.data.selectedProduct[0].category)
                    setCategory_id(res.data.selectedProduct[0].categorie_id)
                    
                })
                .catch((err)=> {
                    console.log(err)
                })
         }, [])
   
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
        const files = {...e.target.picture.files};
        
        dataFile.append('imgDescription', imgDescription) //ajout de la clé, valeur dans l'objet dataFile
        dataFile.append('price', price)
        dataFile.append('productDescription', productDescription )
        dataFile.append('creatorId', state.creatorId)
        dataFile.append('title', title)
        dataFile.append('imgUrl', imgUrl)
        dataFile.append('category_id', category_id)
        
        // L'image
        if(inputLength(imgDescription) && inputLength(price, 11 ) && inputLength(productDescription) && inputLength(title)){
            if(files[0]){                                                   
                dataFile.append('files', files[0], files[0].name)
            }
                if(imgDescription && price && productDescription && title ){
                    axios.post(`${BASE_URL}/updateProduct/${id}`, dataFile)
                    .then((res)=> {
                        res.data.response && console.log('succesfully upload');
                        setUpdate(!update)
                    })
                    .catch((err) => {
                        console.log(err)
                        
                    })
                }else{
                    window.alert("merci de remplir tous les champs")
                }
        }else{
            console.log("champs trops longs")
        }    
    } 
     

    // ===================================TEMPORAIRE JUSTE POUR DESACTIVER LE BOUTON =================================== 
     const test = (e) => {
         e.preventDefault()
            
         console.log("CATEGORIE ID", category_id, "CATEGORIE", category )
     }
    // ========================================================================================================= 
    return (
        <Fragment>
            <h1>Nouveau produit</h1>
                          
                    <form onSubmit={submit} encType="multipart/form-data">
                       {imgUrl && <img src={`http://alexisleray.sites.3wa.io:9300/img/${imgUrl}`}  /> }
                        <label name='picture'>
                            <input type='file' name='picture'/>
                        </label>
                        <label>Description de l'image
                            <input type="text" value={imgDescription} onChange={(e) => setImgDescription(e.target.value)} maxLength="255"/>
                            {!inputLength(imgDescription) && 
                                <p>Max 255 caractères</p>
                            }
                        </label>
                        <label>Titre de l'oeuvre
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}  maxLength="255"/>
                            {!inputLength(title) && 
                                <p>Max 255 caractères</p>
                            }
                        </label>
                        <label>Prix
                            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} min="1" max="10000"/>
                        </label>    
                        <label>Description de l'article
                            <textarea  value={productDescription} onChange={(e) => setProductDescription(e.target.value)} maxLength="255"/>
                            {!inputLength(productDescription) && 
                                <p>Max 255 caractères</p>
                            }
                        </label>    
                        <label>Catégorie
                            <select name="category"  value={category_id} onChange={(e) => setCategory_id(e.target.value)}>
                                {categoryArray.map((e,i) => {
                                    return(
                                        <option key={i} value={e.id} >{e.category}</option>
                                    )
                                })}
                            </select>
                        </label>    
                            <input type='submit' value='Submit' />
                        
                    </form>
                <button type="submit" onClick={test}>test</button>
        </Fragment>
    )
}

export default UpdateProduct