import React,{useContext, Fragment, useEffect, useState} from "react"
 import {ReducerContext} from "./reducer/reducer.jsx"
import axios from 'axios'
import BASE_URL from "../config.js"



const Home = () => {
    
    // const [products, setProducts] = React.useState([])
    const [photos, setPhotos] = React.useState([])
    
    useEffect(() => {
        axios.get(`${BASE_URL}/home`)
        .then((res) => {
            setPhotos(res.data.result)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])
// ================================================================================================

// ================================================================================================
 const [currentIndex, setCurrentIndex] = useState(0);

  // move to the next photo
  // if we are at the end, go to the first photo
  const next = () => {
    setCurrentIndex((currentIndex + 1) % photos.length);
  };

  // move to the previous photo
  // if we are at the beginning, go to the last photo
  const prev = () => {
    setCurrentIndex((currentIndex - 1 + photos.length) % photos.length);
  };
//=================================BOUTON TEST A SUPPRIMER PAR LA SUITE============================
    // const test = (e) => {
    //      e.preventDefault()
        
    //      console.log("CURRENT TARGET", products)
    // }
    return(
        <Fragment>
              {/* Render the carousel */}
              <div className='slider-container'>
                {photos.map((photo) => (
                  <div
                    key={photo.id}
        
                    // if the photo is the current photo, show it
                    className={
                      photos[currentIndex].id === photo.id ? 'fade' : 'slide fade'
                    }
                  >
                    <img src={`http://alexisleray.sites.3wa.io:9300/img/${photo.url}`} alt={photo.description} className='photo' />
                    <div className='caption'>{photo.title}</div>
                  </div>
                ))}
        
                {/* Previous button */}
                <button onClick={prev} className='prev'>
                  &lt;
                </button>
        
                {/* Next button */}
                <button onClick={next} className='next'>
                  &gt;
                </button>
              </div>
        
              {/* Render dots indicator */}
              <div className='dots'>
                {photos.map((photo) => (
                  <span
                    key={photo.id}
                    // highlight the dot that corresponds to the current photo
                    className={
                      photos[currentIndex].id === photo.id ? 'dot active' : 'dot'
                    }
                    // when the user clicks on a dot, go to the corresponding photo
                    onClick={() => setCurrentIndex(photos.indexOf(photo))}
                  ></span>
                ))}
              </div>
        </Fragment>
        )
}
export default Home