import {useEffect, useContext} from "react"
import { ReducerContext } from "./reducer/reducer.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios"

const Logout = () => {
    const [state, dispatch] = useContext(ReducerContext)
    const navigate = useNavigate();
    
    useEffect(() => {
        console.log("Déconnecté")
        localStorage.removeItem('jwtToken')
        delete axios.defaults.headers.common['Authorization']
        dispatch({type:'logout'}) 
        navigate("/")
    },[])
};

export default Logout;
