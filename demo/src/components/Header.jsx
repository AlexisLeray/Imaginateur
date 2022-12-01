import {NavLink} from "react-router-dom"
import BASE_URL from "../config.js";

const Header = () => {
    return(
        <header>
            <div className="header__background">
                <div className="header__background-overlay">
                    <h1>Les Imaginateurs</h1>
                    <p>Colaboratif d'artistes</p>
                </div>
            </div>
        </header>    
    )
}
export default Header
