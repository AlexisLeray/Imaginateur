import React,{useContext,useEffect, Fragment, useState} from "react"
import {NavLink} from "react-router-dom"
import {ReducerContext} from "./reducer/reducer.jsx"
import axios from 'axios'
import BASE_URL from "../config.js"


const MyGalery = ({update}) => {

const [state, dispatch] = useContext(ReducerContext)
    const [allProducts, setAllProducts] = useState([])
    
    let id = state.creatorId
    
    useEffect(() => {
        axios.get(`${BASE_URL}/myGalery/${id}`)
        .then((res) => {
            setAllProducts(res.data.productArray)
        })
        .catch((err) => {
            console.log(err)
        })
    },[update])
  
    const deleteProduct = (e, image) => {
        e.preventDefault()
        axios.post(`${BASE_URL}/deleteProduct`, {
            id:image.id,
            imageId:image.image_id,
            image:image.url
        })
        .then((res) => {
            let data = [...allProducts]
            setAllProducts(data.filter((i) => i.id !== image.id))
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
        console.log("ça marche aussi")
    }
    
    return(

        <Fragment>   
            <section className="galery table__container">
             {allProducts[0] && allProducts.map((e,i) => {
                 return(
            <div key={i} className="galery__table-container">
                <table  className="myGalery__table">
                <tbody>
                    <tr>
                        <th>Titre</th>
                        <td>{e.title}</td>
                    </tr>
                    <tr>
                        <th>Image</th>
                        <td>
                            <div className="galery__img-container">
                                <img src={`http://alexisleray.sites.3wa.io:9300/img/${e.url}`}  alt={e.description}/>
                            </div>
                        </td>
                    </tr>    
                    <tr>
                        <th>Prix</th>
                        <td>{e.price}€</td>
                    </tr>
                    <tr>
                        <th>Contenu</th>
                        <td>{e.content}</td>
                    </tr>    
                    <tr>
                        <th>Catégorie</th>
                        <td>{e.category}</td>
                    </tr>
                    </tbody>
                </table>
                <div className="galery__btn navlink">
                        
                            <NavLink to={`/update/${e.id}`}>
                                Modifier
                            </NavLink>
                            <button type="submit" onClick={(el) => deleteProduct(el,e)}> 
                                Supprimer
                            </button>
                        
                        </div>
                </div>
                 )
             })}
            </section>
        </Fragment>  
    )
}
 export default MyGalery