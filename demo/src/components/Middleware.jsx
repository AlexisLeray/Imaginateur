import {useContext, useEffect, Fragment} from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { ReducerContext } from "./reducer/reducer.jsx";
import { userPath, adminPath } from '../config/path.js'

const Middleware = ({children}) => {
    const [state, dispatch] = useContext(ReducerContext)
    const navigate = useNavigate();

    const location = useLocation()
    const currentPath = location.pathname

    useEffect(() => {
        // Si l'utilisateur n'est pas connecté 
        if (state.logged === false) {   
            if(userPath.includes(currentPath)){
                if(!state.logged){
                    navigate('/')
                }
            }
            if(userPath.includes(currentPath)){
                if(!state.creator){
                    navigate('/')
                }
            }
            if(adminPath.includes(currentPath)){
                if(!state.admin){
                    navigate('/')
                }
            }
        } else {
            console.log("vous êtes déjà connecté")
        }
    }, [currentPath]);

    return(
        <Fragment>
            {children}
        </Fragment>
    )
}

export default Middleware