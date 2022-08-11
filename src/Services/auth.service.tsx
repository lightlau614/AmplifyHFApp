import React from 'react';
import axios from 'axios';

const API_URL = "http://www.api_mongodb.com/"

const login = ( username:String , password:String ) => {
    return axios.post(API_URL + "login", {
         username,
         password,
        })
        .then((response) => {
            // console.log(response);
            if(response.data.token){
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user")||'{}');
};

const AuthService = {
    login,
    logout,
    getCurrentUser,
};

export default AuthService;