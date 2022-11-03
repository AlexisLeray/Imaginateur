import {useEffect, useContext, Fragment} from "react"
import { ReducerContext } from "./reducer/reducer.jsx";
import { useNavigate, NavLink } from "react-router-dom";


const error = () => {
    return(
        <Fragment>
            <h1>c'est la page 404 </h1>
            <NavLink to="/">
                Retour à l'acceuil
            </NavLink>
        </Fragment>
        )
}
export default error