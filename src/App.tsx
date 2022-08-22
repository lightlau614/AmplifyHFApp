import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


// Components
import Search from "./Layout/Search";
import Search_eng from "./Layout/Search_eng";
import Slidebar from "./Components/Slidebar";
import LoginBox from "./Components/LoginBox";
import UserBox from "./Components/UserBox";

//CSS
import './Resource/Styles/Styles.css';

function App() {
  const [ logOpen, setLogOpen ] = useState<boolean>(false);
  const [ uOpen, setUOpen ] = useState<boolean>(false);

  const passLogin = async ( item:any ) =>{
    setLogOpen(true);
  }

  const passCreate = async (item:any) =>{
    setUOpen(true);
  }

  const reUser = async (item: any) => {
    setUOpen(item);
  }

  const returnLog = async (item:any)=>{
    setLogOpen(item);
  }
  
  return (
    <Router>
        <div className="App">
            <LoginBox logOpen={logOpen} returnLog={returnLog} />
            <UserBox uOpen={uOpen} reUser={reUser} />
            <Slidebar pageWrapId={"page-wrap"} outerContainerId={"outer-container"} passLogin={passLogin} passCreate={passCreate}/>
            <div className="container">
              <Routes>
                  <Route path="/search" element={<Search_eng />} />
                  <Route path="/" element={<Search />} />
              </Routes>
            </div>
        </div>
    </Router>
  );
}

export default App;