import {NavLink} from "react-router-dom"
import BASE_URL from "../config.js";

const Header = () => {
    return(
        <header>
            <div className="header__background ">
                <div className="header__background-overlay">
                    <div className="header__img-container">
                        <img src={`http://alexisleray.sites.3wa.io:9300/img/logo_sansTxt.png`} alt="Logo les Imaginateurs"/>
                    </div>
                    <h1>Les Imaginateurs</h1>
                    <p>Collaboratif d'artistes</p>
                </div>
            </div>
        </header>    
    )
}
export default Header
