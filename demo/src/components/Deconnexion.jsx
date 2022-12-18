import {useEffect, useContext} from "react"
import { ReducerContext } from "./reducer/reducer.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios"

const Logout = () => {
    const [state, dispatch] = useContext(ReducerContext)
    const navigate = useNavigate();
    
    // useEffect au montage 
    useEffect(() => {
        // On retire le jason web token du local storage
        localStorage.removeItem('jwtToken')
        // On supprime "Athorization" d'axios
        delete axios.defaults.headers.common['Authorization']
        // On vide le reducer des infos qu'il contenait
        dispatch({type:'logout'}) 
        // Navigation vers la page home 
        navigate("/")
    },[])
};

export default Logout;
