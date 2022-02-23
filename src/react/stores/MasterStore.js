import { createState, useState } from '@hookstate/core';



const savedColor = localStorage.getItem("color");
const initialValue = JSON.parse(savedColor);
console.log(initialValue)

const initialState = {
    color: "#16ab9c"
}

const masterState = createState(initialState);

export const setThemeColor = (color) => {
    masterState.set({
        color: color
    }) 
}


export const useMasterState = () => {
    return useState(masterState);
}