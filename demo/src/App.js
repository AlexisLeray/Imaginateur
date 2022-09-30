//import logo from './logo.svg';
import './App.css';
//  import {ReducerContext} from "./components/reducer/reducer.jsx"
// import { useContext } from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Nav from './components/Nav'
import Routeur from './components/Router'
// import BASE_URL from "./config.js"


function App() {
  
  return(
        <BrowserRouter>
            <Nav />
            <Routeur />
        </BrowserRouter>
)}

export default App;
