import {useEffect, useContext} from "react"
import { ReducerContext } from "./reducer/reducer.jsx";
import { useNavigate } from "react-router-dom";


const error = () => {
    return(
        <h1>c'est la page 404 </h1>
        )
}
export default error