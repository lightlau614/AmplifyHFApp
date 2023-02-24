import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


// Components
import Search from "./Layout/Search";
import Search_eng from "./Layout/Search_eng";
import Slidebar from "./Components/Slidebar";
import LoginBox from "./Components/LoginBox";
import UserBox from "./Components/UserBox";
import UserList from "./Components/UserList";

//CSS
import './Resource/Styles/Styles.css';

function App() {
  const [ logOpen, setLogOpen ] = useState<boolean>(false);
  const [ uOpen, setUOpen ] = useState<boolean>(false);
  const [ stID, setStID ] = useState<any>('');
  const [ calltime, setCallTime ] = useState<number>(0);

  const passLogin = async ( item:any ) =>{
    setLogOpen(true);
  }

  const passCreate = async (item:any) =>{
    setUOpen(true);
    setStID('');
  }

  const reUser = async (item: any) => {
    setUOpen(item);
    setCallTime(calltime+1);
  }

  const returnLog = async (item:any)=>{
    setLogOpen(item);
  }

  const passID = async (item:any) => {
    setStID(item);
  }
  
  return (
    <Router>
        <div className="App">
            <LoginBox logOpen={logOpen} returnLog={returnLog} />
            <UserBox uOpen={uOpen} reUser={reUser} stID={stID} />
            <Slidebar pageWrapId={"page-wrap"} outerContainerId={"outer-container"} passLogin={passLogin} passCreate={passCreate} />
            <div className="container">
              <Routes>
                  <Route path="/userlist" element={<UserList passCreate={passCreate} passID={passID} calltime={calltime} />} />
                  <Route path="/search" element={<Search_eng />} />
                  <Route path="/" element={<Search />} />
              </Routes>
            </div>
        </div>
    </Router>
  );
}

export default App;