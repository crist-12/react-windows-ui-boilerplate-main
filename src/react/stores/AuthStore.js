import { createState, useState } from '@hookstate/core';
import axios from 'axios';


const initialState = {
    isLoggedIn: false,
    me: {}
}

const authState = createState(initialState);

const postLoginLog = async(user, action)=> {
    const data = {
        Accion: `${user} ${action}`,
        Modulo: "Login"
    }
    const result = await fetch(process.env.REACT_APP_HOME + "bitacora", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const response = await result.json();
    console.log(response);
}

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
                 postLoginLog(user, " ingresó al sistema").then(()=>{})
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

export const logout = async() => {
    // set authState to initial state
    await postLoginLog(authState.me.get().username, " cerró su sesión en el sistema");	
    authState.set(initialState);
    
};

export const useAuthState = () => {
    return useState(authState);
}