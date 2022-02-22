import { createState, useState } from '@hookstate/core';

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