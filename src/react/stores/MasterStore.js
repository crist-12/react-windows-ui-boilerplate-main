import { createState, useState } from '@hookstate/core';


let colorValue;
const initialState = {
    color: "#16ab9c"
}

/* const getColorPreference = async()=> {
    const response = await fetch(process.env.REACT_APP_HOME + "auth/color/" + authState.me.get().username, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    const data = await response.json()
    colorValue = data.Color;
    console.log(data)
    return data
} */


const masterState = createState(initialState);

export const setThemeColor = (color) => {
    masterState.set({
        color: color
    }) 
}


export const useMasterState = () => {
    return useState(masterState);
}