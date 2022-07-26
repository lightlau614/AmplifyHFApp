import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

// Components
import Search from "./Layout/Search";

//CSS
import './Resource/Styles/Styles.css';

function App() {
  return (
    <Router>
        <div className="App" >
            <div className="container">
                <Routes>
                    {/* <Route path="/upload" element={<Form />} /> */}
                    <Route path="/" element={<Search />} />
                </Routes>
            </div>
        </div>
    </Router>
  );
}

export default App;
