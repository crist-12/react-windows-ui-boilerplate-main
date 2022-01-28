import { createState, useState } from '@hookstate/core';
import axios from 'axios';


const initialState = {
    isLoggedIn: false,
    me: {}
}

const authState = createState(initialState);


export const loginUser = async(user, password) => {

    axios.defaults.withCredentials = true;

    try{
       await axios.post(process.env.REACT_APP_HOME+"auth/login", {
            "NombreUsuario": user,
            "ContraseniaUsuario": password
        })
        .then((res)=> {
            if (res.data.message) {
                authState.set({
                    ...initialState,
                    me: {
                        message: res.data.message
                    }
                })
              } else {
                authState.set({
                    ...initialState,
                    me: {
                        username: res.data[0].NombreUsuario
                    },
                    isLoggedIn: true
                })
            }
        })
        .catch((err)=> {
            alert(err);
        })
    }catch(ex){
        alert(ex);
    }
}

export const amILogged = () => {
    axios.get(process.env.REACT_APP_HOME+"auth/login")
    .then((res)=>{
        authState.set({
            isLoggedIn: res.data.loggedIn
        })
    })
    .catch((ex)=>{
        console.log(ex);
    })
}

export const logout = () => {
    // set authState to initial state
    authState.set(initialState);
  };

export const useAuthState = () => {
    return useState(authState);
}