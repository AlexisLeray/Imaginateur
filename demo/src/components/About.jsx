import React,{useContext} from "react"
 import {ReducerContext} from "./reducer/reducer.jsx"
import axios from 'axios'
import BASE_URL from "../config.js"
import {NavLink, useNavigate} from "react-router-dom"

const About =() => {
    return(
        <section className="about container">
            <header>
                <h2>Plus de détails sur les Imaginateurs</h2>
            </header>
            <main className="about__main">
                <p>
                    Lorem ipsum dolor sit amet. Ex aliquid accusantium aut corporis inventore sed nihil recusandae ut explicabo animi in nulla repudiandae. Et commodi laboriosam ut omnis nemo quo incidunt soluta ea debitis facere. Eos suscipit dolores et fugiat accusantium est voluptate dignissimos aut omnis maiores. Qui sunt suscipit qui repellendus culpa in vitae consequatur?
                </p>
                <p>
                    Sed magni laboriosam qui nobis minima a labore fuga? Ut fuga omnis et eligendi nostrum est voluptate atque. Et delectus doloremque ab doloremque dignissimos sit quasi vitae.
                </p>
                <p>
                    Vel internos officia qui quasi laudantium hic amet quia aut quis optio et eligendi dolor ea suscipit quas! Qui cumque praesentium sit quae nesciunt vel assumenda consequatur est enim omnis est corrupti saepe. Aut molestiae architecto est dolores totam ad accusamus voluptatem et rerum modi non fugit assumenda vel iure aperiam.
                </p>
            </main>
            <footer className="about__footer">
                <NavLink to="/contact" className="about__footer-link">
                    Une question ? venez nous la poser !
                </NavLink>
            </footer>
        </section>
        )
}
export default About