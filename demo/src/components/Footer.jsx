import {NavLink} from "react-router-dom"
import BASE_URL from "../config.js";

const Footer = () => {
    return(
        <div className="footer">
            <h2>Les Imaginateurs</h2>
            
            <div className="footer__social container">
                <i className="fa-brands fa-instagram"></i>
                <i className="fa-brands fa-facebook"></i>
                <i className="fa-brands fa-twitter"></i>
            </div>
        </div>
    )
}
export default Footer