import React,{useContext, Fragment, useEffect, useState} from "react"
import {ReducerContext} from "./reducer/reducer.jsx"
import {NavLink} from "react-router-dom"
import axios from 'axios'
import BASE_URL from "../config.js"



const Home = () => {
    const [state, dispatch] = useContext(ReducerContext);
    // Déclaration d'un tableau vite appelé photo pour stocker nos images 
    const [photos, setPhotos] = React.useState([])
    // On déclare un state qui servira de compteur au carousel 
    const [currentIndex, setCurrentIndex] = useState(0);
    
// ===========================================
//          RECUPERATION DES IMAGES POUR LE CAROUSEL 
// ==========================================     
/// useEffect au montage qui lance la requête pour récupérer les images du carousel
    useEffect(() => {
        // On récupère les images
        axios.get(`${BASE_URL}/home`)
        
        // On stock la réponse de la BDD dans le useState photos
        .then((res) => {
            setPhotos(res.data.result)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

// ===========================================
//          FONCTION PHOTO SUIVANTE 
// ========================================== 
//// On incrémente le currentIndex pour passer à l'image suivante, si nous somme à la dernière nous revenons à la première 
  const next = () => {
    setCurrentIndex((currentIndex + 1) % photos.length);
  };
  
// ===========================================
//          FONCTION PHOTO SUIVANTE 
// ========================================== 
//// On incrémente le currentIndex pour passer à l'image précédente, si nous somme à la première nous revenons à la dernière
  const prev = () => {
    setCurrentIndex((currentIndex - 1 + photos.length) % photos.length);
  };
  
  
  /// ===========================================
  //          ACTUALISATION DU PANIER
  // ==========================================
  useEffect(() => {
        // Requête get pour récupérer le contenu du panier selon l'id de l'utilisateur
        axios.get(`${BASE_URL}/payment/${state.id}`)
            // Réponse du back
            .then((res) => {
                // Si présence de res.data.toBuy on affecte au state shop la quantité et le détail du panier
                res.data.toBuy && dispatch({ type: 'shop', quantity: res.data.toBuy.length, basketDetails: res.data.toBuy });
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])

    return(
      <Fragment>
        <section>
          <header className="home__header container">
            <h2>
              Présentation
            </h2>
            <p>
              Le site des Imaginateurs vous propose des oeuvres uniques d'artistes d'horizons différents.
            </p>
          </header>
            <main className="home__main">
              {/* Render du carousel */}
              <div className='slider-container container'>
                {photos.map((photo) => (
                  <div
                    key={photo.id}
                    // Si la photo est la l'image actuelle, la montrer 
                    className={
                      photos[currentIndex].id === photo.id ? 'fade' : 'slide fade'
                    }
                  >
                    <img src={`http://alexisleray.sites.3wa.io:9300/img/${photo.url}`} alt={photo.description} className='photo' />
                    <div className='caption'>{photo.title}</div>
                  </div>
                ))}
        
                {/* Bouton précédent */}
                <button onClick={prev} className='prev'>
                  &lt;
                </button>
        
                {/* Bouton suivant */}
                <button onClick={next} className='next'>
                  &gt;
                </button>
              </div>
        
                  {/* Rendu des dots*/}
              <div className='dots'>
                {photos.map((photo) => (
                  <span
                    key={photo.id}
                    // highlight the dot that corresponds to the current photo
                    className={
                      photos[currentIndex].id === photo.id ? 'dot dotActive' : 'dot'
                  }
                    // Quand l'utilisateur clique sur le dots aller à la photo correspondante
                      onClick={() => setCurrentIndex(photos.indexOf(photo))}
                  ></span>
                ))}
              </div>
            </main>
            <footer className="home__footer">
              <div className="home__footer-container container">
                <h3>
                <NavLink to="/shop">
                  Visitez notre boutique
                </NavLink>
                </h3>
                <p>
                  Pour découvrir les oeuvres de nos créateurs.
                </p>
              </div>
            </footer>
          </section>
        </Fragment>
   )
}
export default Home