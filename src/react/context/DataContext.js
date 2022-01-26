import React, { createContext, useState } from "react";


export const DataContext = createContext();



export const DataProvider = ({children}) => {

    const [theme, setTheme] = useState('system');
    
    const [color, setColor] = useState('#16ab9c');

    return (
        <DataContext.Provider value={[ theme, setTheme, color, setColor ]}>
            {children}
        </DataContext.Provider>
    )
}


