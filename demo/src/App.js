//import logo from './logo.svg';
import './App.css';
import {ReducerContext} from "./components/reducer/reducer.jsx"
import { useEffect, useContext } from 'react';
import BASE_URL from "./config.js"

function App() {
    const [state, dispatch] = useContext(ReducerContext)

  useEffect(() => {
    fetch(`${BASE_URL}/courses`)
      .then(response => response.json())
      .then(res => {
          dispatch({type:"test",payload:res})
      })

  },[])


  return (
    <ul>
    {state.todo.map((l, i) => <li key={i}>{l}</li>)}
    </ul>
  );

}

export default App;
