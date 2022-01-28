import { createState, useState } from '@hookstate/core';
import axios from 'axios';


const initialState = {
    columns: {},
    rows: {},
    name: "asafsa",
    description: "asfasfasf",
    key: ""
}

const masterState = createState(initialState);


export const useMasterState = () => {
    return useState(masterState);
}