//import logo from './logo.svg';
import './css/app.css';
//  import {ReducerContext} from "./components/reducer/reducer.jsx"
// import { useContext } from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Nav from './components/Nav'
import Header from './components/Header'
import Footer from './components/Footer'
import Routeur from './components/Router'
// import BASE_URL from "./config.js"


function App() {
  
  return(
        <BrowserRouter>
            <Header />
            <Nav />
            <Routeur />
            <Footer />
        </BrowserRouter>
)}

export default App;
