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
          <table>
                <thead>
                    <tr>
                        <th>Titre</th>
                        <th>Image</th>
                        <th>Prix</th>
                        <th>Contenu</th>
                        <th>Catégorie</th>
                        <th>Action</th>
                    </tr>    
                </thead>
            <tbody>
             {allProducts[0] && allProducts.map((e,i) => {
                 return(
        
                <tr key={i}>
                    <td>{e.title}</td>
                    <td>
                        <img src={`http://alexisleray.sites.3wa.io:9300/img/${e.url}`}  alt={e.description}/>
                    </td>
                    <td>{e.price}</td>
                    <td>{e.content}</td>
                    <td>{e.category}</td>
                    
                    <td>
                        <NavLink to={`/update/${e.id}`}>
                            Modifier
                        </NavLink>
                        <button type="submit" onClick={(el) => deleteProduct(el,e)}> 
                            Supprimer
                        </button>
                    </td> 
                </tr>    
                 )
             })}
            </tbody>
            </table>
        </Fragment>  
    )
    
}
 export default MyGalery