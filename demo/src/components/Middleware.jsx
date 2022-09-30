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
        console.log(state)
        if(state.logged=== true){    //pas sur
        if(userPath.includes(currentPath)){
            if(!state.user){
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
        }else {   //pas sur
            console.log("vous êtes déjà connecté")  //pas sur
        }  //pas sur
    }, [currentPath]);

    return(
        <Fragment>
            {children}
        </Fragment>
    )
}

export default Middleware