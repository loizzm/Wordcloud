import './App.css';
import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Wordcloud from './wordcloud';


function App() {
  return (
    console.log("oi"),
    <div className="App">
        <BrowserRouter> 
        <Routes>
            <Route path="/wordcloud/" element={<Wordcloud/>}/>
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
