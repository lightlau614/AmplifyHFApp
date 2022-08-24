import React from 'react';
import axios from 'axios';

const API_URL = "https://2fu911b3ei.execute-api.ap-southeast-1.amazonaws.com/dev";

const login = ( username:String , password:String ) => {
    return axios.post(API_URL, {
         username,
         password,
        })
        .then((response) => {
            if(response.data.body.token){
                sessionStorage.setItem("user", response.data.body.user);
                sessionStorage.setItem("group", response.data.body.group);
                sessionStorage.setItem("isSuccess", response.data.body.isSuccess);
                sessionStorage.setItem("token", response.data.body.token);
            }
            return response.data;
        });
};

const logout = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('group');
    sessionStorage.removeItem('isSuccess');
    sessionStorage.removeItem('token');
};

const getCurrentUser = () => {
    return JSON.parse(sessionStorage.getItem('user')||'{}');
};

const AuthService = {
    login,
    logout,
    getCurrentUser,
};

export default AuthService;