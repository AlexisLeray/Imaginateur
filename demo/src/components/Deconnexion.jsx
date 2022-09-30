import {useEffect, useContext} from "react"
import { ReducerContext } from "./reducer/reducer.jsx";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const [state, dispatch] = useContext(ReducerContext)
    const navigate = useNavigate();
    
    useEffect(() => {
        console.log("Déconnecté")
        dispatch({type:'logout'}) 
        navigate("/")
    },[])
};

export default Logout;
