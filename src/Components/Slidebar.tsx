import React from 'react';
import { slide as Menu } from "react-burger-menu";
import {
    BiHomeAlt,
    BiLogInCircle,
    BiLogOutCircle,
    BiSearch,
    BiUserPlus
  } from "react-icons/bi";

type SidemenuProps = {
    pageWrapId: string;
    outerContainerId: string;
    passLogin: Function;
    passCreate: Function;
  };

const Slidebar = ({ pageWrapId, outerContainerId, passLogin, passCreate }: SidemenuProps ) => {

  const handleClick = async ( event:any ) => {
    passLogin(event.target.alt);
  }

  const handleCreateClick = async ( event:any ) => {
    passCreate(event.target.alt);
  }

  const handleSignOut = (event:any) => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('group');
    sessionStorage.removeItem('isSuccess');
    sessionStorage.removeItem('token');
    sessionStorage.clear();
    window.location.reload();
  }

    return (
        <Menu>
          <p className="memu-title">Menu</p>
          <a className="menu-item" href="/">
            <BiHomeAlt />
            Home
          </a>
          {/* {!sessionStorage.getItem('user') && !sessionStorage.getItem('token')?
          <a className="menu-item" href="#" onClick={handleClick}>
            <BiLogInCircle />
            Log in
          </a>
          :
          (
            <> */}
              <a className="menu-item" href="/Search">
                <BiSearch />
                Search
              </a>
              {/* {sessionStorage.getItem('group') === 'administrator'?(
                <>
                  <a className="menu-item" href="#" onClick={handleCreateClick}>
                    <BiUserPlus />
                    Create User
                  </a>
                  <a className='menu-item' href='/userlist'>
                    <BiUserPlus />
                    User List
                  </a>
                </>
              ):''}
              <a className="menu-item logout" onClick={handleSignOut}>
                <BiLogOutCircle />
                Log out
              </a>
            </>
          )} */}
        </Menu>
    );
};

export default Slidebar;