import React,{Fragment} from "react"
import {NavLink} from "react-router-dom"




const Admin =() => {
    
    
    return(
        <Fragment>
            <ul>
                <li>
                    <NavLink to="/admin/getMessage">
                        T'as des messages ? 
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/NewPiece">
                        Mes oeuvres
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/newPiece">
                        Nouvelle oeuvre 
                    </NavLink>
                </li>
                
                <li>
                    <NavLink to="/admin/newCreator">
                        Nouveau Créateur
                    </NavLink>
                </li>
            </ul>
            <h2>C'est la page Admin</h2>
        </Fragment>    
            )
}
export default Admin