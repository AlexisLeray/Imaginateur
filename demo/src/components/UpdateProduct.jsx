import React, { useContext, useEffect, Fragment, useState } from "react"
import { ReducerContext } from "./reducer/reducer.jsx"
import axios from 'axios'
import BASE_URL from "../config.js"
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { inputLength } from '../utils/utils.js'

const UpdateProduct = () => {



    // Déclaration des différents states
    const [state, dispatch] = useContext(ReducerContext)
    const [imgDescription, setImgDescription] = React.useState("")
    const [price, setPrice] = React.useState("")
    const [productDescription, setProductDescription] = React.useState("")
    const [title, setTitle] = React.useState("")
    const [update, setUpdate] = React.useState(false)
    const [product_id, setProduct_id] = React.useState()
    const [imgUrl, setImgUrl] = React.useState("")
    const [category, setCategory] = React.useState("")
    const [category_id, setCategory_id] = React.useState("")
    const [categoryArray, setCategoryArray] = React.useState([])
    const [img, setImg] = useState("")
    const [backMsg, setBackMsg] = React.useState("")
    const navigate = useNavigate();
    const { id } = useParams()

    // ===========================================
    //      AFFICAHGE DU PRODUIT A MODIFIER
    // ==========================================   
    // useEffect se mettant à jour avec le statut de update
    useEffect(() => {
        axios.get(`${BASE_URL}/updateProduct/${id}`)
            .then((res) => {
                // A la réponse du back on stock les différents élément dans les states correspondants
                setImgDescription(res.data.selectedProduct[0].description)
                setPrice(res.data.selectedProduct[0].price)
                setProductDescription(res.data.selectedProduct[0].content)
                setTitle(res.data.selectedProduct[0].title)
                setImgUrl(res.data.selectedProduct[0].url)
                setCategory(res.data.selectedProduct[0].category)
                setCategory_id(res.data.selectedProduct[0].categorie_id)

            })
            .catch((err) => {
                console.log(err)
            })
    }, [update])


    // ===========================================
    //  RECUPERATION DES CATEGORIES D'ARTICLES
    // ==========================================   
    //useEffect se mettant à jour avec update
    useEffect(() => {
        axios.get(`${BASE_URL}/newPiece`)
            .then((res) => {
                // Réponse du back qui affecte la liste de catégories à categoryArray
                setCategoryArray(res.data.allCategory)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [update])

    // ===========================================
    //      VALIDATION DES MODIFICATIONS
    // ========================================== 

    const submit = (e) => {
        // preventDefault() empêche l'actualisation automatique de la page du navigateur
        e.preventDefault()
        // Création d'une nouvelle instance FormData appelée dataFile
        const dataFile = new FormData();
        // Création de l'objet en utilisant le spread operator  "..." pour inclure tous les inputs cibles avec le nom "avatar"
        const files = { ...e.target.picture.files };
        // Ajout des différents inputs clé/valeur concernant le formulaire dans l'objet dataFile
        dataFile.append('imgDescription', imgDescription)
        dataFile.append('price', price)
        dataFile.append('productDescription', productDescription)
        dataFile.append('creatorId', state.creatorId)
        dataFile.append('title', title)
        dataFile.append('imgUrl', imgUrl)
        dataFile.append('category_id', category_id)


        // Vérification de la longueur de caractère des inputs
        if (inputLength(imgDescription) && inputLength(price, 11) && inputLength(productDescription) && inputLength(title)) {
            //  Vérifie si un fichier à été importé 
            if (files[0]) {
                dataFile.append('files', files[0], files[0].name)
            }
            // Vérification que tous les champs soient remplis
            if (imgDescription && price && productDescription && title) {
                // Méthode post pour l'envoi des informations en utilisant l'id du produit
                axios.post(`${BASE_URL}/updateProduct/${id}`, dataFile)
                    .then((res) => {
                        // S'il y a un message du back on l'affecte à backMsg
                        res.data.msg && setBackMsg(res.data.msg)
                        // Si réponse du back on fait une redirection vers la galerie d'exposition
                        res.data.response && navigate("/NewPiece")
                        // S'il y a réponse du back pour vide le message
                        res.data.response && setBackMsg("");
                        setUpdate(!update)
                    })
                    .catch((err) => {
                        console.log(err)

                    })
            }
            else {
                window.alert("merci de remplir tous les champs")
            }
        }
        else {
            console.log("champs trops longs")
        }
    }



    return (
        <Fragment>
        <section className="updateProduct">
            <h2>Modification produit</h2>
                <form onSubmit={submit} encType="multipart/form-data" className="updateProduct__form container">
                <div className="updateProduct__img-form">
                   {imgUrl &&
                       <div className="updateProduct__form-imgContainer">
                        <img src={`http://alexisleray.sites.3wa.io:9300/img/${imgUrl}`}  />
                       </div>
                   }
                    <label name='picture'>
                        <input type='file' name='picture'/>
                        <div className="img-errorBack">
                            {backMsg}
                        </div>
                    </label>
                </div>    
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
                    <div className="updateProduct__form-bottom"> 
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
                    </div>
                </form>
            </section>
        </Fragment>
    )
}

export default UpdateProduct
