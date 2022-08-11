import React from 'react';
import { slide as Menu } from "react-burger-menu";
import {
    BiHomeAlt,
    BiUser,
    BiMedal,
    BiLogInCircle,
    BiLogOutCircle,
    BiSearch
  } from "react-icons/bi";

type SidemenuProps = {
    pageWrapId: string;
    outerContainerId: string;
    passLogin: Function;
  };

const Slidebar = ({ pageWrapId, outerContainerId, passLogin }: SidemenuProps ) => {

  const handleClick = async ( event:any ) => {
    passLogin(event.target.alt)
  }

  const handleSignOut = (event:any) => {
    localStorage.removeItem('user')
    window.location.reload();
  }

    return (
        <Menu>
          <p className="memu-title">Menu</p>
          <a className="menu-item" href="/">
            <BiHomeAlt />
            Home
          </a>
          {localStorage.getItem('user')?
          <a className="menu-item" href="/Search">
            <BiSearch />
            Search
          </a>
          :''}
          {!localStorage.getItem('user')?
          <a className="menu-item" href="#" onClick={handleClick}>
            <BiLogInCircle />
            Log in
          </a>
          :
          <a className="menu-item logout" onClick={handleSignOut}>
            <BiLogOutCircle />
            Log out
          </a>}
          {/* <a className="menu-item" href="/result">
            <BiMedal />
            Result
          </a>
          <a className="menu-item" href="/login">
            <BiLogInCircle />
            Log in
          </a>
          <a className="menu-item logout" href="/logout">
            <BiLogOutCircle />
            Log out
          </a> */}
        </Menu>
    );
};

export default Slidebar;